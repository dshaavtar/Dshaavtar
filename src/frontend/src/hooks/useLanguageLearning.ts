import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CourseApprovalRow,
  CourseRow,
  DailyLessonRow,
  EnrollmentRow,
  LanguageCourse,
  LessonRow,
  SavedWordRow,
  UserEnrollment,
  WordDefinition,
  WordDefinitionRow,
} from "../backend.d";
import { useBackendActor } from "./useBackend";

// Re-export normalised types for consumers
export type NormalisedCourse = Omit<
  LanguageCourse,
  "price" | "enrollmentCount" | "createdDate"
> & {
  price: number;
  enrollmentCount: number;
  createdDate: number;
};

export type NormalisedEnrollment = Omit<
  UserEnrollment,
  "progressPercent" | "completionDate" | "lastViewedDate" | "enrollmentDate"
> & {
  progressPercent: number;
  completionDate: number;
  lastViewedDate: number;
  enrollmentDate: number;
};

export type NormalisedCourseRow = Omit<
  CourseRow,
  "price" | "enrollmentCount" | "createdDate"
> & {
  price: number;
  enrollmentCount: number;
  createdDate: number;
};

export type NormalisedEnrollmentRow = Omit<
  EnrollmentRow,
  "progressPercent" | "enrollmentDate"
> & {
  progressPercent: number;
  enrollmentDate: number;
};

export type NormalisedLessonRow = Omit<LessonRow, "order"> & {
  order: number;
};

export type NormalisedDailyLessonRow = Omit<DailyLessonRow, "streakDate"> & {
  streakDate: number;
};

export type LanguageLearningAnalytics = {
  totalEnrollments: number;
  totalSavedWords: number;
  activeStreakUsers: number;
  totalCourses: number;
  totalDailyLessons: number;
};

function normaliseCourse(c: LanguageCourse): NormalisedCourse {
  return {
    ...c,
    price: Number(c.price),
    enrollmentCount: Number(c.enrollmentCount),
    createdDate: Number(c.createdDate),
  };
}

function normaliseEnrollment(e: UserEnrollment): NormalisedEnrollment {
  return {
    ...e,
    progressPercent: Number(e.progressPercent),
    completionDate: Number(e.completionDate),
    lastViewedDate: Number(e.lastViewedDate),
    enrollmentDate: Number(e.enrollmentDate),
  };
}

function normaliseCourseRow(c: CourseRow): NormalisedCourseRow {
  return {
    ...c,
    price: Number(c.price),
    enrollmentCount: Number(c.enrollmentCount),
    createdDate: Number(c.createdDate),
  };
}

function normaliseEnrollmentRow(e: EnrollmentRow): NormalisedEnrollmentRow {
  return {
    ...e,
    progressPercent: Number(e.progressPercent),
    enrollmentDate: Number(e.enrollmentDate),
  };
}

function normaliseLessonRow(l: LessonRow): NormalisedLessonRow {
  return { ...l, order: Number(l.order) };
}

function normaliseDailyLessonRow(d: DailyLessonRow): NormalisedDailyLessonRow {
  return { ...d, streakDate: Number(d.streakDate) };
}

// ─── LikeState type ─────────────────────────────────────────────────────────

export type LikeState = {
  likes: number;
  dislikes: number;
  userLike: boolean | null;
};

// ─── useLessonLikes ───────────────────────────────────────────────────────────

