import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  useLanguageLearning,
  useLessonLikes,
} from "../hooks/useLanguageLearning";
import type {
  NormalisedCourse,
  NormalisedEnrollment,
  NormalisedLessonRow,
} from "../hooks/useLanguageLearning";

// ─── Lesson card with live like/dislike counts ─────────────────────────────

const CURRENT_USER_ID = "current-user";

function LessonCard({
  lesson,
  index,
}: {
  lesson: NormalisedLessonRow;
  index: number;
}) {
  const {
    likes,
    dislikes,
    userLike,
    handleLike,
    handleDislike,
    handleRemove,
    isMutating,
  } = useLessonLikes(lesson.id, CURRENT_USER_ID);

  function onLike() {
    if (userLike === true) handleRemove();
    else handleLike();
  }

  function onDislike() {
    if (userLike === false) handleRemove();
    else handleDislike();
  }

  return (
    <Link
      to="/lesson/$lessonId"
      params={{ lessonId: lesson.id }}
      className="block"
      data-ocid={`course-detail.lesson.${index + 1}`}
    >
      <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background hover:bg-muted/40 transition-colors group">
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
            {index + 1}
          </span>
          <span className="text-sm font-medium text-foreground truncate">
            {lesson.title}
          </span>
        </div>
        <div className="flex items-center gap-3 ml-4 flex-shrink-0">
          {/* Like / dislike — stop propagation so the link doesn't navigate */}
          <button
            type="button"
            aria-label="Like this lesson"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isMutating) onLike();
            }}
            disabled={isMutating}
            className={`flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors ${
              userLike === true
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-primary"
            }`}
            data-ocid={`course-detail.lesson.like.${index + 1}`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>{likes}</span>
          </button>
          <button
            type="button"
            aria-label="Dislike this lesson"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isMutating) onDislike();
            }}
            disabled={isMutating}
            className={`flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors ${
              userLike === false
                ? "bg-destructive text-destructive-foreground"
                : "text-muted-foreground hover:text-destructive"
            }`}
            data-ocid={`course-detail.lesson.dislike.${index + 1}`}
          >
            <ThumbsDown className="w-3.5 h-3.5" />
            <span>{dislikes}</span>
          </button>
        </div>
      </div>
    </Link>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────

export default function CourseDetailPage() {
  const { courseId } = useParams({ strict: false }) as { courseId: string };
  const {
    getCourse,
    getUserEnrollments,
    enrollUser,
    getLessonsForDataExplorer,
  } = useLanguageLearning();

  const [course, setCourse] = useState<NormalisedCourse | null>(null);
  const [enrollments, setEnrollments] = useState<NormalisedEnrollment[]>([]);
  const [allLessons, setAllLessons] = useState<NormalisedLessonRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollMsg, setEnrollMsg] = useState<string | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: stable hook refs
  useEffect(() => {
    if (!courseId) return;
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const [c, e, lessons] = await Promise.all([
          getCourse(courseId),
          getUserEnrollments(CURRENT_USER_ID),
          getLessonsForDataExplorer(),
        ]);
        if (!cancelled) {
          setCourse(c);
          setEnrollments(e);
          setAllLessons(lessons);
        }
      } catch (err) {
        if (!cancelled)
          setError(
            err instanceof Error ? err.message : "Failed to load course",
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

  // Filter lessons that belong to this course and sort by order
  const courseLessons = useMemo(() => {
    if (!course) return [];
    const lessonIdSet = new Set(course.lessons);
    return allLessons
      .filter((l) => lessonIdSet.has(l.id))
      .sort((a, b) => a.order - b.order);
  }, [course, allLessons]);

  // Aggregate rating across all lessons
  // NOTE: real counts come from useLessonLikes per card — this shows a summary
  // using the course enrollment count as a proxy signal when no likes exist yet
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
    return (
      <div className="p-6 bg-background" data-ocid="course-detail-page">
        <div className="max-w-2xl mx-auto space-y-4">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="space-y-2 mt-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-14 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="p-6 bg-background" data-ocid="course-detail-page">
        <div className="max-w-2xl mx-auto">
          <p className="text-destructive" data-ocid="course-detail.error_state">
            {error ?? "Course not found"}
          </p>
        </div>
      </div>
    );
  }

  const isFree = course.price === 0;
  const difficultyLabel =
    course.status === "approved" ? "Available" : course.status;

  return (
    <div className="min-h-screen bg-background" data-ocid="course-detail-page">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* ── Course header ─────────────────────────────────────────────── */}
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-start gap-2 mb-1">
              <Badge variant={isFree ? "secondary" : "default"}>
                {isFree ? "Free" : `₹${course.price}`}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {course.languagePair}
              </Badge>
              <Badge
                variant="outline"
                className={`text-xs ${
                  course.status === "approved"
                    ? "border-green-500 text-green-600"
                    : "border-muted-foreground"
                }`}
              >
                {difficultyLabel}
              </Badge>
            </div>
            <CardTitle className="text-2xl font-bold text-foreground leading-tight">
              {course.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm leading-relaxed">
              {course.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t border-border pt-3">
              <span>
                <span className="font-medium text-foreground">
                  {course.enrollmentCount}
                </span>{" "}
                enrolled
              </span>
              <span>
                <span className="font-medium text-foreground">
                  {totalLessons}
                </span>{" "}
                lessons
              </span>
              <span className="truncate">
                By{" "}
                <span className="font-medium text-foreground">
                  {course.creatorPhone}
                </span>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* ── Enroll / unenroll ─────────────────────────────────────────── */}
        <Card className="border-border shadow-sm">
          <CardContent className="pt-4">
            {isEnrolled ? (
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  ✓ Enrolled
                </Badge>
                <span className="text-sm text-muted-foreground">
                  You're enrolled in this course.
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-3 flex-wrap">
                <Button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  data-ocid="course-detail.enroll_button"
                >
                  {enrolling
                    ? "Enrolling…"
                    : isFree
                      ? "Enroll Free"
                      : `Enroll for ₹${course.price}`}
                </Button>
                {!isFree && (
                  <span className="text-xs text-muted-foreground">
                    One-time payment per course
                  </span>
                )}
              </div>
            )}
            {enrollMsg && (
              <p
                className="mt-3 text-sm"
                data-ocid="course-detail.enroll_success_state"
              >
                {enrollMsg}
              </p>
            )}
          </CardContent>
        </Card>

        {/* ── Lessons list ──────────────────────────────────────────────── */}
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-foreground">
              Lessons
            </CardTitle>
          </CardHeader>
          <CardContent>
            {courseLessons.length === 0 ? (
              <div
                className="py-8 text-center"
                data-ocid="course-detail.lessons.empty_state"
              >
                <p className="text-muted-foreground text-sm">
                  No lessons added yet.
                </p>
              </div>
            ) : (
              <div className="space-y-2" data-ocid="course-detail.lessons.list">
                {courseLessons.map((lesson, idx) => (
                  <LessonCard key={lesson.id} lesson={lesson} index={idx} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
