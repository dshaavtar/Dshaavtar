import { r as reactExports, ao as useQueryClient, bE as useQuery, bF as useMutation, j as jsxRuntimeExports, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { C as Card, b as CardHeader, a as CardContent, e as CardFooter } from "./card-Dx8tJeYi.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Textarea } from "./textarea-Bmq1MNcJ.js";
import { u as useLanguageLearning } from "./useLanguageLearning-CqRAiv3Y.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { C as CircleCheck } from "./circle-check-0H_z7k0M.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { T as Tag } from "./tag-DM1LGoN5.js";
import { B as BookOpen } from "./book-open-DS2-X7o9.js";
import { G as Globe } from "./globe--tJa3NSQ.js";
import { U as Users } from "./users-BCFHEKUR.js";
import { C as CreditCard } from "./credit-card-CP3NtRg6.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-BtrS4JsN.js";
import "./createLucideIcon-BGWdtUCJ.js";
const LANGUAGE_PAIRS = [
  "All",
  "English → Hindi",
  "English → Spanish",
  "English → French",
  "English → German",
  "English → Japanese",
  "English → Mandarin",
  "Hindi → English",
  "Spanish → English",
  "French → English"
];
function CourseCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3 mt-1" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { className: "border-t pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full" }) })
  ] });
}
function CourseCard({
  course,
  onEnroll,
  enrollingId
}) {
  const isFree = course.price === 0;
  const isEnrolling = enrollingId === course.id;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "flex flex-col hover:shadow-md transition-shadow duration-200 border-border",
      "data-ocid": "language_learning.course.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base leading-tight line-clamp-2", children: course.title }),
            isFree ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "shrink-0 text-xs bg-primary/10 text-primary border-primary/20",
                children: "Free"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "shrink-0 text-xs", children: [
              "₹",
              course.price
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3.5 h-3.5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: course.languagePair })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex-1 pt-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-3", children: course.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                course.enrollmentCount,
                " enrolled"
              ] })
            ] }),
            course.status && course.status !== "approved" && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs capitalize", children: course.status })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { className: "border-t pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": isFree ? "language_learning.enroll_button" : "language_learning.pay_enroll_button",
            className: "w-full",
            variant: isFree ? "default" : "outline",
            size: "sm",
            onClick: () => onEnroll(course),
            disabled: isEnrolling,
            children: isEnrolling ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" }),
              "Processing..."
            ] }) : isFree ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5" }),
              "Enroll Now"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-3.5 h-3.5" }),
              "Pay & Enroll"
            ] })
          }
        ) })
      ]
    }
  );
}
const LANGUAGES = [
  "English",
  "Hindi",
  "Spanish",
  "French",
  "German",
  "Japanese",
  "Chinese",
  "Arabic",
  "Sanskrit",
  "Latin",
  "Ancient Greek",
  "Other"
];
function CreateCourseForm({ onSuccess }) {
  const { addCourse } = useLanguageLearning();
  const [title, setTitle] = reactExports.useState("");
  const [language, setLanguage] = reactExports.useState("English");
  const [price, setPrice] = reactExports.useState(0);
  const [description, setDescription] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState(
    typeof window !== "undefined" ? localStorage.getItem("userPhone") ?? "" : ""
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addCourse(phone, title, language, description, price);
    onSuccess();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "border rounded-lg p-4 mb-4 bg-card space-y-3",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-base", children: "Create a Language Course" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: title,
              onChange: (e) => setTitle(e.target.value),
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Language" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              className: "w-full border rounded px-2 py-1.5 text-sm",
              value: language,
              onChange: (e) => setLanguage(e.target.value),
              children: LANGUAGES.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: l }, l))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Price (0 = Free)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: 0,
              value: price,
              onChange: (e) => setPrice(Number(e.target.value))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: description,
              onChange: (e) => setDescription(e.target.value),
              rows: 3
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Your Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: phone, onChange: (e) => setPhone(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", size: "sm", children: "Submit for Review" })
      ]
    }
  );
}
function LanguageLearningPage() {
  const [keyword, setKeyword] = reactExports.useState("");
  const [selectedPair, setSelectedPair] = reactExports.useState("All");
  const [enrollingId, setEnrollingId] = reactExports.useState(null);
  const [showCreate, setShowCreate] = reactExports.useState(false);
  const [created, setCreated] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (new URLSearchParams(window.location.search).get("create") === "1")
      setShowCreate(true);
  }, []);
  const queryClient = useQueryClient();
  const { searchCourses, enrollUser } = useLanguageLearning();
  const searchQuery = useQuery({
    queryKey: ["language-courses", keyword, selectedPair],
    queryFn: () => searchCourses(keyword, selectedPair === "All" ? "" : selectedPair),
    staleTime: 3e4
  });
  const enrollMutation = useMutation({
    mutationFn: (course) => enrollUser("guest_user", course.id),
    onMutate: (course) => setEnrollingId(course.id),
    onSuccess: (result) => {
      setEnrollingId(null);
      if (result.ok) {
        ue.success("Enrolled successfully! Check My Learning.", {
          duration: 4e3
        });
        queryClient.invalidateQueries({ queryKey: ["user-enrollments"] });
      } else {
        ue.error(result.errorDetail ?? "Enrollment failed");
      }
    },
    onError: (err) => {
      setEnrollingId(null);
      ue.error(err.message ?? "Enrollment failed");
    }
  });
  const handleEnroll = reactExports.useCallback(
    (course) => enrollMutation.mutate(course),
    [enrollMutation]
  );
  const courses = searchQuery.data ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Language Courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "flex items-center gap-1",
            onClick: () => setShowCreate((s) => !s),
            "data-ocid": "language_learning.create_course_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              showCreate ? "Cancel" : "Create Course"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Discover and enroll in courses to start your language journey." }),
      created && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-green-50 border border-green-200 text-green-800 rounded p-3 mt-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Your course has been submitted for admin review." })
      ] }),
      showCreate && /* @__PURE__ */ jsxRuntimeExports.jsx(
        CreateCourseForm,
        {
          onSuccess: () => {
            setCreated(true);
            setShowCreate(false);
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 mb-6 flex flex-col sm:flex-row gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "language_learning.search_input",
            className: "pl-9",
            placeholder: "Search courses by keyword…",
            value: keyword,
            onChange: (e) => setKeyword(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
        LANGUAGE_PAIRS.map((pair) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "language_learning.filter.tab",
            onClick: () => setSelectedPair(pair),
            className: `text-xs px-3 py-1.5 rounded-full border transition-colors duration-150 whitespace-nowrap ${selectedPair === pair ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:bg-muted"}`,
            children: pair
          },
          pair
        ))
      ] })
    ] }),
    searchQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(CourseCardSkeleton, {}, k)) }) : searchQuery.isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "language_learning.error_state",
        className: "text-center py-16 text-muted-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium mb-2", children: "Failed to load courses" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Please try again." })
        ]
      }
    ) : courses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "language_learning.empty_state",
        className: "text-center py-16 bg-card border border-border rounded-xl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-12 h-12 text-muted-foreground mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium text-foreground mb-1", children: "No courses found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Try a different keyword or language pair." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: courses.map((course) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      CourseCard,
      {
        course,
        onEnroll: handleEnroll,
        enrollingId
      },
      course.id
    )) })
  ] });
}
export {
  LanguageLearningPage as default
};
