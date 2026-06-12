import { _ as useBackendActor, ao as useQueryClient, r as reactExports, bE as useQuery, bF as useMutation, j as jsxRuntimeExports, p as ue } from "./index-D4mmtgjo.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, f as DialogFooter } from "./dialog-DuJeMgVG.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Textarea } from "./textarea-Bmq1MNcJ.js";
import { u as useLanguageLearning } from "./useLanguageLearning-CqRAiv3Y.js";
import { B as BookOpen } from "./book-open-DS2-X7o9.js";
import { C as CircleCheckBig } from "./circle-check-big-C6-kT1pJ.js";
import { C as CircleX } from "./circle-x-CRQzBkf3.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CmjKy1Fn.js";
import "./index-CUcO6jhF.js";
import "./index-DYndF6Sn.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-BNXq-E6T.js";
import "./x-Chksmd6i.js";
import "./createLucideIcon-BGWdtUCJ.js";
import "./index-BtrS4JsN.js";
function normalise(c) {
  return {
    id: c.id,
    title: c.title,
    creatorPhone: c.creatorPhone ?? "—",
    languagePair: c.languagePair,
    price: Number(c.price),
    createdDate: Number(c.createdDate),
    description: c.description,
    status: c.status
  };
}
function formatDate(ns) {
  if (!ns || ns === 0) return "—";
  const ms = ns > 1e15 ? ns / 1e6 : ns;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function RowSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }) }, i)) });
}
function AdminCourseApprovalsPage() {
  const { actor } = useBackendActor();
  const { approveCourse, rejectCourse } = useLanguageLearning();
  const queryClient = useQueryClient();
  const [modal, setModal] = reactExports.useState(null);
  const [adminNotes, setAdminNotes] = reactExports.useState("");
  const pendingQuery = useQuery({
    queryKey: ["pending-course-approvals"],
    queryFn: async () => {
      if (!actor) return [];
      const fn = actor.getPendingApprovals;
      if (typeof fn !== "function") return [];
      const res = await fn.call(actor);
      return (res ?? []).map(normalise);
    },
    enabled: !!actor,
    staleTime: 3e4
  });
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["pending-course-approvals"] });
  const approveMutation = useMutation({
    mutationFn: ({ courseId, notes }) => approveCourse(courseId, notes),
    onSuccess: (result) => {
      if (result.ok) {
        ue.success("Course approved and published.");
        invalidate();
        closeModal();
      } else {
        ue.error(result.errorDetail ?? "Approval failed");
      }
    },
    onError: (err) => ue.error((err == null ? void 0 : err.message) ?? "Approval failed")
  });
  const rejectMutation = useMutation({
    mutationFn: ({ courseId, notes }) => rejectCourse(courseId, notes),
    onSuccess: (result) => {
      if (result.ok) {
        ue.success("Course rejected.");
        invalidate();
        closeModal();
      } else {
        ue.error(result.errorDetail ?? "Rejection failed");
      }
    },
    onError: (err) => ue.error((err == null ? void 0 : err.message) ?? "Rejection failed")
  });
  function openModal(type, course) {
    setAdminNotes("");
    setModal({ type, course });
  }
  function closeModal() {
    setModal(null);
    setAdminNotes("");
  }
  function handleConfirm() {
    if (!modal) return;
    const payload = { courseId: modal.course.id, notes: adminNotes };
    if (modal.type === "approve") {
      approveMutation.mutate(payload);
    } else {
      rejectMutation.mutate(payload);
    }
  }
  const courses = pendingQuery.data ?? [];
  const isMutating = approveMutation.isPending || rejectMutation.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "course_approvals.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-primary" }),
          "Course Approvals"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Review and approve user-submitted language courses before they go public." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        !pendingQuery.isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20",
            "data-ocid": "course_approvals.pending_count",
            children: [
              courses.length,
              " pending"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => pendingQuery.refetch(),
            "data-ocid": "course_approvals.refresh_button",
            type: "button",
            children: "Refresh"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "Creator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "Language Pair" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-foreground", children: "Price" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "Submitted" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: pendingQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RowSkeleton, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RowSkeleton, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RowSkeleton, {})
      ] }) : pendingQuery.isError ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "td",
        {
          colSpan: 6,
          className: "px-4 py-12 text-center",
          "data-ocid": "course_approvals.error_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Failed to load pending approvals." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "mt-3",
                onClick: () => pendingQuery.refetch(),
                type: "button",
                children: "Retry"
              }
            )
          ]
        }
      ) }) : courses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "td",
        {
          colSpan: 6,
          className: "px-4 py-16 text-center",
          "data-ocid": "course_approvals.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "No pending courses" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "All submitted courses have been reviewed." })
          ]
        }
      ) }) : courses.map((course, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "hover:bg-muted/20 transition-colors",
          "data-ocid": `course_approvals.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate max-w-[200px]", children: course.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-1 max-w-[200px]", children: course.description })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: course.creatorPhone }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary", children: course.languagePair }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-medium text-foreground", children: course.price === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary font-semibold", children: "Free" }) : `₹${course.price.toLocaleString("en-IN")}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs", children: formatDate(course.createdDate) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "h-7 text-xs border-green-500/40 text-green-600 hover:bg-green-500/10 hover:border-green-500 dark:text-green-400",
                  onClick: () => openModal("approve", course),
                  "data-ocid": `course_approvals.approve_button.${i + 1}`,
                  type: "button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5 mr-1" }),
                    "Approve"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "h-7 text-xs border-destructive/40 text-destructive hover:bg-destructive/10 hover:border-destructive",
                  onClick: () => openModal("reject", course),
                  "data-ocid": `course_approvals.reject_button.${i + 1}`,
                  type: "button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5 mr-1" }),
                    "Reject"
                  ]
                }
              )
            ] }) })
          ]
        },
        course.id
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!modal, onOpenChange: (open) => !open && closeModal(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "course_approvals.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        (modal == null ? void 0 : modal.type) === "approve" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-green-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5 text-destructive" }),
        (modal == null ? void 0 : modal.type) === "approve" ? "Approve Course" : "Reject Course"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
        modal && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg px-3 py-2.5 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: modal.course.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            modal.course.languagePair,
            " ·",
            " ",
            modal.course.price === 0 ? "Free" : `₹${modal.course.price.toLocaleString("en-IN")}`
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Label,
            {
              htmlFor: "admin-notes",
              className: "text-sm font-medium text-foreground",
              children: [
                "Admin Notes",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal ml-1", children: "(optional)" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "admin-notes",
              placeholder: (modal == null ? void 0 : modal.type) === "approve" ? "Any notes for the course creator…" : "Reason for rejection — explain what needs to be changed…",
              value: adminNotes,
              onChange: (e) => setAdminNotes(e.target.value),
              rows: 3,
              className: "resize-none",
              "data-ocid": "course_approvals.admin_notes_textarea"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2 sm:gap-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: closeModal,
            disabled: isMutating,
            "data-ocid": "course_approvals.cancel_button",
            type: "button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: (modal == null ? void 0 : modal.type) === "approve" ? "default" : "destructive",
            onClick: handleConfirm,
            disabled: isMutating,
            "data-ocid": "course_approvals.confirm_button",
            type: "button",
            children: isMutating ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" }),
              "Processing…"
            ] }) : (modal == null ? void 0 : modal.type) === "approve" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }),
              "Confirm Approval"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" }),
              "Confirm Rejection"
            ] })
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  AdminCourseApprovalsPage as default
};
