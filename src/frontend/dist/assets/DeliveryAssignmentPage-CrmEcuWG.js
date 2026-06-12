import { _ as useBackendActor, r as reactExports, j as jsxRuntimeExports, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-Dx8tJeYi.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Separator } from "./separator-DqiCXh2l.js";
import { T as Textarea } from "./textarea-Bmq1MNcJ.js";
import { T as Truck } from "./truck-MwLrSz0P.js";
import { U as Users } from "./users-BCFHEKUR.js";
import { C as CircleCheck } from "./circle-check-0H_z7k0M.js";
import { L as LoaderCircle } from "./loader-circle-QuKDriBT.js";
import { M as MapPin } from "./map-pin-DGvTRx32.js";
import { P as Phone } from "./phone-sT0WBdc4.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-BtrS4JsN.js";
import "./index-IXOTxK3N.js";
import "./index-CUcO6jhF.js";
import "./index-yUS8KoxU.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-DYndF6Sn.js";
import "./index-z5OST4d2.js";
import "./chevron-down-gIU8OsEH.js";
import "./createLucideIcon-BGWdtUCJ.js";
import "./check-CO9wi49t.js";
import "./chevron-up-BzRcvKHL.js";
function DeliveryAssignmentPage() {
  const { actor } = useBackendActor();
  const [requesterType, setRequesterType] = reactExports.useState("Merchant");
  const [requesterId, setRequesterId] = reactExports.useState("");
  const [city, setCity] = reactExports.useState("");
  const [requestedCount, setRequestedCount] = reactExports.useState(1);
  const [description, setDescription] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [submitSuccess, setSubmitSuccess] = reactExports.useState(false);
  const [cities, setCities] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (!actor) return;
    const actorAny = actor;
    const fn = actorAny.getAllCities;
    if (typeof fn !== "function") return;
    fn.call(actor).then((res) => {
      if (Array.isArray(res)) {
        setCities(
          res.map((item) => {
            if (typeof item === "string") return item;
            const obj = item;
            return String(
              obj.name ?? obj.cityName ?? obj.cityId ?? obj.id ?? item
            );
          })
        );
      }
    }).catch(() => {
    });
  }, [actor]);
  const [partners, setPartners] = reactExports.useState([]);
  const [loadingPartners, setLoadingPartners] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!actor || !city) return;
    setLoadingPartners(true);
    const actorAny = actor;
    const fn = actorAny.getAvailableDeliveryPartners;
    if (typeof fn !== "function") {
      setLoadingPartners(false);
      return;
    }
    fn.call(actor, city).then((res) => {
      const rows = Array.isArray(res) ? res : [];
      setPartners(
        rows.map((r) => ({
          id: String(r.id ?? ""),
          name: String(r.name ?? ""),
          phone: String(r.phone ?? ""),
          status: r.status === "assigned" ? "assigned" : "available"
        }))
      );
    }).catch(() => setPartners([])).finally(() => setLoadingPartners(false));
  }, [actor, city]);
  const [lookupId, setLookupId] = reactExports.useState("");
  const [assignments, setAssignments] = reactExports.useState([]);
  const [loadingAssignments, setLoadingAssignments] = reactExports.useState(false);
  const [routeEdits, setRouteEdits] = reactExports.useState({});
  const [savingRoute, setSavingRoute] = reactExports.useState({});
  async function lookupAssignments() {
    if (!actor || !lookupId.trim()) return;
    setLoadingAssignments(true);
    try {
      const actorAny = actor;
      const fn = actorAny.getDeliveryAssignments;
      if (typeof fn !== "function")
        throw new Error("getDeliveryAssignments not available");
      const res = await fn.call(actor, lookupId.trim());
      const rows = Array.isArray(res) ? res : [];
      setAssignments(
        rows.map((r, i) => ({
          assignmentId: String(r.assignmentId ?? r.id ?? `assign-${i}`),
          date: String(r.date ?? r.createdAt ?? ""),
          requestedCount: Number(r.requestedCount ?? 0),
          partners: Array.isArray(r.partners) ? r.partners.map((p) => ({
            partnerId: String(p.partnerId ?? p.id ?? ""),
            partnerName: String(p.partnerName ?? p.name ?? ""),
            partnerPhone: String(p.partnerPhone ?? p.phone ?? ""),
            route: String(p.route ?? "")
          })) : []
        }))
      );
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to load assignments"
      );
      setAssignments([]);
    } finally {
      setLoadingAssignments(false);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!actor) {
      ue.error("Actor not ready");
      return;
    }
    if (!requesterId.trim()) {
      ue.error("Requester ID is required");
      return;
    }
    if (!city) {
      ue.error("Please select a city");
      return;
    }
    setSubmitting(true);
    setSubmitSuccess(false);
    try {
      const actorAny = actor;
      const fn = actorAny.createDeliveryAssignment;
      if (typeof fn !== "function")
        throw new Error("createDeliveryAssignment not available");
      const res = await fn.call(actor, {
        requesterId: requesterId.trim(),
        requesterType,
        requestedCount,
        city,
        description: description.trim()
      });
      if (res && typeof res === "object" && "err" in res) {
        throw new Error(
          String(res.err ?? "Assignment failed")
        );
      }
      setSubmitSuccess(true);
      ue.success(
        `Assignment created — ${requestedCount} delivery partner(s) assigned`
      );
      if (city) setCity((c) => c);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to create assignment"
      );
    } finally {
      setSubmitting(false);
    }
  }
  async function handleUpdateRoute(assignmentId, partnerId, routeKey) {
    if (!actor) return;
    setSavingRoute((p) => ({ ...p, [routeKey]: true }));
    try {
      const actorAny = actor;
      const fn = actorAny.updateAssignmentRoute;
      if (typeof fn !== "function")
        throw new Error("updateAssignmentRoute not available");
      await fn.call(actor, assignmentId, partnerId, routeEdits[routeKey] ?? "");
      ue.success("Route updated");
      setAssignments(
        (prev) => prev.map(
          (a) => a.assignmentId === assignmentId ? {
            ...a,
            partners: a.partners.map(
              (p) => p.partnerId === partnerId ? { ...p, route: routeEdits[routeKey] ?? "" } : p
            )
          } : a
        )
      );
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to update route"
      );
    } finally {
      setSavingRoute((p) => ({ ...p, [routeKey]: false }));
    }
  }
  const availableCount = partners.filter(
    (p) => p.status === "available"
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "delivery-assignment.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-display font-bold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-6 h-6 text-primary" }),
        "Delivery Partner Assignment"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Assign available delivery partners to merchants or manufacturers. Exact count requested will be assigned from the pool." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "delivery-assignment.new_assignment.card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
          " New Assignment"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Requester Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4", children: ["Merchant", "Manufacturer"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                className: "flex items-center gap-2 cursor-pointer text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "radio",
                      name: "requesterType",
                      value: t,
                      checked: requesterType === t,
                      onChange: () => setRequesterType(t),
                      className: "accent-primary",
                      "data-ocid": `delivery-assignment.requester_type.${t.toLowerCase()}`
                    }
                  ),
                  t
                ]
              },
              t
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "requesterId", children: "Requester ID / Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "requesterId",
                placeholder: "e.g. +91-9876543210 or MER-001",
                value: requesterId,
                onChange: (e) => setRequesterId(e.target.value),
                "data-ocid": "delivery-assignment.requester_id.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "City" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: city,
                onValueChange: setCity,
                "data-ocid": "delivery-assignment.city.select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "delivery-assignment.city.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select city…" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: cities.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__none__", disabled: true, children: "Loading cities…" }) : cities.map((c) => {
                    const cn = typeof c === "string" ? c : String(
                      c.name ?? c.cityName ?? c.cityId ?? c
                    );
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cn, children: cn }, cn);
                  }) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "requestedCount", children: [
              "Requested Count",
              " ",
              city && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                "(",
                availableCount,
                " available)"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "requestedCount",
                type: "number",
                min: 1,
                max: 20,
                value: requestedCount,
                onChange: (e) => setRequestedCount(
                  Math.min(20, Math.max(1, Number(e.target.value)))
                ),
                "data-ocid": "delivery-assignment.count.input"
              }
            ),
            city && requestedCount > availableCount && availableCount >= 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-600 dark:text-amber-400", children: [
              "⚠️ Only ",
              availableCount,
              " partner(s) available in ",
              city
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", children: "Route / Job Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "description",
                placeholder: "Describe the delivery route or job…",
                rows: 3,
                value: description,
                onChange: (e) => setDescription(e.target.value),
                "data-ocid": "delivery-assignment.description.textarea"
              }
            )
          ] }),
          submitSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 text-sm text-green-700 dark:text-green-400",
              "data-ocid": "delivery-assignment.success_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
                " Assignment created successfully!"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "submit",
              disabled: submitting || !actor,
              className: "w-full",
              "data-ocid": "delivery-assignment.submit_button",
              children: [
                submitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4 mr-2" }),
                submitting ? "Assigning…" : `Assign ${requestedCount} Partner(s)`
              ]
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "delivery-assignment.available_partners.card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }),
          "Available Partners",
          city && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "ml-auto", children: city })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: !city ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-sm text-muted-foreground py-6 text-center",
            "data-ocid": "delivery-assignment.available_partners.empty_state",
            children: "Select a city to see available partners"
          }
        ) : loadingPartners ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 py-6 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Loading…" })
        ] }) : partners.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "text-sm text-muted-foreground py-6 text-center",
            "data-ocid": "delivery-assignment.available_partners.empty_state",
            children: [
              "No delivery partners found in ",
              city
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: partners.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between rounded-md border border-border px-3 py-2",
            "data-ocid": `delivery-assignment.partner.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: p.name || "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
                  " ",
                  p.phone || "—"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: p.status === "available" ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 border-0" : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-0",
                  children: p.status === "available" ? "Available" : "Assigned"
                }
              )
            ]
          },
          p.id || i
        )) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "delivery-assignment.my_assignments.card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "My Assignments" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Enter Requester ID to look up assignments…",
              value: lookupId,
              onChange: (e) => setLookupId(e.target.value),
              onKeyDown: (e) => e.key === "Enter" && lookupAssignments(),
              "data-ocid": "delivery-assignment.lookup.input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: lookupAssignments,
              disabled: loadingAssignments || !lookupId.trim(),
              "data-ocid": "delivery-assignment.lookup.button",
              children: loadingAssignments ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" })
            }
          )
        ] }),
        assignments.length === 0 && !loadingAssignments ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-sm text-muted-foreground py-4 text-center",
            "data-ocid": "delivery-assignment.my_assignments.empty_state",
            children: lookupId ? "No assignments found" : "Enter a requester ID above to look up"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: assignments.map((asgn, ai) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-lg border border-border p-4 space-y-3",
            "data-ocid": `delivery-assignment.assignment.${ai + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground", children: asgn.assignmentId }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                    asgn.date ? new Date(Number(asgn.date)).toLocaleDateString() : "—",
                    " ",
                    "· ",
                    asgn.requestedCount,
                    " partner(s) requested"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
                  asgn.partners.length,
                  " assigned"
                ] })
              ] }),
              asgn.partners.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: asgn.partners.map((partner, pi) => {
                const routeKey = `${asgn.assignmentId}-${partner.partnerId}`;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex flex-col sm:flex-row gap-2 sm:items-center rounded-md bg-muted/40 px-3 py-2",
                    "data-ocid": `delivery-assignment.partner_row.${pi + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: partner.partnerName || "Partner" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
                          " ",
                          partner.partnerPhone
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            className: "h-8 text-xs flex-1",
                            placeholder: "Route description…",
                            value: routeEdits[routeKey] ?? partner.route,
                            onChange: (e) => setRouteEdits((prev) => ({
                              ...prev,
                              [routeKey]: e.target.value
                            })),
                            "data-ocid": `delivery-assignment.route.input.${pi + 1}`
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            type: "button",
                            size: "sm",
                            variant: "outline",
                            onClick: () => handleUpdateRoute(
                              asgn.assignmentId,
                              partner.partnerId,
                              routeKey
                            ),
                            disabled: savingRoute[routeKey],
                            "data-ocid": `delivery-assignment.save_route.button.${pi + 1}`,
                            children: savingRoute[routeKey] ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }) : "Save"
                          }
                        )
                      ] })
                    ]
                  },
                  partner.partnerId || pi
                );
              }) })
            ]
          },
          asgn.assignmentId
        )) })
      ] })
    ] })
  ] });
}
export {
  DeliveryAssignmentPage as default
};
