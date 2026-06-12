import Types "Types";
import Utils "Utils";
import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Array "mo:core/Array";
import Float "mo:core/Float";
import Int "mo:core/Int";
import Time "mo:core/Time";

module {

  /// Lightweight order event pushed into in-memory queues for real-time polling.
  public type OrderNotification = {
    orderId   : Text;
    event     : Text;   // "new_order" | "status_changed" | "assigned" etc.
    timestamp : Int;
    data      : Text;   // JSON-lite string with order summary
  };

  public class OrderService(byId : Map.Map<Text, Types.Order>) {

  // ── Real-time notification queues ─────────────────────────────────────────
  // merchantId → pending notifications (cleared after poll)
  let merchantNotifications  = Map.empty<Text, List.List<OrderNotification>>();
  // deliveryPartnerId → pending notifications
  let dpNotifications        = Map.empty<Text, List.List<OrderNotification>>();
  // customerId/phone → pending notifications
  let customerNotifications  = Map.empty<Text, List.List<OrderNotification>>();

  func pushNotification(store : Map.Map<Text, List.List<OrderNotification>>, key : Text, notif : OrderNotification) {
    let existing = switch (store.get(key)) {
      case (?lst) lst;
      case null   List.empty<OrderNotification>();
    };
    existing.add(notif);
    store.add(key, existing);
  };

  func buildNotif(orderId : Text, event : Text, merchantId : Text, customerId : Text, amount : Float) : OrderNotification {
    {
      orderId;
      event;
      timestamp = Time.now();
      data = "{\"merchantId\":\"" # merchantId # "\",\"customerId\":\"" # customerId # "\",\"amount\":" # amount.toText() # "}";
    }
  };

  /// Poll and clear all pending notifications for a merchant.
  public func pollMerchantNotifications(merchantId : Text) : [OrderNotification] {
    switch (merchantNotifications.get(merchantId)) {
      case null [];
      case (?lst) {
        let arr = lst.toArray();
        merchantNotifications.add(merchantId, List.empty<OrderNotification>());
        arr
      };
    }
  };

  /// Poll and clear all pending notifications for a delivery partner.
  public func pollDeliveryNotifications(partnerId : Text) : [OrderNotification] {
    switch (dpNotifications.get(partnerId)) {
      case null [];
      case (?lst) {
        let arr = lst.toArray();
        dpNotifications.add(partnerId, List.empty<OrderNotification>());
        arr
      };
    }
  };

  /// Poll and clear all pending notifications for a customer.
  public func pollCustomerNotifications(customerId : Text) : [OrderNotification] {
    switch (customerNotifications.get(customerId)) {
      case null [];
      case (?lst) {
        let arr = lst.toArray();
        customerNotifications.add(customerId, List.empty<OrderNotification>());
        arr
      };
    }
  };

  // ── Helpers ───────────────────────────────────────────────────────────────

  func putOrder(o : Types.Order) {
    byId.add(o.id, o);
  };

  func vehicleKey(v : Types.VehicleType) : Text {
    switch (v) {
      case (#bike)    "bike";
      case (#scooter) "scooter";
      case (#car)     "car";
      case (#auto)    "auto";
      case (#van)     "van";
      case (#truck)   "truck";
      case (#tempo)   "tempo";
      case (#bus)     "bus";
    }
  };

  /// Peak-hour detection: 08-10 and 18-21 UTC (nanosecond epoch).
  func isPeakHour() : Bool {
    let nowSec : Nat = Int.abs(Time.now()) / 1_000_000_000 % 86400;
    let h : Nat      = nowSec / 3600;
    (h >= 8 and h < 10) or (h >= 18 and h < 21)
  };

  func calcTotal(items : [Types.OrderItem]) : Float {
    var total = 0.0;
    for (item in items.vals()) { total += item.totalRate };
    total
  };

  /// Validate that a status transition is legal.
  func isLegalTransition(from : Types.OrderStatus, to : Types.OrderStatus) : Bool {
    switch (from, to) {
      case (#new_,            #pending)          { true };
      case (#new_,            #cancelled)        { true };
      case (#pending,         #accepted)         { true };
      case (#pending,         #rejected)         { true };
      case (#pending,         #cancelled)        { true };
      case (#accepted,        #assigned)         { true };
      case (#accepted,        #cancelled)        { true };
      case (#assigned,        #inTransit)        { true };
      case (#assigned,        #cancelled)        { true };
      case (#inTransit,       #delivered)        { true };
      case (#delivered,       #paymentCollected) { true };
      case (#paymentCollected, #vendorSettled)   { true };
      case (#vendorSettled,   #completed)        { true };
      case _ { false };
    }
  };

  /// Human-readable label for each order status.
  public func statusLabel(status : Types.OrderStatus) : Text {
    switch (status) {
      case (#new_)             "New Order";
      case (#pending)          "Waiting for Merchant";
      case (#accepted)         "Merchant Accepted";
      case (#rejected)         "Rejected by Merchant";
      case (#assigned)         "Delivery Partner Assigned";
      case (#inTransit)        "Out for Delivery";
      case (#delivered)        "Delivered";
      case (#paymentCollected) "Payment Collected";
      case (#vendorSettled)    "Vendor Settled";
      case (#completed)        "Order Completed";
      case (#cancelled)        "Cancelled";
      case (#expired)          "Expired";
    }
  };

  /// Append one history entry and return the updated list.
  func appendHistory(
    existing : [Types.OrderStatusHistory],
    status   : Types.OrderStatus,
    actor_   : Text,
    note     : ?Text,
  ) : [Types.OrderStatusHistory] {
    let entry : Types.OrderStatusHistory = {
      status;
      actor_;
      note;
      timestamp = Utils.getCurrentTimestamp();
    };
    existing.concat([entry])
  };

  // ── Default rate cards ─────────────────────────────────────────────────────

  let defaultRates : [(Text, { baseRate : Float; perKmRate : Float; surgeMultiplier : Float })] = [
    ("bike",    { baseRate = 20.0; perKmRate = 8.0;  surgeMultiplier = 1.5 }),
    ("scooter", { baseRate = 20.0; perKmRate = 9.0;  surgeMultiplier = 1.5 }),
    ("car",     { baseRate = 40.0; perKmRate = 15.0; surgeMultiplier = 1.5 }),
    ("auto",    { baseRate = 30.0; perKmRate = 12.0; surgeMultiplier = 1.5 }),
    ("van",     { baseRate = 60.0; perKmRate = 18.0; surgeMultiplier = 1.5 }),
    ("truck",   { baseRate = 80.0; perKmRate = 22.0; surgeMultiplier = 1.5 }),
  ];

  // ── Public API ────────────────────────────────────────────────────────────

  public func createOrder(
    customerId      : Text,
    merchantId      : Text,
    items           : [Types.OrderItem],
    customerAddress : ?Types.Location,
    paymentMode     : Types.PaymentMode,
    searchQuery     : ?Text,
  ) : Types.Result<Types.Order, Types.ApiError> {
    if (items.size() == 0) {
      return #err(#invalidInput("Order must contain at least one item"));
    };
    let now = Utils.getCurrentTimestamp();
    let initHistory = appendHistory([], #new_, "customer", null);
    let order : Types.Order = {
      id               = Utils.generateId("order");
      customerId;
      merchantId;
      deliveryPartnerId = null;
      items;
      manualItems      = [];
      isManualOrder    = false;
      ondcSource       = false;
      status           = #new_;
      totalAmount      = calcTotal(items);
      deliveryCharge   = 0.0;
      surgeCharge      = 0.0;
      paymentMode;
      paymentStatus    = #pending;
      customerAddress;
      merchantBranch   = null;
      createdAt        = now;
      acceptedAt       = null;
      assignedAt       = null;
      completedAt      = null;
      cancelledAt      = null;
      notes            = null;
      searchQuery;
      searchImageUrl   = null;
      // Extended tracking
      merchantAcceptedAt     = null;
      dpAcceptedAt           = null;
      pickedUpAt             = null;
      deliveredAt            = null;
      paymentCollectedAt     = null;
      vendorSettledAt        = null;
      rejectionReason        = null;
      customerRatingValue    = null;
      customerRating         = null;
      merchantRating         = null;
      dpRating               = null;
      paymentCollectedAmount = 0;
      vendorSettlementAmount = 0;
      statusHistory          = initHistory;
    };
    putOrder(order);
    // Notify merchant immediately when a new order is placed
    pushNotification(merchantNotifications, order.merchantId, buildNotif(order.id, "new_order", order.merchantId, order.customerId, order.totalAmount));
    // Notify customer that order was placed
    pushNotification(customerNotifications, order.customerId, buildNotif(order.id, "order_placed", order.merchantId, order.customerId, order.totalAmount));
    #ok(order)
  };

  /// Create a manual/custom order — customer specifies items by name/brand/qty.
  /// Merchant later calls setManualOrderAmount to set total; customer confirms via confirmManualOrder.
  public func createManualOrder(
    customerPhone   : Text,
    merchantId      : Text,
    manualItems     : [Types.ManualOrderItem],
    customerAddress : ?Types.Location,
  ) : Types.Result<Types.Order, Types.ApiError> {
    if (manualItems.size() == 0) {
      return #err(#invalidInput("Manual order must contain at least one item"));
    };
    let now = Utils.getCurrentTimestamp();
    let initHistory = appendHistory([], #new_, "customer", ?"Manual order placed");
    let order : Types.Order = {
      id               = Utils.generateId("morder");
      customerId       = customerPhone;
      merchantId;
      deliveryPartnerId = null;
      items            = [];
      manualItems;
      isManualOrder    = true;
      ondcSource       = false;
      status           = #pending;
      totalAmount      = 0.0;
      deliveryCharge   = 0.0;
      surgeCharge      = 0.0;
      paymentMode      = #cod;
      paymentStatus    = #pending;
      customerAddress;
      merchantBranch   = null;
      createdAt        = now;
      acceptedAt       = null;
      assignedAt       = null;
      completedAt      = null;
      cancelledAt      = null;
      notes            = ?"Manual order — awaiting merchant pricing";
      searchQuery      = null;
      searchImageUrl   = null;
      merchantAcceptedAt     = null;
      dpAcceptedAt           = null;
      pickedUpAt             = null;
      deliveredAt            = null;
      paymentCollectedAt     = null;
      vendorSettledAt        = null;
      rejectionReason        = null;
      customerRatingValue    = null;
      customerRating         = null;
      merchantRating         = null;
      dpRating               = null;
      paymentCollectedAmount = 0;
      vendorSettlementAmount = 0;
      statusHistory          = initHistory;
    };
    putOrder(order);
    #ok(order)
  };

  /// Merchant sets the amount and delivery charges for a manual order.
  public func setManualOrderAmount(
    orderId          : Text,
    amount           : Float,
    deliveryCharges  : Float,
  ) : Types.Result<Types.Order, Types.ApiError> {
    switch (byId.get(orderId)) {
      case null { #err(#notFound) };
      case (?o) {
        if (not o.isManualOrder) {
          return #err(#invalidInput("Not a manual order"));
        };
        let history = appendHistory(o.statusHistory, o.status, "merchant", ?"Amount set by merchant");
        let updated = {
          o with
          totalAmount      = amount;
          deliveryCharge   = deliveryCharges;
          statusHistory    = history;
        };
        putOrder(updated);
        #ok(updated)
      };
    }
  };

  /// Customer confirms a manual order with selected payment method.
  public func confirmManualOrder(
    orderId     : Text,
    paymentMode : Types.PaymentMode,
  ) : Types.Result<Types.Order, Types.ApiError> {
    switch (byId.get(orderId)) {
      case null { #err(#notFound) };
      case (?o) {
        if (not o.isManualOrder) {
          return #err(#invalidInput("Not a manual order"));
        };
        if (o.totalAmount <= 0.0) {
          return #err(#invalidInput("Merchant has not set order amount yet"));
        };
        let now = Utils.getCurrentTimestamp();
        let history = appendHistory(o.statusHistory, #accepted, "customer", ?"Customer confirmed manual order");
        let updated = {
          o with
          paymentMode;
          status      = #accepted;
          acceptedAt  = ?now;
          statusHistory = history;
        };
        putOrder(updated);
        #ok(updated)
      };
    }
  };

  public func getOrderById(id : Text) : Types.Result<Types.Order, Types.ApiError> {
    switch (byId.get(id)) {
      case (?o) { #ok(o) };
      case null  { #err(#notFound) };
    }
  };

  /// Update order status with FSM validation. Timestamps are set automatically.
  public func updateOrderStatus(
    id        : Text,
    newStatus : Types.OrderStatus,
    actor_    : Text,
    note      : ?Text,
    rejectionReason : ?Text,
  ) : Types.Result<Types.Order, Types.ApiError> {
    switch (byId.get(id)) {
      case null { #err(#notFound) };
      case (?o) {
        if (not isLegalTransition(o.status, newStatus)) {
          return #err(#invalidInput("Illegal status transition"));
        };
        let now = Utils.getCurrentTimestamp();
        let history = appendHistory(o.statusHistory, newStatus, actor_, note);
        let updated : Types.Order = {
          o with
          status = newStatus;
          statusHistory = history;
          acceptedAt         = switch (newStatus) { case (#accepted)  { ?now }; case _ { o.acceptedAt  } };
          assignedAt         = switch (newStatus) { case (#assigned)  { ?now }; case _ { o.assignedAt  } };
          completedAt        = switch (newStatus) { case (#completed) { ?now }; case _ { o.completedAt } };
          cancelledAt        = switch (newStatus) { case (#cancelled) { ?now }; case _ { o.cancelledAt } };
          merchantAcceptedAt = switch (newStatus) { case (#accepted)  { ?now }; case _ { o.merchantAcceptedAt } };
          deliveredAt        = switch (newStatus) { case (#delivered) { ?now }; case _ { o.deliveredAt } };
          paymentCollectedAt = switch (newStatus) { case (#paymentCollected) { ?now }; case _ { o.paymentCollectedAt } };
          vendorSettledAt    = switch (newStatus) { case (#vendorSettled)    { ?now }; case _ { o.vendorSettledAt    } };
          rejectionReason    = switch (newStatus) { case (#rejected) { rejectionReason }; case _ { o.rejectionReason } };
        };
        putOrder(updated);
        // Push notifications based on the new status
        let event = switch (newStatus) {
          case (#accepted)         "order_accepted";
          case (#rejected)         "order_rejected";
          case (#assigned)         "order_assigned";
          case (#inTransit)        "order_in_transit";
          case (#delivered)        "order_delivered";
          case (#paymentCollected) "payment_collected";
          case (#completed)        "order_completed";
          case (#cancelled)        "order_cancelled";
          case _                   "status_changed";
        };
        // Notify merchant on key transitions
        switch (newStatus) {
          case (#assigned or #inTransit or #delivered or #completed or #cancelled) {
            pushNotification(merchantNotifications, updated.merchantId, buildNotif(updated.id, event, updated.merchantId, updated.customerId, updated.totalAmount));
          };
          case _ {};
        };
        // Notify delivery partner when accepted (signal new pickup available) or on later transitions
        switch (newStatus) {
          case (#accepted) {
            pushNotification(dpNotifications, updated.merchantId, buildNotif(updated.id, "available_for_pickup", updated.merchantId, updated.customerId, updated.totalAmount));
          };
          case (#inTransit or #delivered or #completed or #cancelled) {
            switch (updated.deliveryPartnerId) {
              case (?dpId) {
                pushNotification(dpNotifications, dpId, buildNotif(updated.id, event, updated.merchantId, updated.customerId, updated.totalAmount));
              };
              case null {};
            };
          };
          case _ {};
        };
        // Always notify customer
        pushNotification(customerNotifications, updated.customerId, buildNotif(updated.id, event, updated.merchantId, updated.customerId, updated.totalAmount));
        #ok(updated)
      };
    }
  };

  /// Append a manual status-history note without changing the current status.
  public func addOrderStatusHistory(
    id     : Text,
    actor_ : Text,
    note   : Text,
  ) : Types.Result<Types.Order, Types.ApiError> {
    switch (byId.get(id)) {
      case null { #err(#notFound) };
      case (?o) {
        let history = appendHistory(o.statusHistory, o.status, actor_, ?note);
        let updated = { o with statusHistory = history };
        putOrder(updated);
        #ok(updated)
      };
    }
  };

  public func assignDeliveryPartner(orderId : Text, deliveryPartnerId : Text) : Types.Result<Types.Order, Types.ApiError> {
    switch (byId.get(orderId)) {
      case null { #err(#notFound) };
      case (?o) {
        let now = Utils.getCurrentTimestamp();
        let history = appendHistory(o.statusHistory, #assigned, "admin", ?("Assigned to DP: " # deliveryPartnerId));
        let updated = {
          o with
          deliveryPartnerId = ?deliveryPartnerId;
          status            = #assigned;
          assignedAt        = ?now;
          statusHistory     = history;
        };
        putOrder(updated);
        #ok(updated)
      };
    }
  };

  /// Delivery partner accepts an order → status: assigned, dpAcceptedAt set.
  public func dpAcceptOrder(orderId : Text, dpId : Text) : Types.Result<Types.Order, Types.ApiError> {
    switch (byId.get(orderId)) {
      case null { #err(#notFound) };
      case (?o) {
        if (not isLegalTransition(o.status, #assigned)) {
          return #err(#invalidInput("Order cannot be accepted by DP in current state"));
        };
        let now = Utils.getCurrentTimestamp();
        let history = appendHistory(o.statusHistory, #assigned, "deliveryPartner", ?("DP accepted: " # dpId));
        let updated = {
          o with
          deliveryPartnerId = ?dpId;
          status            = #assigned;
          assignedAt        = ?now;
          dpAcceptedAt      = ?now;
          statusHistory     = history;
        };
        putOrder(updated);
        #ok(updated)
      };
    }
  };

  /// Delivery partner confirms pickup → status: inTransit.
  public func dpConfirmPickup(orderId : Text, dpId : Text) : Types.Result<Types.Order, Types.ApiError> {
    switch (byId.get(orderId)) {
      case null { #err(#notFound) };
      case (?o) {
        switch (o.deliveryPartnerId) {
          case null { return #err(#unauthorized) };
          case (?assigned) {
            if (assigned != dpId) { return #err(#unauthorized) };
          };
        };
        if (not isLegalTransition(o.status, #inTransit)) {
          return #err(#invalidInput("Order is not in assigned state"));
        };
        let now = Utils.getCurrentTimestamp();
        let history = appendHistory(o.statusHistory, #inTransit, "deliveryPartner", ?"Picked up from merchant");
        let updated = {
          o with
          status        = #inTransit;
          pickedUpAt    = ?now;
          statusHistory = history;
        };
        putOrder(updated);
        #ok(updated)
      };
    }
  };

  /// Delivery partner confirms delivery → status: delivered.
  public func dpConfirmDelivery(orderId : Text, dpId : Text) : Types.Result<Types.Order, Types.ApiError> {
    switch (byId.get(orderId)) {
      case null { #err(#notFound) };
      case (?o) {
        switch (o.deliveryPartnerId) {
          case null { return #err(#unauthorized) };
          case (?assigned) {
            if (assigned != dpId) { return #err(#unauthorized) };
          };
        };
        if (not isLegalTransition(o.status, #delivered)) {
          return #err(#invalidInput("Order is not in transit"));
        };
        let now = Utils.getCurrentTimestamp();
        let history = appendHistory(o.statusHistory, #delivered, "deliveryPartner", ?"Delivered to customer");
        let updated = {
          o with
          status        = #delivered;
          deliveredAt   = ?now;
          statusHistory = history;
        };
        putOrder(updated);
        #ok(updated)
      };
    }
  };

  /// Delivery partner collects payment from customer → status: paymentCollected.
  public func dpCollectPayment(orderId : Text, dpId : Text, amount : Nat) : Types.Result<Types.Order, Types.ApiError> {
    switch (byId.get(orderId)) {
      case null { #err(#notFound) };
      case (?o) {
        switch (o.deliveryPartnerId) {
          case null { return #err(#unauthorized) };
          case (?assigned) {
            if (assigned != dpId) { return #err(#unauthorized) };
          };
        };
        if (not isLegalTransition(o.status, #paymentCollected)) {
          return #err(#invalidInput("Order is not in delivered state"));
        };
        let now = Utils.getCurrentTimestamp();
        let history = appendHistory(o.statusHistory, #paymentCollected, "deliveryPartner", ?"Payment collected from customer");
        let updated = {
          o with
          status                 = #paymentCollected;
          paymentCollectedAt     = ?now;
          paymentCollectedAmount = amount;
          paymentStatus          = #paid;
          statusHistory          = history;
        };
        putOrder(updated);
        #ok(updated)
      };
    }
  };

  /// Delivery partner settles payment with vendor → status: vendorSettled.
  public func dpSettleVendor(orderId : Text, dpId : Text, amount : Nat) : Types.Result<Types.Order, Types.ApiError> {
    switch (byId.get(orderId)) {
      case null { #err(#notFound) };
      case (?o) {
        switch (o.deliveryPartnerId) {
          case null { return #err(#unauthorized) };
          case (?assigned) {
            if (assigned != dpId) { return #err(#unauthorized) };
          };
        };
        if (not isLegalTransition(o.status, #vendorSettled)) {
          return #err(#invalidInput("Payment must be collected before vendor settlement"));
        };
        let now = Utils.getCurrentTimestamp();
        let history = appendHistory(o.statusHistory, #vendorSettled, "deliveryPartner", ?"Payment settled with vendor");
        let updated = {
          o with
          status                 = #vendorSettled;
          vendorSettledAt        = ?now;
          vendorSettlementAmount = amount;
          statusHistory          = history;
        };
        putOrder(updated);
        #ok(updated)
      };
    }
  };

  /// Final order completion (admin or system) → status: completed.
  public func completeOrder(orderId : Text) : Types.Result<Types.Order, Types.ApiError> {
    switch (byId.get(orderId)) {
      case null { #err(#notFound) };
      case (?o) {
        if (not isLegalTransition(o.status, #completed)) {
          return #err(#invalidInput("Order cannot be completed in current state"));
        };
        let now = Utils.getCurrentTimestamp();
        let history = appendHistory(o.statusHistory, #completed, "admin", ?"Order cycle completed");
        // Auto-set customer rating to #good when payment was collected
        let autoRating : ?Types.CustomerRating = if (o.paymentCollectedAmount > 0) ?#good else null;
        let updated = {
          o with
          status              = #completed;
          completedAt         = ?now;
          statusHistory       = history;
          customerRatingValue = autoRating;
        };
        putOrder(updated);
        #ok(updated)
      };
    }
  };

  /// Set customer rating for an order.
  public func setCustomerRating(
    orderId : Text,
    rating  : Types.CustomerRating,
  ) : Types.Result<Types.Order, Types.ApiError> {
    switch (byId.get(orderId)) {
      case null { #err(#notFound) };
      case (?o) {
        let updated = { o with customerRatingValue = ?rating };
        putOrder(updated);
        #ok(updated)
      };
    }
  };

  /// Get rating history for a customer across all their orders.
  public func getCustomerRatingHistory(
    customerPhone : Text,
  ) : [{ orderId : Text; rating : Types.CustomerRating; merchantId : Text; date : Int }] {
    let results = List.empty<{ orderId : Text; rating : Types.CustomerRating; merchantId : Text; date : Int }>();
    for ((_, o) in byId.entries()) {
      if (o.customerId == customerPhone) {
        switch (o.customerRatingValue) {
          case null {};
          case (?r) {
            results.add({
              orderId    = o.id;
              rating     = r;
              merchantId = o.merchantId;
              date       = o.createdAt;
            });
          };
        };
      };
    };
    results.toArray()
  };

  /// Count of completed orders for a customer at a given merchant.
  public func getTotalCompletedOrdersByCustomer(
    customerPhone : Text,
    merchantId    : Text,
  ) : Nat {
    var count : Nat = 0;
    for ((_, o) in byId.entries()) {
      if (o.customerId == customerPhone and o.merchantId == merchantId and o.status == #completed) {
        count += 1;
      };
    };
    count
  };

  /// Create an order flagged as ONDC-sourced.
  public func createOndcOrder(
    customerId      : Text,
    merchantId      : Text,
    items           : [Types.OrderItem],
    customerAddress : ?Types.Location,
    paymentMode     : Types.PaymentMode,
    searchQuery     : ?Text,
  ) : Types.Result<Types.Order, Types.ApiError> {
    switch (createOrder(customerId, merchantId, items, customerAddress, paymentMode, searchQuery)) {
      case (#err(e)) { #err(e) };
      case (#ok(o))  {
        let updated = { o with ondcSource = true };
        putOrder(updated);
        #ok(updated)
      };
    }
  };

  /// List all ONDC-sourced orders.
  public func listOndcOrders() : [Types.Order] {
    let results = List.empty<Types.Order>();
    for ((_, o) in byId.entries()) {
      if (o.ondcSource) results.add(o);
    };
    results.toArray()
  };

  /// Return full status history for an order.
  public func getOrderTracking(orderId : Text) : Types.Result<[Types.OrderStatusHistory], Types.ApiError> {
    switch (byId.get(orderId)) {
      case null { #err(#notFound) };
      case (?o) { #ok(o.statusHistory) };
    }
  };

  /// Get pending (accepted) orders near a location — for delivery partner discovery.
  public func getPendingOrdersForDP(lat : Float, lng : Float, radiusKm : Float) : [Types.Order] {
    let all = List.fromIter<Types.Order>(byId.values());
    all.filter(func(o : Types.Order) : Bool {
      switch (o.status) {
        case (#accepted) {};
        case _ { return false };
      };
      if (o.deliveryPartnerId != null) { return false };
      switch (o.customerAddress) {
        case null { true }; // include if no address filter possible
        case (?addr) {
          Utils.haversineDistance(addr.lat, addr.lng, lat, lng) <= radiusKm
        };
      }
    }).toArray()
  };

  public func getOrdersByCustomer(customerId : Text) : [Types.Order] {
    let all = List.fromIter<Types.Order>(byId.values());
    all.filter(func(o : Types.Order) : Bool { o.customerId == customerId }).toArray()
  };

  public func getOrdersByMerchant(merchantId : Text, from : ?Int, to : ?Int) : [Types.Order] {
    let all = List.fromIter<Types.Order>(byId.values());
    all.filter(func(o : Types.Order) : Bool {
      if (o.merchantId != merchantId) { return false };
      let afterFrom = switch (from) { case null { true }; case (?f) { o.createdAt >= f } };
      let beforeTo  = switch (to)   { case null { true }; case (?t) { o.createdAt <= t } };
      afterFrom and beforeTo
    }).toArray()
  };

  public func getOrdersByDeliveryPartner(dpId : Text) : [Types.Order] {
    let all = List.fromIter<Types.Order>(byId.values());
    all.filter(func(o : Types.Order) : Bool {
      switch (o.deliveryPartnerId) {
        case (?id) { id == dpId };
        case null  { false };
      }
    }).toArray()
  };

  public func getAllOrders(status : ?Types.OrderStatus, from : ?Int, to : ?Int) : [Types.Order] {
    let all = List.fromIter<Types.Order>(byId.values());
    all.filter(func(o : Types.Order) : Bool {
      let statusOk = switch (status) {
        case null    { true };
        case (?s) {
          switch (o.status, s) {
            case (#new_,             #new_)             { true };
            case (#pending,          #pending)          { true };
            case (#accepted,         #accepted)         { true };
            case (#rejected,         #rejected)         { true };
            case (#assigned,         #assigned)         { true };
            case (#inTransit,        #inTransit)        { true };
            case (#delivered,        #delivered)        { true };
            case (#paymentCollected, #paymentCollected) { true };
            case (#vendorSettled,    #vendorSettled)    { true };
            case (#completed,        #completed)        { true };
            case (#cancelled,        #cancelled)        { true };
            case (#expired,           #expired)          { true };
            case _                                      { false };
          }
        };
      };
      let afterFrom = switch (from) { case null { true }; case (?f) { o.createdAt >= f } };
      let beforeTo  = switch (to)   { case null { true }; case (?t) { o.createdAt <= t } };
      statusOk and afterFrom and beforeTo
    }).toArray()
  };

  public func bulkUpdateStatus(orderIds : [Text], newStatus : Types.OrderStatus) : Types.Result<Nat, Types.ApiError> {
    var updated = 0;
    for (oid in orderIds.vals()) {
      switch (byId.get(oid)) {
        case null {};
        case (?o) {
          let history = appendHistory(o.statusHistory, newStatus, "admin", ?"Bulk status update");
          let u = { o with status = newStatus; statusHistory = history };
          putOrder(u);
          updated += 1;
        };
      };
    };
    #ok(updated)
  };

  /// Group order items by merchant. Returns one OrderGroup per distinct merchantId.
  /// For a standard single-merchant order this returns a single group.
  public func getOrderGroups(orderId : Text) : Types.Result<[Types.OrderGroup], Types.ApiError> {
    switch (byId.get(orderId)) {
      case null { #err(#notFound) };
      case (?o) {
        // Collect distinct merchant IDs
        let seenMids = List.empty<Text>();
        for (item in o.items.vals()) {
          let mid = o.merchantId;
          if (seenMids.find(func(m : Text) : Bool { m == mid }) == null) {
            seenMids.add(mid);
          };
        };
        let groups = List.empty<Types.OrderGroup>();
        for (mid in seenMids.values()) {
          let subset = List.fromArray<Types.OrderItem>(o.items).filter(func(_ : Types.OrderItem) : Bool { true });
          let subtotal = subset.foldLeft(0.0, func(acc : Float, it : Types.OrderItem) : Float { acc + it.totalRate });
          groups.add({
            merchantId     = mid;
            items          = subset.toArray();
            subtotal;
            deliveryCharge = o.deliveryCharge;
          });
        };
        #ok(groups.toArray())
      };
    }
  };

  public func calculateDeliveryCharge(
    fromLat     : Float,
    fromLng     : Float,
    toLat       : Float,
    toLng       : Float,
    vehicleType : Types.VehicleType,
  ) : Float {
    let dist = Utils.haversineDistance(fromLat, fromLng, toLat, toLng);
    let key  = vehicleKey(vehicleType);
    let rateOpt = defaultRates.find(func(entry : (Text, { baseRate : Float; perKmRate : Float; surgeMultiplier : Float })) : Bool {
      entry.0 == key
    });
    switch (rateOpt) {
      case null {
        let base = 20.0 + dist * 10.0;
        if (isPeakHour()) { base * 1.5 } else { base }
      };
      case (?(_, rc)) {
        let base = rc.baseRate + dist * rc.perKmRate;
        if (isPeakHour()) { base * rc.surgeMultiplier } else { base }
      };
    }
  };

  }; // end class OrderService
};
