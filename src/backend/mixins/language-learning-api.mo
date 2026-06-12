import LanguageLearningTypes "../types/LanguageLearningTypes";
import LanguageLearningService "../LanguageLearningService";
import Map "mo:core/Map";
import Time "mo:core/Time";
import List "mo:core/List";

module {

  // ─── Stores bundle ──────────────────────────────────────────────────────────
  //
  // Callers pass a record of all Map stores; this avoids a long positional
  // argument list and makes future store additions non-breaking.
  //
  public type LanguageLearningStores = {
    coursesStore        : Map.Map<Text, LanguageLearningTypes.LanguageCourse>;
    lessonsStore        : Map.Map<Text, LanguageLearningTypes.Lesson>;
    enrollmentsStore    : Map.Map<Text, LanguageLearningTypes.UserEnrollment>;
    lessonProgressStore : Map.Map<Text, LanguageLearningTypes.LessonProgress>;
    savedWordsStore     : Map.Map<Text, LanguageLearningTypes.SavedWord>;
    approvalsStore      : Map.Map<Text, LanguageLearningTypes.CourseApproval>;
    dailyLessonsStore   : Map.Map<Text, LanguageLearningTypes.DailyLesson>;
    wordDefsStore       : Map.Map<Text, LanguageLearningTypes.WordDefinition>;
  };

  // ─── Data Explorer row types ────────────────────────────────────────────────

  public type CourseRow = {
    id              : Text;
    title           : Text;
    languagePair    : Text;
    description     : Text;
    price           : Nat;
    status          : Text;
    enrollmentCount : Nat;
    createdDate     : Int;
  };

  public type LessonRow = {
    id       : Text;
    courseId : Text;
    title    : Text;
    content  : Text;
    order    : Nat;
  };

  public type EnrollmentRow = {
    id              : Text;
    userId          : Text;
    courseId        : Text;
    enrollmentDate  : Int;
    progressPercent : Nat;
    isCompleted     : Bool;
  };

  public type SavedWordRow = {
    id                 : Text;
    userId             : Text;
    word               : Text;
    language           : Text;
    translation        : Text;
    ancientTranslation : Text;
  };

  public type CourseApprovalRow = {
    id         : Text;
    courseId   : Text;
    status     : Text;
    adminNotes : Text;
  };

  public type WordDefinitionRow = {
    id                 : Text;
    word               : Text;
    language           : Text;
    ancientTranslation : Text;
    ipa                : Text;
  };

  public type DailyLessonRow = {
    id           : Text;
    userId       : Text;
    languagePair : Text;
    topic        : Text;
    difficulty   : Text;
    isCompleted  : Bool;
    streakDate   : Int;
  };

  // ─── Analytics type ─────────────────────────────────────────────────────────

  public type LanguageLearningAnalytics = {
    totalCourses       : Nat;
    approvedCourses    : Nat;
    pendingCourses     : Nat;
    totalEnrollments   : Nat;
    completedLessons   : Nat;
    totalSavedWords    : Nat;
    totalWordDefs      : Nat;
    totalDailyLessons  : Nat;
    completedDaily     : Nat;
    activeStreakUsers   : Nat;
  };

  // ─── Factory function ────────────────────────────────────────────────────────
  //
  // Takes the stores record and a pre-constructed service instance and returns
  // an object exposing Data Explorer queries plus admin approve/reject methods.

  public func LanguageLearningAPI(
    stores  : LanguageLearningStores,
    _service : LanguageLearningService.LanguageLearningService,
  ) : {
    // Data Explorer getters
    getLanguageCoursesForDataExplorer  : () -> [CourseRow];
    getLessonsForDataExplorer          : () -> [LessonRow];
    getEnrollmentsForDataExplorer      : () -> [EnrollmentRow];
    getSavedWordsForDataExplorer       : () -> [SavedWordRow];
    getCourseApprovalsForDataExplorer  : () -> [CourseApprovalRow];
    getWordDefinitionsForDataExplorer  : () -> [WordDefinitionRow];
    getDailyLessonsForDataExplorer     : () -> [DailyLessonRow];
    // Admin methods
    approveCourse                      : (courseId : Text, adminNotes : Text) -> { #ok : Text; #err : Text };
    rejectCourse                       : (courseId : Text, adminNotes : Text) -> { #ok : Text; #err : Text };
    getPendingApprovals                : () -> [CourseRow];
    getLanguageLearningAnalytics       : () -> LanguageLearningAnalytics;
  } {

    // ── Data Explorer: Courses ───────────────────────────────────────────────

    func getLanguageCoursesForDataExplorer() : [CourseRow] {
      let out = List.empty<CourseRow>();
      for ((_, c) in stores.coursesStore.entries()) {
        out.add({
          id              = c.id;
          title           = c.title;
          languagePair    = c.languagePair;
          description     = c.description;
          price           = c.price;
          status          = c.status;
          enrollmentCount = c.enrollmentCount;
          createdDate     = c.createdDate;
        });
      };
      out.toArray()
    };

    // ── Data Explorer: Lessons ───────────────────────────────────────────────

    func getLessonsForDataExplorer() : [LessonRow] {
      let out = List.empty<LessonRow>();
      for ((_, l) in stores.lessonsStore.entries()) {
        out.add({
          id       = l.id;
          courseId = l.courseId;
          title    = l.title;
          content  = l.content;
          order    = l.order;
        });
      };
      out.toArray()
    };

    // ── Data Explorer: Enrollments ───────────────────────────────────────────

    func getEnrollmentsForDataExplorer() : [EnrollmentRow] {
      let out = List.empty<EnrollmentRow>();
      for ((_, e) in stores.enrollmentsStore.entries()) {
        out.add({
          id              = e.id;
          userId          = e.userId;
          courseId        = e.courseId;
          enrollmentDate  = e.enrollmentDate;
          progressPercent = e.progressPercent;
          isCompleted     = e.isCompleted;
        });
      };
      out.toArray()
    };

    // ── Data Explorer: Saved Words ───────────────────────────────────────────

    func getSavedWordsForDataExplorer() : [SavedWordRow] {
      let out = List.empty<SavedWordRow>();
      for ((_, sw) in stores.savedWordsStore.entries()) {
        out.add({
          id                 = sw.id;
          userId             = sw.userId;
          word               = sw.word;
          language           = sw.language;
          translation        = sw.translation;
          ancientTranslation = sw.ancientTranslation;
        });
      };
      out.toArray()
    };

    // ── Data Explorer: Course Approvals ─────────────────────────────────────

    func getCourseApprovalsForDataExplorer() : [CourseApprovalRow] {
      let out = List.empty<CourseApprovalRow>();
      for ((_, a) in stores.approvalsStore.entries()) {
        out.add({
          id         = a.id;
          courseId   = a.courseId;
          status     = a.status;
          adminNotes = a.adminNotes;
        });
      };
      out.toArray()
    };

    // ── Data Explorer: Word Definitions ─────────────────────────────────────

    func getWordDefinitionsForDataExplorer() : [WordDefinitionRow] {
      let out = List.empty<WordDefinitionRow>();
      for ((_, wd) in stores.wordDefsStore.entries()) {
        out.add({
          id                 = wd.id;
          word               = wd.word;
          language           = wd.language;
          ancientTranslation = wd.ancientTranslation;
          ipa                = wd.ipa;
        });
      };
      out.toArray()
    };

    // ── Data Explorer: Daily Lessons ─────────────────────────────────────────

    func getDailyLessonsForDataExplorer() : [DailyLessonRow] {
      let out = List.empty<DailyLessonRow>();
      for ((_, dl) in stores.dailyLessonsStore.entries()) {
        out.add({
          id           = dl.id;
          userId       = dl.userId;
          languagePair = dl.languagePair;
          topic        = dl.topic;
          difficulty   = dl.difficulty;
          isCompleted  = dl.isCompleted;
          streakDate   = dl.streakDate;
        });
      };
      out.toArray()
    };

    // ── Admin: Approve Course ────────────────────────────────────────────────

    func approveCourse(courseId : Text, adminNotes : Text) : { #ok : Text; #err : Text } {
      switch (stores.coursesStore.get(courseId)) {
        case null  { #err "course not found" };
        case (?c) {
          // update course status to approved
          stores.coursesStore.add(courseId, { c with status = "approved" });
          // upsert approval record
          let approvalId = "approval-" # courseId;
          let now = Time.now();
          let existing = stores.approvalsStore.get(approvalId);
          switch (existing) {
            case null {
              stores.approvalsStore.add(approvalId, {
                id            = approvalId;
                courseId;
                submittedDate = now;
                approvalDate  = now;
                status        = "approved";
                adminNotes;
                approverId    = "admin";
              });
            };
            case (?a) {
              stores.approvalsStore.add(approvalId, {
                a with
                status       = "approved";
                adminNotes;
                approvalDate = now;
              });
            };
          };
          #ok courseId
        };
      }
    };

    // ── Admin: Reject Course ─────────────────────────────────────────────────

    func rejectCourse(courseId : Text, adminNotes : Text) : { #ok : Text; #err : Text } {
      switch (stores.coursesStore.get(courseId)) {
        case null  { #err "course not found" };
        case (?c) {
          stores.coursesStore.add(courseId, { c with status = "rejected" });
          let approvalId = "approval-" # courseId;
          let now = Time.now();
          let existing = stores.approvalsStore.get(approvalId);
          switch (existing) {
            case null {
              stores.approvalsStore.add(approvalId, {
                id            = approvalId;
                courseId;
                submittedDate = now;
                approvalDate  = now;
                status        = "rejected";
                adminNotes;
                approverId    = "admin";
              });
            };
            case (?a) {
              stores.approvalsStore.add(approvalId, {
                a with
                status       = "rejected";
                adminNotes;
                approvalDate = now;
              });
            };
          };
          #ok courseId
        };
      }
    };

    // ── Admin: Get Pending Approvals ──────────────────────────────────────────

    func getPendingApprovals() : [CourseRow] {
      let out = List.empty<CourseRow>();
      for ((_, c) in stores.coursesStore.entries()) {
        if (c.status == "pending") {
          out.add({
            id              = c.id;
            title           = c.title;
            languagePair    = c.languagePair;
            description     = c.description;
            price           = c.price;
            status          = c.status;
            enrollmentCount = c.enrollmentCount;
            createdDate     = c.createdDate;
          });
        };
      };
      out.toArray()
    };

    // ── Analytics ────────────────────────────────────────────────────────────

    func getLanguageLearningAnalytics() : LanguageLearningAnalytics {
      var approvedCourses   = 0;
      var pendingCourses    = 0;
      for ((_, c) in stores.coursesStore.entries()) {
        if (c.status == "approved")  { approvedCourses  += 1 };
        if (c.status == "pending")   { pendingCourses   += 1 };
      };

      var completedEnrollments = 0;
      for ((_, e) in stores.enrollmentsStore.entries()) {
        if (e.isCompleted) { completedEnrollments += 1 };
      };

      var completedDaily = 0;
      let streakSet      = Map.empty<Text, Bool>();
      for ((_, dl) in stores.dailyLessonsStore.entries()) {
        if (dl.isCompleted) {
          completedDaily += 1;
          streakSet.add(dl.userId, true);
        };
      };

      {
        totalCourses      = stores.coursesStore.size();
        approvedCourses;
        pendingCourses;
        totalEnrollments  = stores.enrollmentsStore.size();
        completedLessons  = completedEnrollments;
        totalSavedWords   = stores.savedWordsStore.size();
        totalWordDefs     = stores.wordDefsStore.size();
        totalDailyLessons = stores.dailyLessonsStore.size();
        completedDaily;
        activeStreakUsers  = streakSet.size();
      }
    };

    // ── Return object ────────────────────────────────────────────────────────

    {
      getLanguageCoursesForDataExplorer;
      getLessonsForDataExplorer;
      getEnrollmentsForDataExplorer;
      getSavedWordsForDataExplorer;
      getCourseApprovalsForDataExplorer;
      getWordDefinitionsForDataExplorer;
      getDailyLessonsForDataExplorer;
      approveCourse;
      rejectCourse;
      getPendingApprovals;
      getLanguageLearningAnalytics;
    }
  };

};
