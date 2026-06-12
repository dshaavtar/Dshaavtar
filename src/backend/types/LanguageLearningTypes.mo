module {

  // ── Language Course ──────────────────────────────────────────────────────

  public type LanguageCourse = {
    id              : Text;
    creatorPhone    : Text;
    title           : Text;
    languagePair    : Text;   // e.g. "en-es"
    description     : Text;
    lessons         : [Text]; // lesson IDs
    price           : Nat;    // 0 = free
    status          : Text;   // "pending" | "approved" | "rejected" | "draft"
    enrollmentCount : Nat;
    createdDate     : Int;
  };

  // ── Lesson ────────────────────────────────────────────────────────────────

  // vocabularyList entries: (word, translation, ipa, ancientTranslation, [examples])
  public type Lesson = {
    id             : Text;
    courseId       : Text;
    title          : Text;
    content        : Text;
    quizQuestion   : Text;
    quizChoices    : [Text];
    correctAnswer  : Nat;
    explanation    : Text;
    vocabularyList : [(Text, Text, Text, Text, [Text])];
    order          : Nat;
  };

  // ── User Enrollment ───────────────────────────────────────────────────────

  public type UserEnrollment = {
    id              : Text;
    userId          : Text;
    courseId        : Text;
    enrollmentDate  : Int;
    lastViewedDate  : Int;
    progressPercent : Nat;
    isCompleted     : Bool;
    completionDate  : Int;
  };

  // ── Lesson Progress ───────────────────────────────────────────────────────

  public type LessonProgress = {
    id               : Text;
    enrollmentId     : Text;
    lessonId         : Text;
    isViewed         : Bool;
    isQuizAttempted  : Bool;
    bestScore        : Nat;
    attemptCount     : Nat;
    completedDate    : Int;
  };

  // ── Saved Word ────────────────────────────────────────────────────────────

  public type SavedWord = {
    id                 : Text;
    userId             : Text;
    word               : Text;
    language           : Text;
    translation        : Text;
    ancientTranslation : Text;
    ipa                : Text;
    examples           : [Text];
    savedDate          : Int;
  };

  // ── Course Approval ───────────────────────────────────────────────────────

  public type CourseApproval = {
    id            : Text;
    courseId      : Text;
    submittedDate : Int;
    approvalDate  : Int;
    status        : Text;  // "pending" | "approved" | "rejected"
    adminNotes    : Text;
    approverId    : Text;
  };

  // ── Daily Lesson (AI-generated) ───────────────────────────────────────────

  // vocabulary entries: (word, translation)
  public type DailyLesson = {
    id            : Text;
    userId        : Text;
    languagePair  : Text;
    topic         : Text;
    difficulty    : Text;  // "beginner" | "intermediate" | "advanced"
    content       : Text;
    quizQuestion  : Text;
    quizChoices   : [Text];
    correctAnswer : Nat;
    vocabulary    : [(Text, Text)];
    generatedDate : Int;
    isCompleted   : Bool;
    completedDate : Int;
    streakDate    : Int;
  };

  // ── Word Definition (dictionary) ──────────────────────────────────────────

  // translations entries: (language, translation)
  public type WordDefinition = {
    id                 : Text;
    word               : Text;
    language           : Text;
    translations       : [(Text, Text)];
    ancientTranslation : Text;
    ipa                : Text;
    examples           : [Text];
  };

  // ── Lesson Like / Dislike ─────────────────────────────────────────────────

  public type LessonLike = {
    id        : Text;
    userId    : Text;
    lessonId  : Text;
    likeType  : Text;  // "like" | "dislike"
    timestamp : Int;
  };

  public type CourseLikeSummary = {
    courseId      : Text;
    totalLikes    : Nat;
    totalDislikes : Nat;
    likeRatio     : Nat;
  };
};
