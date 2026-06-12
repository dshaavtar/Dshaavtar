import { d_ as useParams, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-Dx8tJeYi.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { u as useLanguageLearning, a as useLessonLikes } from "./useLanguageLearning-CqRAiv3Y.js";
import { a as ThumbsUp, T as ThumbsDown } from "./thumbs-up-CgRsiN0l.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./createLucideIcon-BGWdtUCJ.js";
const CURRENT_USER_ID = "current-user";
function LessonCard({
  lesson,
  index
}) {
  const {
    likes,
    dislikes,
    userLike,
    handleLike,
    handleDislike,
    handleRemove,
    isMutating
  } = useLessonLikes(lesson.id, CURRENT_USER_ID);
  function onLike() {
    if (userLike === true) handleRemove();
    else handleLike();
  }
  function onDislike() {
    if (userLike === false) handleRemove();
    else handleDislike();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/lesson/$lessonId",
      params: { lessonId: lesson.id },
      className: "block",
      "data-ocid": `course-detail.lesson.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 rounded-lg border border-border bg-background hover:bg-muted/40 transition-colors group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center", children: index + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground truncate", children: lesson.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 ml-4 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "aria-label": "Like this lesson",
              onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!isMutating) onLike();
              },
              disabled: isMutating,
              className: `flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors ${userLike === true ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"}`,
              "data-ocid": `course-detail.lesson.like.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: likes })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "aria-label": "Dislike this lesson",
              onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!isMutating) onDislike();
              },
              disabled: isMutating,
              className: `flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors ${userLike === false ? "bg-destructive text-destructive-foreground" : "text-muted-foreground hover:text-destructive"}`,
              "data-ocid": `course-detail.lesson.dislike.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsDown, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: dislikes })
              ]
            }
          )
        ] })
      ] })
    }
  );
}
function CourseDetailPage() {
  const { courseId } = useParams({ strict: false });
  const {
    getCourse,
    getUserEnrollments,
    enrollUser,
    getLessonsForDataExplorer
  } = useLanguageLearning();
  const [course, setCourse] = reactExports.useState(null);
  const [enrollments, setEnrollments] = reactExports.useState([]);
  const [allLessons, setAllLessons] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [enrolling, setEnrolling] = reactExports.useState(false);
  const [enrollMsg, setEnrollMsg] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!courseId) return;
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const [c, e, lessons] = await Promise.all([
          getCourse(courseId),
          getUserEnrollments(CURRENT_USER_ID),
          getLessonsForDataExplorer()
        ]);
        if (!cancelled) {
          setCourse(c);
          setEnrollments(e);
          setAllLessons(lessons);
        }
      } catch (err) {
        if (!cancelled)
          setError(
            err instanceof Error ? err.message : "Failed to load course"
          );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [courseId]);
  const courseLessons = reactExports.useMemo(() => {
    if (!course) return [];
    const lessonIdSet = new Set(course.lessons);
    return allLessons.filter((l) => lessonIdSet.has(l.id)).sort((a, b) => a.order - b.order);
  }, [course, allLessons]);
  const totalLessons = courseLessons.length;
  const isEnrolled = enrollments.some((e) => e.courseId === courseId);
  async function handleEnroll() {
    if (!course) return;
    setEnrolling(true);
    setEnrollMsg(null);
    try {
      const res = await enrollUser(CURRENT_USER_ID, course.id);
      if (res.ok) {
        setEnrollMsg("Enrolled successfully!");
      } else {
        setEnrollMsg(res.errorDetail);
      }
    } catch (err) {
      setEnrollMsg(err instanceof Error ? err.message : "Enrollment failed");
    } finally {
      setEnrolling(false);
    }
  }
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 bg-background", "data-ocid": "course-detail-page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-2/3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mt-6", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-lg" }, i)) })
    ] }) });
  }
  if (error || !course) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 bg-background", "data-ocid": "course-detail-page", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive", "data-ocid": "course-detail.error_state", children: error ?? "Course not found" }) }) });
  }
  const isFree = course.price === 0;
  const difficultyLabel = course.status === "approved" ? "Available" : course.status;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", "data-ocid": "course-detail-page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: isFree ? "secondary" : "default", children: isFree ? "Free" : `₹${course.price}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: course.languagePair }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: `text-xs ${course.status === "approved" ? "border-green-500 text-green-600" : "border-muted-foreground"}`,
              children: difficultyLabel
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl font-bold text-foreground leading-tight", children: course.title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: course.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t border-border pt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: course.enrollmentCount }),
            " ",
            "enrolled"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: totalLessons }),
            " ",
            "lessons"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
            "By",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: course.creatorPhone })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4", children: [
      isEnrolled ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-sm px-3 py-1", children: "✓ Enrolled" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "You're enrolled in this course." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleEnroll,
            disabled: enrolling,
            "data-ocid": "course-detail.enroll_button",
            children: enrolling ? "Enrolling…" : isFree ? "Enroll Free" : `Enroll for ₹${course.price}`
          }
        ),
        !isFree && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "One-time payment per course" })
      ] }),
      enrollMsg && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "mt-3 text-sm",
          "data-ocid": "course-detail.enroll_success_state",
          children: enrollMsg
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold text-foreground", children: "Lessons" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: courseLessons.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "py-8 text-center",
          "data-ocid": "course-detail.lessons.empty_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No lessons added yet." })
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "course-detail.lessons.list", children: courseLessons.map((lesson, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(LessonCard, { lesson, index: idx }, lesson.id)) }) })
    ] })
  ] }) });
}
export {
  CourseDetailPage as default
};
