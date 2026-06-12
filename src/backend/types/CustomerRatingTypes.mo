module {

  // ── Customer Rating ───────────────────────────────────────────────────────
  // Merchants and delivery partners can rate a customer after an order.

  public type CustomerRating = {
    id          : Text;
    customerId  : Text;
    customerName: Text;
    orderId     : Text;
    ratedByRole : Text;   // "merchant" | "delivery_partner"
    ratedById   : Text;
    ratedByName : Text;
    rating      : Nat;    // 1–5
    comment     : Text;
    createdAt   : Int;
  };

};
