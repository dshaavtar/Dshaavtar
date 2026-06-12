import { eh as useDistributorNetwork, ef as useManufacturerByUser, ep as useAddDistributorToNetwork, eq as useValidateMerchantForDistributor, er as useAddDeliveryPartnerToDistributor, r as reactExports, j as jsxRuntimeExports, p as ue } from "./index-D4mmtgjo.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, f as DialogFooter } from "./dialog-DuJeMgVG.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { U as Users } from "./users-BCFHEKUR.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { M as MapPin } from "./map-pin-DGvTRx32.js";
import "./index-DPbSRAbD.js";
import "./utils-2v2HxlWs.js";
import "./index-CmjKy1Fn.js";
import "./index-CUcO6jhF.js";
import "./index-DYndF6Sn.js";
import "./index-D1QQ462r.js";
import "./index-dLX_aGK4.js";
import "./index-BNXq-E6T.js";
import "./x-Chksmd6i.js";
import "./createLucideIcon-BGWdtUCJ.js";
import "./index-BtrS4JsN.js";
const EMPTY_FORM = {
  distributorName: "",
  distributorPhone: "",
  city: "",
  pincode: "",
  schemeApplicable: "",
  marginPercent: "",
  routeDescription: ""
};
function ManufacturerDistributorNetworkPage() {
  const { data: distributors = [], isLoading } = useDistributorNetwork();
  const { data: mfrRaw } = useManufacturerByUser();
  const mfr = mfrRaw;
  const addMutation = useAddDistributorToNetwork();
  const validateMutation = useValidateMerchantForDistributor();
  const addDeliveryPartnerMutation = useAddDeliveryPartnerToDistributor();
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [cityFilter, setCityFilter] = reactExports.useState("");
  const [phoneValid, setPhoneValid] = reactExports.useState(null);
  const [validatingPhone, setValidatingPhone] = reactExports.useState(false);
  const [assigningPartnerId, setAssigningPartnerId] = reactExports.useState(
    null
  );
  const [partnerForm, setPartnerForm] = reactExports.useState({
    phone: "",
    name: "",
    route: ""
  });
  const [partnerSaving, setPartnerSaving] = reactExports.useState(false);
  const filtered = cityFilter ? distributors.filter(
    (d) => d.city.toLowerCase().includes(cityFilter.toLowerCase()) || d.pincode.includes(cityFilter)
  ) : distributors;
  function field(key) {
    return {
      value: form[key],
      onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
    };
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.distributorName || !form.city || !form.pincode) {
      ue.error("Name, city and pincode are required");
      return;
    }
    try {
      if (!mfr) {
        ue.error("Manufacturer profile not loaded");
        return;
      }
      await addMutation.mutateAsync({
        manufacturerId: mfr.id,
        distributorName: form.distributorName,
        distributorPhone: form.distributorPhone,
        city: form.city,
        pincode: form.pincode,
        schemeApplicable: form.schemeApplicable,
        marginPercent: Number(form.marginPercent),
        routeDescription: form.routeDescription
      });
      ue.success("Distributor added!");
      setDialogOpen(false);
      setForm(EMPTY_FORM);
    } catch (err) {
      ue.error(`Failed: ${String(err)}`);
    }
  }
  async function savePartner() {
    if (!partnerForm.phone || !partnerForm.name) {
      ue.error("Phone and name required");
      return;
    }
    setPartnerSaving(true);
    try {
      await addDeliveryPartnerMutation.mutateAsync({
        distributorId: assigningPartnerId,
        phone: partnerForm.phone,
        name: partnerForm.name,
        route: partnerForm.route
      });
      ue.success(`${partnerForm.name} assigned`);
      setAssigningPartnerId(null);
      setPartnerForm({ phone: "", name: "", route: "" });
    } catch (err) {
      ue.error(`Failed: ${String(err)}`);
    } finally {
      setPartnerSaving(false);
    }
  }
  const activeCount = distributors.filter(
    (d) => d.status === "active"
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "manufacturer.distributors.page", children: [
    assigningPartnerId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "Assign Delivery Partner" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "text-muted-foreground hover:text-foreground text-xs",
            onClick: () => setAssigningPartnerId(null),
            children: "Cancel"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Phone",
            value: partnerForm.phone,
            onChange: (e) => setPartnerForm((f) => ({ ...f, phone: e.target.value })),
            "data-ocid": "manufacturer.distributors.partner_phone_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Name",
            value: partnerForm.name,
            onChange: (e) => setPartnerForm((f) => ({ ...f, name: e.target.value })),
            "data-ocid": "manufacturer.distributors.partner_name_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Route / Zone",
            value: partnerForm.route,
            onChange: (e) => setPartnerForm((f) => ({ ...f, route: e.target.value })),
            "data-ocid": "manufacturer.distributors.partner_route_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          size: "sm",
          disabled: partnerSaving,
          onClick: () => {
            void savePartner();
          },
          "data-ocid": "manufacturer.distributors.partner_save_button",
          children: partnerSaving ? "Saving…" : "Save Partner"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-primary" }),
          "Distributor Network"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          activeCount,
          " active of ",
          distributors.length,
          " distributors"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Filter by city / pincode…",
            value: cityFilter,
            onChange: (e) => setCityFilter(e.target.value),
            className: "w-48",
            "data-ocid": "manufacturer.distributors.search_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setDialogOpen(true),
            "data-ocid": "manufacturer.distributors.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
              " Add Distributor"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-lg overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, n)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-12 gap-3",
        "data-ocid": "manufacturer.distributors.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: cityFilter ? "No distributors match your filter" : "No distributors yet. Add your first distributor." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [
        "Name",
        "Contact",
        "City",
        "Pincode",
        "Scheme",
        "Margin %",
        "Earned",
        "Orders",
        "Status"
      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide",
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: filtered.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "hover:bg-muted/20 transition-colors",
          "data-ocid": `manufacturer.distributors.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 font-medium text-foreground", children: d.distributorName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-muted-foreground text-xs", children: d.distributorPhone || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
              d.city
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-muted-foreground font-mono text-xs", children: d.pincode }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-muted-foreground text-xs", children: d.schemeApplicable || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2.5 text-right font-semibold", children: [
              d.marginPercent,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2.5 text-right", children: [
              "₹",
              d.marginEarned.toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right", children: Number(d.totalOrders) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: d.status === "active" ? "outline" : "secondary",
                  className: "text-xs",
                  children: String(d.status)
                }
              ),
              !!d.distributorCode && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-xs bg-amber-500/10 text-amber-600 border-amber-500/30", children: [
                "Code:",
                " ",
                String(
                  d.distributorCode
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "text-xs mt-0.5",
                  onClick: () => {
                    setAssigningPartnerId(d.id);
                    setPartnerForm({ phone: "", name: "", route: "" });
                  },
                  "data-ocid": `manufacturer.distributors.assign_partner_button.${i + 1}`,
                  children: "Assign Partner"
                }
              )
            ] }) })
          ]
        },
        d.id
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "sm:max-w-md",
        "data-ocid": "manufacturer.distributors.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add Distributor" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Distributor Name *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Business / Person name",
                  ...field("distributorName"),
                  "data-ocid": "manufacturer.distributors.name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "+91 98765 43210",
                  ...field("distributorPhone"),
                  onBlur: async () => {
                    if (!form.distributorPhone) {
                      setPhoneValid(null);
                      return;
                    }
                    setValidatingPhone(true);
                    try {
                      await validateMutation.mutateAsync(form.distributorPhone);
                      setPhoneValid(true);
                    } catch {
                      setPhoneValid(false);
                    } finally {
                      setValidatingPhone(false);
                    }
                  },
                  "data-ocid": "manufacturer.distributors.phone_input"
                }
              ),
              validatingPhone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Validating…" }),
              !validatingPhone && phoneValid === true && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-600", children: "✓ Verified merchant" }),
              !validatingPhone && phoneValid === false && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-600", children: "✗ Not a registered merchant" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "City *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "Mumbai",
                    ...field("city"),
                    "data-ocid": "manufacturer.distributors.city_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Pincode *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "400001",
                    ...field("pincode"),
                    "data-ocid": "manufacturer.distributors.pincode_input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Scheme Applicable" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "e.g. Festive Offer",
                    ...field("schemeApplicable"),
                    "data-ocid": "manufacturer.distributors.scheme_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Margin %" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "number",
                    min: "0",
                    max: "100",
                    placeholder: "15",
                    ...field("marginPercent"),
                    "data-ocid": "manufacturer.distributors.margin_input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: () => setDialogOpen(false),
                  "data-ocid": "manufacturer.distributors.cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  disabled: addMutation.isPending || phoneValid === false,
                  "data-ocid": "manufacturer.distributors.submit_button",
                  children: addMutation.isPending ? "Adding…" : "Add Distributor"
                }
              )
            ] })
          ] })
        ]
      }
    ) })
  ] });
}
export {
  ManufacturerDistributorNetworkPage as default
};