export function useLessonLikes(lessonId: string, userId: string) {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const countsQuery = useQuery<{ likes: number; dislikes: number }>({
    queryKey: ["lessonLikeCounts", lessonId],
    queryFn: async () => {
      if (!actor) return { likes: 0, dislikes: 0 };
      const result = await actor.getLessonLikeCounts(lessonId);
      return { likes: Number(result.likes), dislikes: Number(result.dislikes) };
    },
    enabled: !!actor && !isFetching && !!lessonId,
    staleTime: 5_000,
  });

  const userLikeQuery = useQuery<boolean | null>({
    queryKey: ["userLessonLike", lessonId, userId],
    queryFn: async () => {
      if (!actor || !userId) return null;
      const result = await actor.getUserLessonLike(userId, lessonId);
      if (result === null || result === undefined) return null;
      return result.likeType === "like";
    },
    enabled: !!actor && !isFetching && !!lessonId && !!userId,
    staleTime: 5_000,
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["lessonLikeCounts", lessonId] });
    queryClient.invalidateQueries({
      queryKey: ["userLessonLike", lessonId, userId],
    });
  };

  const likeMutation = useMutation({
    mutationFn: async (isLike: boolean) => {
      if (!actor) throw new Error("Actor not ready");
      const res = isLike
        ? await actor.likeLesson(userId, lessonId)
        : await actor.dislikeLesson(userId, lessonId);
      if (res.__kind__ === "err")
        throw new Error(res.err?.errorDetail ?? "Failed");
      return res.ok;
    },
    onSuccess: invalidate,
  });

  const removeMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.removeLessonLike(userId, lessonId);
    },
    onSuccess: invalidate,
  });

  return {
    likes: countsQuery.data?.likes ?? 0,
    dislikes: countsQuery.data?.dislikes ?? 0,
    userLike: userLikeQuery.data ?? null,
    isLoading: countsQuery.isLoading || userLikeQuery.isLoading,
    handleLike: () => likeMutation.mutate(true),
    handleDislike: () => likeMutation.mutate(false),
    handleRemove: () => removeMutation.mutate(),
    isMutating: likeMutation.isPending || removeMutation.isPending,
  };
}

