import { u as useNavigate, ef as useManufacturerByUser, em as useRegisterManufacturer, b as useInternetIdentity, r as reactExports, j as jsxRuntimeExports, p as ue } from "./index-D4mmtgjo.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { C as CircleCheckBig } from "./circle-check-big-C6-kT1pJ.js";
import { B as Building2 } from "./building-2-B0h7D8pK.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-BtrS4JsN.js";
import "./createLucideIcon-BGWdtUCJ.js";
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
  "Other"
];
function ManufacturerRegistrationPage() {
  const navigate = useNavigate();
  const { data: existingRaw } = useManufacturerByUser();
  const existing = existingRaw;
  const registerMutation = useRegisterManufacturer();
  const { identity } = useInternetIdentity();
  const [errorMsg, setErrorMsg] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    businessName: "",
    customerCarePhone: "",
    customerCareEmail: "",
    registeredCity: "",
    productCategories: []
  });
  if (existing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center h-64 gap-4",
        "data-ocid": "manufacturer.already_registered",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-12 h-12 text-green-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Already Registered" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
              "Your manufacturer profile is active: ",
              existing.businessName
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => navigate({ to: "/manufacturer-dashboard" }),
              "data-ocid": "manufacturer.go_dashboard_button",
              children: "Go to Dashboard"
            }
          )
        ]
      }
    );
  }
  function toggleCategory(cat) {
    setForm((f) => ({
      ...f,
      productCategories: f.productCategories.includes(cat) ? f.productCategories.filter((c) => c !== cat) : [...f.productCategories, cat]
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.businessName || !form.customerCarePhone || !form.customerCareEmail) {
      ue.error("Please fill all required fields");
      return;
    }
    if (form.productCategories.length === 0) {
      ue.error("Select at least one product category");
      return;
    }
    try {
      await registerMutation.mutateAsync({
        ...form,
        userId: (identity == null ? void 0 : identity.getPrincipal().toString()) ?? `user_${Date.now().toString()}`
      });
      ue.success("Manufacturer registered successfully!");
      navigate({ to: "/manufacturer-dashboard" });
    } catch (err) {
      const msg = (err == null ? void 0 : err.errorDetail) ?? (err == null ? void 0 : err.message) ?? String(err);
      setErrorMsg(msg);
      ue.error(`Registration failed: ${msg}`);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-xl mx-auto",
      "data-ocid": "manufacturer.registration.page",
      children: [
        errorMsg && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 p-3 rounded bg-destructive/10 border border-destructive/30 text-destructive text-sm", children: errorMsg }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "Manufacturer Registration" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Register your manufacturing business on LocalBazar Kart" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleSubmit,
            className: "bg-card border border-border rounded-lg p-6 space-y-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "businessName", children: [
                  "Business Name ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "businessName",
                    placeholder: "e.g. Sunrise Foods Pvt. Ltd.",
                    value: form.businessName,
                    onChange: (e) => setForm((f) => ({ ...f, businessName: e.target.value })),
                    "data-ocid": "manufacturer.registration.business_name_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "registeredCity", children: "Registered City" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "registeredCity",
                    placeholder: "e.g. Mumbai",
                    value: form.registeredCity,
                    onChange: (e) => setForm((f) => ({ ...f, registeredCity: e.target.value })),
                    "data-ocid": "manufacturer.registration.city_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "ccPhone", children: [
                    "Customer Care Phone ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "ccPhone",
                      placeholder: "+91 98765 43210",
                      value: form.customerCarePhone,
                      onChange: (e) => setForm((f) => ({ ...f, customerCarePhone: e.target.value })),
                      "data-ocid": "manufacturer.registration.phone_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "ccEmail", children: [
                    "Customer Care Email ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "ccEmail",
                      type: "email",
                      placeholder: "care@company.com",
                      value: form.customerCareEmail,
                      onChange: (e) => setForm((f) => ({ ...f, customerCareEmail: e.target.value })),
                      "data-ocid": "manufacturer.registration.email_input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                  "Product Categories ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: PRODUCT_CATEGORIES.map((cat) => {
                  const selected = form.productCategories.includes(cat);
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => toggleCategory(cat),
                      className: `px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${selected ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:border-primary"}`,
                      "data-ocid": `manufacturer.registration.category.${cat.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
                      children: cat
                    },
                    cat
                  );
                }) }),
                form.productCategories.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  form.productCategories.length,
                  " selected"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "w-full",
                  disabled: registerMutation.isPending,
                  "data-ocid": "manufacturer.registration.submit_button",
                  children: registerMutation.isPending ? "Registering…" : "Register as Manufacturer"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  ManufacturerRegistrationPage as default
};
