import LanguageLearningTypes "types/LanguageLearningTypes";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Debug "mo:core/Debug";

module {

  // ─── Result helpers ────────────────────────────────────────────────────────

  public type Result<T> = {
    #ok  : T;
    #err : { errorDetail : Text };
  };

  // ─── Service class ─────────────────────────────────────────────────────────

  public class LanguageLearningService(
    coursesStore        : Map.Map<Text, LanguageLearningTypes.LanguageCourse>,
    lessonsStore        : Map.Map<Text, LanguageLearningTypes.Lesson>,
    enrollmentsStore    : Map.Map<Text, LanguageLearningTypes.UserEnrollment>,
    lessonProgressStore : Map.Map<Text, LanguageLearningTypes.LessonProgress>,
    savedWordsStore     : Map.Map<Text, LanguageLearningTypes.SavedWord>,
    approvalsStore      : Map.Map<Text, LanguageLearningTypes.CourseApproval>,
    dailyLessonsStore   : Map.Map<Text, LanguageLearningTypes.DailyLesson>,
    wordDefsStore       : Map.Map<Text, LanguageLearningTypes.WordDefinition>,
    lessonLikesStore    : Map.Map<Text, LanguageLearningTypes.LessonLike>,
  ) {

    // ── ID generators ────────────────────────────────────────────────────────

    func newId(prefix : Text) : Text {
      prefix # "-" # Time.now().toText()
    };

    // ═══════════════════════════════════════════════════════════════════════
    //  COURSES
    // ═══════════════════════════════════════════════════════════════════════

    public func addCourse(
      creatorPhone : Text,
      title        : Text,
      languagePair : Text,
      description  : Text,
      price        : Nat,
    ) : Result<Text> {
      if (title.size() == 0) {
        return #err { errorDetail = "title is required" };
      };
      if (languagePair.size() == 0) {
        return #err { errorDetail = "languagePair is required" };
      };
      let id = newId("course");
      let course : LanguageLearningTypes.LanguageCourse = {
        id;
        creatorPhone;
        title;
        languagePair;
        description;
        lessons         = [];
        price;
        status          = "pending";
        enrollmentCount = 0;
        createdDate     = Time.now();
      };
      coursesStore.add(id, course);
      #ok id
    };

    public func getCourse(id : Text) : Result<LanguageLearningTypes.LanguageCourse> {
      switch (coursesStore.get(id)) {
        case null  #err { errorDetail = "course not found" };
        case (?c)  #ok c;
      }
    };

    public func searchCourses(searchTerm : Text, languagePair : Text) : [LanguageLearningTypes.LanguageCourse] {
      let q = searchTerm.toLower();
      let result = List.empty<LanguageLearningTypes.LanguageCourse>();
      for ((_, c) in coursesStore.entries()) {
        if (c.status != "approved") {}  // skip non-approved
        else if (
          (q.size() == 0 or c.title.toLower().contains(#text q) or c.description.toLower().contains(#text q))
          and (languagePair.size() == 0 or c.languagePair == languagePair)
        ) {
          result.add(c);
        };
      };
      result.toArray()
    };

    public func updateCourse(
      id      : Text,
      updated : LanguageLearningTypes.LanguageCourse,
    ) : Result<()> {
      switch (coursesStore.get(id)) {
        case null  #err { errorDetail = "course not found" };
        case (?_) {
          coursesStore.add(id, { updated with id });
          #ok ()
        };
      }
    };

    public func deleteCourse(id : Text) : Result<()> {
      switch (coursesStore.get(id)) {
        case null  #err { errorDetail = "course not found" };
        case (?_) {
          coursesStore.remove(id);
          #ok ()
        };
      }
    };

    // ═══════════════════════════════════════════════════════════════════════
    //  LESSONS
    // ═══════════════════════════════════════════════════════════════════════

    public func addLesson(
      courseId       : Text,
      title          : Text,
      content        : Text,
      quizQuestion   : Text,
      quizChoices    : [Text],
      correctAnswer  : Nat,
      explanation    : Text,
      vocabularyList : [(Text, Text, Text, Text, [Text])],
      order          : Nat,
    ) : Result<Text> {
      switch (coursesStore.get(courseId)) {
        case null  #err { errorDetail = "course not found" };
        case (?course) {
          let id = newId("lesson");
          let lesson : LanguageLearningTypes.Lesson = {
            id;
            courseId;
            title;
            content;
            quizQuestion;
            quizChoices;
            correctAnswer;
            explanation;
            vocabularyList;
            order;
          };
          lessonsStore.add(id, lesson);
          // append lesson id to course
          let updatedLessons = course.lessons.concat([id]);
          coursesStore.add(courseId, { course with lessons = updatedLessons });
          #ok id
        };
      }
    };

    public func getLessonsByCourse(courseId : Text) : [LanguageLearningTypes.Lesson] {
      let result = List.empty<LanguageLearningTypes.Lesson>();
      for ((_, l) in lessonsStore.entries()) {
        if (l.courseId == courseId) result.add(l);
      };
      // sort by order ascending
      let arr = result.toArray();
      arr.sort(func(a : LanguageLearningTypes.Lesson, b : LanguageLearningTypes.Lesson) : Order.Order =
        Nat.compare(a.order, b.order)
      )
    };

    // ═══════════════════════════════════════════════════════════════════════
    //  ENROLLMENTS
    // ═══════════════════════════════════════════════════════════════════════

    public func enrollUser(
      userId   : Text,
      courseId : Text,
    ) : Result<Text> {
      switch (coursesStore.get(courseId)) {
        case null  #err { errorDetail = "course not found" };
        case (?course) {
          // check for existing enrollment
          for ((_, e) in enrollmentsStore.entries()) {
            if (e.userId == userId and e.courseId == courseId) {
              return #err { errorDetail = "already enrolled" };
            };
          };
          let id = newId("enroll");
          let now = Time.now();
          let enrollment : LanguageLearningTypes.UserEnrollment = {
            id;
            userId;
            courseId;
            enrollmentDate  = now;
            lastViewedDate  = now;
            progressPercent = 0;
            isCompleted     = false;
            completionDate  = 0;
          };
          enrollmentsStore.add(id, enrollment);
          // bump enrollment count
          coursesStore.add(courseId, { course with enrollmentCount = course.enrollmentCount + 1 });
          #ok id
        };
      }
    };

    public func getUserEnrollments(userId : Text) : [LanguageLearningTypes.UserEnrollment] {
      let result = List.empty<LanguageLearningTypes.UserEnrollment>();
      for ((_, e) in enrollmentsStore.entries()) {
        if (e.userId == userId) result.add(e);
      };
      result.toArray()
    };

    // ═══════════════════════════════════════════════════════════════════════
    //  LESSON PROGRESS
    // ═══════════════════════════════════════════════════════════════════════

    public func updateLessonProgress(
      enrollmentId    : Text,
      lessonId        : Text,
      isViewed        : Bool,
      isQuizAttempted : Bool,
      score           : Nat,
    ) : Result<Text> {
      // upsert: find existing progress record or create new
      var existingId : ?Text = null;
      for ((pid, p) in lessonProgressStore.entries()) {
        if (p.enrollmentId == enrollmentId and p.lessonId == lessonId) {
          existingId := ?pid;
        };
      };
      let now = Time.now();
      switch (existingId) {
        case (?pid) {
          switch (lessonProgressStore.get(pid)) {
            case null  #err { errorDetail = "progress record not found" };
            case (?existing) {
              let bestScore = if (score > existing.bestScore) score else existing.bestScore;
              lessonProgressStore.add(pid, {
                existing with
                isViewed        = existing.isViewed or isViewed;
                isQuizAttempted = existing.isQuizAttempted or isQuizAttempted;
                bestScore;
                attemptCount    = existing.attemptCount + 1;
                completedDate   = if (isViewed and isQuizAttempted) now else existing.completedDate;
              });
              #ok pid
            };
          }
        };
        case null {
          let id = newId("progress");
          let progress : LanguageLearningTypes.LessonProgress = {
            id;
            enrollmentId;
            lessonId;
            isViewed;
            isQuizAttempted;
            bestScore       = score;
            attemptCount    = 1;
            completedDate   = if (isViewed and isQuizAttempted) now else 0;
          };
          lessonProgressStore.add(id, progress);
          #ok id
        };
      }
    };

    public func getLessonProgress(
      enrollmentId : Text,
      lessonId     : Text,
    ) : ?LanguageLearningTypes.LessonProgress {
      for ((_, p) in lessonProgressStore.entries()) {
        if (p.enrollmentId == enrollmentId and p.lessonId == lessonId) {
          return ?p;
        };
      };
      null
    };

    // ═══════════════════════════════════════════════════════════════════════
    //  SAVED WORDS
    // ═══════════════════════════════════════════════════════════════════════

    public func saveWord(
      userId             : Text,
      word               : Text,
      language           : Text,
      translation        : Text,
      ancientTranslation : Text,
      ipa                : Text,
      examples           : [Text],
    ) : Result<Text> {
      if (word.size() == 0) {
        return #err { errorDetail = "word is required" };
      };
      // avoid duplicate saved words per user
      for ((_, sw) in savedWordsStore.entries()) {
        if (sw.userId == userId and sw.word == word and sw.language == language) {
          return #err { errorDetail = "word already saved" };
        };
      };
      let id = newId("word");
      let saved : LanguageLearningTypes.SavedWord = {
        id;
        userId;
        word;
        language;
        translation;
        ancientTranslation;
        ipa;
        examples;
        savedDate = Time.now();
      };
      savedWordsStore.add(id, saved);
      #ok id
    };

    public func getSavedWords(userId : Text) : [LanguageLearningTypes.SavedWord] {
      let result = List.empty<LanguageLearningTypes.SavedWord>();
      for ((_, sw) in savedWordsStore.entries()) {
        if (sw.userId == userId) result.add(sw);
      };
      result.toArray()
    };

    // ═══════════════════════════════════════════════════════════════════════
    //  WORD DEFINITIONS
    // ═══════════════════════════════════════════════════════════════════════

    public func searchWordDefinition(
      word     : Text,
      language : Text,
    ) : ?LanguageLearningTypes.WordDefinition {
      let q = word.toLower();
      for ((_, wd) in wordDefsStore.entries()) {
        if (wd.word.toLower() == q and (language.size() == 0 or wd.language == language)) {
          return ?wd;
        };
      };
      null
    };

    // seed helper — called from actor init to populate default definitions
    public func seedWordDefinitions(defs : [LanguageLearningTypes.WordDefinition]) : () {
      for (wd in defs.vals()) {
        if (wordDefsStore.get(wd.id) == null) {
          wordDefsStore.add(wd.id, wd);
        };
      };
    };

    // ═══════════════════════════════════════════════════════════════════════
    //  COURSE APPROVALS
    // ═══════════════════════════════════════════════════════════════════════

    public func addCourseApproval(courseId : Text) : Result<Text> {
      switch (coursesStore.get(courseId)) {
        case null  #err { errorDetail = "course not found" };
        case (?_) {
          let id = newId("approval");
          let approval : LanguageLearningTypes.CourseApproval = {
            id;
            courseId;
            submittedDate = Time.now();
            approvalDate  = 0;
            status        = "pending";
            adminNotes    = "";
            approverId    = "";
          };
          approvalsStore.add(id, approval);
          #ok id
        };
      }
    };

    public func updateCourseApproval(
      approvalId : Text,
      status     : Text,
      adminNotes : Text,
      approverId : Text,
    ) : Result<()> {
      switch (approvalsStore.get(approvalId)) {
        case null  #err { errorDetail = "approval not found" };
        case (?approval) {
          let now = Time.now();
          approvalsStore.add(approvalId, {
            approval with
            status;
            adminNotes;
            approverId;
            approvalDate = now;
          });
          // propagate status to the course
          switch (coursesStore.get(approval.courseId)) {
            case null  ();
            case (?course) {
              coursesStore.add(approval.courseId, { course with status });
            };
          };
          #ok ()
        };
      }
    };

    public func getPendingApprovals() : [LanguageLearningTypes.CourseApproval] {
      let result = List.empty<LanguageLearningTypes.CourseApproval>();
      for ((_, a) in approvalsStore.entries()) {
        if (a.status == "pending") result.add(a);
      };
      result.toArray()
    };

    // ═══════════════════════════════════════════════════════════════════════
    //  DAILY LESSONS (AI-generated on-demand)
    // ═══════════════════════════════════════════════════════════════════════

    public func generateDailyLesson(
      userId       : Text,
      languagePair : Text,
      topic        : Text,
      difficulty   : Text,
      content      : Text,
      quizQuestion : Text,
      quizChoices  : [Text],
      correctAnswer: Nat,
      vocabulary   : [(Text, Text)],
    ) : Result<Text> {
      if (userId.size() == 0) {
        return #err { errorDetail = "userId is required" };
      };
      if (languagePair.size() == 0) {
        return #err { errorDetail = "languagePair is required" };
      };
      let id = newId("daily");
      let now = Time.now();
      let lesson : LanguageLearningTypes.DailyLesson = {
        id;
        userId;
        languagePair;
        topic;
        difficulty;
        content;
        quizQuestion;
        quizChoices;
        correctAnswer;
        vocabulary;
        generatedDate = now;
        isCompleted   = false;
        completedDate = 0;
        streakDate    = now;
      };
      dailyLessonsStore.add(id, lesson);
      #ok id
    };

    public func getDailyLesson(
      userId       : Text,
      languagePair : Text,
    ) : ?LanguageLearningTypes.DailyLesson {
      // return most recent lesson for user + languagePair
      var best : ?LanguageLearningTypes.DailyLesson = null;
      for ((_, dl) in dailyLessonsStore.entries()) {
        if (dl.userId == userId and dl.languagePair == languagePair) {
          switch (best) {
            case null  { best := ?dl };
            case (?b)  {
              if (dl.generatedDate > b.generatedDate) best := ?dl;
            };
          };
        };
      };
      best
    };

    public func markLessonComplete(
      dailyLessonId : Text,
    ) : Result<()> {
      switch (dailyLessonsStore.get(dailyLessonId)) {
        case null  #err { errorDetail = "daily lesson not found" };
        case (?dl) {
          dailyLessonsStore.add(dailyLessonId, {
            dl with
            isCompleted   = true;
            completedDate = Time.now();
          });
          #ok ()
        };
      }
    };

    // ═══════════════════════════════════════════════════════════════════════
    //  STREAK HELPERS
    // ═══════════════════════════════════════════════════════════════════════

    /// Count consecutive daily streaks for a user across all language pairs.
    public func getDailyStreak(userId : Text) : Nat {
      let dayNs : Int = 86_400_000_000_000; // 1 day in nanoseconds
      // collect distinct completed day boundaries for user
      let dates = List.empty<Int>();
      for ((_, dl) in dailyLessonsStore.entries()) {
        if (dl.userId == userId and dl.isCompleted) {
          let day = dl.completedDate - (dl.completedDate % dayNs);
          var found = false;
          for (d in dates.toArray().vals()) {
            if (d == day) found := true;
          };
          if (not found) dates.add(day);
        };
      };
      // sort descending and count consecutive days
      let arr = dates.toArray();
      let sorted = arr.sort(func(a : Int, b : Int) : Order.Order = Int.compare(b, a));
      let today = Time.now() - (Time.now() % dayNs);
      var streak : Nat = 0;
      var expected = today;
      for (d in sorted.vals()) {
        if (d == expected) {
          streak += 1;
          expected -= dayNs;
        };
      };
      streak
    };

    // ── Lesson Likes / Dislikes ────────────────────────────────────────────────

    public func likeLesson(
      userId   : Text,
      lessonId : Text,
    ) : Result<LanguageLearningTypes.LessonLike> {
      let key = userId # "-" # lessonId;
      let now = Time.now();
      let id  = "ll-" # lessonId # "-" # userId # "-" # now.toText();
      let like : LanguageLearningTypes.LessonLike = {
        id;
        userId;
        lessonId;
        likeType  = "like";
        timestamp = now;
      };
      lessonLikesStore.add(key, like);
      #ok like
    };

    public func dislikeLesson(
      userId   : Text,
      lessonId : Text,
    ) : Result<LanguageLearningTypes.LessonLike> {
      let key = userId # "-" # lessonId;
      let now = Time.now();
      let id  = "ll-" # lessonId # "-" # userId # "-" # now.toText();
      let like : LanguageLearningTypes.LessonLike = {
        id;
        userId;
        lessonId;
        likeType  = "dislike";
        timestamp = now;
      };
      lessonLikesStore.add(key, like);
      #ok like
    };

    public func removeLessonLike(
      userId   : Text,
      lessonId : Text,
    ) : Bool {
      let key = userId # "-" # lessonId;
      switch (lessonLikesStore.get(key)) {
        case null false;
        case (?_) {
          lessonLikesStore.remove(key);
          true
        };
      }
    };

    public func getLessonLikeCounts(lessonId : Text) : { likes : Nat; dislikes : Nat } {
      var likes    : Nat = 0;
      var dislikes : Nat = 0;
      for ((_, entry) in lessonLikesStore.entries()) {
        if (entry.lessonId == lessonId) {
          if (entry.likeType == "like") { likes += 1 } else { dislikes += 1 };
        };
      };
      { likes; dislikes }
    };

    public func getUserLessonLike(userId : Text, lessonId : Text) : ?LanguageLearningTypes.LessonLike {
      let key = userId # "-" # lessonId;
      lessonLikesStore.get(key)
    };

    public func getCourseLikeSummary(courseId : Text) : LanguageLearningTypes.CourseLikeSummary {
      // Collect all lessons for this course, then aggregate likes/dislikes
      var totalLikes    : Nat = 0;
      var totalDislikes : Nat = 0;
      // Build set of lesson IDs belonging to this course
      let courseLessonIds = List.empty<Text>();
      for ((_, lesson) in lessonsStore.entries()) {
        if (lesson.courseId == courseId) {
          courseLessonIds.add(lesson.id);
        };
      };
      let lessonIdArr = courseLessonIds.toArray();
      for ((_, entry) in lessonLikesStore.entries()) {
        let inCourse = lessonIdArr.find<Text>(func(lid) { lid == entry.lessonId }) != null;
        if (inCourse) {
          if (entry.likeType == "like") { totalLikes += 1 } else { totalDislikes += 1 };
        };
      };
      let total = totalLikes + totalDislikes;
      let likeRatio : Nat = if (total == 0) 0 else totalLikes * 100 / total;
      { courseId; totalLikes; totalDislikes; likeRatio }
    };

  };  // end class LanguageLearningService
};

