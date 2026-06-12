import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  CheckCircle2,
  CreditCard,
  Globe,
  Plus,
  Search,
  Tag,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useLanguageLearning } from "../hooks/useLanguageLearning";
import type { NormalisedCourse } from "../hooks/useLanguageLearning";

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
  "French → English",
];

function CourseCardSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/3 mt-1" />
      </CardHeader>
      <CardContent className="flex-1 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
      <CardFooter className="border-t pt-3">
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  );
}

function CourseCard({
  course,
  onEnroll,
  enrollingId,
}: {
  course: NormalisedCourse;
  onEnroll: (course: NormalisedCourse) => void;
  enrollingId: string | null;
}) {
  const isFree = course.price === 0;
  const isEnrolling = enrollingId === course.id;

  return (
    <Card
      className="flex flex-col hover:shadow-md transition-shadow duration-200 border-border"
      data-ocid="language_learning.course.card"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground text-base leading-tight line-clamp-2">
            {course.title}
          </h3>
          {isFree ? (
            <Badge
              variant="secondary"
              className="shrink-0 text-xs bg-primary/10 text-primary border-primary/20"
            >
              Free
            </Badge>
          ) : (
            <Badge variant="secondary" className="shrink-0 text-xs">
              ₹{course.price}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <Globe className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-medium">
            {course.languagePair}
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {course.description}
        </p>
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="w-3.5 h-3.5" />
            <span>{course.enrollmentCount} enrolled</span>
          </div>
          {course.status && course.status !== "approved" && (
            <Badge variant="outline" className="text-xs capitalize">
              {course.status}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="border-t pt-3">
        <Button
          data-ocid={
            isFree
              ? "language_learning.enroll_button"
              : "language_learning.pay_enroll_button"
          }
          className="w-full"
          variant={isFree ? "default" : "outline"}
          size="sm"
          onClick={() => onEnroll(course)}
          disabled={isEnrolling}
        >
          {isEnrolling ? (
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
              Processing...
            </span>
          ) : isFree ? (
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Enroll Now
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5" />
              Pay &amp; Enroll
            </span>
          )}
        </Button>
      </CardFooter>
    </Card>
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
  "Other",
];

function CreateCourseForm({ onSuccess }: { onSuccess: () => void }) {
  const { addCourse } = useLanguageLearning();
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("English");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState(
    typeof window !== "undefined"
      ? (localStorage.getItem("userPhone") ?? "")
      : "",
  );
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addCourse(phone, title, language, description, price);
    onSuccess();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded-lg p-4 mb-4 bg-card space-y-3"
    >
      <h3 className="font-semibold text-base">Create a Language Course</h3>
      <div>
        <Label>Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Language</Label>
        <select
          className="w-full border rounded px-2 py-1.5 text-sm"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {LANGUAGES.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </div>
      <div>
        <Label>Price (0 = Free)</Label>
        <Input
          type="number"
          min={0}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>
      <div>
        <Label>Your Phone</Label>
        <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <Button type="submit" size="sm">
        Submit for Review
      </Button>
    </form>
  );
}

export default function LanguageLearningPage() {
  const [keyword, setKeyword] = useState("");
  const [selectedPair, setSelectedPair] = useState("All");
  const [enrollingId, setEnrollingId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [created, setCreated] = useState(false);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("create") === "1")
      setShowCreate(true);
  }, []);
  const queryClient = useQueryClient();
  const { searchCourses, enrollUser } = useLanguageLearning();

  const searchQuery = useQuery({
    queryKey: ["language-courses", keyword, selectedPair],
    queryFn: () =>
      searchCourses(keyword, selectedPair === "All" ? "" : selectedPair),
    staleTime: 30_000,
  });

  const enrollMutation = useMutation({
    mutationFn: (course: NormalisedCourse) =>
      enrollUser("guest_user", course.id),
    onMutate: (course) => setEnrollingId(course.id),
    onSuccess: (result) => {
      setEnrollingId(null);
      if (result.ok) {
        toast.success("Enrolled successfully! Check My Learning.", {
          duration: 4000,
        });
        queryClient.invalidateQueries({ queryKey: ["user-enrollments"] });
      } else {
        toast.error(result.errorDetail ?? "Enrollment failed");
      }
    },
    onError: (err: Error) => {
      setEnrollingId(null);
      toast.error(err.message ?? "Enrollment failed");
    },
  });

  const handleEnroll = useCallback(
    (course: NormalisedCourse) => enrollMutation.mutate(course),
    [enrollMutation],
  );

  const courses = searchQuery.data ?? [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-2xl font-bold text-foreground">
            Language Courses
          </h1>
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-1"
            onClick={() => setShowCreate((s) => !s)}
            data-ocid="language_learning.create_course_button"
          >
            <Plus className="h-4 w-4" />
            {showCreate ? "Cancel" : "Create Course"}
          </Button>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">
          Discover and enroll in courses to start your language journey.
        </p>
        {created && (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded p-3 mt-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Your course has been submitted for admin review.</span>
          </div>
        )}
        {showCreate && (
          <CreateCourseForm
            onSuccess={() => {
              setCreated(true);
              setShowCreate(false);
            }}
          />
        )}
      </div>

      {/* Search + Filter */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            data-ocid="language_learning.search_input"
            className="pl-9"
            placeholder="Search courses by keyword…"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Tag className="w-4 h-4 text-muted-foreground shrink-0" />
          {LANGUAGE_PAIRS.map((pair) => (
            <button
              key={pair}
              type="button"
              data-ocid="language_learning.filter.tab"
              onClick={() => setSelectedPair(pair)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors duration-150 whitespace-nowrap ${
                selectedPair === pair
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:bg-muted"
              }`}
            >
              {pair}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {searchQuery.isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((k) => (
            <CourseCardSkeleton key={k} />
          ))}
        </div>
      ) : searchQuery.isError ? (
        <div
          data-ocid="language_learning.error_state"
          className="text-center py-16 text-muted-foreground"
        >
          <p className="text-lg font-medium mb-2">Failed to load courses</p>
          <p className="text-sm">Please try again.</p>
        </div>
      ) : courses.length === 0 ? (
        <div
          data-ocid="language_learning.empty_state"
          className="text-center py-16 bg-card border border-border rounded-xl"
        >
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-lg font-medium text-foreground mb-1">
            No courses found
          </p>
          <p className="text-sm text-muted-foreground">
            Try a different keyword or language pair.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEnroll={handleEnroll}
              enrollingId={enrollingId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
