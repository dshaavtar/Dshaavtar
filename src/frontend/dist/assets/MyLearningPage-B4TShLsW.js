import { r as reactExports, j as jsxRuntimeExports, bE as useQuery, L as Link } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { C as Card, a as CardContent, b as CardHeader } from "./card-Dx8tJeYi.js";
import { P as Primitive } from "./index-BtrS4JsN.js";
import { c as cn } from "./utils-2v2HxlWs.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { u as useLanguageLearning } from "./useLanguageLearning-CqRAiv3Y.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { B as BookOpen } from "./book-open-DS2-X7o9.js";
import { C as ChevronRight } from "./chevron-right-BS0DZr5u.js";
import { B as BookMarked } from "./book-marked-B1Ov4m8Z.js";
import { F as Flame } from "./flame-34E6_5Fg.js";
import "./index-DPbSRAbD.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polygon", { points: "10 8 16 12 10 16 10 8", key: "1cimsy" }]
];
const CirclePlay = createLucideIcon("circle-play", __iconNode);
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
const DEMO_USER = "guest_user";
function StreakBanner({ streak }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "my_learning.streak_panel",
      className: "bg-gradient-to-r from-orange-500/10 via-amber-400/10 to-yellow-300/10 border border-orange-200 dark:border-orange-800 rounded-xl p-5 flex items-center gap-5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center bg-orange-500 rounded-2xl w-20 h-20 shrink-0 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-7 h-7 text-white" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-black text-white leading-none mt-0.5", children: streak })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground", children: streak === 0 ? "Start your streak today!" : `${streak}-day streak 🔥` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: streak === 0 ? "Complete a lesson to begin your learning streak." : "Keep it up — complete a lesson today to maintain your streak." })
        ] })
      ]
    }
  );
}
function EnrollmentCard({ enrollment }) {
  const progress = Math.min(100, Math.max(0, enrollment.progressPercent));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "hover:shadow-sm transition-shadow duration-200",
      "data-ocid": "my_learning.course.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm truncate", children: enrollment.courseId }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Language course" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: `shrink-0 text-xs ${progress === 100 ? "bg-primary/10 text-primary border-primary/20" : "bg-secondary"}`,
              children: progress === 100 ? "Complete" : "In Progress"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-0 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress, className: "h-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              progress,
              "% complete"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "my_learning.resume_button",
                size: "sm",
                variant: "ghost",
                className: "text-xs h-7 gap-1 text-primary hover:text-primary",
                asChild: true,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/language-learning", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-3.5 h-3.5" }),
                  "Resume"
                ] })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function SavedWordRowItem({ word }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "my_learning.vocabulary.item",
      className: "flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground text-sm", children: word.word }),
          word.translation && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-sm ml-2", children: [
            "— ",
            word.translation
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 shrink-0", children: word.language && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: word.language }) })
      ]
    }
  );
}
function MyLearningPage() {
  const { getUserEnrollments, getDailyStreak, getSavedWordsForDataExplorer } = useLanguageLearning();
  const streakQuery = useQuery({
    queryKey: ["daily-streak", DEMO_USER],
    queryFn: () => getDailyStreak(DEMO_USER),
    staleTime: 6e4
  });
  const enrollmentsQuery = useQuery({
    queryKey: ["user-enrollments", DEMO_USER],
    queryFn: () => getUserEnrollments(DEMO_USER),
    staleTime: 3e4
  });
  const savedWordsQuery = useQuery({
    queryKey: ["saved-words"],
    queryFn: () => getSavedWordsForDataExplorer(),
    staleTime: 3e4
  });
  const streak = streakQuery.data ?? 0;
  const enrollments = enrollmentsQuery.data ?? [];
  const savedWords = savedWordsQuery.data ?? [];
  const lastEnrollment = enrollments.sort(
    (a, b) => b.enrollmentDate - a.enrollmentDate
  )[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-5xl mx-auto space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "My Learning" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Track your progress, vocabulary, and daily streak." })
      ] }),
      lastEnrollment && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          "data-ocid": "my_learning.resume_last_lesson_button",
          className: "gap-2",
          asChild: true,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/language-learning", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-4 h-4" }),
            "Resume Last Lesson"
          ] })
        }
      )
    ] }),
    streakQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-xl" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(StreakBanner, { streak }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-semibold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-primary" }),
          "My Courses",
          enrollments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: enrollments.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "my_learning.browse_courses_link",
            variant: "ghost",
            size: "sm",
            className: "text-primary gap-1 text-xs",
            asChild: true,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/language-learning", children: [
              "Browse Courses ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" })
            ] })
          }
        )
      ] }),
      enrollmentsQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full" }) }) }, i)) }) : enrollments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "my_learning.courses.empty_state",
          className: "text-center py-10 bg-card border border-border rounded-xl",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-10 h-10 text-muted-foreground mx-auto mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium text-sm", children: "No courses yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 mb-4", children: "Enroll in your first course to start learning." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "my_learning.courses.browse_button",
                size: "sm",
                asChild: true,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/language-learning", children: "Browse Courses" })
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: enrollments.map((enrollment) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        EnrollmentCard,
        {
          enrollment
        },
        enrollment.courseId
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-semibold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "w-5 h-5 text-primary" }),
          "My Vocabulary",
          savedWords.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: savedWords.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "my_learning.word_search_link",
            variant: "ghost",
            size: "sm",
            className: "text-primary gap-1 text-xs",
            asChild: true,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/word-search", children: [
              "Search Words ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" })
            ] })
          }
        )
      ] }),
      savedWordsQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-4 space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, i)) }) : savedWords.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "my_learning.vocabulary.empty_state",
          className: "text-center py-10 bg-card border border-border rounded-xl",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "w-10 h-10 text-muted-foreground mx-auto mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium text-sm", children: "No saved words yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 mb-4", children: "Search for a word and save it to build your vocabulary." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "my_learning.vocabulary.search_button",
                size: "sm",
                asChild: true,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/word-search", children: "Search Words" })
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl divide-y divide-border", children: [
        savedWords.slice(0, 20).map((w, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SavedWordRowItem, { word: w }, `${w.word}-${i}`)),
        savedWords.length > 20 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2 text-xs text-muted-foreground text-center", children: [
          "+",
          savedWords.length - 20,
          " more words"
        ] })
      ] })
    ] })
  ] });
}
export {
  MyLearningPage as default
};
