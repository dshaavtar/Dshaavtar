import { r as reactExports, C as useClearFlowCache, D as useMerchants, V as VerificationStatus, j as jsxRuntimeExports, p as ue, E as useVerifyMerchant, F as useDeactivateMerchant, G as useSetBoostedOrderCount, H as useManualUnblock, I as useCreateMerchant, J as useUpdateMerchantKYCDocuments, K as useProducts, M as useAddMerchantBranch, N as useEntityLeads } from "./index-D4mmtgjo.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DuJeMgVG.js";
import { I as Input } from "./input-BAihtL8f.js";
import { L as Label } from "./label-Cgfk62Wh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C_0Bp1b_.js";
import { S as Sheet, a as SheetContent, b as SheetHeader, c as SheetTitle } from "./sheet-g1LGwGv2.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { T as Textarea } from "./textarea-Bmq1MNcJ.js";
import { S as StatusBadge } from "./StatusBadge-DNkrizJz.js";
import { u as useDebounce, a as usePagination } from "./usePagination-hWnqFD6I.js";
import { v as validatePhone, P as PHONE_ERROR_MSG } from "./utils-BlceAbYT.js";
import { P as Package } from "./package-CosknzeL.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { P as Plus } from "./plus-ty49Yili.js";
import { S as Store } from "./store-CaCzKt5a.js";
import { C as CircleCheckBig } from "./circle-check-big-C6-kT1pJ.js";
import { T as TrendingUp } from "./trending-up-Zp9L4lXd.js";
import { S as Search } from "./search-DnFDW7fF.js";
import { C as ChevronLeft } from "./chevron-left-DzxTPwXv.js";
import { C as ChevronRight } from "./chevron-right-BS0DZr5u.js";
import { L as Lock } from "./lock-_3m7dyMM.js";
import { U as Users } from "./users-BCFHEKUR.js";
import { S as ShoppingCart } from "./shopping-cart-CIiL3ef_.js";
import { M as MapPin } from "./map-pin-DGvTRx32.js";
import { C as CircleX } from "./circle-x-CRQzBkf3.js";
import { L as LockOpen } from "./lock-open-BwR0r970.js";
import { G as GitBranch } from "./git-branch-D-EDHnGg.js";
import { T as Trash2 } from "./trash-2-anyWEWQc.js";
import { S as Star } from "./star-DbleSGPY.js";
import { U as Upload } from "./upload-Ci34DUN7.js";
import { E as ExternalLink } from "./external-link-BziLgQmT.js";
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
import "./index-IXOTxK3N.js";
import "./index-yUS8KoxU.js";
import "./index-z5OST4d2.js";
import "./chevron-down-gIU8OsEH.js";
import "./check-CO9wi49t.js";
import "./chevron-up-BzRcvKHL.js";
function countryFlagEmoji(countryCode) {
  if (!countryCode || countryCode.length !== 2) return "🌐";
  const code = countryCode.toUpperCase();
  const codePoints = [...code].map((c) => 127462 + c.charCodeAt(0) - 65);
  return String.fromCodePoint(...codePoints);
}
function getCountryFromPhone(phone) {
  if (phone.startsWith("+91") || phone.startsWith("91")) return "IN";
  if (phone.startsWith("+1")) return "US";
  if (phone.startsWith("+44")) return "GB";
  if (phone.startsWith("+971")) return "AE";
  if (phone.startsWith("+65")) return "SG";
  return "IN";
}
const CATEGORY_COLORS = {
  Grocery: "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Food & Beverages": "bg-orange-100 text-orange-700 border-orange-200",
  Electronics: "bg-blue-100 text-blue-700 border-blue-200",
  Clothing: "bg-purple-100 text-purple-700 border-purple-200",
  Medicine: "bg-red-100 text-red-700 border-red-200"
};
function CategoryBadge({ category }) {
  const cls = CATEGORY_COLORS[category] ?? "bg-muted text-muted-foreground border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`,
      children: category
    }
  );
}
function Stars({ rating }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
    [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Star,
      {
        className: `w-3 h-3 ${i <= Math.round(rating) ? "text-amber-500 fill-amber-500" : "text-muted-foreground"}`
      },
      i
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-0.5", children: rating.toFixed(1) })
  ] });
}
function FilePickerField({
  label,
  existingUrl,
  onUrlChange,
  ocid
}) {
  const [uploading, setUploading] = reactExports.useState(false);
  const [previewUrl, setPreviewUrl] = reactExports.useState(existingUrl);
  const fileRef = reactExports.useRef(null);
  async function handleFile(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = (evt) => {
        var _a2;
        const dataUrl = (_a2 = evt.target) == null ? void 0 : _a2.result;
        setPreviewUrl(dataUrl);
        onUrlChange(dataUrl);
        setUploading(false);
        ue.success(`${label} uploaded`);
      };
      reader.readAsDataURL(file);
    } catch {
      setUploading(false);
      ue.error(`Failed to upload ${label}`);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: fileRef,
          type: "file",
          accept: "image/*,.pdf",
          className: "hidden",
          onChange: handleFile,
          "aria-label": `Upload ${label}`,
          "data-ocid": ocid
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          size: "sm",
          variant: "outline",
          className: "h-8 gap-1.5 text-xs flex-1",
          onClick: () => {
            var _a;
            return (_a = fileRef.current) == null ? void 0 : _a.click();
          },
          disabled: uploading,
          children: [
            uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 border border-primary border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-3 h-3" }),
            previewUrl ? "Replace File" : "Upload File"
          ]
        }
      ),
      previewUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: previewUrl,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "flex items-center gap-1 text-xs text-primary hover:underline shrink-0",
          title: "View uploaded document",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" }),
            "View"
          ]
        }
      )
    ] }),
    previewUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-emerald-600 flex items-center gap-1 mt-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" }),
      " Document uploaded"
    ] })
  ] });
}
function KYCTab({
  merchant,
  onVerify,
  onReject
}) {
  const updateKYC = useUpdateMerchantKYCDocuments();
  const [form, setForm] = reactExports.useState({
    panNo: merchant.kyc.panNumber ?? "",
    panUrl: merchant.kyc.panImageUrl ?? "",
    aadhaarNo: merchant.kyc.aadhaarNumber ?? "",
    aadhaarUrl: merchant.kyc.aadhaarImageUrl ?? "",
    gstNo: merchant.kyc.gstNumber ?? "",
    gstUrl: merchant.kyc.gstImageUrl ?? "",
    outletPhotoUrl: merchant.kyc.outletPhotoUrl ?? "",
    chequeUrl: merchant.kyc.cancelledChequeUrl ?? "",
    qrUrl: merchant.kyc.personalQRUrl ?? ""
  });
  const storedReason = merchant.rejectionReason ?? "";
  const docs = [
    {
      label: "PAN Number",
      value: merchant.kyc.panNumber,
      ok: !!merchant.kyc.panNumber
    },
    {
      label: "PAN Document",
      value: merchant.kyc.panImageUrl ? "Uploaded" : void 0,
      ok: !!merchant.kyc.panImageUrl
    },
    {
      label: "Aadhaar Number",
      value: merchant.kyc.aadhaarNumber,
      ok: !!merchant.kyc.aadhaarNumber
    },
    {
      label: "Aadhaar Document",
      value: merchant.kyc.aadhaarImageUrl ? "Uploaded" : void 0,
      ok: !!merchant.kyc.aadhaarImageUrl
    },
    {
      label: "GST Number",
      value: merchant.kyc.gstNumber,
      ok: !!merchant.kyc.gstNumber
    },
    {
      label: "Outlet Photo",
      value: merchant.kyc.outletPhotoUrl ? "Uploaded" : void 0,
      ok: !!merchant.kyc.outletPhotoUrl
    },
    {
      label: "Cancelled Cheque",
      value: merchant.kyc.cancelledChequeUrl ? "Uploaded" : void 0,
      ok: !!merchant.kyc.cancelledChequeUrl
    },
    {
      label: "UPI/QR Code",
      value: merchant.kyc.personalQRUrl ? "Uploaded" : void 0,
      ok: !!merchant.kyc.personalQRUrl
    }
  ];
  async function handleSaveDocuments() {
    try {
      await updateKYC.mutateAsync({ merchantId: merchant.id, ...form });
      ue.success("KYC documents saved");
    } catch {
      ue.error("Failed to save KYC documents");
    }
  }
  const isVerified = merchant.kyc.verificationStatus === VerificationStatus.verified;
  const isRejected = merchant.kyc.verificationStatus === VerificationStatus.rejected;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Verification Status:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatusBadge,
        {
          type: "verification",
          value: merchant.kyc.verificationStatus
        }
      )
    ] }),
    isRejected && storedReason && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-destructive shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-destructive mb-0.5", children: "Rejection Reason" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: storedReason })
      ] })
    ] }),
    isRejected && !storedReason && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg text-xs text-destructive", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 shrink-0" }),
      "Merchant verification was rejected. Use the Reject button to provide a reason."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: docs.map((doc) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2 p-2 bg-muted/20 rounded-lg",
        children: [
          doc.ok ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5 text-emerald-500 flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5 text-muted-foreground flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs truncate", children: doc.label })
        ]
      },
      doc.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-xl p-4 space-y-3 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Update KYC Documents" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "PAN Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              className: "h-8 text-xs",
              value: form.panNo,
              onChange: (e) => setForm((f) => ({ ...f, panNo: e.target.value })),
              placeholder: "ABCDE1234F",
              "data-ocid": "merchant-kyc-pan-no"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FilePickerField,
          {
            label: "PAN Document",
            existingUrl: form.panUrl,
            onUrlChange: (url) => setForm((f) => ({ ...f, panUrl: url })),
            ocid: "merchant-kyc-pan-upload"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Aadhaar Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              className: "h-8 text-xs",
              value: form.aadhaarNo,
              onChange: (e) => setForm((f) => ({ ...f, aadhaarNo: e.target.value })),
              placeholder: "1234 5678 9012",
              "data-ocid": "merchant-kyc-aadhaar-no"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FilePickerField,
          {
            label: "Aadhaar Document",
            existingUrl: form.aadhaarUrl,
            onUrlChange: (url) => setForm((f) => ({ ...f, aadhaarUrl: url })),
            ocid: "merchant-kyc-aadhaar-upload"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "GST Number (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              className: "h-8 text-xs",
              value: form.gstNo,
              onChange: (e) => setForm((f) => ({ ...f, gstNo: e.target.value })),
              placeholder: "29ABCDE1234F1Z5",
              "data-ocid": "merchant-kyc-gst-no"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FilePickerField,
          {
            label: "GST Document",
            existingUrl: form.gstUrl,
            onUrlChange: (url) => setForm((f) => ({ ...f, gstUrl: url })),
            ocid: "merchant-kyc-gst-upload"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FilePickerField,
          {
            label: "Outlet Photo",
            existingUrl: form.outletPhotoUrl,
            onUrlChange: (url) => setForm((f) => ({ ...f, outletPhotoUrl: url })),
            ocid: "merchant-kyc-outlet-upload"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FilePickerField,
          {
            label: "Cancelled Cheque",
            existingUrl: form.chequeUrl,
            onUrlChange: (url) => setForm((f) => ({ ...f, chequeUrl: url })),
            ocid: "merchant-kyc-cheque-upload"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FilePickerField,
          {
            label: "UPI / QR Code",
            existingUrl: form.qrUrl,
            onUrlChange: (url) => setForm((f) => ({ ...f, qrUrl: url })),
            ocid: "merchant-kyc-qr-upload"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          variant: "outline",
          className: "w-full gap-1.5",
          onClick: handleSaveDocuments,
          disabled: updateKYC.isPending,
          "data-ocid": "merchant-kyc-save-docs",
          children: updateKYC.isPending ? "Saving…" : "Save Documents"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "flex-1 bg-emerald-600 hover:bg-emerald-700",
          disabled: isVerified || updateKYC.isPending,
          onClick: onVerify,
          "data-ocid": "merchant-kyc-verify",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 mr-1" }),
            " ",
            isVerified ? "Verified" : "Verify"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          variant: "destructive",
          className: "flex-1",
          onClick: onReject,
          "data-ocid": "merchant-kyc-reject",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 mr-1" }),
            " Reject"
          ]
        }
      )
    ] })
  ] });
}
function LeadsTab({ merchantId }) {
  const { data: leads, isLoading } = useEntityLeads("merchant", merchantId);
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" }) });
  if (!leads || leads.views === 0)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-8 text-center", children: "No leads yet for this merchant" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Views" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-display text-primary", children: leads.views })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Interested" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-display text-emerald-600", children: leads.interested })
      ] })
    ] }),
    leads.viewers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Recent Viewers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 max-h-48 overflow-y-auto", children: leads.viewers.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between p-2 bg-muted/20 rounded-lg",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-mono text-foreground", children: v.phone }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: new Date(v.timestamp).toLocaleDateString("en-IN") })
          ]
        },
        `${v.phone}-${i}`
      )) })
    ] })
  ] });
}
function ProductsTab({ merchantId }) {
  const { data: products = [], isLoading } = useProducts(merchantId);
  const merchantProducts = products.filter((p) => p.merchantId === merchantId);
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 py-4", children: Array.from({ length: 3 }, (_, i) => `sk-${i}`).map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, id)) });
  if (merchantProducts.length === 0)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-8 text-center", children: "No products listed" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 py-4", children: merchantProducts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center justify-between p-3 bg-muted/20 rounded-xl",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: p.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: p.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold", children: [
            "₹",
            p.baseRate.toLocaleString("en-IN")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { type: "boolean", value: p.isActive })
        ] })
      ]
    },
    p.id
  )) });
}
function BranchesTab({ merchant }) {
  const addBranchMutation = useAddMerchantBranch();
  const [showAddBranch, setShowAddBranch] = reactExports.useState(false);
  const [branchAddress, setBranchAddress] = reactExports.useState("");
  const [branchRadius, setBranchRadius] = reactExports.useState("5");
  const mainBranch = {
    id: "main",
    name: "Main Branch",
    address: merchant.location.address
  };
  const extraBranches = merchant.branches.map((b, i) => ({
    id: `b-${i}`,
    name: `Branch ${i + 1}`,
    address: b.address
  }));
  async function handleAddBranch(e) {
    e.preventDefault();
    if (!branchAddress.trim()) {
      ue.error("Branch address is required");
      return;
    }
    try {
      if (addBranchMutation) {
        await addBranchMutation.mutateAsync({
          merchantId: merchant.id,
          address: branchAddress.trim(),
          radiusKm: Number(branchRadius) || 5
        });
      }
      ue.success("Branch added successfully");
      setBranchAddress("");
      setBranchRadius("5");
      setShowAddBranch(false);
    } catch {
      ue.error("Failed to add branch");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 py-4", children: [
    [mainBranch, ...extraBranches].map((branch) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-muted/20 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: branch.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: branch.address })
      ] })
    ] }) }, branch.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: !showAddBranch ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        size: "sm",
        variant: "outline",
        className: "w-full gap-1.5 text-xs",
        onClick: () => setShowAddBranch(true),
        "data-ocid": "merchant-branches-add-branch-button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
          " Add Branch"
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleAddBranch,
        className: "bg-muted/20 border border-border rounded-xl p-3 space-y-2",
        "data-ocid": "merchant-branches-add-form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "New Branch" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Branch Address *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-8 text-xs",
                value: branchAddress,
                onChange: (e) => setBranchAddress(e.target.value),
                placeholder: "Street, area, city",
                required: true,
                "data-ocid": "merchant-branches-address-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Delivery Radius (km)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-8 text-xs",
                type: "number",
                min: 1,
                value: branchRadius,
                onChange: (e) => setBranchRadius(e.target.value),
                placeholder: "5",
                "data-ocid": "merchant-branches-radius-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "ghost",
                className: "flex-1 text-xs h-8",
                onClick: () => setShowAddBranch(false),
                "data-ocid": "merchant-branches-cancel-button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                size: "sm",
                className: "flex-1 text-xs h-8",
                disabled: addBranchMutation == null ? void 0 : addBranchMutation.isPending,
                "data-ocid": "merchant-branches-save-button",
                children: (addBranchMutation == null ? void 0 : addBranchMutation.isPending) ? "Adding…" : "Save Branch"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
