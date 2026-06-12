module {

  // ── Flow Step ────────────────────────────────────────────────────────────
  public type FlowStep = {
    stepIndex : Nat;
    input     : Text;
    response  : Text;
    dataNote  : Text;
  };

  // ── Flow Session ─────────────────────────────────────────────────────────
  public type FlowSession = {
    id        : Text;
    role      : Text;     // "customer" | "merchant" | "delivery" | "manufacturer"
    flowName  : Text;
    steps     : [FlowStep];
    timestamp : Int;
    status    : Text;     // "in_progress" | "completed" | "failed"
  };

  // ── POS Order Line ───────────────────────────────────────────────────────
  public type POSOrderLine = {
    productId   : Text;
    productName : Text;
    quantity    : Nat;
    unitPrice   : Float;
    tier        : Text;   // "retail" | "bulk" | "distributor" | "b2b"
  };

  // ── POS Order ────────────────────────────────────────────────────────────
  // Covers both direct-customer orders and distributor-network orders
  // linked to a manufacturer.
  public type POSOrder = {
    id                  : Text;
    source              : Text;   // "direct_customer" | "distributor"
    buyerName           : Text;
    buyerPhone          : Text;
    manufacturerId      : Text;
    products            : [POSOrderLine];
    total               : Float;
    status              : Text;   // "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
    timestamp           : Int;
    deliveryPartnerId   : ?Text;
  };

};
