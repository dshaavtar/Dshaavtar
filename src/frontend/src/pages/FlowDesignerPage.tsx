import BlockLibrary from "@/components/FlowDesigner/BlockLibrary";
import FlowCanvas from "@/components/FlowDesigner/FlowCanvas";
import FlowPreview from "@/components/FlowDesigner/FlowPreview";
import PropertyPanel from "@/components/FlowDesigner/PropertyPanel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useDeployToLive,
  useGetFlows,
  useListFlows,
  useSaveFlow,
} from "@/hooks/useFlowDesigner";
import {
  getAllRegistryFlows,
  isFlowCustomized,
  registerFlow,
} from "@/lib/flowRegistry";
import type {
  FlowBlock,
  FlowConnection,
  FlowState,
} from "@/types/flowDesigner";
import {
  AlignLeft,
  ChevronDown,
  Download,
  ExternalLink,
  LayoutGrid,
  Rocket,
  Save,
  Search,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type RightPanelMode = "properties" | "preview";
type Environment = "test" | "live";

export default function FlowDesignerPage() {
  // ── Registry flows: load from backend via unified registry ────────────────
  const [registryFlows, setRegistryFlows] = useState(() =>
    getAllRegistryFlows(),
  );

  // Also fetch from backend — keeps list and flowJson up to date
  const { data: backendFlows = [] } = useListFlows();

  // Refresh registry flows on storage events (Flow Designer saves in another tab)
  useEffect(() => {
    const handler = () => setRegistryFlows(getAllRegistryFlows());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  // Merge backend flows into registryFlows whenever they load
  useEffect(() => {
    if (backendFlows.length > 0) {
      setRegistryFlows(getAllRegistryFlows());
    }
  }, [backendFlows]);

  // Map registry flows for the load panel — flowJson comes from backend or registry
  const allLoadableFlows = useMemo(() => {
    // Build a lookup from backendFlows for fast access to flowJson
    const backendMap = new Map(backendFlows.map((f) => [f.id, f]));
    return registryFlows.map((rf) => {
      const backend = backendMap.get(rf.id);
      // Prefer the source that actually has design blocks — a flowJson with
      // non-empty "blocks" array wins over a bare {"nodes":[],"edges":[]} stub.
      const backendJson = backend?.flowJson ?? "";
      const registryJson = rf.flowJson ?? "";
      function hasBlocks(j: string): boolean {
        try {
          const p = JSON.parse(j) as Record<string, unknown>;
          return Array.isArray(p.blocks) && (p.blocks as unknown[]).length > 0;
        } catch {
          return false;
        }
      }
      const bestJson = hasBlocks(registryJson)
        ? registryJson
        : hasBlocks(backendJson)
          ? backendJson
          : backendJson || registryJson || '{"blocks":[],"connections":[]}';
      return {
        id: rf.id,
        name: rf.name,
        description: rf.description,
        isCustomized: isFlowCustomized(rf.id),
        flowJson: bestJson,
        updatedAt: backend?.updatedAt,
        version: backend?.version,
      };
    });
  }, [registryFlows, backendFlows]);

  const [flowName, setFlowName] = useState("New Flow");
  const [environment, setEnvironment] = useState<Environment>("test");
  const [flowState, setFlowState] = useState<FlowState>({
    blocks: [],
    connections: [],
  });
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [rightPanel, setRightPanel] = useState<RightPanelMode>("properties");
  const [savedFlowId, setSavedFlowId] = useState<string | null>(null);
  const [hasUnsaved, setHasUnsaved] = useState(false);
  const [deployDialogOpen, setDeployDialogOpen] = useState(false);
  const [autoLayoutKey, setAutoLayoutKey] = useState(0);
  const [loadFlowOpen, setLoadFlowOpen] = useState(false);
  const [loadFlowSearch, setLoadFlowSearch] = useState("");

  const saveFlow = useSaveFlow();
  const { data: savedFlows = [] } = useGetFlows(environment);
  const deployFlow = useDeployToLive();

  // Sorted saved flows (most recent first)
  const sortedSavedFlows = useMemo(
    () =>
      [...savedFlows].sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0)),
    [savedFlows],
  );

  // Filter all registry flows by search query
  const filteredBuiltin = useMemo(
    () =>
      allLoadableFlows.filter((f) =>
        f.name.toLowerCase().includes(loadFlowSearch.toLowerCase()),
      ),
    [allLoadableFlows, loadFlowSearch],
  );
  const filteredSaved = useMemo(
    () =>
      sortedSavedFlows.filter((f) =>
        f.name.toLowerCase().includes(loadFlowSearch.toLowerCase()),
      ),
    [sortedSavedFlows, loadFlowSearch],
  );

  const selectedBlock =
    flowState.blocks.find((b) => b.id === selectedBlockId) ?? null;

  function handleBlocksChange(blocks: FlowBlock[]) {
    setFlowState((s) => ({ ...s, blocks }));
    setHasUnsaved(true);
  }

  function handleConnectionsChange(connections: FlowConnection[]) {
    setFlowState((s) => ({ ...s, connections }));
    setHasUnsaved(true);
  }

  function handleBlockUpdate(updated: FlowBlock) {
    setFlowState((s) => ({
      ...s,
      blocks: s.blocks.map((b) => (b.id === updated.id ? updated : b)),
    }));
    setHasUnsaved(true);
  }

  async function handleSave() {
    const flowJson = JSON.stringify(flowState);
    const flowEntry = {
      id: savedFlowId ?? `flow_${Date.now()}`,
      name: flowName,
      environment,
      flowJson,
      updatedAt: Date.now(),
    };

    // ── Update unified registry so all consumers see the latest flow ─────────
    registerFlow({
      id: flowEntry.id,
      name: flowName,
      description: `Custom flow: ${flowName}`,
      category: "customer",
      triggerPayload: flowEntry.id,
      roles: ["all"],
      flowJson,
    });
    // Refresh local registry state
    setRegistryFlows(getAllRegistryFlows());

    // ── Save to backend ──────────────────────────────────────────────────────
    try {
      const result = await saveFlow.mutateAsync({
        name: flowName,
        environment,
        flowJson,
        existingId: flowEntry.id,
      });
      const newId = result;
      setSavedFlowId(newId);
      setHasUnsaved(false);
      toast.success("Flow saved successfully");
    } catch {
      setSavedFlowId(flowEntry.id);
      setHasUnsaved(false);
      toast.error("Failed to save flow to backend — please retry.");
    }
  }

  function handleLoadFlow(flowJson: string, id: string, name: string) {
    try {
      const parsed = JSON.parse(flowJson) as Record<string, unknown>;
      // Normalise: backend may store {"nodes":[],"edges":[]} when no design exists;
      // FlowState expects { blocks, connections }. Default both to [] if absent.
      const safeState: FlowState = {
        blocks: (Array.isArray(parsed.blocks)
          ? parsed.blocks
          : []) as FlowState["blocks"],
        connections: (Array.isArray(parsed.connections)
          ? parsed.connections
          : []) as FlowState["connections"],
      };
      setFlowState(safeState);
      setFlowName(name);
      setSavedFlowId(id);
      setHasUnsaved(false);
      setSelectedBlockId(null);
    } catch {
      toast.error("Failed to load flow");
    }
  }

  function handleTestInSimulator() {
    const url = `/chatbot?flow=${encodeURIComponent(JSON.stringify(flowState))}`;
    window.open(url, "_blank");
  }

  async function handleDeploy() {
    if (!savedFlowId) {
      toast.error("Save the flow first before deploying");
      return;
    }
    try {
      await deployFlow.mutateAsync(savedFlowId);
      toast.success("Flow deployed to live successfully");
      setDeployDialogOpen(false);
    } catch {
      toast.error("Deploy failed");
    }
  }

  const canDeploy = environment === "test" && !!savedFlowId;

  return (
    <div
      className="flex flex-col h-[calc(100vh-64px)] bg-background"
      data-ocid="flow_designer.page"
    >
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-card border-b border-border shadow-sm flex-shrink-0 flex-wrap">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <LayoutGrid className="w-5 h-5 text-primary shrink-0" />
          <Input
            value={flowName}
            onChange={(e) => {
              setFlowName(e.target.value);
              setHasUnsaved(true);
            }}
            className="font-semibold text-sm max-w-[220px] h-8"
            data-ocid="flow_designer.name_input"
          />
          <div className="flex items-center gap-1.5">
            <Select
              value={environment}
              onValueChange={(v) => setEnvironment(v as Environment)}
            >
              <SelectTrigger
                className="h-8 w-[110px] text-xs"
                data-ocid="flow_designer.environment_select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="test">Test</SelectItem>
                <SelectItem value="live">Live</SelectItem>
              </SelectContent>
            </Select>
            <Badge
              variant="outline"
              className={
                environment === "test"
                  ? "text-yellow-700 border-yellow-300 bg-yellow-50 gap-1"
                  : "text-green-700 border-green-300 bg-green-50 gap-1"
              }
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${environment === "test" ? "bg-yellow-500" : "bg-green-500"}`}
              />
              {environment === "test" ? "TEST" : "LIVE"}
            </Badge>
          </div>
          {hasUnsaved && (
            <span className="text-xs text-muted-foreground">
              Unsaved changes
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Load Flow — Popover with search + scrollable list */}
          <Popover open={loadFlowOpen} onOpenChange={setLoadFlowOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1"
                data-ocid="flow_designer.load_flow_button"
              >
                <Download className="w-3.5 h-3.5" />
                Load
                <ChevronDown className="w-3 h-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-[320px] p-0"
              data-ocid="flow_designer.load_flow_panel"
            >
              {/* Search */}
              <div className="p-2 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <Input
                    className="pl-7 h-7 text-xs"
                    placeholder="Search flows…"
                    value={loadFlowSearch}
                    onChange={(e) => setLoadFlowSearch(e.target.value)}
                    data-ocid="flow_designer.load_flow_search_input"
                  />
                </div>
              </div>

              {/* Scrollable list */}
              <div
                className="overflow-y-auto max-h-96 p-1"
                style={{ scrollbarWidth: "thin" }}
              >
                {/* All registry flows from backend */}
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider px-2 py-1.5 font-semibold flex items-center gap-1.5">
                  All Flows
                  <Badge variant="outline" className="text-[9px] px-1 py-0">
                    {allLoadableFlows.length}
                  </Badge>
                </p>
                {filteredBuiltin.length === 0 && (
                  <p className="text-xs text-muted-foreground px-2 py-1">
                    {allLoadableFlows.length === 0
                      ? "No flows in registry yet — save a flow to add it"
                      : "No matches"}
                  </p>
                )}
                {filteredBuiltin.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    className="w-full text-left px-2 py-2 rounded-md hover:bg-muted transition-colors flex flex-col gap-0.5"
                    onClick={() => {
                      handleLoadFlow(f.flowJson, f.id, f.name);
                      setLoadFlowOpen(false);
                      setLoadFlowSearch("");
                      toast.success(`Loaded: ${f.name}`);
                    }}
                    data-ocid="flow_designer.load_builtin_flow_item"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-xs text-foreground truncate">
                        {f.name}
                      </span>
                      {f.isCustomized && (
                        <Badge
                          variant="outline"
                          className="text-[9px] px-1 py-0 text-violet-700 border-violet-300 gap-0.5 shrink-0"
                        >
                          <Sparkles className="w-2.5 h-2.5" />
                          customized
                        </Badge>
                      )}
                      {f.version && (
                        <Badge
                          variant="secondary"
                          className="text-[9px] px-1 py-0 shrink-0"
                        >
                          v{f.version}
                        </Badge>
                      )}
                    </div>
                    <span className="text-[10px] text-muted-foreground truncate">
                      {f.description}
                    </span>
                  </button>
                ))}

                {/* Saved flows from backend (by environment) */}
                {filteredSaved.length > 0 && (
                  <div className="border-t border-border mt-1 pt-1">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider px-2 py-1.5 font-semibold flex items-center gap-1">
                      Saved Flows
                      <Badge variant="outline" className="text-[9px] px-1 py-0">
                        {environment}
                      </Badge>
                    </p>
                    {filteredSaved.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        className="w-full text-left px-2 py-2 rounded-md hover:bg-muted transition-colors flex items-center gap-2"
                        onClick={() => {
                          handleLoadFlow(f.flowJson, f.id, f.name);
                          setLoadFlowOpen(false);
                          setLoadFlowSearch("");
                        }}
                        data-ocid="flow_designer.load_flow_item"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">
                            {f.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            v{f.version} ·{" "}
                            {f.updatedAt
                              ? new Date(
                                  Number(f.updatedAt) / 1_000_000,
                                ).toLocaleDateString()
                              : "—"}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            f.environment === "live"
                              ? "text-green-700 border-green-300 text-[9px]"
                              : "text-yellow-700 border-yellow-300 text-[9px]"
                          }
                        >
                          {f.environment}
                        </Badge>
                      </button>
                    ))}
                  </div>
                )}

                {filteredBuiltin.length === 0 && filteredSaved.length === 0 && (
                  <p
                    className="text-xs text-muted-foreground text-center py-4"
                    data-ocid="flow_designer.load_flow_empty_state"
                  >
                    No flows match &quot;{loadFlowSearch}&quot;
                  </p>
                )}
              </div>
            </PopoverContent>
          </Popover>

          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1"
            onClick={() => setAutoLayoutKey((k) => k + 1)}
            data-ocid="flow_designer.auto_layout_button"
            title="Auto-arrange blocks"
          >
            <AlignLeft className="w-3.5 h-3.5" />
            Auto Layout
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1"
            onClick={handleTestInSimulator}
            data-ocid="flow_designer.test_simulator_button"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Test
          </Button>

          <Button
            variant="default"
            size="sm"
            className="h-8 gap-1"
            onClick={handleSave}
            disabled={saveFlow.isPending}
            data-ocid="flow_designer.save_button"
          >
            <Save className="w-3.5 h-3.5" />
            {saveFlow.isPending ? "Saving..." : "Save"}
          </Button>

          <Button
            variant="default"
            size="sm"
            className="h-8 gap-1 bg-green-600 hover:bg-green-700 text-white"
            onClick={() => setDeployDialogOpen(true)}
            disabled={!canDeploy || deployFlow.isPending}
            data-ocid="flow_designer.deploy_button"
          >
            <Rocket className="w-3.5 h-3.5" />
            Deploy
          </Button>
        </div>
      </div>

      {/* Main 3-column layout */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left: Block Library */}
        <aside className="w-[250px] shrink-0 border-r border-border bg-card overflow-y-auto">
          <BlockLibrary
            onAddBlock={(block) =>
              handleBlocksChange([...flowState.blocks, block])
            }
          />
        </aside>

        {/* Center: Canvas */}
        <main className="flex-1 min-w-0 relative bg-background">
          <FlowCanvas
            blocks={flowState.blocks}
            connections={flowState.connections}
            selectedBlockId={selectedBlockId}
            autoLayoutKey={autoLayoutKey}
            onBlocksChange={handleBlocksChange}
            onConnectionsChange={handleConnectionsChange}
            onSelectBlock={setSelectedBlockId}
          />
        </main>

        {/* Right: Property Panel or Preview */}
        <aside className="w-[320px] shrink-0 border-l border-border bg-card flex flex-col overflow-hidden">
          {/* Toggle */}
          <div className="flex border-b border-border flex-shrink-0">
            <button
              type="button"
              className={
                rightPanel === "properties"
                  ? "flex-1 py-2 text-xs font-medium transition-colors bg-muted text-foreground"
                  : "flex-1 py-2 text-xs font-medium transition-colors text-muted-foreground hover:text-foreground"
              }
              onClick={() => setRightPanel("properties")}
              data-ocid="flow_designer.properties_tab"
            >
              Properties
            </button>
            <button
              type="button"
              className={
                rightPanel === "preview"
                  ? "flex-1 py-2 text-xs font-medium transition-colors bg-muted text-foreground"
                  : "flex-1 py-2 text-xs font-medium transition-colors text-muted-foreground hover:text-foreground"
              }
              onClick={() => setRightPanel("preview")}
              data-ocid="flow_designer.preview_tab"
            >
              JSON Preview
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {rightPanel === "properties" ? (
              <PropertyPanel
                block={selectedBlock}
                allBlocks={flowState.blocks}
                onUpdate={handleBlockUpdate}
              />
            ) : (
              <FlowPreview flowState={flowState} />
            )}
          </div>
        </aside>
      </div>

      {/* Deploy confirmation dialog */}
      <AlertDialog open={deployDialogOpen} onOpenChange={setDeployDialogOpen}>
        <AlertDialogContent data-ocid="flow_designer.deploy_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Deploy flow to live?</AlertDialogTitle>
            <AlertDialogDescription>
              <strong>{flowName}</strong> will be visible to all users
              immediately. Existing live flows will not be affected unless you
              override them.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="flow_designer.deploy_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeploy}
              disabled={deployFlow.isPending}
              className="bg-green-600 hover:bg-green-700"
              data-ocid="flow_designer.deploy_confirm_button"
            >
              {deployFlow.isPending ? "Deploying..." : "Deploy to Live"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