export function useLanguageLearning() {
  const { actor } = useBackendActor();

  return {
    // ── Course discovery ──────────────────────────────────────────────────────

    searchCourses: async (
      keyword: string,
      languagePair: string,
    ): Promise<NormalisedCourse[]> => {
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.searchCourses(keyword, languagePair);
      return res.map(normaliseCourse);
    },

    getCourse: async (id: string): Promise<NormalisedCourse | null> => {
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.getCourse(id);
      return res ? normaliseCourse(res) : null;
    },

    // ── Enrollment ────────────────────────────────────────────────────────────

    enrollUser: async (
      userId: string,
      courseId: string,
    ): Promise<
      { ok: true; id: string } | { ok: false; errorDetail: string }
    > => {
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.enrollUser(userId, courseId);
      if (res.__kind__ === "ok") return { ok: true, id: res.ok };
      return {
        ok: false,
        errorDetail: res.err?.errorDetail ?? "Enrollment failed",
      };
    },

    getUserEnrollments: async (
      userId: string,
    ): Promise<NormalisedEnrollment[]> => {
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.getUserEnrollments(userId);
      return res.map(normaliseEnrollment);
    },

    // ── Word lookup & saving ──────────────────────────────────────────────────

    saveWord: async (
      userId: string,
      word: string,
      language: string,
      translation: string,
      ancientTranslation: string,
      ipa: string,
      examples: string[],
    ): Promise<
      { ok: true; id: string } | { ok: false; errorDetail: string }
    > => {
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.saveWord(
        userId,
        word,
        language,
        translation,
        ancientTranslation,
        ipa,
        examples,
      );
      if (res.__kind__ === "ok") return { ok: true, id: res.ok };
      return {
        ok: false,
        errorDetail: res.err?.errorDetail ?? "Save word failed",
      };
    },

    searchWordDefinition: async (
      word: string,
      language: string,
    ): Promise<WordDefinition | null> => {
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.searchWordDefinition(word, language);
      return res ?? null;
    },

    // ── Daily lessons ─────────────────────────────────────────────────────────

    generateDailyLesson: async (
      userId: string,
      languagePair: string,
      topic: string,
      difficulty: string,
      content: string,
      quizQuestion: string,
      quizChoices: string[],
      correctAnswer: number,
    ): Promise<
      { ok: true; id: string } | { ok: false; errorDetail: string }
    > => {
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.generateDailyLesson(
        userId,
        languagePair,
        topic,
        difficulty,
        content,
        quizQuestion,
        quizChoices,
        BigInt(correctAnswer),
      );
      if (res.__kind__ === "ok") return { ok: true, id: res.ok };
      return {
        ok: false,
        errorDetail: res.err?.errorDetail ?? "Generate lesson failed",
      };
    },

    markLessonComplete: async (
      dailyLessonId: string,
    ): Promise<
      { ok: true; id: string } | { ok: false; errorDetail: string }
    > => {
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.markLessonComplete(dailyLessonId);
      if (res.__kind__ === "ok") return { ok: true, id: res.ok };
      return {
        ok: false,
        errorDetail: res.err?.errorDetail ?? "Mark complete failed",
      };
    },

    // ── Streak ────────────────────────────────────────────────────────────────

    getDailyStreak: async (userId: string): Promise<number> => {
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.getDailyStreak(userId);
      return Number(res);
    },

    // ── Admin: course approval ────────────────────────────────────────────────

    approveCourse: async (
      courseId: string,
      adminNotes: string,
    ): Promise<
      { ok: true; id: string } | { ok: false; errorDetail: string }
    > => {
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.approveCourse(courseId, adminNotes);
      if (res.__kind__ === "ok") return { ok: true, id: res.ok };
      return {
        ok: false,
        errorDetail: res.err?.errorDetail ?? "Approve failed",
      };
    },

    rejectCourse: async (
      courseId: string,
      adminNotes: string,
    ): Promise<
      { ok: true; id: string } | { ok: false; errorDetail: string }
    > => {
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.rejectCourse(courseId, adminNotes);
      if (res.__kind__ === "ok") return { ok: true, id: res.ok };
      return {
        ok: false,
        errorDetail: res.err?.errorDetail ?? "Reject failed",
      };
    },

    addCourse: async (
      creatorPhone: string,
      title: string,
      languagePair: string,
      description: string,
      price: number,
    ): Promise<
      { ok: true; id: string } | { ok: false; errorDetail: string }
    > => {
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.addCourse(
        creatorPhone,
        title,
        languagePair,
        description,
        BigInt(price),
      );
      if (res.__kind__ === "ok") return { ok: true, id: res.ok };
      return {
        ok: false,
        errorDetail: res.err?.errorDetail ?? "Add course failed",
      };
    },

    // ── Analytics ─────────────────────────────────────────────────────────────

    getLanguageLearningAnalytics:
      async (): Promise<LanguageLearningAnalytics> => {
        if (!actor) throw new Error("Backend actor not available");
        const res = await actor.getLanguageLearningAnalytics();
        return {
          totalEnrollments: Number(res.totalEnrollments),
          totalSavedWords: Number(res.totalSavedWords),
          activeStreakUsers: Number(res.activeStreakUsers),
          totalCourses: Number(res.totalCourses),
          totalDailyLessons: Number(res.totalDailyLessons),
        };
      },

    // ── Data Explorer ─────────────────────────────────────────────────────────

    getLanguageCoursesForDataExplorer: async (): Promise<
      NormalisedCourseRow[]
    > => {
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.getLanguageCoursesForDataExplorer();
      return res.map(normaliseCourseRow);
    },

    getLessonsForDataExplorer: async (): Promise<NormalisedLessonRow[]> => {
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.getLessonsForDataExplorer();
      return res.map(normaliseLessonRow);
    },

    getEnrollmentsForDataExplorer: async (): Promise<
      NormalisedEnrollmentRow[]
    > => {
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.getEnrollmentsForDataExplorer();
      return res.map(normaliseEnrollmentRow);
    },

    getSavedWordsForDataExplorer: async (): Promise<SavedWordRow[]> => {
      if (!actor) throw new Error("Backend actor not available");
      return actor.getSavedWordsForDataExplorer();
    },

    getCourseApprovalsForDataExplorer: async (): Promise<
      CourseApprovalRow[]
    > => {
      if (!actor) throw new Error("Backend actor not available");
      return actor.getCourseApprovalsForDataExplorer();
    },

    getWordDefinitionsForDataExplorer: async (): Promise<
      WordDefinitionRow[]
    > => {
      if (!actor) throw new Error("Backend actor not available");
      return actor.getWordDefinitionsForDataExplorer();
    },

    seedWordDefinitions: async (): Promise<
      { ok: true } | { ok: false; errorDetail: string }
    > => {
      if (!actor) throw new Error("Backend actor not available");
      try {
        // Backend expects an array of WordDefinition to seed.
        // Pass an empty array to trigger the backend's built-in seed.
        await actor.seedWordDefinitions([]);
        return { ok: true };
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Seed failed";
        return { ok: false, errorDetail: msg };
      }
    },

    getDailyLessonsForDataExplorer: async (): Promise<
      NormalisedDailyLessonRow[]
    > => {
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.getDailyLessonsForDataExplorer();
      return res.map(normaliseDailyLessonRow);
    },
  };
}
