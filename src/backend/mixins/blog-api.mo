import BlogTypes "../types/BlogTypes";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";

mixin (
  blogsById       : Map.Map<Text, BlogTypes.Blog>,
  blogReviewsById : Map.Map<Text, BlogTypes.BlogReview>,
) {

  // ── Blog CRUD ─────────────────────────────────────────────────────────────

  public shared func createBlog(blog : BlogTypes.Blog) : async { #ok : Text; #err : Text } {
    switch (blogsById.get(blog.id)) {
      case (?_) { #err("Blog with this ID already exists") };
      case null {
        blogsById.add(blog.id, blog);
        #ok(blog.id)
      };
    }
  };

  public query func getBlogById(id : Text) : async ?BlogTypes.Blog {
    blogsById.get(id)
  };

  public query func getAllBlogs() : async [BlogTypes.Blog] {
    blogsById.values().toArray()
  };

  public query func getBlogsByAuthor(authorId : Text) : async [BlogTypes.Blog] {
    blogsById.values().filter(
      func(b : BlogTypes.Blog) : Bool { b.authorId == authorId }
    ).toArray()
  };

  public shared func updateBlog(
    id       : Text,
    title    : Text,
    location : Text,
    category : Text,
    content  : Text,
    status   : Text,
  ) : async { #ok : Text; #err : Text } {
    switch (blogsById.get(id)) {
      case null { #err("Blog not found") };
      case (?b) {
        blogsById.add(id, { b with title; location; category; content; status; updatedAt = Time.now() });
        #ok(id)
      };
    }
  };

  public shared func deleteBlog(id : Text) : async { #ok : Text; #err : Text } {
    switch (blogsById.get(id)) {
      case null { #err("Blog not found") };
      case (?_) {
        blogsById.remove(id);
        #ok(id)
      };
    }
  };

  // ── Blog Reviews ──────────────────────────────────────────────────────────

  public shared func addBlogReview(review : BlogTypes.BlogReview) : async { #ok : Text; #err : Text } {
    switch (blogReviewsById.get(review.id)) {
      case (?_) { #err("Review with this ID already exists") };
      case null {
        blogReviewsById.add(review.id, review);
        #ok(review.id)
      };
    }
  };

  public query func getBlogReviews(blogId : Text) : async [BlogTypes.BlogReview] {
    blogReviewsById.values().filter(
      func(r : BlogTypes.BlogReview) : Bool { r.blogId == blogId }
    ).toArray()
  };

  public query func getAllBlogReviews() : async [BlogTypes.BlogReview] {
    blogReviewsById.values().toArray()
  };

  public shared func deleteBlogReview(id : Text) : async { #ok : Text; #err : Text } {
    switch (blogReviewsById.get(id)) {
      case null { #err("Review not found") };
      case (?_) {
        blogReviewsById.remove(id);
        #ok(id)
      };
    }
  };

};
