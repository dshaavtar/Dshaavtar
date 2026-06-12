import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Loader2,
  MapPin,
  Phone,
  RefreshCw,
  Truck,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useBackendActor } from "../hooks/useBackend";

interface AvailablePartner {
  id: string;
  name: string;
  phone: string;
  status: "available" | "assigned";
}

interface AssignedPartnerRow {
  partnerId: string;
  partnerName: string;
  partnerPhone: string;
  route: string;
}

interface AssignmentRecord {
  assignmentId: string;
  date: string;
  requestedCount: number;
  partners: AssignedPartnerRow[];
}

export default function DeliveryAssignmentPage() {
  const { actor } = useBackendActor();

  // ── Form state ───────────────────────────────────────────────────────────
  const [requesterType, setRequesterType] = useState<
    "Merchant" | "Manufacturer"
  >("Merchant");
  const [requesterId, setRequesterId] = useState("");
  const [city, setCity] = useState("");
  const [requestedCount, setRequestedCount] = useState(1);
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // ── City list ────────────────────────────────────────────────────────────
  const [cities, setCities] = useState<string[]>([]);
  useEffect(() => {
    if (!actor) return;
    const actorAny = actor as unknown as Record<
      string,
      (...a: unknown[]) => Promise<unknown>
    >;
    const fn = actorAny.getAllCities;
    if (typeof fn !== "function") return;
    fn.call(actor)
      .then((res) => {
        if (Array.isArray(res)) {
          setCities(
            (res as unknown[]).map((item) => {
              if (typeof item === "string") return item;
              const obj = item as Record<string, unknown>;
              return String(
                obj.name ?? obj.cityName ?? obj.cityId ?? obj.id ?? item,
              );
            }),
          );
        }
      })
      .catch(() => {});
  }, [actor]);

  // ── Available partners ───────────────────────────────────────────────────
  const [partners, setPartners] = useState<AvailablePartner[]>([]);
  const [loadingPartners, setLoadingPartners] = useState(false);

  useEffect(() => {
    if (!actor || !city) return;
    setLoadingPartners(true);
    const actorAny = actor as unknown as Record<
      string,
      (...a: unknown[]) => Promise<unknown>
    >;
    const fn = actorAny.getAvailableDeliveryPartners;
    if (typeof fn !== "function") {
      setLoadingPartners(false);
      return;
    }
    fn.call(actor, city)
      .then((res) => {
        const rows = Array.isArray(res)
          ? (res as Record<string, unknown>[])
          : [];
        setPartners(
          rows.map((r) => ({
            id: String(r.id ?? ""),
            name: String(r.name ?? ""),
            phone: String(r.phone ?? ""),
            status: r.status === "assigned" ? "assigned" : "available",
          })),
        );
      })
      .catch(() => setPartners([]))
      .finally(() => setLoadingPartners(false));
  }, [actor, city]);

  // ── My assignments lookup ────────────────────────────────────────────────
  const [lookupId, setLookupId] = useState("");
  const [assignments, setAssignments] = useState<AssignmentRecord[]>([]);
  const [loadingAssignments, setLoadingAssignments] = useState(false);
  const [routeEdits, setRouteEdits] = useState<Record<string, string>>({});
  const [savingRoute, setSavingRoute] = useState<Record<string, boolean>>({});

  async function lookupAssignments() {
    if (!actor || !lookupId.trim()) return;
    setLoadingAssignments(true);
    try {
      const actorAny = actor as unknown as Record<
        string,
        (...a: unknown[]) => Promise<unknown>
      >;
      const fn = actorAny.getDeliveryAssignments;
      if (typeof fn !== "function")
        throw new Error("getDeliveryAssignments not available");
      const res = await fn.call(actor, lookupId.trim());
      const rows = Array.isArray(res) ? (res as Record<string, unknown>[]) : [];
      setAssignments(
        rows.map((r, i) => ({
          assignmentId: String(r.assignmentId ?? r.id ?? `assign-${i}`),
          date: String(r.date ?? r.createdAt ?? ""),
          requestedCount: Number(r.requestedCount ?? 0),
          partners: Array.isArray(r.partners)
            ? (r.partners as Record<string, unknown>[]).map((p) => ({
                partnerId: String(p.partnerId ?? p.id ?? ""),
                partnerName: String(p.partnerName ?? p.name ?? ""),
                partnerPhone: String(p.partnerPhone ?? p.phone ?? ""),
                route: String(p.route ?? ""),
              }))
            : [],
        })),
      );
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to load assignments",
      );
      setAssignments([]);
    } finally {
      setLoadingAssignments(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!actor) {
      toast.error("Actor not ready");
      return;
    }
    if (!requesterId.trim()) {
      toast.error("Requester ID is required");
      return;
    }
    if (!city) {
      toast.error("Please select a city");
      return;
    }
    setSubmitting(true);
    setSubmitSuccess(false);
    try {
      const actorAny = actor as unknown as Record<
        string,
        (...a: unknown[]) => Promise<unknown>
      >;
      const fn = actorAny.createDeliveryAssignment;
      if (typeof fn !== "function")
        throw new Error("createDeliveryAssignment not available");
      const res = await fn.call(actor, {
        requesterId: requesterId.trim(),
        requesterType,
        requestedCount,
        city,
        description: description.trim(),
      });
      if (res && typeof res === "object" && "err" in (res as object)) {
        throw new Error(
          String((res as Record<string, unknown>).err ?? "Assignment failed"),
        );
      }
      setSubmitSuccess(true);
      toast.success(
        `Assignment created — ${requestedCount} delivery partner(s) assigned`,
      );
      // Refresh available partners
      if (city) setCity((c) => c); // trigger re-fetch
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create assignment",
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleUpdateRoute(
    assignmentId: string,
    partnerId: string,
    routeKey: string,
  ) {
    if (!actor) return;
    setSavingRoute((p) => ({ ...p, [routeKey]: true }));
    try {
      const actorAny = actor as unknown as Record<
        string,
        (...a: unknown[]) => Promise<unknown>
      >;
      const fn = actorAny.updateAssignmentRoute;
      if (typeof fn !== "function")
        throw new Error("updateAssignmentRoute not available");
      await fn.call(actor, assignmentId, partnerId, routeEdits[routeKey] ?? "");
      toast.success("Route updated");
      // Update local state
      setAssignments((prev) =>
        prev.map((a) =>
          a.assignmentId === assignmentId
            ? {
                ...a,
                partners: a.partners.map((p) =>
                  p.partnerId === partnerId
                    ? { ...p, route: routeEdits[routeKey] ?? "" }
                    : p,
                ),
              }
            : a,
        ),
      );
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update route",
      );
    } finally {
      setSavingRoute((p) => ({ ...p, [routeKey]: false }));
    }
  }

  const availableCount = partners.filter(
    (p) => p.status === "available",
  ).length;

  return (
    <div className="space-y-6" data-ocid="delivery-assignment.page">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
          <Truck className="w-6 h-6 text-primary" />
          Delivery Partner Assignment
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Assign available delivery partners to merchants or manufacturers.
          Exact count requested will be assigned from the pool.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Section 1: New Assignment ────────────────────────────────── */}
        <Card data-ocid="delivery-assignment.new_assignment.card">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-4 h-4" /> New Assignment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Requester type */}
              <div className="space-y-1.5">
                <Label>Requester Type</Label>
                <div className="flex gap-4">
                  {(["Merchant", "Manufacturer"] as const).map((t) => (
                    <label
                      key={t}
                      className="flex items-center gap-2 cursor-pointer text-sm"
                    >
                      <input
                        type="radio"
                        name="requesterType"
                        value={t}
                        checked={requesterType === t}
                        onChange={() => setRequesterType(t)}
                        className="accent-primary"
                        data-ocid={`delivery-assignment.requester_type.${t.toLowerCase()}`}
                      />
                      {t}
                    </label>
                  ))}
                </div>
              </div>

              {/* Requester ID */}
              <div className="space-y-1.5">
                <Label htmlFor="requesterId">Requester ID / Phone</Label>
                <Input
                  id="requesterId"
                  placeholder="e.g. +91-9876543210 or MER-001"
                  value={requesterId}
                  onChange={(e) => setRequesterId(e.target.value)}
                  data-ocid="delivery-assignment.requester_id.input"
                />
              </div>

              {/* City */}
              <div className="space-y-1.5">
                <Label>City</Label>
                <Select
                  value={city}
                  onValueChange={setCity}
                  data-ocid="delivery-assignment.city.select"
                >
                  <SelectTrigger data-ocid="delivery-assignment.city.select">
                    <SelectValue placeholder="Select city…" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.length === 0 ? (
                      <SelectItem value="__none__" disabled>
                        Loading cities…
                      </SelectItem>
                    ) : (
                      cities.map((c) => {
                        const cn =
                          typeof c === "string"
                            ? c
                            : String(
                                (c as unknown as Record<string, unknown>)
                                  .name ??
                                  (c as unknown as Record<string, unknown>)
                                    .cityName ??
                                  (c as unknown as Record<string, unknown>)
                                    .cityId ??
                                  c,
                              );
                        return (
                          <SelectItem key={cn} value={cn}>
                            {cn}
                          </SelectItem>
                        );
                      })
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Requested count */}
              <div className="space-y-1.5">
                <Label htmlFor="requestedCount">
                  Requested Count{" "}
                  {city && (
                    <span className="text-muted-foreground">
                      ({availableCount} available)
                    </span>
                  )}
                </Label>
                <Input
                  id="requestedCount"
                  type="number"
                  min={1}
                  max={20}
                  value={requestedCount}
                  onChange={(e) =>
                    setRequestedCount(
                      Math.min(20, Math.max(1, Number(e.target.value))),
                    )
                  }
                  data-ocid="delivery-assignment.count.input"
                />
                {city &&
                  requestedCount > availableCount &&
                  availableCount >= 0 && (
                    <p className="text-xs text-amber-600 dark:text-amber-400">
                      ⚠️ Only {availableCount} partner(s) available in {city}
                    </p>
                  )}
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label htmlFor="description">Route / Job Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the delivery route or job…"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  data-ocid="delivery-assignment.description.textarea"
                />
              </div>

              {submitSuccess && (
                <div
                  className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400"
                  data-ocid="delivery-assignment.success_state"
                >
                  <CheckCircle2 className="w-4 h-4" /> Assignment created
                  successfully!
                </div>
              )}

              <Button
                type="submit"
                disabled={submitting || !actor}
                className="w-full"
                data-ocid="delivery-assignment.submit_button"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Truck className="w-4 h-4 mr-2" />
                )}
                {submitting
                  ? "Assigning…"
                  : `Assign ${requestedCount} Partner(s)`}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* ── Section 2: Available Partners ───────────────────────────── */}
        <Card data-ocid="delivery-assignment.available_partners.card">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Available Partners
              {city && (
                <Badge variant="outline" className="ml-auto">
                  {city}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!city ? (
              <p
                className="text-sm text-muted-foreground py-6 text-center"
                data-ocid="delivery-assignment.available_partners.empty_state"
              >
                Select a city to see available partners
              </p>
            ) : loadingPartners ? (
              <div className="flex items-center gap-2 py-6 justify-center">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Loading…</span>
              </div>
            ) : partners.length === 0 ? (
              <p
                className="text-sm text-muted-foreground py-6 text-center"
                data-ocid="delivery-assignment.available_partners.empty_state"
              >
                No delivery partners found in {city}
              </p>
            ) : (
              <div className="space-y-2">
                {partners.map((p, i) => (
                  <div
                    key={p.id || i}
                    className="flex items-center justify-between rounded-md border border-border px-3 py-2"
                    data-ocid={`delivery-assignment.partner.${i + 1}`}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {p.name || "—"}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {p.phone || "—"}
                      </p>
                    </div>
                    <Badge
                      className={
                        p.status === "available"
                          ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 border-0"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-0"
                      }
                    >
                      {p.status === "available" ? "Available" : "Assigned"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* ── Section 3: My Assignments ──────────────────────────────────────── */}
      <Card data-ocid="delivery-assignment.my_assignments.card">
        <CardHeader>
          <CardTitle className="text-base">My Assignments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter Requester ID to look up assignments…"
              value={lookupId}
              onChange={(e) => setLookupId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && lookupAssignments()}
              data-ocid="delivery-assignment.lookup.input"
            />
            <Button
              type="button"
              variant="outline"
              onClick={lookupAssignments}
              disabled={loadingAssignments || !lookupId.trim()}
              data-ocid="delivery-assignment.lookup.button"
            >
              {loadingAssignments ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
            </Button>
          </div>

          {assignments.length === 0 && !loadingAssignments ? (
            <p
              className="text-sm text-muted-foreground py-4 text-center"
              data-ocid="delivery-assignment.my_assignments.empty_state"
            >
              {lookupId
                ? "No assignments found"
                : "Enter a requester ID above to look up"}
            </p>
          ) : (
            <div className="space-y-4">
              {assignments.map((asgn, ai) => (
                <div
                  key={asgn.assignmentId}
                  className="rounded-lg border border-border p-4 space-y-3"
                  data-ocid={`delivery-assignment.assignment.${ai + 1}`}
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <p className="text-xs font-mono text-muted-foreground">
                        {asgn.assignmentId}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {asgn.date
                          ? new Date(Number(asgn.date)).toLocaleDateString()
                          : "—"}{" "}
                        · {asgn.requestedCount} partner(s) requested
                      </p>
                    </div>
                    <Badge variant="outline">
                      {asgn.partners.length} assigned
                    </Badge>
                  </div>

                  {asgn.partners.length > 0 && (
                    <div className="space-y-2">
                      {asgn.partners.map((partner, pi) => {
                        const routeKey = `${asgn.assignmentId}-${partner.partnerId}`;
                        return (
                          <div
                            key={partner.partnerId || pi}
                            className="flex flex-col sm:flex-row gap-2 sm:items-center rounded-md bg-muted/40 px-3 py-2"
                            data-ocid={`delivery-assignment.partner_row.${pi + 1}`}
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {partner.partnerName || "Partner"}
                              </p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Phone className="w-3 h-3" />{" "}
                                {partner.partnerPhone}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 flex-1">
                              <Input
                                className="h-8 text-xs flex-1"
                                placeholder="Route description…"
                                value={routeEdits[routeKey] ?? partner.route}
                                onChange={(e) =>
                                  setRouteEdits((prev) => ({
                                    ...prev,
                                    [routeKey]: e.target.value,
                                  }))
                                }
                                data-ocid={`delivery-assignment.route.input.${pi + 1}`}
                              />
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleUpdateRoute(
                                    asgn.assignmentId,
                                    partner.partnerId,
                                    routeKey,
                                  )
                                }
                                disabled={savingRoute[routeKey]}
                                data-ocid={`delivery-assignment.save_route.button.${pi + 1}`}
                              >
                                {savingRoute[routeKey] ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : (
                                  "Save"
                                )}
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
