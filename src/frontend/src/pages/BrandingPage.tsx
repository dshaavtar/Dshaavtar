import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "@tanstack/react-router";
import {
  Bot,
  CheckCircle2,
  Lock,
  Package,
  Plus,
  RefreshCw,
  ShieldAlert,
  Smartphone,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../App";
import {
  useAddAppVersion,
  useGetAllAppVersions,
  useGetBrandingConfig,
  useSetAppVersionActive,
  useUpdateBrandingConfig,
} from "../hooks/useBackend";

type Platform = "iOS" | "Android";

function BrandIdentitySection() {
  const { data: config, isLoading, refetch } = useGetBrandingConfig();
  const updateBranding = useUpdateBrandingConfig();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    brandName: "",
    logoUrl: "",
    welcomeMessage: "",
  });
  const [editing, setEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  function startEdit() {
    if (!config) return;
    setForm({
      brandName: String(config.brandName ?? ""),
      logoUrl: String(config.logoUrl ?? ""),
      welcomeMessage: String(config.welcomeMessage ?? ""),
    });
    setSaveSuccess(false);
    setEditing(true);
  }

  async function handleSave() {
    if (!form.brandName.trim()) {
      toast.error("Brand name is required");
      return;
    }
    try {
      await updateBranding.mutateAsync({
        brandName: form.brandName,
        logoUrl: form.logoUrl,
        welcomeMessage: form.welcomeMessage,
      });
      toast.success(
        "Brand name updated — chatbot welcome message synced automatically",
      );
      setEditing(false);
      setSaveSuccess(true);
      refetch();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update branding",
      );
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">
          Brand Identity
        </h3>
        {!editing && (
          <Button
            variant="outline"
            size="sm"
            onClick={startEdit}
            data-ocid="branding.edit_button"
          >
            Edit
          </Button>
        )}
      </div>

      {!editing ? (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "Brand Name", value: String(config?.brandName ?? "—") },
              {
                label: "Logo URL",
                value: String(config?.logoUrl ?? "— not set —"),
              },
            ].map(({ label, value }) => (
              <div key={label} className="bg-muted/30 rounded-xl p-3">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium mt-0.5 truncate">
                  {value ?? "—"}
                </p>
              </div>
            ))}
            <div className="col-span-full bg-muted/30 rounded-xl p-3">
              <p className="text-xs text-muted-foreground">
                Welcome Message (chatbot)
              </p>
              <p className="text-sm font-medium mt-0.5">
                {String(config?.welcomeMessage ?? "—")}
              </p>
            </div>
          </div>

          {/* Post-save action prompt */}
          {saveSuccess && (
            <div
              className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl"
              data-ocid="branding.save_success_state"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <p className="flex-1 text-xs text-emerald-700 dark:text-emerald-400">
                Brand saved. Test the updated welcome message in the Chatbot
                Simulator.
              </p>
              <Button
                size="sm"
                variant="outline"
                className="shrink-0 border-emerald-300 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-700 dark:text-emerald-400"
                onClick={() => navigate({ to: "/chatbot" })}
                data-ocid="branding.test_welcome_button"
              >
                <Bot className="w-4 h-4 mr-1.5" />
                Test Welcome Message
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5">
              Brand Name *
            </Label>
            <Input
              value={form.brandName}
              onChange={(e) =>
                setForm((f) => ({ ...f, brandName: e.target.value }))
              }
              placeholder="e.g. LocalBazar Kart"
              data-ocid="branding.brandname.input"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5">
              Logo URL (Optional)
            </Label>
            <Input
              value={form.logoUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, logoUrl: e.target.value }))
              }
              placeholder="https://your-cdn.com/logo.png"
              data-ocid="branding.logourl.input"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5">
              Welcome Message
            </Label>
            <Input
              value={form.welcomeMessage}
              onChange={(e) =>
                setForm((f) => ({ ...f, welcomeMessage: e.target.value }))
              }
              placeholder="Welcome to LocalBazar Kart! 🛒"
              data-ocid="branding.welcome.input"
            />
            <p className="text-xs text-muted-foreground mt-1">
              This message is synced automatically to the chatbot welcome flow.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setEditing(false)}
              data-ocid="branding.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={updateBranding.isPending}
              data-ocid="branding.save_button"
            >
              {updateBranding.isPending ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function AppVersionsSection() {
  const { data: versions = [], isLoading, refetch } = useGetAllAppVersions();
  const { data: config } = useGetBrandingConfig();
  const addVersion = useAddAppVersion();
  const setActive = useSetAppVersionActive();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    brandName: "",
    platform: "Android" as Platform,
    version: "",
    buildNumber: "",
  });

  function openForm() {
    setForm((f) => ({ ...f, brandName: String(config?.brandName ?? "") }));
    setShowForm(true);
  }

  async function handlePublish() {
    if (
      !form.version.trim() ||
      !form.buildNumber.trim() ||
      !form.brandName.trim()
    ) {
      toast.error("Fill all required fields");
      return;
    }
    try {
      await addVersion.mutateAsync({
        brandName: form.brandName,
        platform: form.platform,
        version: form.version,
        buildNumber: Number(form.buildNumber),
      });
      toast.success(`Version ${form.version} published for ${form.platform}`);
      setShowForm(false);
      refetch();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to publish version",
      );
    }
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display font-semibold text-foreground">
            App Versions
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Track iOS &amp; Android builds per brand. Brand name is locked after
            publishing.
          </p>
        </div>
        <Button
          size="sm"
          onClick={openForm}
          data-ocid="branding.add_version_button"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Version
        </Button>
      </div>

      {showForm && (
        <div className="border border-border rounded-xl p-4 bg-muted/20 space-y-4">
          <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-700 dark:text-amber-400">
              Brand name is <strong>locked after publishing</strong>. To launch
              a new brand, use a different app name. Updating an existing brand
              will not change its published name.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5">
                Brand Name *
              </Label>
              <Input
                value={form.brandName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, brandName: e.target.value }))
                }
                placeholder="LocalBazar Kart"
                data-ocid="branding.version.brandname.input"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5">
                Platform *
              </Label>
              <Select
                value={form.platform}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, platform: v as Platform }))
                }
              >
                <SelectTrigger data-ocid="branding.version.platform.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iOS">
                    <Smartphone className="w-3.5 h-3.5 inline mr-1.5" />
                    iOS
                  </SelectItem>
                  <SelectItem value="Android">
                    <Package className="w-3.5 h-3.5 inline mr-1.5" />
                    Android
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5">
                Version *
              </Label>
              <Input
                value={form.version}
                onChange={(e) =>
                  setForm((f) => ({ ...f, version: e.target.value }))
                }
                placeholder="1.0.0"
                data-ocid="branding.version.version.input"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5">
                Build Number *
              </Label>
              <Input
                type="number"
                value={form.buildNumber}
                onChange={(e) =>
                  setForm((f) => ({ ...f, buildNumber: e.target.value }))
                }
                placeholder="100"
                data-ocid="branding.version.build.input"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowForm(false)}
              data-ocid="branding.version.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePublish}
              disabled={addVersion.isPending}
              data-ocid="branding.version.publish_button"
            >
              {addVersion.isPending ? "Publishing…" : "Publish Version"}
            </Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      ) : versions.length === 0 ? (
        <div
          className="text-center py-8 text-muted-foreground text-sm"
          data-ocid="branding.versions.empty_state"
        >
          No versions published yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand Name</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Build #</TableHead>
                <TableHead>Release Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {versions.map((v: Record<string, unknown>, idx: number) => (
                <TableRow
                  key={String(v.id ?? idx)}
                  data-ocid={`branding.version.item.${idx + 1}`}
                >
                  <TableCell className="font-medium">
                    {String(v.brandName ?? "—")}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {String(v.platform ?? "—")}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {String(v.version ?? "—")}
                  </TableCell>
                  <TableCell className="tabular-nums text-muted-foreground">
                    {String(v.buildNumber ?? "—")}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {v.releaseDate
                      ? new Date(Number(v.releaseDate)).toLocaleDateString(
                          "en-IN",
                        )
                      : "—"}
                  </TableCell>
                  <TableCell>
                    {v.isActive ? (
                      <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                        Active
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-muted-foreground text-xs"
                      >
                        Inactive
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {!v.isActive && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-xs"
                        onClick={async () => {
                          try {
                            await setActive.mutateAsync(String(v.id ?? ""));
                            toast.success("Version set as active");
                            refetch();
                          } catch {
                            toast.error("Failed to activate version");
                          }
                        }}
                        data-ocid={`branding.version.activate_button.${idx + 1}`}
                      >
                        Set Active
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default function BrandingPage() {
  const { isAdmin } = useAuth();
  const { refetch } = useGetBrandingConfig();

  // Guard: admin-only page — show inline message instead of silent redirect
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-background">
        <div className="text-center max-w-sm px-6">
          <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center mx-auto mb-4">
            <span className="text-amber-600 text-xl">🔒</span>
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Admin Access Required
          </h2>
          <p className="text-sm text-muted-foreground mb-2">
            The Branding page is locked to admin users only.
          </p>
          <p className="text-xs text-muted-foreground">
            Log in with your Internet Identity admin account or use the admin
            password to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-ocid="branding.page">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-display font-bold text-foreground">
              Branding
            </h1>
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 text-xs font-medium"
              data-ocid="branding.admin_lock_badge"
            >
              <ShieldAlert className="w-3 h-3" />
              Admin Only
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage your app brand identity and mobile app versions. Changes are
            locked to admin access only.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => refetch()}
          data-ocid="branding.refresh_button"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      {/* Lock notice */}
      <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl">
        <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
            This page is locked to admin only
          </p>
          <p className="text-xs text-amber-700/80 dark:text-amber-400/80 mt-0.5">
            The default brand is <strong>LocalBazar Kart</strong>. Only the
            authenticated admin (via Internet Identity or admin password) can
            change the brand name. All chatbot welcome messages update
            automatically on save.
          </p>
        </div>
      </div>

      <BrandIdentitySection />
      <AppVersionsSection />
    </div>
  );
}
