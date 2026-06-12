module {

  public type LendingItem = {
    id                  : Text;
    lenderPhone         : Text;
    borrowerPhone       : Text;
    itemCategory        : Text;  // electronics | furniture | tools | books | sports | clothing | other
    itemName            : Text;
    itemDescription     : Text;
    borrowDate          : Int;
    returnDate          : Int;
    charge              : Float; // 0.0 if no charge
    chargeDescription   : Text;
    reminderFrequency   : Text;  // monthly | quarterly | yearly | specific_date
    specificReminderDate : ?Int;
    status              : Text;  // active | returned | overdue | disputed
    lastReminderSent    : ?Int;
    createdAt           : Int;
    updatedAt           : Int;
  };

};