function MerchantDetailSheet({
  merchant,
  onClose
}) {
  const verifyMerchant = useVerifyMerchant();
  const deactivateMerchant = useDeactivateMerchant();
  const setBoostedCount = useSetBoostedOrderCount();
  const unblockMerchant = useManualUnblock();
  const [showRejectDialog, setShowRejectDialog] = reactExports.useState(false);
  const [rejectReason, setRejectReason] = reactExports.useState("");
  const [boostedInput, setBoostedInput] = reactExports.useState("");
  if (!merchant) return null;
  const currentMerchant = merchant;
  const isVerified = currentMerchant.kyc.verificationStatus === VerificationStatus.verified;
  const isBlocked = merchant.blockedUntil !== void 0 && merchant.blockedUntil !== null && Number(merchant.blockedUntil) > Date.now();
  async function handleVerify() {
    try {
      await verifyMerchant.mutateAsync({
        id: currentMerchant.id,
        isApproved: true,
        reason: ""
      });
      ue.success("Merchant Approved — notification sent to merchant");
    } catch {
      ue.error("Failed to verify merchant");
    }
  }
  async function handleReject() {
    try {
      const reason = rejectReason || "Does not meet requirements";
      await verifyMerchant.mutateAsync({
        id: currentMerchant.id,
        isApproved: false,
        reason
      });
      setShowRejectDialog(false);
      setRejectReason("");
      ue.success("Merchant Rejected — reason sent to merchant");
    } catch {
      ue.error("Failed to reject merchant");
    }
  }
  async function handleToggleActive() {
    try {
      await deactivateMerchant.mutateAsync({
        id: currentMerchant.id,
        isActive: !currentMerchant.isActive
      });
      ue.success(
        currentMerchant.isActive ? "Merchant deactivated" : "Merchant activated"
      );
    } catch {
      ue.error("Failed to update merchant status");
    }
  }
  async function handleUnblock() {
    try {
      await unblockMerchant.mutateAsync({
        entityId: currentMerchant.id,
        entityType: "merchant"
      });
      ue.success("Merchant unblocked successfully");
    } catch {
      ue.error("Failed to unblock merchant");
    }
  }
  async function handleSaveBoostedCount() {
    const count = Number.parseInt(boostedInput);
    if (Number.isNaN(count) || count < 0) {
      ue.error("Enter a valid number");
      return;
    }
    try {
      await setBoostedCount.mutateAsync({
        merchantId: currentMerchant.id,
        count
      });
      ue.success(`Boosted order count set to ${count}`);
      setBoostedInput("");
    } catch {
      ue.error("Failed to set boosted count");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: !!merchant, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      SheetContent,
      {
        side: "right",
        className: "w-full sm:max-w-lg overflow-y-auto",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "font-display truncate", children: merchant.businessName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: merchant.category }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { type: "boolean", value: merchant.isActive }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatusBadge,
                {
                  type: "verification",
                  value: merchant.kyc.verificationStatus
                }
              ),
              isBlocked && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3" }),
                " Blocked until",
                " ",
                new Date(
                  Number(merchant.blockedUntil)
                ).toLocaleDateString("en-IN")
              ] })
            ] })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                className: "flex-1 bg-emerald-600 hover:bg-emerald-700",
                disabled: isVerified || verifyMerchant.isPending,
                onClick: handleVerify,
                "data-ocid": "merchant-sheet-verify",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 mr-1" }),
                  " ",
                  isVerified ? "Verified" : "Verify Merchant"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "destructive",
                className: "flex-1",
                disabled: verifyMerchant.isPending,
                onClick: () => setShowRejectDialog(true),
                "data-ocid": "merchant-sheet-reject",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 mr-1" }),
                  " Reject"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "flex-1",
                disabled: deactivateMerchant.isPending,
                onClick: handleToggleActive,
                "data-ocid": "merchant-sheet-toggle-active",
                children: merchant.isActive ? "Deactivate" : "Activate"
              }
            ),
            isBlocked && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "flex-1 text-amber-600 border-amber-300 hover:bg-amber-50 gap-1.5",
                disabled: unblockMerchant.isPending,
                onClick: handleUnblock,
                "data-ocid": "merchant-sheet-unblock",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, { className: "w-3.5 h-3.5" }),
                  unblockMerchant.isPending ? "Unblocking…" : "Unblock"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "profile", className: "mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full grid grid-cols-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "profile", className: "text-xs", children: "Profile" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "kyc", className: "text-xs", children: "KYC" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "products", className: "text-xs", children: "Products" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "branches", className: "text-xs", children: "Branches" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TabsTrigger,
                {
                  value: "leads",
                  className: "text-xs",
                  "data-ocid": "merchant-leads-tab",
                  children: "Leads"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "profile", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 py-4", children: [
              [
                { label: "Merchant ID", value: merchant.id },
                { label: "Merchant Type", value: merchant.merchantType },
                { label: "Delivery Type", value: merchant.deliveryType },
                {
                  label: "ONDC",
                  value: merchant.isOndcEnrolled ? "Enrolled" : "Not Enrolled"
                },
                { label: "Category", value: merchant.category },
                { label: "Rating", value: merchant.avgRating.toFixed(1) }
              ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mt-0.5 capitalize", children: value })
              ] }, label)),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 bg-muted/20 rounded-xl p-3 flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: merchant.location.address })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 bg-muted/20 rounded-xl p-3 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Boosted Order Count (Admin)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Set a minimum displayed order count to boost merchant credibility. Real orders are unaffected." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      min: 0,
                      value: boostedInput,
                      onChange: (e) => setBoostedInput(e.target.value),
                      placeholder: "e.g. 500",
                      className: "h-8 text-xs flex-1",
                      "data-ocid": "merchant-boosted-orders-input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      className: "h-8 text-xs",
                      onClick: handleSaveBoostedCount,
                      disabled: setBoostedCount.isPending || !boostedInput,
                      "data-ocid": "merchant-boosted-orders-save",
                      children: "Set"
                    }
                  )
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "kyc", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              KYCTab,
              {
                merchant,
                onVerify: handleVerify,
                onReject: () => setShowRejectDialog(true)
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductsTab, { merchantId: merchant.id }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "branches", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BranchesTab, { merchant }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "leads", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LeadsTab, { merchantId: merchant.id }) })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showRejectDialog, onOpenChange: setShowRejectDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "sm:max-w-md",
        "data-ocid": "merchant-reject-dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
            "Reject Merchant — ",
            merchant.businessName
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Provide a reason for rejection. This helps the merchant understand what's required." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Rejection Reason" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  placeholder: "e.g. KYC documents incomplete, PAN card missing…",
                  rows: 3,
                  value: rejectReason,
                  onChange: (e) => setRejectReason(e.target.value),
                  "data-ocid": "merchant-reject-reason"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  className: "flex-1",
                  onClick: () => setShowRejectDialog(false),
                  "data-ocid": "merchant-reject-cancel",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "destructive",
                  className: "flex-1",
                  onClick: handleReject,
                  disabled: verifyMerchant.isPending,
                  "data-ocid": "merchant-reject-confirm",
                  children: verifyMerchant.isPending ? "Rejecting…" : "Reject Merchant"
                }
              )
            ] })
          ] })
        ]
      }
    ) })
  ] });
}
function MerchantCard({
  merchant,
  onClick
}) {
  var _a, _b;
  const userPhone = ((_b = (_a = merchant.location) == null ? void 0 : _a.address) == null ? void 0 : _b.startsWith("+")) ? merchant.location.address : "+919876543210";
  const cc = getCountryFromPhone(userPhone);
  const flag = countryFlagEmoji(cc);
  const isBlocked = merchant.blockedUntil !== void 0 && merchant.blockedUntil !== null && Number(merchant.blockedUntil) > Date.now();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: "w-full text-left bg-card border border-border rounded-2xl p-4 hover:border-primary/50 hover:shadow-md transition-all space-y-3 group",
      "data-ocid": "merchants-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "w-5 h-5 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors", children: merchant.businessName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: merchant.category })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
            isBlocked && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3" }),
              " Blocked"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { type: "boolean", value: merchant.isActive })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stars, { rating: merchant.avgRating }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-2.5 h-2.5" }),
            Number(merchant.customerCount ?? 0).toLocaleString("en-IN"),
            " ",
            "customers"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-2.5 h-2.5" }),
            Number(merchant.orderCount ?? 0).toLocaleString("en-IN"),
            " orders"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatusBadge,
            {
              type: "verification",
              value: merchant.kyc.verificationStatus
            }
          ),
          merchant.isOndcEnrolled && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border bg-blue-100 text-blue-700 border-blue-200", children: "ONDC" }),
          merchant.codAvailable && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border bg-muted text-muted-foreground border-border", children: "COD" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border bg-muted text-muted-foreground border-border capitalize", children: merchant.deliveryType })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: flag }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: merchant.location.address })
        ] })
      ]
    }
  );
}
const MERCHANT_CATEGORIES = [
  "Food & Restaurant",
  "Grocery & Kirana",
  "Medical & Pharmacy",
  "Clothing & Fashion",
  "Electronics",
  "Dairy & Milk",
  "Bakery & Sweets",
  "Salon & Beauty",
  "Travels & Cab",
  "Electrical & Plumbing",
  "Laundry & Cleaning",
  "Property & Real Estate",
  "Jobs & Recruitment",
  "Packers & Movers",
  "Automobile & Spare Parts",
  "Stationery & Books",
  "Kitchen Accessories",
  "Home Cleaning",
  "Paper & Disposal",
  "Cosmetics & Bath",
  "Retail Shop",
  "Wholesaler",
  "Manufacturer",
  "Auto Parts",
  "Snacks & Beverages",
  "Gifts & Frames",
  "Cold Drinks & Ice Cream",
  "Wellness & Health",
  "Therapist & Dr",
  "Radiologist & Lab",
  "PG/Hostels/Dormitory",
  "Car Wash",
  "Game Zone",
  "EV Charging",
  "Petrol Pump",
  "Transporter",
  "Printers & Reprographics",
  "Repairs & Maintenance",
  "Spare Parts",
  "Astrology",
  "Water Supply",
  "Flowers & Nursery",
  "Utensils & Cookware",
  "Footwear",
  "Accessories & Apparel",
  "Bike Service",
  "Car Dealer",
  "Bus Operator",
  "Auto Dealer",
  "Services (General)",
  "Healthcare",
  "Fitness & Gym",
  "Photography",
  "Event Management",
  "Catering",
  "Interior Design",
  "Architecture",
  "Legal Services",
  "Accounting & CA",
  "IT Services",
  "Electrician",
  "Plumber",
  "Carpenter",
  "Painter",
  "Security Services",
  "Marriage Hall",
  "Tour & Travel",
  "Hotel & Lodge",
  "Insurance",
  "Loan & Finance",
  "Other"
];
function AddMerchantDialog({
  open,
  onClose
}) {
  const createMerchant = useCreateMerchant();
  const [form, setForm] = reactExports.useState({
    ownerPhone: "",
    ownerName: "",
    outletName: "",
    category: "",
    deliveryType: "delivery",
    merchantType: "order",
    deliveryRadius: "5",
    address: "",
    passdigit: ""
  });
  const [branches, setBranches] = reactExports.useState([]);
  const [phoneError, setPhoneError] = reactExports.useState("");
  function update(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
    if (key === "ownerPhone") {
      setPhoneError(val && !validatePhone(val) ? PHONE_ERROR_MSG : "");
    }
  }
  function addBranch() {
    setBranches((b) => [
      ...b,
      { id: `br-${Date.now()}`, address: "", deliveryRadius: "5" }
    ]);
  }
  function removeBranch(id) {
    setBranches((b) => b.filter((br) => br.id !== id));
  }
  function updateBranch(id, field, val) {
    setBranches(
      (b) => b.map((br) => br.id === id ? { ...br, [field]: val } : br)
    );
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.ownerPhone || !form.ownerName || !form.outletName || !form.category) {
      ue.error("Please fill in all required fields");
      return;
    }
    if (!validatePhone(form.ownerPhone)) {
      ue.error(PHONE_ERROR_MSG);
      return;
    }
    try {
      await createMerchant.mutateAsync({
        ownerPhone: form.ownerPhone.trim(),
        ownerName: form.ownerName.trim(),
        outletName: form.outletName.trim(),
        category: form.category,
        deliveryType: form.deliveryType,
        merchantType: form.merchantType,
        deliveryRadius: Number(form.deliveryRadius) || 5,
        address: form.address.trim(),
        passdigit: form.passdigit.trim() || void 0
      });
      ue.success(
        `Merchant "${form.outletName}" added successfully${branches.length > 0 ? ` with ${branches.length} extra branch${branches.length > 1 ? "es" : ""}` : ""}`
      );
      setForm({
        ownerPhone: "",
        ownerName: "",
        outletName: "",
        category: "",
        deliveryType: "delivery",
        merchantType: "order",
        deliveryRadius: "5",
        address: "",
        passdigit: ""
      });
      setBranches([]);
      onClose();
    } catch (err) {
      ue.error(
        `Failed to add merchant: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "sm:max-w-lg overflow-y-auto max-h-[90vh]",
      "data-ocid": "add-merchant.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add New Merchant" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "am-phone", className: "text-xs", children: "Owner Phone *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "am-phone",
                  value: form.ownerPhone,
                  onChange: (e) => update("ownerPhone", e.target.value),
                  placeholder: "+919876543210",
                  required: true,
                  "data-ocid": "add-merchant.phone-input"
                }
              ),
              phoneError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive",
                  "data-ocid": "add-merchant.phone-error",
                  children: phoneError
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "am-name", className: "text-xs", children: "Owner Name *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "am-name",
                  value: form.ownerName,
                  onChange: (e) => update("ownerName", e.target.value),
                  placeholder: "Ramesh Kumar",
                  required: true,
                  "data-ocid": "add-merchant.owner-name-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "am-outlet", className: "text-xs", children: "Outlet Name *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "am-outlet",
                  value: form.outletName,
                  onChange: (e) => update("outletName", e.target.value),
                  placeholder: "Sharma Kirana Store",
                  required: true,
                  "data-ocid": "add-merchant.outlet-name-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Business Category *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.category,
                  onValueChange: (v) => update("category", v),
                  required: true,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "add-merchant.category-select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select category" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "max-h-56 overflow-y-auto", children: MERCHANT_CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Delivery Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.deliveryType,
                  onValueChange: (v) => update("deliveryType", v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "add-merchant.delivery-type-select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "delivery", children: "Online Delivery" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "takeaway", children: "Takeaway Only" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "both", children: "Both" })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Order Acceptance" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.merchantType,
                  onValueChange: (v) => update("merchantType", v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "add-merchant.merchant-type-select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "order", children: "Order-based" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "inquiry", children: "Inquiry-based" })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "am-radius", className: "text-xs", children: "Main Outlet Radius (km)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "am-radius",
                  type: "number",
                  min: 1,
                  value: form.deliveryRadius,
                  onChange: (e) => update("deliveryRadius", e.target.value),
                  placeholder: "5",
                  "data-ocid": "add-merchant.radius-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "am-passdigit", className: "text-xs", children: "Passdigit (4 digits)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "am-passdigit",
                  maxLength: 4,
                  value: form.passdigit,
                  onChange: (e) => update("passdigit", e.target.value),
                  placeholder: "1234",
                  "data-ocid": "add-merchant.passdigit-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "am-address", className: "text-xs", children: "Main Outlet Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "am-address",
                  rows: 2,
                  value: form.address,
                  onChange: (e) => update("address", e.target.value),
                  placeholder: "Shop 12, MG Road, Bengaluru",
                  "data-ocid": "add-merchant.address-input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-xl p-3 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Additional Branches" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "outline",
                  className: "h-7 gap-1 text-xs",
                  onClick: addBranch,
                  "data-ocid": "add-merchant.add-branch-button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" }),
                    " Add Branch"
                  ]
                }
              )
            ] }),
            branches.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center py-2", children: 'No additional branches — click "Add Branch" to add one' }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: branches.map((br, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-muted/20 border border-border rounded-lg p-3 space-y-2",
                "data-ocid": `add-merchant.branch.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-muted-foreground flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 text-primary" }),
                      "Branch #",
                      idx + 1
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        size: "sm",
                        variant: "ghost",
                        className: "h-6 w-6 p-0 text-destructive",
                        onClick: () => removeBranch(br.id),
                        "data-ocid": `add-merchant.remove-branch.${idx + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Branch Address" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          className: "h-8 text-xs",
                          value: br.address,
                          onChange: (e) => updateBranch(br.id, "address", e.target.value),
                          placeholder: "Branch street address",
                          "data-ocid": `add-merchant.branch-address.${idx + 1}`
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Delivery Radius (km)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          className: "h-8 text-xs",
                          type: "number",
                          min: 1,
                          value: br.deliveryRadius,
                          onChange: (e) => updateBranch(
                            br.id,
                            "deliveryRadius",
                            e.target.value
                          ),
                          placeholder: "5",
                          "data-ocid": `add-merchant.branch-radius.${idx + 1}`
                        }
                      )
                    ] })
                  ] })
                ]
              },
              br.id
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "flex-1",
                onClick: onClose,
                "data-ocid": "add-merchant.cancel-button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "flex-1",
                disabled: createMerchant.isPending,
                "data-ocid": "add-merchant.submit-button",
                children: createMerchant.isPending ? "Adding…" : "Add Merchant"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function MerchantsPage() {
  const [searchInput, setSearchInput] = reactExports.useState("");
  const search = useDebounce(searchInput, 300);
  const [catFilter, setCatFilter] = reactExports.useState("all");
  const [verifiedFilter, setVerifiedFilter] = reactExports.useState("all");
  const [activeFilter, setActiveFilter] = reactExports.useState("all");
  const [ondcFilter, setOndcFilter] = reactExports.useState("all");
  const [sortKey, setSortKey] = reactExports.useState("customers");
  const [sortDir, setSortDir] = reactExports.useState("desc");
  const [detailMerchant, setDetailMerchant] = reactExports.useState(null);
  const [showAddMerchant, setShowAddMerchant] = reactExports.useState(false);
  const [showClearCacheConfirm, setShowClearCacheConfirm] = reactExports.useState(false);
  const clearFlowCache = useClearFlowCache();
  const { data: merchants = [], isLoading } = useMerchants();
  const categories = Array.from(
    /* @__PURE__ */ new Set(["all", ...merchants.map((m) => m.category)])
  );
  const pendingKyc = merchants.filter(
    (m) => m.kyc.verificationStatus !== VerificationStatus.verified
  ).length;
  const filtered = [...merchants].filter((m) => {
    if (search && !m.businessName.toLowerCase().includes(search.toLowerCase()))
      return false;
    if (catFilter !== "all" && m.category !== catFilter) return false;
    if (verifiedFilter === "yes" && m.kyc.verificationStatus !== VerificationStatus.verified)
      return false;
    if (verifiedFilter === "no" && m.kyc.verificationStatus === VerificationStatus.verified)
      return false;
    if (activeFilter === "yes" && !m.isActive) return false;
    if (activeFilter === "no" && m.isActive) return false;
    if (ondcFilter === "yes" && !m.isOndcEnrolled) return false;
    if (ondcFilter === "no" && m.isOndcEnrolled) return false;
    return true;
  }).sort((a, b) => {
    if (sortKey === "alphabetical") {
      const diff2 = a.businessName.localeCompare(b.businessName);
      return sortDir === "desc" ? -diff2 : diff2;
    }
    const getVal = (m) => {
      if (sortKey === "customers") return Number(m.customerCount ?? 0);
      return Number(m.orderCount ?? 0);
    };
    const diff = getVal(b) - getVal(a);
    return sortDir === "desc" ? diff : -diff;
  });
  const pagination = usePagination(filtered);
  async function handleClearCache() {
    try {
      await clearFlowCache.mutateAsync(void 0);
      ue.success("Flow cache cleared — all stuck order states reset");
    } catch {
      ue.error("Failed to clear cache");
    } finally {
      setShowClearCacheConfirm(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Merchants" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          merchants.length,
          " registered merchants"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        pendingKyc > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-700 dark:text-amber-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: pendingKyc }),
            " pending KYC"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10",
            onClick: () => setShowClearCacheConfirm(true),
            "data-ocid": "merchants.clear-cache-button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
              "Clear Flow Cache"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "gap-1.5",
            onClick: () => setShowAddMerchant(true),
            "data-ocid": "merchants.add-merchant-button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
              "Add Merchant"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      {
        label: "Total",
        value: merchants.length,
        icon: Store,
        color: "text-foreground"
      },
      {
        label: "Verified",
        value: merchants.filter(
          (m) => m.kyc.verificationStatus === VerificationStatus.verified
        ).length,
        icon: CircleCheckBig,
        color: "text-emerald-600"
      },
      {
        label: "Pending KYC",
        value: pendingKyc,
        icon: Package,
        color: "text-amber-600"
      },
      {
        label: "Active",
        value: merchants.filter((m) => m.isActive).length,
        icon: TrendingUp,
        color: "text-primary"
      }
    ].map(({ label, value, icon: Icon, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-3 flex items-center gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 ${color}` }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xl font-bold font-display ${color}`, children: value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
          ] })
        ]
      },
      label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[180px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: searchInput,
            onChange: (e) => setSearchInput(e.target.value),
            className: "pl-9",
            placeholder: "Search merchants…",
            "data-ocid": "merchants-search"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: catFilter, onValueChange: setCatFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-full sm:w-44",
            "data-ocid": "merchants-filter-category",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Category" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c === "all" ? "All Categories" : c }, c)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: verifiedFilter, onValueChange: setVerifiedFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-full sm:w-36",
            "data-ocid": "merchants-filter-verified",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "KYC" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All KYC" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "yes", children: "Verified" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "no", children: "Pending/Rejected" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: activeFilter, onValueChange: setActiveFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-full sm:w-32",
            "data-ocid": "merchants-filter-active",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Status" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "yes", children: "Active" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "no", children: "Inactive" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: ondcFilter, onValueChange: setOndcFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-full sm:w-36",
            "data-ocid": "merchants-filter-ondc",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "ONDC" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All ONDC" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "yes", children: "Enrolled" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "no", children: "Not Enrolled" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: sortKey,
            onValueChange: (v) => setSortKey(v),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "w-full sm:w-44",
                  "data-ocid": "merchants-sort-key",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Sort by" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "customers", children: "Most Customers" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "orders", children: "Most Orders" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "alphabetical", children: "Alphabetical" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "h-9 px-2 flex-shrink-0",
            onClick: () => setSortDir((d) => d === "desc" ? "asc" : "desc"),
            title: `Sort ${sortDir === "desc" ? "ascending" : "descending"}`,
            "data-ocid": "merchants-sort-dir",
            children: sortDir === "desc" ? "↓" : "↑"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
        filtered.length,
        " merchant",
        filtered.length !== 1 ? "s" : ""
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3" }),
        "Sorted by:",
        " ",
        sortKey === "customers" ? "Most Customers" : sortKey === "orders" ? "Most Orders" : "Alphabetical",
        sortDir === "asc" ? " ↑" : " ↓"
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: Array.from({ length: 6 }, (_, i) => `sk-${i}`).map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 bg-muted animate-pulse rounded-2xl" }, id)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 gap-3 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "w-12 h-12 text-muted-foreground/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No merchants match your filters" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: pagination.items.map((merchant) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        MerchantCard,
        {
          merchant,
          onClick: () => setDetailMerchant(merchant)
        },
        merchant.id
      )) }),
      pagination.totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between pt-2",
          "data-ocid": "merchants.pagination",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "Page ",
              pagination.page,
              " of ",
              pagination.totalPages,
              " ·",
              " ",
              filtered.length,
              " merchants"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "h-8 w-8 p-0",
                  onClick: pagination.prevPage,
                  disabled: pagination.page === 1,
                  "data-ocid": "merchants.pagination_prev",
                  "aria-label": "Previous page",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
                }
              ),
              Array.from(
                { length: Math.min(pagination.totalPages, 7) },
                (_, i) => {
                  const start = Math.max(1, pagination.page - 3);
                  const p = start + i;
                  if (p > pagination.totalPages) return null;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: p === pagination.page ? "default" : "outline",
                      className: "h-8 w-8 p-0 text-xs",
                      onClick: () => pagination.goToPage(p),
                      "data-ocid": `merchants.pagination.page.${p}`,
                      children: p
                    },
                    p
                  );
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "h-8 w-8 p-0",
                  onClick: pagination.nextPage,
                  disabled: pagination.page === pagination.totalPages,
                  "data-ocid": "merchants.pagination_next",
                  "aria-label": "Next page",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                }
              )
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      MerchantDetailSheet,
      {
        merchant: detailMerchant,
        onClose: () => setDetailMerchant(null)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddMerchantDialog,
      {
        open: showAddMerchant,
        onClose: () => setShowAddMerchant(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: showClearCacheConfirm,
        onOpenChange: setShowClearCacheConfirm,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-sm", "data-ocid": "clear-cache.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Clear Flow Cache" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This will reset all stuck order states. Active orders will not be affected — only the pending flow cache will be flushed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1",
                onClick: () => setShowClearCacheConfirm(false),
                "data-ocid": "clear-cache.cancel-button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "destructive",
                className: "flex-1",
                onClick: handleClearCache,
                disabled: clearFlowCache.isPending,
                "data-ocid": "clear-cache.confirm-button",
                children: clearFlowCache.isPending ? "Clearing…" : "Clear Cache"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  MerchantsPage as default
};
