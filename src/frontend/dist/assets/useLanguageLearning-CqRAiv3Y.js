import { _ as useBackendActor, bG as useActor, ao as useQueryClient, bE as useQuery, bF as useMutation, bH as createActor } from "./index-D4mmtgjo.js";
function normaliseCourse(c) {
  return {
    ...c,
    price: Number(c.price),
    enrollmentCount: Number(c.enrollmentCount),
    createdDate: Number(c.createdDate)
  };
}
function normaliseEnrollment(e) {
  return {
    ...e,
    progressPercent: Number(e.progressPercent),
    completionDate: Number(e.completionDate),
    lastViewedDate: Number(e.lastViewedDate),
    enrollmentDate: Number(e.enrollmentDate)
  };
}
function normaliseCourseRow(c) {
  return {
    ...c,
    price: Number(c.price),
    enrollmentCount: Number(c.enrollmentCount),
    createdDate: Number(c.createdDate)
  };
}
function normaliseEnrollmentRow(e) {
  return {
    ...e,
    progressPercent: Number(e.progressPercent),
    enrollmentDate: Number(e.enrollmentDate)
  };
}
function normaliseLessonRow(l) {
  return { ...l, order: Number(l.order) };
}
function normaliseDailyLessonRow(d) {
  return { ...d, streakDate: Number(d.streakDate) };
}
function useLessonLikes(lessonId, userId) {
  var _a, _b;
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const countsQuery = useQuery({
    queryKey: ["lessonLikeCounts", lessonId],
    queryFn: async () => {
      if (!actor) return { likes: 0, dislikes: 0 };
      const result = await actor.getLessonLikeCounts(lessonId);
      return { likes: Number(result.likes), dislikes: Number(result.dislikes) };
    },
    enabled: !!actor && !isFetching && !!lessonId,
    staleTime: 5e3
  });
  const userLikeQuery = useQuery({
    queryKey: ["userLessonLike", lessonId, userId],
    queryFn: async () => {
      if (!actor || !userId) return null;
      const result = await actor.getUserLessonLike(userId, lessonId);
      if (result === null || result === void 0) return null;
      return result.likeType === "like";
    },
    enabled: !!actor && !isFetching && !!lessonId && true,
    staleTime: 5e3
  });
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["lessonLikeCounts", lessonId] });
    queryClient.invalidateQueries({
      queryKey: ["userLessonLike", lessonId, userId]
    });
  };
  const likeMutation = useMutation({
    mutationFn: async (isLike) => {
      var _a2;
      if (!actor) throw new Error("Actor not ready");
      const res = isLike ? await actor.likeLesson(userId, lessonId) : await actor.dislikeLesson(userId, lessonId);
      if (res.__kind__ === "err")
        throw new Error(((_a2 = res.err) == null ? void 0 : _a2.errorDetail) ?? "Failed");
      return res.ok;
    },
    onSuccess: invalidate
  });
  const removeMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.removeLessonLike(userId, lessonId);
    },
    onSuccess: invalidate
  });
  return {
    likes: ((_a = countsQuery.data) == null ? void 0 : _a.likes) ?? 0,
    dislikes: ((_b = countsQuery.data) == null ? void 0 : _b.dislikes) ?? 0,
    userLike: userLikeQuery.data ?? null,
    isLoading: countsQuery.isLoading || userLikeQuery.isLoading,
    handleLike: () => likeMutation.mutate(true),
    handleDislike: () => likeMutation.mutate(false),
    handleRemove: () => removeMutation.mutate(),
    isMutating: likeMutation.isPending || removeMutation.isPending
  };
}
function useLanguageLearning() {
  const { actor } = useBackendActor();
  return {
    // ── Course discovery ──────────────────────────────────────────────────────
    searchCourses: async (keyword, languagePair) => {
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.searchCourses(keyword, languagePair);
      return res.map(normaliseCourse);
    },
    getCourse: async (id) => {
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.getCourse(id);
      return res ? normaliseCourse(res) : null;
    },
    // ── Enrollment ────────────────────────────────────────────────────────────
    enrollUser: async (userId, courseId) => {
      var _a;
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.enrollUser(userId, courseId);
      if (res.__kind__ === "ok") return { ok: true, id: res.ok };
      return {
        ok: false,
        errorDetail: ((_a = res.err) == null ? void 0 : _a.errorDetail) ?? "Enrollment failed"
      };
    },
    getUserEnrollments: async (userId) => {
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.getUserEnrollments(userId);
      return res.map(normaliseEnrollment);
    },
    // ── Word lookup & saving ──────────────────────────────────────────────────
    saveWord: async (userId, word, language, translation, ancientTranslation, ipa, examples) => {
      var _a;
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.saveWord(
        userId,
        word,
        language,
        translation,
        ancientTranslation,
        ipa,
        examples
      );
      if (res.__kind__ === "ok") return { ok: true, id: res.ok };
      return {
        ok: false,
        errorDetail: ((_a = res.err) == null ? void 0 : _a.errorDetail) ?? "Save word failed"
      };
    },
    searchWordDefinition: async (word, language) => {
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.searchWordDefinition(word, language);
      return res ?? null;
    },
    // ── Daily lessons ─────────────────────────────────────────────────────────
    generateDailyLesson: async (userId, languagePair, topic, difficulty, content, quizQuestion, quizChoices, correctAnswer) => {
      var _a;
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.generateDailyLesson(
        userId,
        languagePair,
        topic,
        difficulty,
        content,
        quizQuestion,
        quizChoices,
        BigInt(correctAnswer)
      );
      if (res.__kind__ === "ok") return { ok: true, id: res.ok };
      return {
        ok: false,
        errorDetail: ((_a = res.err) == null ? void 0 : _a.errorDetail) ?? "Generate lesson failed"
      };
    },
    markLessonComplete: async (dailyLessonId) => {
      var _a;
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.markLessonComplete(dailyLessonId);
      if (res.__kind__ === "ok") return { ok: true, id: res.ok };
      return {
        ok: false,
        errorDetail: ((_a = res.err) == null ? void 0 : _a.errorDetail) ?? "Mark complete failed"
      };
    },
    // ── Streak ────────────────────────────────────────────────────────────────
    getDailyStreak: async (userId) => {
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.getDailyStreak(userId);
      return Number(res);
    },
    // ── Admin: course approval ────────────────────────────────────────────────
    approveCourse: async (courseId, adminNotes) => {
      var _a;
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.approveCourse(courseId, adminNotes);
      if (res.__kind__ === "ok") return { ok: true, id: res.ok };
      return {
        ok: false,
        errorDetail: ((_a = res.err) == null ? void 0 : _a.errorDetail) ?? "Approve failed"
      };
    },
    rejectCourse: async (courseId, adminNotes) => {
      var _a;
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.rejectCourse(courseId, adminNotes);
      if (res.__kind__ === "ok") return { ok: true, id: res.ok };
      return {
        ok: false,
        errorDetail: ((_a = res.err) == null ? void 0 : _a.errorDetail) ?? "Reject failed"
      };
    },
    addCourse: async (creatorPhone, title, languagePair, description, price) => {
      var _a;
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.addCourse(
        creatorPhone,
        title,
        languagePair,
        description,
        BigInt(price)
      );
      if (res.__kind__ === "ok") return { ok: true, id: res.ok };
      return {
        ok: false,
        errorDetail: ((_a = res.err) == null ? void 0 : _a.errorDetail) ?? "Add course failed"
      };
    },
    // ── Analytics ─────────────────────────────────────────────────────────────
    getLanguageLearningAnalytics: async () => {
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.getLanguageLearningAnalytics();
      return {
        totalEnrollments: Number(res.totalEnrollments),
        totalSavedWords: Number(res.totalSavedWords),
        activeStreakUsers: Number(res.activeStreakUsers),
        totalCourses: Number(res.totalCourses),
        totalDailyLessons: Number(res.totalDailyLessons)
      };
    },
    // ── Data Explorer ─────────────────────────────────────────────────────────
    getLanguageCoursesForDataExplorer: async () => {
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.getLanguageCoursesForDataExplorer();
      return res.map(normaliseCourseRow);
    },
    getLessonsForDataExplorer: async () => {
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.getLessonsForDataExplorer();
      return res.map(normaliseLessonRow);
    },
    getEnrollmentsForDataExplorer: async () => {
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.getEnrollmentsForDataExplorer();
      return res.map(normaliseEnrollmentRow);
    },
    getSavedWordsForDataExplorer: async () => {
      if (!actor) throw new Error("Backend actor not available");
      return actor.getSavedWordsForDataExplorer();
    },
    getCourseApprovalsForDataExplorer: async () => {
      if (!actor) throw new Error("Backend actor not available");
      return actor.getCourseApprovalsForDataExplorer();
    },
    getWordDefinitionsForDataExplorer: async () => {
      if (!actor) throw new Error("Backend actor not available");
      return actor.getWordDefinitionsForDataExplorer();
    },
    seedWordDefinitions: async () => {
      if (!actor) throw new Error("Backend actor not available");
      try {
        await actor.seedWordDefinitions([]);
        return { ok: true };
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Seed failed";
        return { ok: false, errorDetail: msg };
      }
    },
    getDailyLessonsForDataExplorer: async () => {
      if (!actor) throw new Error("Backend actor not available");
      const res = await actor.getDailyLessonsForDataExplorer();
      return res.map(normaliseDailyLessonRow);
    }
  };
}
export {
  useLessonLikes as a,
  useLanguageLearning as u
};
