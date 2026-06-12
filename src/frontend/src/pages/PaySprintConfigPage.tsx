import { createActor } from "@/backend";
import { type PaySprintCredential, PaySprintEnvironment } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Copy,
  Eye,
  EyeOff,
  Info,
  MinusCircle,
  RefreshCw,
  Wifi,
} from "lucide-react";
import { Fragment, useState } from "react";
import { toast } from "sonner";
import {
  useBackendActor,
  useGetAllPaySprintAPILogs,
} from "../hooks/useBackend";

// ─── Types ────────────────────────────────────────────────────────────────────

type Env = PaySprintEnvironment;

interface PaySprintCred {
  id: string;
  serviceType: string;
  environment: Env;
  partnerId: string;
  partnerKey: string;
  authorisedKey?: string;
  baseUrl: string;
  isActive: boolean;
}

interface TestResult {
  credId: string;
  pass: boolean;
  statusCode: number;
  responseTimeMs: number;
  rawResponse: string;
}

interface ApiLog {
  id: string;
  service: string;
  environment: string;
  endpoint: string;
  status: string;
  latencyMs: number;
  timestamp: bigint | number;
  error?: string;
  requestBody?: string;
  responseBody?: string;
}

interface WebhookCallback {
  id: string;
  eventType: string;
  service: string;
  referenceId: string;
  amount: number;
  status: string;
  timestamp: bigint | number;
  rawPayload?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const UAT_BASE_URL = "https://sit.paysprint.in/service-api/api/v1/service";
const LIVE_BASE_URL =
  "https://apisprint.paysprint.in/service-api/api/v1/service";

const SERVICES = [
  "Bus Booking",
  "Train Booking",
  "Flight Booking",
  "Mobile Recharge",
  "Bill Payment",
  "FastTag",
  "LPG Booking",
  "Municipality Payment",
  "Insurance Premium",
];

function tsToDisplay(ts: bigint | number | undefined): string {
  if (ts === undefined || ts === null) return "—";
  try {
    const n = typeof ts === "bigint" ? Number(ts) / 1_000_000 : ts;
    return new Date(n).toLocaleString();
  } catch {
    return "—";
  }
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useAllPaySprintCredentials() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<PaySprintCred[]>({
    queryKey: ["paysprint-credentials"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const fn = (actor as unknown as Record<string, unknown>)
          .getAllPaySprintCredentials as (() => Promise<unknown[]>) | undefined;
        if (typeof fn === "function") {
          const res = await fn();
          return (res ?? []) as PaySprintCred[];
        }
      } catch {
        /* ignore */
      }
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

function usePaySprintCallbacks() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<WebhookCallback[]>({
    queryKey: ["paysprint-callbacks"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const fn = (actor as unknown as Record<string, unknown>)
          .getAllPaySprintCallbacks as (() => Promise<unknown[]>) | undefined;
        if (typeof fn === "function") {
          const res = await fn();
          return (res ?? []) as WebhookCallback[];
        }
      } catch {
        /* ignore */
      }
      return [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 20_000,
  });
}

function useSavePaySprintCredential() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (cred: Partial<PaySprintCred>) => {
      if (!actor) throw new Error("Actor not ready");
      const backendCred: PaySprintCredential = {
        id: cred.id ?? "",
        serviceType: cred.serviceType as PaySprintCredential["serviceType"],
        environment: (cred.environment ??
          PaySprintEnvironment.uat) as PaySprintCredential["environment"],
        partnerId: cred.partnerId ?? "",
        partnerKey: cred.partnerKey ?? "",
        authorisedKey: cred.authorisedKey ?? "",
        baseUrl: cred.baseUrl ?? "",
        isActive: cred.isActive ?? true,
        createdAt: BigInt(0),
        updatedAt: BigInt(Date.now()) * BigInt(1_000_000),
      };
      const result = await actor.savePaySprintCredential(backendCred);
      if ("err" in result) throw new Error(String(result.err));
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["paysprint-credentials"] });
      toast("Credentials saved successfully");
    },
    onError: (err: unknown) => {
      toast.error(
        `Failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    },
  });
}

function useTestPaySprintConnection() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async (credId: string): Promise<TestResult> => {
      if (!actor) throw new Error("Actor not ready");
      try {
        const fn = (actor as unknown as Record<string, unknown>)
          .testPaySprintConnectionPub as
          | ((id: string) => Promise<unknown>)
          | undefined;
        if (typeof fn === "function") {
          const res = (await fn(credId)) as TestResult;
          return res;
        }
      } catch (e) {
        return {
          credId,
          pass: false,
          statusCode: 0,
          responseTimeMs: 0,
          rawResponse: String(e),
        };
      }
      return {
        credId,
        pass: false,
        statusCode: 0,
        responseTimeMs: 0,
        rawResponse: "Method not available on this canister.",
      };
    },
  });
}

// ─── CredModal ────────────────────────────────────────────────────────────────

interface CredModalProps {
  open: boolean;
  onClose: () => void;
  service: string;
  environment: Env;
  existing?: PaySprintCred;
}

function CredModal({
  open,
  onClose,
  service,
  environment,
  existing,
}: CredModalProps) {
  const save = useSavePaySprintCredential();
  const [partnerId, setPartnerId] = useState(existing?.partnerId ?? "");
  const [partnerKey, setPartnerKey] = useState(existing?.partnerKey ?? "");
  const [authorisedKey, setAuthorisedKey] = useState(
    existing?.authorisedKey ?? "",
  );
  const [baseUrl, setBaseUrl] = useState(
    existing?.baseUrl ??
      (environment === PaySprintEnvironment.uat ? UAT_BASE_URL : LIVE_BASE_URL),
  );
  const [isActive, setIsActive] = useState(existing?.isActive ?? true);
  const [showKey, setShowKey] = useState(false);

  async function handleSave() {
    try {
      await save.mutateAsync({
        id: existing?.id,
        serviceType: service,
        environment,
        partnerId,
        partnerKey,
        authorisedKey:
          environment === PaySprintEnvironment.uat ? authorisedKey : undefined,
        baseUrl,
        isActive,
      });
      onClose();
    } catch {
      // error toast is handled in useSavePaySprintCredential onError
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded ${
                environment === PaySprintEnvironment.uat
                  ? "bg-amber-500/20 text-amber-500"
                  : "bg-green-500/20 text-green-500"
              }`}
            >
              {environment.toUpperCase()}
            </span>
            {service}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="p-3 rounded-md bg-muted/50 border border-border flex gap-2 text-xs text-muted-foreground">
            <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-primary" />
            JWT Token is embedded in the Partner Key field — paste your
            pre-generated JWT from the PaySprint dashboard.
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ps-partner-id">Partner ID</Label>
            <Input
              id="ps-partner-id"
              placeholder="e.g. 100XXX"
              value={partnerId}
              onChange={(e) => setPartnerId(e.target.value)}
              data-ocid="paysprint.partner_id_input"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ps-partner-key">Partner Key (JWT)</Label>
            <div className="relative">
              <Input
                id="ps-partner-key"
                type={showKey ? "text" : "password"}
                placeholder="eyJhbGciOiJIUzI1NiIs…"
                value={partnerKey}
                onChange={(e) => setPartnerKey(e.target.value)}
                className="pr-9"
                data-ocid="paysprint.partner_key_input"
              />
              <button
                type="button"
                onClick={() => setShowKey((v) => !v)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showKey ? "Hide key" : "Show key"}
              >
                {showKey ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {environment === PaySprintEnvironment.uat && (
            <div className="space-y-1.5">
              <Label htmlFor="ps-auth-key">Authorised Key (UAT only)</Label>
              <Input
                id="ps-auth-key"
                placeholder="Auth key from PaySprint"
                value={authorisedKey}
                onChange={(e) => setAuthorisedKey(e.target.value)}
                data-ocid="paysprint.authorised_key_input"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="ps-base-url">Base URL</Label>
            <Input
              id="ps-base-url"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              data-ocid="paysprint.base_url_input"
            />
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="ps-active"
              checked={isActive}
              onCheckedChange={setIsActive}
              data-ocid="paysprint.active_toggle"
            />
            <Label htmlFor="ps-active" className="cursor-pointer">
              Active
            </Label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="paysprint.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={save.isPending || !partnerId || !partnerKey}
              data-ocid="paysprint.save_button"
            >
              {save.isPending ? "Saving…" : "Save Credentials"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── TestResultPanel ──────────────────────────────────────────────────────────

interface TestResultPanelProps {
  result: TestResult;
}

function TestResultPanel({ result }: TestResultPanelProps) {
  const [expanded, setExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(
      typeof result.rawResponse === "object"
        ? JSON.stringify(result.rawResponse, null, 2)
        : result.rawResponse,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const displayJson = (() => {
    try {
      return JSON.stringify(
        typeof result.rawResponse === "string"
          ? JSON.parse(result.rawResponse)
          : result.rawResponse,
        null,
        2,
      );
    } catch {
      return String(result.rawResponse);
    }
  })();

  return (
    <div
      className={`mt-2 rounded-lg border ${
        result.pass
          ? "border-green-500/30 bg-green-500/5"
          : "border-destructive/30 bg-destructive/5"
      }`}
      data-ocid="paysprint.test_result_panel"
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm"
      >
        <div className="flex items-center gap-3">
          <span
            className={`flex items-center gap-1 font-semibold ${
              result.pass ? "text-green-500" : "text-destructive"
            }`}
          >
            {result.pass ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            {result.pass ? "PASS" : "FAIL"}
          </span>
          <span className="text-muted-foreground">
            HTTP {result.statusCode || "—"}
          </span>
          <span className="text-muted-foreground">
            {result.responseTimeMs}ms
          </span>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {expanded && (
        <div className="border-t border-border px-3 pb-3">
          <div className="flex justify-end mt-2 mb-1">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Copy className="w-3 h-3" />
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre
            className="text-xs font-mono bg-muted/50 rounded p-3 overflow-auto max-h-60 text-foreground whitespace-pre-wrap break-all"
            data-ocid="paysprint.raw_response_block"
          >
            {displayJson}
          </pre>
        </div>
      )}
    </div>
  );
}

// ─── CredentialsTab ───────────────────────────────────────────────────────────

function CredentialsTab() {
  const { data: creds = [], isLoading } = useAllPaySprintCredentials();
  const testMut = useTestPaySprintConnection();
  const [modal, setModal] = useState<{
    service: string;
    environment: Env;
  } | null>(null);
  const [testResults, setTestResults] = useState<Record<string, TestResult>>(
    {},
  );
  const [testingId, setTestingId] = useState<string | null>(null);

  function getCred(
    service: string,
    environment: Env,
  ): PaySprintCred | undefined {
    return creds.find(
      (c) => c.serviceType === service && c.environment === environment,
    );
  }

  function statusCell(service: string, environment: Env) {
    const cred = getCred(service, environment);
    if (!cred || !cred.isActive) {
      return (
        <span className="inline-flex items-center gap-1 text-muted-foreground">
          <MinusCircle className="w-4 h-4" /> Not configured
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-green-500">
        <CheckCircle2 className="w-4 h-4" /> Active
      </span>
    );
  }

  async function handleTest(service: string) {
    const cred =
      getCred(service, PaySprintEnvironment.live) ??
      getCred(service, PaySprintEnvironment.uat);
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

  const modalCred = modal
    ? getCred(modal.service, modal.environment)
    : undefined;

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/5 flex items-start gap-2 text-sm">
        <Info className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
        <p className="text-muted-foreground">
          <strong className="text-foreground">JWT Token:</strong> PaySprint uses
          JWT for authentication. Generate your JWT from the PaySprint dashboard
          and paste it into the <strong>Partner Key</strong> field. UAT and Live
          credentials are stored separately — toggle per service.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {SERVICES.map((s) => (
            <div
              key={s}
              className="h-12 rounded-lg bg-muted/50 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                  Service
                </th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                  UAT
                </th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                  Live
                </th>
                <th className="text-right px-4 py-3 font-semibold text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {SERVICES.map((service, idx) => {
                const testKey = getCred(service, PaySprintEnvironment.live)?.id
                  ? `${service}_live`
                  : `${service}_uat`;
                const testResult = testResults[testKey];
                return (
                  <Fragment key={service}>
                    <tr
                      data-ocid={`paysprint.service_row.${idx + 1}`}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3 font-medium">{service}</td>
                      <td className="px-4 py-3">
                        {statusCell(service, PaySprintEnvironment.uat)}
                      </td>
                      <td className="px-4 py-3">
                        {statusCell(service, PaySprintEnvironment.live)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setModal({
                                service,
                                environment: PaySprintEnvironment.uat,
                              })
                            }
                            className="text-xs h-7 border-amber-500/50 text-amber-600 hover:bg-amber-500/10"
                            data-ocid={`paysprint.edit_uat_button.${idx + 1}`}
                          >
                            Edit UAT
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setModal({
                                service,
                                environment: PaySprintEnvironment.live,
                              })
                            }
                            className="text-xs h-7 border-green-500/50 text-green-600 hover:bg-green-500/10"
                            data-ocid={`paysprint.edit_live_button.${idx + 1}`}
                          >
                            Edit Live
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={
                              testingId === testKey || testMut.isPending
                            }
                            onClick={() => handleTest(service)}
                            className="text-xs h-7"
                            data-ocid={`paysprint.test_button.${idx + 1}`}
                          >
                            {testingId === testKey ? (
                              <RefreshCw className="w-3 h-3 animate-spin" />
                            ) : (
                              <Wifi className="w-3 h-3 mr-1" />
                            )}
                            Test
                          </Button>
                        </div>
                      </td>
                    </tr>
                    {testResult && (
                      <tr>
                        <td colSpan={4} className="px-4 pb-3">
                          <TestResultPanel result={testResult} />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <CredModal
          open
          onClose={() => setModal(null)}
          service={modal.service}
          environment={modal.environment}
          existing={modalCred}
        />
      )}
    </div>
  );
}

// ─── APILogsTab ───────────────────────────────────────────────────────────────

function APILogsTab() {
  const {
    data: rawLogs = [],
    isLoading,
    refetch,
  } = useGetAllPaySprintAPILogs();
  const logs: ApiLog[] = (rawLogs ?? []) as unknown as ApiLog[];
  const [serviceFilter, setServiceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

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

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Label className="text-xs whitespace-nowrap">Service</Label>
          <select
            className="text-xs rounded-md border border-border bg-background px-2 py-1.5 text-foreground"
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            data-ocid="paysprint.logs_service_filter"
          >
            <option value="all">All Services</option>
            {uniqueServices.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Label className="text-xs whitespace-nowrap">Status</Label>
          <select
            className="text-xs rounded-md border border-border bg-background px-2 py-1.5 text-foreground"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            data-ocid="paysprint.logs_status_filter"
          >
            <option value="all">All</option>
            <option value="success">Success</option>
            <option value="error">Error</option>
          </select>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          className="ml-auto text-xs"
          data-ocid="paysprint.logs_refresh_button"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-1" /> Refresh
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-10 rounded-lg bg-muted/50 animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="text-center py-16 text-muted-foreground"
          data-ocid="paysprint.logs_empty_state"
        >
          <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="w-6 h-6" />
          </div>
          <p className="font-medium text-foreground">No API calls logged yet</p>
          <p className="text-sm mt-1">
            Use the <strong>Test</strong> button on the Credentials tab to
            generate a log entry.
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                  Service
                </th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                  Env
                </th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                  Endpoint
                </th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                  Status
                </th>
                <th className="text-right px-4 py-3 font-semibold text-muted-foreground">
                  Latency
                </th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                  Timestamp
                </th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                  Error
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((log, idx) => {
                const isError =
                  log.status !== "200" && log.status !== "success";
                const isExpanded = expandedRow === log.id;
                return (
                  <Fragment key={log.id}>
                    <tr
                      data-ocid={`paysprint.log_row.${idx + 1}`}
                      className="hover:bg-muted/30 transition-colors cursor-pointer"
                      onClick={() => setExpandedRow(isExpanded ? null : log.id)}
                      onKeyDown={(e) =>
                        (e.key === "Enter" || e.key === " ") &&
                        setExpandedRow(isExpanded ? null : log.id)
                      }
                    >
                      <td className="px-4 py-3 font-medium">{log.service}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                            log.environment === "live"
                              ? "bg-green-500/15 text-green-500"
                              : "bg-amber-500/15 text-amber-500"
                          }`}
                        >
                          {log.environment?.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground max-w-[180px] truncate">
                        {log.endpoint}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-medium ${
                            isError ? "text-destructive" : "text-green-500"
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-muted-foreground">
                        {log.latencyMs}ms
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                        {tsToDisplay(log.timestamp)}
                      </td>
                      <td className="px-4 py-3 text-xs text-destructive max-w-[120px] truncate">
                        {log.error ?? "—"}
                      </td>
                    </tr>
                    {isExpanded && (log.requestBody || log.responseBody) && (
                      <tr>
                        <td colSpan={7} className="px-4 pb-3 bg-muted/20">
                          <div className="grid grid-cols-2 gap-3 mt-2">
                            {log.requestBody && (
                              <div>
                                <p className="text-xs font-semibold text-muted-foreground mb-1">
                                  Request
                                </p>
                                <pre className="text-xs font-mono bg-muted rounded p-2 overflow-auto max-h-40 break-all whitespace-pre-wrap">
                                  {(() => {
                                    try {
                                      return JSON.stringify(
                                        JSON.parse(log.requestBody!),
                                        null,
                                        2,
                                      );
                                    } catch {
                                      return log.requestBody;
                                    }
                                  })()}
                                </pre>
                              </div>
                            )}
                            {log.responseBody && (
                              <div>
                                <p className="text-xs font-semibold text-muted-foreground mb-1">
                                  Response
                                </p>
                                <pre className="text-xs font-mono bg-muted rounded p-2 overflow-auto max-h-40 break-all whitespace-pre-wrap">
                                  {(() => {
                                    try {
                                      return JSON.stringify(
                                        JSON.parse(log.responseBody!),
                                        null,
                                        2,
                                      );
                                    } catch {
                                      return log.responseBody;
                                    }
                                  })()}
                                </pre>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── WebhookCallbacksTab ──────────────────────────────────────────────────────

function WebhookCallbacksTab() {
  const { data: callbacks = [], isLoading, refetch } = usePaySprintCallbacks();
  const [rawModal, setRawModal] = useState<WebhookCallback | null>(null);
  const [copied, setCopied] = useState(false);

  function copyUrl() {
    navigator.clipboard.writeText(
      "https://bot.localbazar.shop/paysprint/callback",
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-4">
      {/* Callback URL info */}
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Callback URL
        </p>
        <div className="flex items-center gap-2">
          <code className="flex-1 text-sm font-mono bg-muted rounded px-3 py-2 truncate">
            https://bot.localbazar.shop/paysprint/callback
          </code>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={copyUrl}
            data-ocid="paysprint.copy_callback_url_button"
          >
            <Copy className="w-3.5 h-3.5 mr-1" />
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Register this URL in your PaySprint merchant portal under Webhook
          settings for all active services.
        </p>
      </div>

      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          className="text-xs"
          data-ocid="paysprint.callbacks_refresh_button"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-1" /> Refresh
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-10 rounded-lg bg-muted/50 animate-pulse"
            />
          ))}
        </div>
      ) : callbacks.length === 0 ? (
        <div
          className="text-center py-16 text-muted-foreground"
          data-ocid="paysprint.callbacks_empty_state"
        >
          <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-3">
            <Info className="w-6 h-6" />
          </div>
          <p className="font-medium text-foreground">
            No callbacks received yet
          </p>
          <p className="text-sm mt-1">
            Callbacks arrive when PaySprint processes a booking or payment.
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                  Event Type
                </th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                  Service
                </th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                  Reference ID
                </th>
                <th className="text-right px-4 py-3 font-semibold text-muted-foreground">
                  Amount
                </th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                  Status
                </th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                  Timestamp
                </th>
                <th className="text-center px-4 py-3 font-semibold text-muted-foreground">
                  Raw
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {callbacks.map((cb, idx) => (
                <tr
                  key={cb.id}
                  data-ocid={`paysprint.callback_row.${idx + 1}`}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="text-xs">
                      {cb.eventType}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 font-medium">{cb.service}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {cb.referenceId}
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    ₹{(cb.amount ?? 0).toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-medium ${
                        cb.status === "SUCCESS" || cb.status === "success"
                          ? "text-green-500"
                          : cb.status === "FAILED" || cb.status === "failed"
                            ? "text-destructive"
                            : "text-amber-500"
                      }`}
                    >
                      {cb.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                    {tsToDisplay(cb.timestamp)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-xs h-7"
                      onClick={() => setRawModal(cb)}
                      data-ocid={`paysprint.view_raw_button.${idx + 1}`}
                    >
                      View Raw
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Raw payload modal */}
      {rawModal && (
        <Dialog open onOpenChange={() => setRawModal(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Raw Payload — {rawModal.referenceId}</DialogTitle>
            </DialogHeader>
            <pre
              className="text-xs font-mono bg-muted rounded p-4 overflow-auto max-h-96 whitespace-pre-wrap break-all mt-2"
              data-ocid="paysprint.raw_payload_block"
            >
              {(() => {
                try {
                  return JSON.stringify(
                    typeof rawModal.rawPayload === "string"
                      ? JSON.parse(rawModal.rawPayload)
                      : rawModal.rawPayload,
                    null,
                    2,
                  );
                } catch {
                  return rawModal.rawPayload ?? "No payload recorded";
                }
              })()}
            </pre>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// ─── PaySprintConfigPage ──────────────────────────────────────────────────────

export default function PaySprintConfigPage() {
  return (
    <div
      className="max-w-6xl mx-auto px-4 py-6 space-y-6"
      data-ocid="paysprint.page"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            PaySprint API Configuration
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage UAT and Live credentials per service. Test connectivity and
            monitor API logs and webhook callbacks.
          </p>
        </div>
        <Badge className="bg-primary/15 text-primary border-0 text-xs font-semibold">
          PaySprint
        </Badge>
      </div>

      {/* Stats row */}
      <CredStatsSummary />

      {/* Tabs */}
      <Tabs
        defaultValue="credentials"
        className="space-y-4"
        data-ocid="paysprint.tabs"
      >
        <TabsList className="grid w-full grid-cols-3 max-w-sm">
          <TabsTrigger
            value="credentials"
            data-ocid="paysprint.credentials_tab"
          >
            Credentials
          </TabsTrigger>
          <TabsTrigger value="api-logs" data-ocid="paysprint.api_logs_tab">
            API Logs
          </TabsTrigger>
          <TabsTrigger value="webhooks" data-ocid="paysprint.webhooks_tab">
            Webhooks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="credentials" className="mt-0">
          <CredentialsTab />
        </TabsContent>
        <TabsContent value="api-logs" className="mt-0">
          <APILogsTab />
        </TabsContent>
        <TabsContent value="webhooks" className="mt-0">
          <WebhookCallbacksTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ─── Summary stats ────────────────────────────────────────────────────────────

function CredStatsSummary() {
  const { data: creds = [] } = useAllPaySprintCredentials();

  const uatActive = creds.filter(
    (c) => c.environment === PaySprintEnvironment.uat && c.isActive,
  ).length;
  const liveActive = creds.filter(
    (c) => c.environment === PaySprintEnvironment.live && c.isActive,
  ).length;
  const total = SERVICES.length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StatCard
        label="Total Services"
        value={total}
        color="bg-primary/10 text-primary"
      />
      <StatCard
        label="UAT Configured"
        value={uatActive}
        color="bg-amber-500/10 text-amber-500"
      />
      <StatCard
        label="Live Configured"
        value={liveActive}
        color="bg-green-500/10 text-green-500"
      />
      <StatCard
        label="Unconfigured"
        value={total - Math.max(uatActive, liveActive)}
        color="bg-muted text-muted-foreground"
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
  );
}
