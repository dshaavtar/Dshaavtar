import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BookOpen, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { CourseRow } from "../backend.d";
import { useBackendActor } from "../hooks/useBackend";
import { useLanguageLearning } from "../hooks/useLanguageLearning";

type NormalisedPendingCourse = {
  id: string;
  title: string;
  creatorPhone: string;
  languagePair: string;
  price: number;
  createdDate: number;
  description: string;
  status: string;
};

function normalise(c: CourseRow): NormalisedPendingCourse {
  return {
    id: c.id,
    title: c.title,
    creatorPhone:
      (c as CourseRow & { creatorPhone?: string }).creatorPhone ?? "—",
    languagePair: c.languagePair,
    price: Number(c.price),
    createdDate: Number(c.createdDate),
    description: c.description,
    status: c.status,
  };
}

function formatDate(ns: number): string {
  if (!ns || ns === 0) return "—";
  // ICP timestamps are in nanoseconds
  const ms = ns > 1e15 ? ns / 1_000_000 : ns;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

type ActionModal = {
  type: "approve" | "reject";
  course: NormalisedPendingCourse;
};

function RowSkeleton() {
  return (
    <tr>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

export default function AdminCourseApprovalsPage() {
  const { actor } = useBackendActor();
  const { approveCourse, rejectCourse } = useLanguageLearning();
  const queryClient = useQueryClient();

  const [modal, setModal] = useState<ActionModal | null>(null);
  const [adminNotes, setAdminNotes] = useState("");

  const pendingQuery = useQuery<NormalisedPendingCourse[]>({
    queryKey: ["pending-course-approvals"],
    queryFn: async () => {
      if (!actor) return [];
      // getPendingApprovals is a new backend method returning CourseRow[]
      const fn = (
        actor as unknown as Record<
          string,
          (...args: unknown[]) => Promise<CourseRow[]>
        >
      ).getPendingApprovals;
      if (typeof fn !== "function") return [];
      const res = await fn.call(actor);
      return (res ?? []).map(normalise);
    },
    enabled: !!actor,
    staleTime: 30_000,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["pending-course-approvals"] });

  const approveMutation = useMutation({
    mutationFn: ({ courseId, notes }: { courseId: string; notes: string }) =>
      approveCourse(courseId, notes),
    onSuccess: (result) => {
      if (result.ok) {
        toast.success("Course approved and published.");
        invalidate();
        closeModal();
      } else {
        toast.error(result.errorDetail ?? "Approval failed");
      }
    },
    onError: (err: Error) => toast.error(err?.message ?? "Approval failed"),
  });

  const rejectMutation = useMutation({
    mutationFn: ({ courseId, notes }: { courseId: string; notes: string }) =>
      rejectCourse(courseId, notes),
    onSuccess: (result) => {
      if (result.ok) {
        toast.success("Course rejected.");
        invalidate();
        closeModal();
      } else {
        toast.error(result.errorDetail ?? "Rejection failed");
      }
    },
    onError: (err: Error) => toast.error(err?.message ?? "Rejection failed"),
  });

  function openModal(
    type: "approve" | "reject",
    course: NormalisedPendingCourse,
  ) {
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

  return (
    <div className="space-y-6" data-ocid="course_approvals.page">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Course Approvals
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Review and approve user-submitted language courses before they go
            public.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!pendingQuery.isLoading && (
            <span
              className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
              data-ocid="course_approvals.pending_count"
            >
              {courses.length} pending
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => pendingQuery.refetch()}
            data-ocid="course_approvals.refresh_button"
            type="button"
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Table card */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b border-border">
                <th className="text-left px-4 py-3 font-semibold text-foreground">
                  Title
                </th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">
                  Creator
                </th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">
                  Language Pair
                </th>
                <th className="text-right px-4 py-3 font-semibold text-foreground">
                  Price
                </th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">
                  Submitted
                </th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pendingQuery.isLoading ? (
                <>
                  <RowSkeleton />
                  <RowSkeleton />
                  <RowSkeleton />
                </>
              ) : pendingQuery.isError ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center"
                    data-ocid="course_approvals.error_state"
                  >
                    <p className="text-muted-foreground">
                      Failed to load pending approvals.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      onClick={() => pendingQuery.refetch()}
                      type="button"
                    >
                      Retry
                    </Button>
                  </td>
                </tr>
              ) : courses.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-16 text-center"
                    data-ocid="course_approvals.empty_state"
                  >
                    <CheckCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-60" />
                    <p className="font-medium text-foreground">
                      No pending courses
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      All submitted courses have been reviewed.
                    </p>
                  </td>
                </tr>
              ) : (
                courses.map((course, i) => (
                  <tr
                    key={course.id}
                    className="hover:bg-muted/20 transition-colors"
                    data-ocid={`course_approvals.item.${i + 1}`}
                  >
                    <td className="px-4 py-3">
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate max-w-[200px]">
                          {course.title}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">
                          {course.description}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {course.creatorPhone}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {course.languagePair}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-foreground">
                      {course.price === 0 ? (
                        <span className="text-xs text-primary font-semibold">
                          Free
                        </span>
                      ) : (
                        `₹${course.price.toLocaleString("en-IN")}`
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {formatDate(course.createdDate)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs border-green-500/40 text-green-600 hover:bg-green-500/10 hover:border-green-500 dark:text-green-400"
                          onClick={() => openModal("approve", course)}
                          data-ocid={`course_approvals.approve_button.${i + 1}`}
                          type="button"
                        >
                          <CheckCircle className="w-3.5 h-3.5 mr-1" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs border-destructive/40 text-destructive hover:bg-destructive/10 hover:border-destructive"
                          onClick={() => openModal("reject", course)}
                          data-ocid={`course_approvals.reject_button.${i + 1}`}
                          type="button"
                        >
                          <XCircle className="w-3.5 h-3.5 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approve / Reject modal */}
      <Dialog open={!!modal} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="max-w-md" data-ocid="course_approvals.dialog">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {modal?.type === "approve" ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-destructive" />
              )}
              {modal?.type === "approve" ? "Approve Course" : "Reject Course"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {modal && (
              <div className="bg-muted/40 rounded-lg px-3 py-2.5 space-y-1">
                <p className="font-semibold text-sm text-foreground">
                  {modal.course.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {modal.course.languagePair} ·{" "}
                  {modal.course.price === 0
                    ? "Free"
                    : `₹${modal.course.price.toLocaleString("en-IN")}`}
                </p>
              </div>
            )}

            <div className="space-y-1.5">
              <Label
                htmlFor="admin-notes"
                className="text-sm font-medium text-foreground"
              >
                Admin Notes
                <span className="text-muted-foreground font-normal ml-1">
                  (optional)
                </span>
              </Label>
              <Textarea
                id="admin-notes"
                placeholder={
                  modal?.type === "approve"
                    ? "Any notes for the course creator…"
                    : "Reason for rejection — explain what needs to be changed…"
                }
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={3}
                className="resize-none"
                data-ocid="course_approvals.admin_notes_textarea"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={closeModal}
              disabled={isMutating}
              data-ocid="course_approvals.cancel_button"
              type="button"
            >
              Cancel
            </Button>
            <Button
              variant={modal?.type === "approve" ? "default" : "destructive"}
              onClick={handleConfirm}
              disabled={isMutating}
              data-ocid="course_approvals.confirm_button"
              type="button"
            >
              {isMutating ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  Processing…
                </span>
              ) : modal?.type === "approve" ? (
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  Confirm Approval
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" />
                  Confirm Rejection
                </span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
