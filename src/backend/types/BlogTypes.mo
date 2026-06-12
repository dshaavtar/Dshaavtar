module {

  // ── Blog ─────────────────────────────────────────────────────────────────

  public type Blog = {
    id           : Text;
    authorId     : Text;
    authorName   : Text;
    title        : Text;
    location     : Text;
    category     : Text;
    content      : Text;
    status       : Text;   // "published" | "draft"
    createdAt    : Int;
    updatedAt    : Int;
  };

  // ── Blog Review ───────────────────────────────────────────────────────────

  public type BlogReview = {
    id           : Text;
    blogId       : Text;
    reviewerId   : Text;
    reviewerName : Text;
    rating       : Nat;   // 1–5
    comment      : Text;
    createdAt    : Int;
  };

};
