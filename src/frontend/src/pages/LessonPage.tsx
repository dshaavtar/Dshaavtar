import { useNavigate, useParams } from "@tanstack/react-router";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import {
  useLanguageLearning,
  useLessonLikes,
} from "../hooks/useLanguageLearning";

// Stable placeholder userId — in a full auth flow this would come from the auth context
const CURRENT_USER_ID = "current-user";

export default function LessonPage() {
  const { lessonId } = useParams({ strict: false }) as { lessonId: string };
  const navigate = useNavigate();
  const { markLessonComplete } = useLanguageLearning();
  const {
    likes,
    dislikes,
    userLike,
    isMutating,
    handleLike,
    handleDislike,
    handleRemove,
  } = useLessonLikes(lessonId ?? "", CURRENT_USER_ID);

  const [completing, setCompleting] = useState(false);
  const [completeMsg, setCompleteMsg] = useState<string | null>(null);

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

  return (
    <div
      className="p-6 bg-background text-foreground min-h-screen"
      data-ocid="lesson.page"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Back navigation */}
        <button
          type="button"
          onClick={() => navigate({ to: "/language-learning" })}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          data-ocid="lesson.back_link"
        >
          ← Back to Courses
        </button>

        {/* Lesson header */}
        <div className="bg-card rounded-lg shadow p-6 space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Lesson</h1>
          <p className="text-muted-foreground text-sm">ID: {lessonId}</p>
          <p className="text-foreground mt-3">
            Complete this lesson to improve your language skills.
          </p>
        </div>

        {/* Like / Dislike bar */}
        <div
          className="bg-card rounded-lg shadow p-6 flex items-center gap-6"
          data-ocid="lesson.like_dislike_bar"
        >
          <span className="text-sm font-medium text-muted-foreground mr-auto">
            Was this lesson helpful?
          </span>

          {isMutating && (
            <span
              className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin"
              aria-label="Saving..."
              data-ocid="lesson.like_loading_state"
            />
          )}

          {/* Thumbs up */}
          <button
            type="button"
            onClick={onLikeClick}
            disabled={isMutating}
            aria-label={`Like this lesson. ${likes} likes.`}
            aria-pressed={userLike === true}
            className={[
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50",
              userLike === true
                ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                : "bg-muted text-muted-foreground hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400",
            ].join(" ")}
            data-ocid="lesson.like_button"
          >
            <ThumbsUp
              className={[
                "w-4 h-4",
                userLike === true ? "fill-green-500" : "",
              ].join(" ")}
            />
            <span>{likes}</span>
          </button>

          {/* Thumbs down */}
          <button
            type="button"
            onClick={onDislikeClick}
            disabled={isMutating}
            aria-label={`Dislike this lesson. ${dislikes} dislikes.`}
            aria-pressed={userLike === false}
            className={[
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50",
              userLike === false
                ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                : "bg-muted text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400",
            ].join(" ")}
            data-ocid="lesson.dislike_button"
          >
            <ThumbsDown
              className={[
                "w-4 h-4",
                userLike === false ? "fill-red-500" : "",
              ].join(" ")}
            />
            <span>{dislikes}</span>
          </button>
        </div>

        {/* Mark complete */}
        <div className="bg-card rounded-lg shadow p-6">
          <button
            type="button"
            onClick={handleComplete}
            disabled={completing}
            className="bg-primary text-primary-foreground rounded px-4 py-2 font-medium disabled:opacity-50"
            data-ocid="lesson.complete_button"
          >
            {completing ? "Saving..." : "Mark Complete"}
          </button>
          {completeMsg && (
            <p
              className="mt-2 text-sm text-muted-foreground"
              data-ocid="lesson.success_state"
            >
              {completeMsg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
