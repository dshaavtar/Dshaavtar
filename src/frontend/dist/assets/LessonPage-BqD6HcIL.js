import { d_ as useParams, u as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-D4mmtgjo.js";
import { u as useLanguageLearning, a as useLessonLikes } from "./useLanguageLearning-CqRAiv3Y.js";
import { a as ThumbsUp, T as ThumbsDown } from "./thumbs-up-CgRsiN0l.js";
import "./createLucideIcon-BGWdtUCJ.js";
const CURRENT_USER_ID = "current-user";
function LessonPage() {
  const { lessonId } = useParams({ strict: false });
  const navigate = useNavigate();
  const { markLessonComplete } = useLanguageLearning();
  const {
    likes,
    dislikes,
    userLike,
    isMutating,
    handleLike,
    handleDislike,
    handleRemove
  } = useLessonLikes(lessonId ?? "", CURRENT_USER_ID);
  const [completing, setCompleting] = reactExports.useState(false);
  const [completeMsg, setCompleteMsg] = reactExports.useState(null);
  async function handleComplete() {
    if (!lessonId) return;
    setCompleting(true);
    setCompleteMsg(null);
    try {
      const res = await markLessonComplete(lessonId);
      if (res.ok) {
        setCompleteMsg("Lesson marked as complete!");
      } else {
        setCompleteMsg(res.errorDetail);
      }
    } catch (err) {
      setCompleteMsg(err instanceof Error ? err.message : "Failed to complete");
    } finally {
      setCompleting(false);
    }
  }
  function onLikeClick() {
    if (userLike === true) {
      handleRemove();
    } else {
      handleLike();
    }
  }
  function onDislikeClick() {
    if (userLike === false) {
      handleRemove();
    } else {
      handleDislike();
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "p-6 bg-background text-foreground min-h-screen",
      "data-ocid": "lesson.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => navigate({ to: "/language-learning" }),
            className: "flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors",
            "data-ocid": "lesson.back_link",
            children: "← Back to Courses"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-lg shadow p-6 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Lesson" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
            "ID: ",
            lessonId
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground mt-3", children: "Complete this lesson to improve your language skills." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-lg shadow p-6 flex items-center gap-6",
            "data-ocid": "lesson.like_dislike_bar",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-muted-foreground mr-auto", children: "Was this lesson helpful?" }),
              isMutating && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin",
                  "aria-label": "Saving...",
                  "data-ocid": "lesson.like_loading_state"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: onLikeClick,
                  disabled: isMutating,
                  "aria-label": `Like this lesson. ${likes} likes.`,
                  "aria-pressed": userLike === true,
                  className: [
                    "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50",
                    userLike === true ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" : "bg-muted text-muted-foreground hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                  ].join(" "),
                  "data-ocid": "lesson.like_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ThumbsUp,
                      {
                        className: [
                          "w-4 h-4",
                          userLike === true ? "fill-green-500" : ""
                        ].join(" ")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: likes })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: onDislikeClick,
                  disabled: isMutating,
                  "aria-label": `Dislike this lesson. ${dislikes} dislikes.`,
                  "aria-pressed": userLike === false,
                  className: [
                    "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50",
                    userLike === false ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" : "bg-muted text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                  ].join(" "),
                  "data-ocid": "lesson.dislike_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ThumbsDown,
                      {
                        className: [
                          "w-4 h-4",
                          userLike === false ? "fill-red-500" : ""
                        ].join(" ")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: dislikes })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-lg shadow p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleComplete,
              disabled: completing,
              className: "bg-primary text-primary-foreground rounded px-4 py-2 font-medium disabled:opacity-50",
              "data-ocid": "lesson.complete_button",
              children: completing ? "Saving..." : "Mark Complete"
            }
          ),
          completeMsg && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "mt-2 text-sm text-muted-foreground",
              "data-ocid": "lesson.success_state",
              children: completeMsg
            }
          )
        ] })
      ] })
    }
  );
}
export {
  LessonPage as default
};
