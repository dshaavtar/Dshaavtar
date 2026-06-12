import { j as jsxRuntimeExports, dZ as PaySprintEnvironment, r as reactExports, aS as useGetAllPaySprintAPILogs, _ as useBackendActor, bE as useQuery, bF as useMutation, bG as useActor, ao as useQueryClient, p as ue, bH as createActor } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DuJeMgVG.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Switch } from "./switch-CSGIBB-2.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { I as Info } from "./info-BAL4LSDt.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { W as Wifi } from "./wifi-M1a8JQvE.js";
import { C as CircleAlert } from "./circle-alert-D81m_w7k.js";
import { C as Copy } from "./copy-ox5Tlh0O.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { C as CircleCheck } from "./circle-check-0H_z7k0M.js";
import { C as ChevronUp } from "./chevron-up-BzRcvKHL.js";
import { C as ChevronDown } from "./chevron-down-gIU8OsEH.js";
import { E as EyeOff } from "./eye-off-DrNsJOxE.js";
import { E as Eye } from "./eye-DqfilJSV.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CmjKy1Fn.js";
import "./index-CUcO6jhF.js";
import "./index-DYndF6Sn.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-BNXq-E6T.js";
import "./x-Chksmd6i.js";
import "./index-BtrS4JsN.js";
import "./index-z5OST4d2.js";
import "./index-yUS8KoxU.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }]
];
const CircleMinus = createLucideIcon("circle-minus", __iconNode);
const UAT_BASE_URL = "https://sit.paysprint.in/service-api/api/v1/service";
const LIVE_BASE_URL = "https://apisprint.paysprint.in/service-api/api/v1/service";
const SERVICES = [
  "Bus Booking",
  "Train Booking",
  "Flight Booking",
  "Mobile Recharge",
  "Bill Payment",
  "FastTag",
  "LPG Booking",
  "Municipality Payment",
  "Insurance Premium"
];
function tsToDisplay(ts) {
  if (ts === void 0 || ts === null) return "—";
  try {
    const n = typeof ts === "bigint" ? Number(ts) / 1e6 : ts;
    return new Date(n).toLocaleString();
  } catch {
    return "—";
  }
}
function useAllPaySprintCredentials() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["paysprint-credentials"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const fn = actor.getAllPaySprintCredentials;
        if (typeof fn === "function") {
          const res = await fn();
          return res ?? [];
        }
      } catch {
      }
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4
  });
}
function usePaySprintCallbacks() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["paysprint-callbacks"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const fn = actor.getAllPaySprintCallbacks;
        if (typeof fn === "function") {
          const res = await fn();
          return res ?? [];
        }
      } catch {
      }
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 2e4
  });
}
function useSavePaySprintCredential() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (cred) => {
      if (!actor) throw new Error("Actor not ready");
      const backendCred = {
        id: cred.id ?? "",
        serviceType: cred.serviceType,
        environment: cred.environment ?? PaySprintEnvironment.uat,
        partnerId: cred.partnerId ?? "",
        partnerKey: cred.partnerKey ?? "",
        authorisedKey: cred.authorisedKey ?? "",
        baseUrl: cred.baseUrl ?? "",
        isActive: cred.isActive ?? true,
        createdAt: BigInt(0),
        updatedAt: BigInt(Date.now()) * BigInt(1e6)
      };
      const result = await actor.savePaySprintCredential(backendCred);
      if ("err" in result) throw new Error(String(result.err));
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["paysprint-credentials"] });
      ue("Credentials saved successfully");
    },
    onError: (err) => {
      ue.error(
        `Failed: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  });
}
function useTestPaySprintConnection() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async (credId) => {
      if (!actor) throw new Error("Actor not ready");
      try {
        const fn = actor.testPaySprintConnectionPub;
        if (typeof fn === "function") {
          const res = await fn(credId);
          return res;
        }
      } catch (e) {
        return {
          credId,
          pass: false,
          statusCode: 0,
          responseTimeMs: 0,
          rawResponse: String(e)
        };
      }
      return {
        credId,
        pass: false,
        statusCode: 0,
        responseTimeMs: 0,
        rawResponse: "Method not available on this canister."
      };
    }
  });
}
function CredModal({
  open,
  onClose,
  service,
  environment,
  existing
}) {
  const save = useSavePaySprintCredential();
  const [partnerId, setPartnerId] = reactExports.useState((existing == null ? void 0 : existing.partnerId) ?? "");
  const [partnerKey, setPartnerKey] = reactExports.useState((existing == null ? void 0 : existing.partnerKey) ?? "");
  const [authorisedKey, setAuthorisedKey] = reactExports.useState(
    (existing == null ? void 0 : existing.authorisedKey) ?? ""
  );
  const [baseUrl, setBaseUrl] = reactExports.useState(
    (existing == null ? void 0 : existing.baseUrl) ?? (environment === PaySprintEnvironment.uat ? UAT_BASE_URL : LIVE_BASE_URL)
  );
  const [isActive, setIsActive] = reactExports.useState((existing == null ? void 0 : existing.isActive) ?? true);
  const [showKey, setShowKey] = reactExports.useState(false);
  async function handleSave() {
    try {
      await save.mutateAsync({
        id: existing == null ? void 0 : existing.id,
        serviceType: service,
        environment,
        partnerId,
        partnerKey,
        authorisedKey: environment === PaySprintEnvironment.uat ? authorisedKey : void 0,
        baseUrl,
        isActive
      });
      onClose();
    } catch {
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `text-xs font-bold px-2 py-0.5 rounded ${environment === PaySprintEnvironment.uat ? "bg-amber-500/20 text-amber-500" : "bg-green-500/20 text-green-500"}`,
          children: environment.toUpperCase()
        }
      ),
      service
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-md bg-muted/50 border border-border flex gap-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-primary" }),
        "JWT Token is embedded in the Partner Key field — paste your pre-generated JWT from the PaySprint dashboard."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ps-partner-id", children: "Partner ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "ps-partner-id",
            placeholder: "e.g. 100XXX",
            value: partnerId,
            onChange: (e) => setPartnerId(e.target.value),
            "data-ocid": "paysprint.partner_id_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ps-partner-key", children: "Partner Key (JWT)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "ps-partner-key",
              type: showKey ? "text" : "password",
              placeholder: "eyJhbGciOiJIUzI1NiIs…",
              value: partnerKey,
              onChange: (e) => setPartnerKey(e.target.value),
              className: "pr-9",
              "data-ocid": "paysprint.partner_key_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowKey((v) => !v),
              className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
              "aria-label": showKey ? "Hide key" : "Show key",
              children: showKey ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
            }
          )
        ] })
      ] }),
      environment === PaySprintEnvironment.uat && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ps-auth-key", children: "Authorised Key (UAT only)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "ps-auth-key",
            placeholder: "Auth key from PaySprint",
            value: authorisedKey,
            onChange: (e) => setAuthorisedKey(e.target.value),
            "data-ocid": "paysprint.authorised_key_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ps-base-url", children: "Base URL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "ps-base-url",
            value: baseUrl,
            onChange: (e) => setBaseUrl(e.target.value),
            "data-ocid": "paysprint.base_url_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            id: "ps-active",
            checked: isActive,
            onCheckedChange: setIsActive,
            "data-ocid": "paysprint.active_toggle"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ps-active", className: "cursor-pointer", children: "Active" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "paysprint.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: handleSave,
            disabled: save.isPending || !partnerId || !partnerKey,
            "data-ocid": "paysprint.save_button",
            children: save.isPending ? "Saving…" : "Save Credentials"
          }
        )
      ] })
    ] })
  ] }) });
}
function TestResultPanel({ result }) {
  const [expanded, setExpanded] = reactExports.useState(true);
  const [copied, setCopied] = reactExports.useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(
      typeof result.rawResponse === "object" ? JSON.stringify(result.rawResponse, null, 2) : result.rawResponse
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  const displayJson = (() => {
    try {
      return JSON.stringify(
        typeof result.rawResponse === "string" ? JSON.parse(result.rawResponse) : result.rawResponse,
        null,
        2
      );
    } catch {
      return String(result.rawResponse);
    }
  })();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `mt-2 rounded-lg border ${result.pass ? "border-green-500/30 bg-green-500/5" : "border-destructive/30 bg-destructive/5"}`,
      "data-ocid": "paysprint.test_result_panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setExpanded((v) => !v),
            className: "w-full flex items-center justify-between px-3 py-2 text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: `flex items-center gap-1 font-semibold ${result.pass ? "text-green-500" : "text-destructive"}`,
                    children: [
                      result.pass ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4" }),
                      result.pass ? "PASS" : "FAIL"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                  "HTTP ",
                  result.statusCode || "—"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                  result.responseTimeMs,
                  "ms"
                ] })
              ] }),
              expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
            ]
          }
        ),
        expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border px-3 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mt-2 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleCopy,
              className: "flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3" }),
                copied ? "Copied!" : "Copy"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "pre",
            {
              className: "text-xs font-mono bg-muted/50 rounded p-3 overflow-auto max-h-60 text-foreground whitespace-pre-wrap break-all",
              "data-ocid": "paysprint.raw_response_block",
              children: displayJson
            }
          )
        ] })
      ]
    }
  );
}
function CredentialsTab() {
  const { data: creds = [], isLoading } = useAllPaySprintCredentials();
  const testMut = useTestPaySprintConnection();
  const [modal, setModal] = reactExports.useState(null);
  const [testResults, setTestResults] = reactExports.useState(
    {}
  );
  const [testingId, setTestingId] = reactExports.useState(null);
  function getCred(service, environment) {
    return creds.find(
      (c) => c.serviceType === service && c.environment === environment
    );
  }
  function statusCell(service, environment) {
    const cred = getCred(service, environment);
    if (!cred || !cred.isActive) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleMinus, { className: "w-4 h-4" }),
        " Not configured"
      ] });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-green-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
      " Active"
    ] });
  }
  async function handleTest(service) {
    const cred = getCred(service, PaySprintEnvironment.live) ?? getCred(service, PaySprintEnvironment.uat);
    if (!cred) return;
    const key = `${service}_${cred.environment}`;
    setTestingId(key);
    try {
      const result = await testMut.mutateAsync(cred.id);
      setTestResults((prev) => ({ ...prev, [key]: result }));
    } finally {
      setTestingId(null);
    }
  }
  const modalCred = modal ? getCred(modal.service, modal.environment) : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-lg border border-amber-500/30 bg-amber-500/5 flex items-start gap-2 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "JWT Token:" }),
        " PaySprint uses JWT for authentication. Generate your JWT from the PaySprint dashboard and paste it into the ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Partner Key" }),
        " field. UAT and Live credentials are stored separately — toggle per service."
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: SERVICES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-12 rounded-lg bg-muted/50 animate-pulse"
      },
      s
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/50 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground", children: "Service" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground", children: "UAT" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground", children: "Live" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-muted-foreground", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: SERVICES.map((service, idx) => {
        var _a;
        const testKey = ((_a = getCred(service, PaySprintEnvironment.live)) == null ? void 0 : _a.id) ? `${service}_live` : `${service}_uat`;
        const testResult = testResults[testKey];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              "data-ocid": `paysprint.service_row.${idx + 1}`,
              className: "hover:bg-muted/30 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: service }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: statusCell(service, PaySprintEnvironment.uat) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: statusCell(service, PaySprintEnvironment.live) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      size: "sm",
                      onClick: () => setModal({
                        service,
                        environment: PaySprintEnvironment.uat
                      }),
                      className: "text-xs h-7 border-amber-500/50 text-amber-600 hover:bg-amber-500/10",
                      "data-ocid": `paysprint.edit_uat_button.${idx + 1}`,
                      children: "Edit UAT"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      size: "sm",
                      onClick: () => setModal({
                        service,
                        environment: PaySprintEnvironment.live
                      }),
                      className: "text-xs h-7 border-green-500/50 text-green-600 hover:bg-green-500/10",
                      "data-ocid": `paysprint.edit_live_button.${idx + 1}`,
                      children: "Edit Live"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      size: "sm",
                      disabled: testingId === testKey || testMut.isPending,
                      onClick: () => handleTest(service),
                      className: "text-xs h-7",
                      "data-ocid": `paysprint.test_button.${idx + 1}`,
                      children: [
                        testingId === testKey ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-3 h-3 mr-1" }),
                        "Test"
                      ]
                    }
                  )
                ] }) })
              ]
            }
          ),
          testResult && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "px-4 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TestResultPanel, { result: testResult }) }) })
        ] }, service);
      }) })
    ] }) }),
    modal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CredModal,
      {
        open: true,
        onClose: () => setModal(null),
        service: modal.service,
        environment: modal.environment,
        existing: modalCred
      }
    )
  ] });
}
function APILogsTab() {
  const {
    data: rawLogs = [],
    isLoading,
    refetch
  } = useGetAllPaySprintAPILogs();
  const logs = rawLogs ?? [];
  const [serviceFilter, setServiceFilter] = reactExports.useState("all");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [expandedRow, setExpandedRow] = reactExports.useState(null);
  const filtered = logs.filter((l) => {
    if (serviceFilter !== "all" && l.service !== serviceFilter) return false;
    if (statusFilter !== "all") {
      const isError = l.status !== "200" && l.status !== "success";
      if (statusFilter === "success" && isError) return false;
      if (statusFilter === "error" && !isError) return false;
    }
    return true;
  });
  const uniqueServices = Array.from(new Set(logs.map((l) => l.service)));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs whitespace-nowrap", children: "Service" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: "text-xs rounded-md border border-border bg-background px-2 py-1.5 text-foreground",
            value: serviceFilter,
            onChange: (e) => setServiceFilter(e.target.value),
            "data-ocid": "paysprint.logs_service_filter",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Services" }),
              uniqueServices.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs whitespace-nowrap", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: "text-xs rounded-md border border-border bg-background px-2 py-1.5 text-foreground",
            value: statusFilter,
            onChange: (e) => setStatusFilter(e.target.value),
            "data-ocid": "paysprint.logs_status_filter",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "success", children: "Success" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "error", children: "Error" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: () => refetch(),
          className: "ml-auto text-xs",
          "data-ocid": "paysprint.logs_refresh_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5 mr-1" }),
            " Refresh"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-10 rounded-lg bg-muted/50 animate-pulse"
      },
      i
    )) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-16 text-muted-foreground",
        "data-ocid": "paysprint.logs_empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "No API calls logged yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm mt-1", children: [
            "Use the ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Test" }),
            " button on the Credentials tab to generate a log entry."
          ] })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/50 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground", children: "Service" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground", children: "Env" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground", children: "Endpoint" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-muted-foreground", children: "Latency" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground", children: "Timestamp" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground", children: "Error" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: filtered.map((log, idx) => {
        var _a;
        const isError = log.status !== "200" && log.status !== "success";
        const isExpanded = expandedRow === log.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              "data-ocid": `paysprint.log_row.${idx + 1}`,
              className: "hover:bg-muted/30 transition-colors cursor-pointer",
              onClick: () => setExpandedRow(isExpanded ? null : log.id),
              onKeyDown: (e) => (e.key === "Enter" || e.key === " ") && setExpandedRow(isExpanded ? null : log.id),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: log.service }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs font-bold px-1.5 py-0.5 rounded ${log.environment === "live" ? "bg-green-500/15 text-green-500" : "bg-amber-500/15 text-amber-500"}`,
                    children: (_a = log.environment) == null ? void 0 : _a.toUpperCase()
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground max-w-[180px] truncate", children: log.endpoint }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs font-medium ${isError ? "text-destructive" : "text-green-500"}`,
                    children: log.status
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right text-muted-foreground", children: [
                  log.latencyMs,
                  "ms"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground whitespace-nowrap", children: tsToDisplay(log.timestamp) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-destructive max-w-[120px] truncate", children: log.error ?? "—" })
              ]
            }
          ),
          isExpanded && (log.requestBody || log.responseBody) && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, className: "px-4 pb-3 bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mt-2", children: [
            log.requestBody && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground mb-1", children: "Request" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-xs font-mono bg-muted rounded p-2 overflow-auto max-h-40 break-all whitespace-pre-wrap", children: (() => {
                try {
                  return JSON.stringify(
                    JSON.parse(log.requestBody),
                    null,
                    2
                  );
                } catch {
                  return log.requestBody;
                }
              })() })
            ] }),
            log.responseBody && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground mb-1", children: "Response" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-xs font-mono bg-muted rounded p-2 overflow-auto max-h-40 break-all whitespace-pre-wrap", children: (() => {
                try {
                  return JSON.stringify(
                    JSON.parse(log.responseBody),
                    null,
                    2
                  );
                } catch {
                  return log.responseBody;
                }
              })() })
            ] })
          ] }) }) })
        ] }, log.id);
      }) })
    ] }) })
  ] });
}
function WebhookCallbacksTab() {
  const { data: callbacks = [], isLoading, refetch } = usePaySprintCallbacks();
  const [rawModal, setRawModal] = reactExports.useState(null);
  const [copied, setCopied] = reactExports.useState(false);
  function copyUrl() {
    navigator.clipboard.writeText(
      "https://bot.localbazar.shop/paysprint/callback"
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Callback URL" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "flex-1 text-sm font-mono bg-muted rounded px-3 py-2 truncate", children: "https://bot.localbazar.shop/paysprint/callback" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: copyUrl,
            "data-ocid": "paysprint.copy_callback_url_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5 mr-1" }),
              copied ? "Copied!" : "Copy"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "Register this URL in your PaySprint merchant portal under Webhook settings for all active services." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        type: "button",
        variant: "outline",
        size: "sm",
        onClick: () => refetch(),
        className: "text-xs",
        "data-ocid": "paysprint.callbacks_refresh_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5 mr-1" }),
          " Refresh"
        ]
      }
    ) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-10 rounded-lg bg-muted/50 animate-pulse"
      },
      i
    )) }) : callbacks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-16 text-muted-foreground",
        "data-ocid": "paysprint.callbacks_empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "No callbacks received yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: "Callbacks arrive when PaySprint processes a booking or payment." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/50 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground", children: "Event Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground", children: "Service" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground", children: "Reference ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-muted-foreground", children: "Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground", children: "Timestamp" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-semibold text-muted-foreground", children: "Raw" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: callbacks.map((cb, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          "data-ocid": `paysprint.callback_row.${idx + 1}`,
          className: "hover:bg-muted/30 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: cb.eventType }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: cb.service }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: cb.referenceId }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-medium", children: [
              "₹",
              (cb.amount ?? 0).toLocaleString("en-IN")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs font-medium ${cb.status === "SUCCESS" || cb.status === "success" ? "text-green-500" : cb.status === "FAILED" || cb.status === "failed" ? "text-destructive" : "text-amber-500"}`,
                children: cb.status
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground whitespace-nowrap", children: tsToDisplay(cb.timestamp) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                className: "text-xs h-7",
                onClick: () => setRawModal(cb),
                "data-ocid": `paysprint.view_raw_button.${idx + 1}`,
                children: "View Raw"
              }
            ) })
          ]
        },
        cb.id
      )) })
    ] }) }),
    rawModal && /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: () => setRawModal(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        "Raw Payload — ",
        rawModal.referenceId
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "pre",
        {
          className: "text-xs font-mono bg-muted rounded p-4 overflow-auto max-h-96 whitespace-pre-wrap break-all mt-2",
          "data-ocid": "paysprint.raw_payload_block",
          children: (() => {
            try {
              return JSON.stringify(
                typeof rawModal.rawPayload === "string" ? JSON.parse(rawModal.rawPayload) : rawModal.rawPayload,
                null,
                2
              );
            } catch {
              return rawModal.rawPayload ?? "No payload recorded";
            }
          })()
        }
      )
    ] }) })
  ] });
}
function PaySprintConfigPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-6xl mx-auto px-4 py-6 space-y-6",
      "data-ocid": "paysprint.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "PaySprint API Configuration" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Manage UAT and Live credentials per service. Test connectivity and monitor API logs and webhook callbacks." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/15 text-primary border-0 text-xs font-semibold", children: "PaySprint" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CredStatsSummary, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Tabs,
          {
            defaultValue: "credentials",
            className: "space-y-4",
            "data-ocid": "paysprint.tabs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-3 max-w-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabsTrigger,
                  {
                    value: "credentials",
                    "data-ocid": "paysprint.credentials_tab",
                    children: "Credentials"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "api-logs", "data-ocid": "paysprint.api_logs_tab", children: "API Logs" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "webhooks", "data-ocid": "paysprint.webhooks_tab", children: "Webhooks" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "credentials", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CredentialsTab, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "api-logs", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(APILogsTab, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "webhooks", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WebhookCallbacksTab, {}) })
            ]
          }
        )
      ]
    }
  );
}
function CredStatsSummary() {
  const { data: creds = [] } = useAllPaySprintCredentials();
  const uatActive = creds.filter(
    (c) => c.environment === PaySprintEnvironment.uat && c.isActive
  ).length;
  const liveActive = creds.filter(
    (c) => c.environment === PaySprintEnvironment.live && c.isActive
  ).length;
  const total = SERVICES.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatCard,
      {
        label: "Total Services",
        value: total,
        color: "bg-primary/10 text-primary"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatCard,
      {
        label: "UAT Configured",
        value: uatActive,
        color: "bg-amber-500/10 text-amber-500"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatCard,
      {
        label: "Live Configured",
        value: liveActive,
        color: "bg-green-500/10 text-green-500"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatCard,
      {
        label: "Unconfigured",
        value: total - Math.max(uatActive, liveActive),
        color: "bg-muted text-muted-foreground"
      }
    )
  ] });
}
function StatCard({
  label,
  value,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-bold mt-1 ${color}`, children: value })
  ] });
}
export {
  PaySprintConfigPage as default
};
