import { D as useMerchants, r as reactExports, cg as useImportMerchantContacts, ch as useSendMerchantPromotion, ci as useGetMerchantImportStats, a$ as useGetSubscriptionDiscountForMerchant, j as jsxRuntimeExports, p as ue } from "./index-D4mmtgjo.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-DuJeMgVG.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Textarea } from "./textarea-Bmq1MNcJ.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { U as Users } from "./users-BCFHEKUR.js";
import { T as Tag } from "./tag-DM1LGoN5.js";
import { G as Gift } from "./gift-6qBg8KRw.js";
import { U as Upload } from "./upload-Ci34DUN7.js";
import { C as CircleCheckBig } from "./circle-check-big-C6-kT1pJ.js";
import { S as Send } from "./send-DoOOMmv0.js";
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
import "./index-IXOTxK3N.js";
import "./index-yUS8KoxU.js";
import "./index-z5OST4d2.js";
import "./chevron-down-gIU8OsEH.js";
import "./check-CO9wi49t.js";
import "./chevron-up-BzRcvKHL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 2v2", key: "scm5qe" }],
  ["path", { d: "M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2", key: "1waht3" }],
  ["path", { d: "M8 2v2", key: "pbkmx" }],
  ["circle", { cx: "12", cy: "11", r: "3", key: "itu57m" }],
  ["rect", { x: "3", y: "4", width: "18", height: "18", rx: "2", key: "12vinp" }]
];
const Contact = createLucideIcon("contact", __iconNode);
function MerchantContactsPage() {
  var _a, _b;
  const { data: merchants = [], isLoading: merchantsLoading } = useMerchants();
  const [selectedMerchantId, setSelectedMerchantId] = reactExports.useState("");
  const [contactsText, setContactsText] = reactExports.useState("");
  const [promoText, setPromoText] = reactExports.useState("");
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [importResult, setImportResult] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  const selectedMerchant = merchants.find((m) => m.id === selectedMerchantId);
  const merchantPhone = ((_b = (_a = selectedMerchant == null ? void 0 : selectedMerchant.location) == null ? void 0 : _a.address) == null ? void 0 : _b.startsWith("+")) ? selectedMerchant.location.address : "+919876543211";
  const importContacts = useImportMerchantContacts();
  const sendPromotion = useSendMerchantPromotion();
  const { data: importStats, isLoading: statsLoading } = useGetMerchantImportStats();
  const { data: discount = 0, isLoading: discountLoading } = useGetSubscriptionDiscountForMerchant();
  function handleFileUpload(e) {
    var _a2;
    const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      var _a3;
      const text = (_a3 = evt.target) == null ? void 0 : _a3.result;
      const lines = text.split(/\r?\n/).map((l) => l.split(",")[0].trim()).filter((l) => l.length > 5);
      setContactsText(lines.join("\n"));
      ue.success(`Loaded ${lines.length} contacts from file`);
    };
    reader.readAsText(file);
  }
  async function handleImport() {
    if (!selectedMerchantId) {
      ue.error("Please select a merchant first");
      return;
    }
    const phones = contactsText.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 5);
    if (phones.length === 0) {
      ue.error("Please enter or upload phone numbers");
      return;
    }
    try {
      const result = await importContacts.mutateAsync({
        merchantPhone,
        contacts: phones
      });
      setImportResult(result);
      setContactsText("");
      ue.success(`Import complete: ${result.imported} contacts added`);
    } catch {
      ue.error("Import failed");
    }
  }
  async function handleSendPromotion() {
    if (!selectedMerchantId || !promoText.trim()) return;
    try {
      const result = await sendPromotion.mutateAsync({
        merchantPhone,
        messageText: promoText
      });
      setShowConfirm(false);
      setPromoText("");
      ue.success(
        `Promotion sent to ${result.sent} customers. ${result.skipped} opted out.`
      );
    } catch {
      ue.error("Failed to send promotion");
    }
  }
  const importedCustomerCount = (importStats == null ? void 0 : importStats.totalImported) ?? 0;
  const discountPercent = discount;
  const nextDiscountAt = Math.ceil(importedCustomerCount / 150) * 150;
  const currentTierBase = Math.floor(importedCustomerCount / 150) * 150;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-bold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Contact, { className: "w-5 h-5 text-primary" }),
        "Merchant Contacts"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Import customer contacts for merchants, manage promotions, and track subscription discounts" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-primary" }),
        "Select Merchant"
      ] }),
      merchantsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: selectedMerchantId,
          onValueChange: setSelectedMerchantId,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "merchant-contacts.merchant-select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose a verified merchant…" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: merchants.filter((m) => m.isVerified).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: m.id, children: m.businessName }, m.id)) })
          ]
        }
      )
    ] }),
    selectedMerchantId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-4 h-4 text-primary" }),
        "Import Stats & Subscription Discount"
      ] }),
      statsLoading || discountLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: ["s1", "s2", "s3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-display text-primary", children: importedCustomerCount }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Total Imported" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-display text-foreground", children: (importStats == null ? void 0 : importStats.totalBatches) ?? 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Batches" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold font-display text-emerald-600", children: [
              discountPercent,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Current Discount" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "w-5 h-5 text-emerald-600 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-emerald-700 dark:text-emerald-400", children: "Every 150 customers = 5% subscription discount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: discountPercent > 0 ? `This merchant is saving ${discountPercent}% on subscription (${currentTierBase} customers imported).` : `Import ${nextDiscountAt - importedCustomerCount} more customers to unlock 5% discount.` }),
            discountPercent < 25 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-emerald-600", children: [
              "Next tier at ",
              nextDiscountAt,
              " customers (+5% off, up to 25% max)"
            ] }),
            (importStats == null ? void 0 : importStats.lastImportDate) && importStats.lastImportDate > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Last import:",
              " ",
              new Date(
                importStats.lastImportDate
              ).toLocaleDateString("en-IN")
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 text-primary" }),
        "Upload Customer Contacts"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Paste phone numbers (one per line) or upload a CSV file. Existing merchants and delivery partners will be skipped automatically." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: fileInputRef,
            type: "file",
            accept: ".csv,.txt,.xlsx",
            className: "hidden",
            onChange: handleFileUpload,
            "data-ocid": "merchant-contacts.file-upload"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "gap-1.5",
            onClick: () => {
              var _a2;
              return (_a2 = fileInputRef.current) == null ? void 0 : _a2.click();
            },
            "data-ocid": "merchant-contacts.upload-button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-3.5 h-3.5" }),
              "Upload CSV / TXT"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "or paste numbers below" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone Numbers (one per line)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            placeholder: "+919876543210\n+919765432109\n+919654321098\n…",
            rows: 6,
            value: contactsText,
            onChange: (e) => setContactsText(e.target.value),
            className: "font-mono text-xs",
            "data-ocid": "merchant-contacts.phones-textarea"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          contactsText.split(/\r?\n/).filter((l) => l.trim().length > 5).length,
          " ",
          "phone numbers entered"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: handleImport,
          disabled: importContacts.isPending || !selectedMerchantId || !contactsText.trim(),
          className: "gap-1.5",
          "data-ocid": "merchant-contacts.import-button",
          children: [
            importContacts.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
            importContacts.isPending ? "Importing…" : "Import Contacts"
          ]
        }
      ),
      importResult && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-emerald-600 shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-emerald-700 dark:text-emerald-400", children: "Import Complete" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "✅ ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: importResult.imported }),
              " new contacts imported"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "🔁 ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: importResult.duplicates }),
              " duplicates skipped"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "🏪 ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: importResult.skippedMerchants }),
              " existing merchants skipped"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "🚴 ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: importResult.skippedDPs }),
              " delivery partners skipped"
            ] })
          ] })
        ] })
      ] })
    ] }),
    selectedMerchantId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4 text-primary" }),
        "Send Promotion Message"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: 'Send a promotional text message to all imported customers who have not opted out. Customers can reply "STOP" to opt out.' }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Promotion Message" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            placeholder: "e.g. 🎉 Sharma Kirana Store — Flat 20% off on all orders today! Use code SAVE20. Shop now: [link]",
            rows: 4,
            value: promoText,
            onChange: (e) => setPromoText(e.target.value),
            "data-ocid": "merchant-contacts.promo-textarea"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          promoText.length,
          " characters"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowConfirm(true),
          disabled: !promoText.trim(),
          variant: "default",
          className: "gap-1.5",
          "data-ocid": "merchant-contacts.send-promo-button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" }),
            "Send to All Customers"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showConfirm, onOpenChange: setShowConfirm, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "sm:max-w-md",
        "data-ocid": "merchant-contacts.confirm-dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Confirm Promotion Send" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
              "This will send the promotion message to all customers imported for",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: selectedMerchant == null ? void 0 : selectedMerchant.businessName }),
              " who have not opted out. This action cannot be undone."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/20 rounded-xl p-3 text-sm text-foreground", children: promoText }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1",
                onClick: () => setShowConfirm(false),
                "data-ocid": "merchant-contacts.cancel-button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "flex-1 gap-1.5",
                onClick: handleSendPromotion,
                disabled: sendPromotion.isPending,
                "data-ocid": "merchant-contacts.confirm-button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" }),
                  sendPromotion.isPending ? "Sending…" : "Send Promotion"
                ]
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
export {
  MerchantContactsPage as default
};
