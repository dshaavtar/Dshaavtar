import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  useBackendActor,
  useListCities,
  useSetCityModuleEnabled,
} from "@/hooks/useBackend";
import { Loader2, Settings } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

const MODULE_LABELS: Record<string, string> = {
  healthcare: "Healthcare",
  travel: "Travel & Tourism",
  "professional-services": "Professional Services",
  manufacturer: "Manufacturer",
  "fun-learning": "Fun Learning",
  "bus-booking": "Bus Booking",
  "train-booking": "Train Booking",
  "flight-booking": "Flight Booking",
  recharge: "Mobile Recharge",
  "bill-payments": "Bill Payments",
  fastag: "FASTag",
  insurance: "Insurance",
  municipality: "Municipality Payment",
  "old-items": "Old Items Marketplace",
  lending: "Lending",
  donation: "Donation",
  blog: "Blog",
  finance: "Finance",
  shopping: "Shopping",
  jobs: "Jobs",
  property: "Property",
  events: "Events",
  community: "Community",
  matrimony: "Matrimony",
};
const ALL_MODULES = Object.keys(MODULE_LABELS);

export default function CityModuleTogglePage() {
  const { actor } = useBackendActor();
  const citiesQuery = useListCities();
  const setModuleEnabled = useSetCityModuleEnabled();
  const [selectedCity, setSelectedCity] = useState("");
  const [modules, setModules] = useState<
    { moduleName: string; enabled: boolean }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState<string | null>(null);

  const cityList: {
    id?: string;
    cityId?: string;
    name?: string;
    cityName?: string;
  }[] = Array.isArray(citiesQuery)
    ? citiesQuery
    : (citiesQuery as { data?: unknown })?.data &&
        Array.isArray((citiesQuery as { data: unknown }).data)
      ? ((citiesQuery as { data: unknown[] }).data as {
          id?: string;
          cityId?: string;
          name?: string;
          cityName?: string;
        }[])
      : [];

  useEffect(() => {
    if (!actor || !selectedCity) return;
    setLoading(true);
    (
      actor as unknown as Record<
        string,
        (id: string) => Promise<{ moduleName: string; enabled: boolean }[]>
      >
    )
      .getCityModules(selectedCity)
      .then((mods) => {
        const map = new Map((mods ?? []).map((m) => [m.moduleName, m.enabled]));
        setModules(
          ALL_MODULES.map((n) => ({
            moduleName: n,
            enabled: map.has(n) ? !!map.get(n) : true,
          })),
        );
      })
      .catch(() =>
        setModules(ALL_MODULES.map((n) => ({ moduleName: n, enabled: true }))),
      )
      .finally(() => setLoading(false));
  }, [actor, selectedCity]);

  const handleToggle = async (moduleName: string, enabled: boolean) => {
    if (!selectedCity) return;
    setSaving(moduleName);
    try {
      await setModuleEnabled.mutateAsync({
        cityId: selectedCity,
        module_: moduleName,
        enabled,
      });
      setModules((prev) =>
        prev.map((m) => (m.moduleName === moduleName ? { ...m, enabled } : m)),
      );
      toast.success(
        `${MODULE_LABELS[moduleName] ?? moduleName} ${enabled ? "enabled" : "disabled"}`,
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      toast.error(msg || "Failed to update module");
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Settings className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">City Module Toggles</h1>
      </div>
      <p className="text-muted-foreground mb-6">
        Enable or disable service modules per city. Disabled modules are hidden
        from chatbot menus.
      </p>

      <Card className="mb-6">
        <CardContent className="pt-4 pb-4">
          <Label className="text-sm font-medium mb-1 block">Select City</Label>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger
              className="w-72"
              data-ocid="city-modules.city_select"
            >
              <SelectValue placeholder="Choose a city..." />
            </SelectTrigger>
            <SelectContent>
              {cityList.map((c) => {
                const id = c.id ?? c.cityId ?? c.name ?? "";
                return (
                  <SelectItem key={id} value={id}>
                    {c.name ?? c.cityName ?? id}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {!selectedCity && (
        <p className="text-center text-muted-foreground py-12">
          Select a city to manage its modules.
        </p>
      )}

      {selectedCity && loading && (
        <div className="flex items-center gap-2 py-8 justify-center">
          <Loader2 className="animate-spin h-5 w-5" />
          <span>Loading modules...</span>
        </div>
      )}

      {selectedCity && !loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {modules.map(({ moduleName, enabled }) => (
            <Card
              key={moduleName}
              className={`transition-all ${enabled ? "border-primary/30" : "opacity-60"}`}
            >
              <CardContent className="flex items-center justify-between py-3 px-4">
                <div className="min-w-0 mr-2">
                  <p className="font-medium text-sm truncate">
                    {MODULE_LABELS[moduleName] ?? moduleName}
                  </p>
                  <Badge
                    variant={enabled ? "default" : "secondary"}
                    className="mt-1 text-xs"
                  >
                    {enabled ? "On" : "Off"}
                  </Badge>
                </div>
                <Switch
                  checked={enabled}
                  disabled={saving === moduleName}
                  onCheckedChange={(val) => handleToggle(moduleName, val)}
                  data-ocid={`city-modules.toggle.${moduleName}`}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
