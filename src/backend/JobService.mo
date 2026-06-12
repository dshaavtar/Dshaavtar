import Types "Types";
import Utils "Utils";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";

module {
  // 7 days in nanoseconds
  let JOB_DURATION_NS : Int = 604_800_000_000_000;

  // 24 hours in nanoseconds — adhoc jobs expire after 24h
  let ADHOC_JOB_DURATION_NS : Int = 86_400_000_000_000;

  /// Full list of adhoc job categories (70+)
  public let ADHOC_JOB_CATEGORIES : [Text] = [
    "Daily Wages", "Construction", "Healthcare", "Nursing", "Physiotherapy", "Tutoring", "Teaching",
    "Home Tutoring", "Coaching", "Delivery", "Courier", "Last Mile Delivery",
    "Logistics", "Warehouse", "Packing", "Cleaning", "Housekeeping",
    "Laundry", "Cooking", "Chef", "Catering", "Security Guard",
    "Watchman", "Driver", "Cab Driver", "Auto Driver", "Electrician",
    "Plumber", "Carpenter", "Painter", "Mason", "Welder",
    "Tailor", "Stitching", "Embroidery", "Photography", "Videography",
    "Video Editing", "Graphic Design", "Web Design", "Data Entry", "Typing",
    "Office Work", "Receptionist", "Customer Support", "Telecalling", "Accounting",
    "GST Filing", "Tally", "Digital Marketing", "Social Media", "Content Writing",
    "Translation", "Event Management", "Event Staff", "Promotions", "Exhibition",
    "Babysitting", "Elderly Care", "Disabled Care", "Pet Care", "Gardening",
    "Farming", "Agriculture", "Machine Operator", "Factory Worker", "Quality Control",
    "Technician", "AC Repair", "Refrigerator Repair", "Mobile Repair", "Computer Repair",
    "Salesman", "Retail", "Store Assistant", "Cashier", "Tour Guide",
    "Travel Assistant", "Research", "Survey", "Field Work", "Blood Donation",
    "Volunteer", "NGO Work", "Education", "Moving", "Security", "Event Helper",
    "IT Support", "Others"
  ];

  public class JobService(jobs : Map.Map<Text, Types.Job>) {

    var nextId : Nat = 0;

    func genId() : Text {
      nextId += 1;
      "job_" # Utils.generateId("j") # "_" # nextId.toText()
    };

    public func postJob(
      posterId : Text,
      title : Text,
      description : Text,
      category : Text,
      salaryMin : Float,
      salaryMax : Float,
      location : Types.Location,
    ) : Types.Result<Types.Job, Types.ApiError> {
      let now = Time.now();
      let job : Types.Job = {
        id = genId();
        posterId;
        title;
        description;
        category;
        salaryMin;
        salaryMax;
        location;
        publishDate = now;
        endDate = now + JOB_DURATION_NS;
        isOpen = true;
        leads = [];
        jobType        = #permanent;
        pricePerDay    = null;
        educationLevel = null;
        expiresAt      = null;
        isAdhoc        = false;
        contactPhone   = null;
      };
      jobs.add(job.id, job);
      #ok(job)
    };

    /// Create an adhoc job — auto-expires after 24h.
    public func createAdhocJob(
      title          : Text,
      category       : Text,
      pricePerDay    : Float,
      educationLevel : Text,
      location       : Types.Location,
      phone          : Text,
      description    : Text,
      posterId       : Text,
      jobType        : Types.JobType,
    ) : Types.Result<Types.Job, Types.ApiError> {
      // Validate category
      let validCategory = ADHOC_JOB_CATEGORIES.find(func(c : Text) : Bool {
        c.toLower() == category.toLower()
      });
      let resolvedCategory = switch (validCategory) {
        case (?c) c;
        case null {
          // Accept the category even if not in the list — just use as-is
          category
        };
      };
      let now = Time.now();
      let expiry = now + ADHOC_JOB_DURATION_NS;
      let job : Types.Job = {
        id = genId();
        posterId;
        title;
        description;
        category       = resolvedCategory;
        salaryMin      = pricePerDay;
        salaryMax      = pricePerDay;
        location;
        publishDate    = now;
        endDate        = expiry;
        isOpen         = true;
        leads          = [];
        jobType;
        pricePerDay    = ?pricePerDay;
        educationLevel = ?educationLevel;
        expiresAt      = ?expiry;
        isAdhoc        = true;
        contactPhone   = ?phone;
      };
      jobs.add(job.id, job);
      #ok(job)
    };

    /// List active adhoc jobs (posted within last 24h, not expired).
    /// Optionally filter by category, min/max price, and location text match.
    public func listAdhocJobs(
      categoryFilter : ?Text,
      minPrice       : ?Float,
      maxPrice       : ?Float,
      location       : ?Text,
    ) : [Types.Job] {
      let now = Time.now();
      let results = List.empty<Types.Job>();
      for ((_, job) in jobs.entries()) {
        if (job.isAdhoc and job.isOpen) {
          // Check not expired
          let notExpired = switch (job.expiresAt) {
            case (?exp) exp > now;
            case null   job.endDate > now;
          };
          if (notExpired) {
            let catMatch = switch (categoryFilter) {
              case null true;
              case (?c) job.category.toLower() == c.toLower();
            };
            let priceMatch = switch (job.pricePerDay) {
              case null true;
              case (?ppd) {
                let minOk = switch (minPrice) { case null true; case (?mn) ppd >= mn };
                let maxOk = switch (maxPrice) { case null true; case (?mx) ppd <= mx };
                minOk and maxOk
              };
            };
            let locMatch = switch (location) {
              case null true;
              case (?loc) {
                let lLoc = loc.toLower();
                job.location.address.toLower().contains(#text lLoc)
              };
            };
            if (catMatch and priceMatch and locMatch) {
              results.add(job);
            };
          };
        };
      };
      results.toArray()
    };

    /// Stats for adhoc jobs: total active count + breakdown by category.
    public func getAdhocJobStats() : { totalActive : Nat; categoryBreakdown : [(Text, Nat)] } {
      let now = Time.now();
      let categoryMap = Map.empty<Text, Nat>();
      var total : Nat = 0;
      for ((_, job) in jobs.entries()) {
        if (job.isAdhoc and job.isOpen) {
          let notExpired = switch (job.expiresAt) {
            case (?exp) exp > now;
            case null   job.endDate > now;
          };
          if (notExpired) {
            total += 1;
            let prev = switch (categoryMap.get(job.category)) { case (?v) v; case null 0 };
            categoryMap.add(job.category, prev + 1);
          };
        };
      };
      { totalActive = total; categoryBreakdown = categoryMap.toArray() }
    };

    public func getJobById(id : Text) : Types.Result<Types.Job, Types.ApiError> {
      switch (jobs.get(id)) {
        case (?j) #ok(j);
        case null #err(#notFound);
      }
    };

    public func searchJobs(
      keyword : ?Text,
      category : ?Text,
      location : ?Types.Location,
      radiusKm : Float,
    ) : [Types.Job] {
      let now = Time.now();
      let results = List.empty<Types.Job>();
      for ((_, job) in jobs.entries()) {
        if (job.isOpen and job.endDate > now) {
          let kwMatch = switch (keyword) {
            case null true;
            case (?kw) {
              let lkw = kw.toLower();
              job.title.toLower().contains(#text lkw) or job.description.toLower().contains(#text lkw)
            };
          };
          let catMatch = switch (category) {
            case null true;
            case (?c) job.category.toLower() == c.toLower();
          };
          let locMatch = switch (location) {
            case null true;
            case (?loc) {
              Utils.haversineDistance(loc.lat, loc.lng, job.location.lat, job.location.lng) <= radiusKm
            };
          };
          if (kwMatch and catMatch and locMatch) {
            results.add(job);
          };
        };
      };
      results.toArray()
    };

    public func requestJobContact(
      jobId : Text,
      requesterId : Text,
      requesterName : Text,
      requesterPhone : Text,
    ) : Types.Result<Text, Types.ApiError> {
      switch (jobs.get(jobId)) {
        case null #err(#notFound);
        case (?job) {
          // Check if already requested
          let existing = job.leads.find(func(l : Types.ContactRequest) : Bool { l.requesterId == requesterId });
          switch (existing) {
            case (?_) #err(#alreadyExists);
            case null {
              let req : Types.ContactRequest = {
                requesterId;
                requesterPhone;
                requesterName;
                status = #pending;
                requestedAt = Time.now();
              };
              let updatedJob = { job with leads = job.leads.concat([req]) };
              jobs.add(jobId, updatedJob);
              #ok("Contact request sent to job poster for approval")
            };
          }
        };
      }
    };

    public func approveJobContactShare(
      jobId : Text,
      leadUserId : Text,
    ) : Types.Result<Text, Types.ApiError> {
      switch (jobs.get(jobId)) {
        case null #err(#notFound);
        case (?job) {
          let leadExists = job.leads.find(func(l : Types.ContactRequest) : Bool { l.requesterId == leadUserId });
          switch (leadExists) {
            case null #err(#notFound);
            case (?lead) {
              let updatedLeads = job.leads.map(
                func(l : Types.ContactRequest) : Types.ContactRequest {
                  if (l.requesterId == leadUserId) { { l with status = #approved } } else l
                }
              );
              let updatedJob = { job with leads = updatedLeads };
              jobs.add(jobId, updatedJob);
              // Return the requester phone so the caller can send a notification
              #ok(lead.requesterPhone)
            };
          }
        };
      }
    };

    public func getAllJobs(isOpen : ?Bool) : [Types.Job] {
      let results = List.empty<Types.Job>();
      for ((_, job) in jobs.entries()) {
        let match = switch (isOpen) {
          case null true;
          case (?open) job.isOpen == open;
        };
        if (match) results.add(job);
      };
      results.toArray()
    };

    public func closeExpiredJobs() : Nat {
      let now = Time.now();
      var count = 0;
      for ((id, job) in jobs.entries()) {
        if (job.isOpen and job.endDate <= now) {
          jobs.add(id, { job with isOpen = false });
          count += 1;
        };
      };
      count
    };

    public func getJobsLookingFor(category : ?Text) : [Types.Job] {
      let now = Time.now();
      let results = List.empty<Types.Job>();
      for ((_, job) in jobs.entries()) {
        if (job.isOpen and job.endDate > now) {
          let catMatch = switch (category) {
            case null true;
            case (?c) job.category.toLower() == c.toLower();
          };
          if (catMatch) results.add(job);
        };
      };
      results.toArray()
    };
  };
};
