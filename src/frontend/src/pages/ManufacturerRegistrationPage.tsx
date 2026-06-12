import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { Building2, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Manufacturer } from "../backend.d";
import {
  useManufacturerByUser,
  useRegisterManufacturer,
} from "../hooks/useBackend";

const PRODUCT_CATEGORIES = [
  "Food & Beverages",
  "Pharmaceuticals",
  "Textiles & Garments",
  "Electronics & Components",
  "Chemicals",
  "Plastics & Rubber",
  "Metal Products",
  "Paper & Packaging",
  "Agriculture & Agro-processing",
  "Cosmetics & Personal Care",
  "Auto Parts",
  "Furniture & Wood Products",
  "Toys & Games",
  "Footwear",
  "Jewellery & Accessories",
  "Other",
];

export default function ManufacturerRegistrationPage() {
  const navigate = useNavigate();
  const { data: existingRaw } = useManufacturerByUser();
  const existing = existingRaw as Manufacturer | null;
  const registerMutation = useRegisterManufacturer();
  const { identity } = useInternetIdentity();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [form, setForm] = useState({
    businessName: "",
    customerCarePhone: "",
    customerCareEmail: "",
    registeredCity: "",
    productCategories: [] as string[],
  });

  if (existing) {
    return (
      <div
        className="flex flex-col items-center justify-center h-64 gap-4"
        data-ocid="manufacturer.already_registered"
      >
        <CheckCircle className="w-12 h-12 text-green-500" />
        <div className="text-center">
          <p className="font-semibold text-foreground">Already Registered</p>
          <p className="text-sm text-muted-foreground mt-1">
            Your manufacturer profile is active: {existing.businessName}
          </p>
        </div>
        <Button
          onClick={() => navigate({ to: "/manufacturer-dashboard" })}
          data-ocid="manufacturer.go_dashboard_button"
        >
          Go to Dashboard
        </Button>
      </div>
    );
  }

  function toggleCategory(cat: string) {
    setForm((f) => ({
      ...f,
      productCategories: f.productCategories.includes(cat)
        ? f.productCategories.filter((c) => c !== cat)
        : [...f.productCategories, cat],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !form.businessName ||
      !form.customerCarePhone ||
      !form.customerCareEmail
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    if (form.productCategories.length === 0) {
      toast.error("Select at least one product category");
      return;
    }
    try {
      await registerMutation.mutateAsync({
        ...form,
        userId:
          identity?.getPrincipal().toString() ??
          `user_${Date.now().toString()}`,
      });
      toast.success("Manufacturer registered successfully!");
      navigate({ to: "/manufacturer-dashboard" });
    } catch (err) {
      const msg =
        (err as { errorDetail?: string } | undefined)?.errorDetail ??
        (err as Error | undefined)?.message ??
        String(err);
      setErrorMsg(msg);
      toast.error(`Registration failed: ${msg}`);
    }
  }

  return (
    <div
      className="max-w-xl mx-auto"
      data-ocid="manufacturer.registration.page"
    >
      {errorMsg && (
        <div className="mb-4 p-3 rounded bg-destructive/10 border border-destructive/30 text-destructive text-sm">
          {errorMsg}
        </div>
      )}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Building2 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">
            Manufacturer Registration
          </h1>
          <p className="text-sm text-muted-foreground">
            Register your manufacturing business on LocalBazar Kart
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-lg p-6 space-y-5"
      >
        <div className="space-y-1.5">
          <Label htmlFor="businessName">
            Business Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="businessName"
            placeholder="e.g. Sunrise Foods Pvt. Ltd."
            value={form.businessName}
            onChange={(e) =>
              setForm((f) => ({ ...f, businessName: e.target.value }))
            }
            data-ocid="manufacturer.registration.business_name_input"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="registeredCity">Registered City</Label>
          <Input
            id="registeredCity"
            placeholder="e.g. Mumbai"
            value={form.registeredCity}
            onChange={(e) =>
              setForm((f) => ({ ...f, registeredCity: e.target.value }))
            }
            data-ocid="manufacturer.registration.city_input"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="ccPhone">
              Customer Care Phone <span className="text-destructive">*</span>
            </Label>
            <Input
              id="ccPhone"
              placeholder="+91 98765 43210"
              value={form.customerCarePhone}
              onChange={(e) =>
                setForm((f) => ({ ...f, customerCarePhone: e.target.value }))
              }
              data-ocid="manufacturer.registration.phone_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ccEmail">
              Customer Care Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="ccEmail"
              type="email"
              placeholder="care@company.com"
              value={form.customerCareEmail}
              onChange={(e) =>
                setForm((f) => ({ ...f, customerCareEmail: e.target.value }))
              }
              data-ocid="manufacturer.registration.email_input"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>
            Product Categories <span className="text-destructive">*</span>
          </Label>
          <div className="flex flex-wrap gap-2">
            {PRODUCT_CATEGORIES.map((cat) => {
              const selected = form.productCategories.includes(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    selected
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:border-primary"
                  }`}
                  data-ocid={`manufacturer.registration.category.${cat.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          {form.productCategories.length > 0 && (
            <p className="text-xs text-muted-foreground">
              {form.productCategories.length} selected
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={registerMutation.isPending}
          data-ocid="manufacturer.registration.submit_button"
        >
          {registerMutation.isPending
            ? "Registering…"
            : "Register as Manufacturer"}
        </Button>
      </form>
    </div>
  );
}
