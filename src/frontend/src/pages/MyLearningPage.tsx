import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  BookMarked,
  BookOpen,
  ChevronRight,
  Flame,
  PlayCircle,
} from "lucide-react";
import type { SavedWordRow } from "../backend.d";
import { useLanguageLearning } from "../hooks/useLanguageLearning";
import type { NormalisedEnrollment } from "../hooks/useLanguageLearning";

const DEMO_USER = "guest_user";

function StreakBanner({ streak }: { streak: number }) {
  return (
    <div
      data-ocid="my_learning.streak_panel"
      className="bg-gradient-to-r from-orange-500/10 via-amber-400/10 to-yellow-300/10 border border-orange-200 dark:border-orange-800 rounded-xl p-5 flex items-center gap-5"
    >
      <div className="flex flex-col items-center justify-center bg-orange-500 rounded-2xl w-20 h-20 shrink-0 shadow-sm">
        <Flame className="w-7 h-7 text-white" />
        <span className="text-3xl font-black text-white leading-none mt-0.5">
          {streak}
        </span>
      </div>
      <div>
        <p className="text-lg font-bold text-foreground">
          {streak === 0
            ? "Start your streak today!"
            : `${streak}-day streak 🔥`}
        </p>
        <p className="text-sm text-muted-foreground mt-0.5">
          {streak === 0
            ? "Complete a lesson to begin your learning streak."
            : "Keep it up — complete a lesson today to maintain your streak."}
        </p>
      </div>
    </div>
  );
}

function EnrollmentCard({ enrollment }: { enrollment: NormalisedEnrollment }) {
  const progress = Math.min(100, Math.max(0, enrollment.progressPercent));
  return (
    <Card
      className="hover:shadow-sm transition-shadow duration-200"
      data-ocid="my_learning.course.card"
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-semibold text-foreground text-sm truncate">
              {enrollment.courseId}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Language course
            </p>
          </div>
          <Badge
            variant="secondary"
            className={`shrink-0 text-xs ${
              progress === 100
                ? "bg-primary/10 text-primary border-primary/20"
                : "bg-secondary"
            }`}
          >
            {progress === 100 ? "Complete" : "In Progress"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-2">
        <Progress value={progress} className="h-2" />
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {progress}% complete
          </span>
          <Button
            data-ocid="my_learning.resume_button"
            size="sm"
            variant="ghost"
            className="text-xs h-7 gap-1 text-primary hover:text-primary"
            asChild
          >
            <Link to="/language-learning">
              <PlayCircle className="w-3.5 h-3.5" />
              Resume
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function SavedWordRowItem({ word }: { word: SavedWordRow }) {
  return (
    <div
      data-ocid="my_learning.vocabulary.item"
      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors"
    >
      <div className="min-w-0">
        <span className="font-medium text-foreground text-sm">{word.word}</span>
        {word.translation && (
          <span className="text-muted-foreground text-sm ml-2">
            — {word.translation}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {word.language && (
          <Badge variant="outline" className="text-xs">
            {word.language}
          </Badge>
        )}
      </div>
    </div>
  );
}

export default function MyLearningPage() {
  const { getUserEnrollments, getDailyStreak, getSavedWordsForDataExplorer } =
    useLanguageLearning();

  const streakQuery = useQuery({
    queryKey: ["daily-streak", DEMO_USER],
    queryFn: () => getDailyStreak(DEMO_USER),
    staleTime: 60_000,
  });

  const enrollmentsQuery = useQuery({
    queryKey: ["user-enrollments", DEMO_USER],
    queryFn: () => getUserEnrollments(DEMO_USER),
    staleTime: 30_000,
  });

  const savedWordsQuery = useQuery({
    queryKey: ["saved-words"],
    queryFn: () => getSavedWordsForDataExplorer(),
    staleTime: 30_000,
  });

  const streak = streakQuery.data ?? 0;
  const enrollments = enrollmentsQuery.data ?? [];
  const savedWords = savedWordsQuery.data ?? [];

  const lastEnrollment = enrollments.sort(
    (a, b) => b.enrollmentDate - a.enrollmentDate,
  )[0];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Learning</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Track your progress, vocabulary, and daily streak.
          </p>
        </div>
        {lastEnrollment && (
          <Button
            data-ocid="my_learning.resume_last_lesson_button"
            className="gap-2"
            asChild
          >
            <Link to="/language-learning">
              <PlayCircle className="w-4 h-4" />
              Resume Last Lesson
            </Link>
          </Button>
        )}
      </div>

      {/* Daily Streak Banner */}
      {streakQuery.isLoading ? (
        <Skeleton className="h-28 w-full rounded-xl" />
      ) : (
        <StreakBanner streak={streak} />
      )}

      {/* My Courses */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            My Courses
            {enrollments.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {enrollments.length}
              </Badge>
            )}
          </h2>
          <Button
            data-ocid="my_learning.browse_courses_link"
            variant="ghost"
            size="sm"
            className="text-primary gap-1 text-xs"
            asChild
          >
            <Link to="/language-learning">
              Browse Courses <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>

        {enrollmentsQuery.isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <Skeleton className="h-24 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : enrollments.length === 0 ? (
          <div
            data-ocid="my_learning.courses.empty_state"
            className="text-center py-10 bg-card border border-border rounded-xl"
          >
            <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-foreground font-medium text-sm">
              No courses yet
            </p>
            <p className="text-xs text-muted-foreground mt-1 mb-4">
              Enroll in your first course to start learning.
            </p>
            <Button
              data-ocid="my_learning.courses.browse_button"
              size="sm"
              asChild
            >
              <Link to="/language-learning">Browse Courses</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {enrollments.map((enrollment) => (
              <EnrollmentCard
                key={enrollment.courseId}
                enrollment={enrollment}
              />
            ))}
          </div>
        )}
      </section>

      {/* My Vocabulary */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-primary" />
            My Vocabulary
            {savedWords.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {savedWords.length}
              </Badge>
            )}
          </h2>
          <Button
            data-ocid="my_learning.word_search_link"
            variant="ghost"
            size="sm"
            className="text-primary gap-1 text-xs"
            asChild
          >
            <Link to="/word-search">
              Search Words <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>

        {savedWordsQuery.isLoading ? (
          <div className="bg-card border border-border rounded-xl p-4 space-y-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : savedWords.length === 0 ? (
          <div
            data-ocid="my_learning.vocabulary.empty_state"
            className="text-center py-10 bg-card border border-border rounded-xl"
          >
            <BookMarked className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-foreground font-medium text-sm">
              No saved words yet
            </p>
            <p className="text-xs text-muted-foreground mt-1 mb-4">
              Search for a word and save it to build your vocabulary.
            </p>
            <Button
              data-ocid="my_learning.vocabulary.search_button"
              size="sm"
              asChild
            >
              <Link to="/word-search">Search Words</Link>
            </Button>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl divide-y divide-border">
            {savedWords.slice(0, 20).map((w, i) => (
              <SavedWordRowItem key={`${w.word}-${i}`} word={w} />
            ))}
            {savedWords.length > 20 && (
              <div className="px-3 py-2 text-xs text-muted-foreground text-center">
                +{savedWords.length - 20} more words
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
