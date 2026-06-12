import { cm as React, j as jsxRuntimeExports, r as reactExports, a9 as useGetAllMenuOptions, e5 as useGetMenuRepositoryHealth, _ as useBackendActor } from "./index-D4mmtgjo.js";
import { P as Primitive, u as useControllableState, c as composeEventHandlers, a as createContextScope } from "./index-CUcO6jhF.js";
import { c as createCollection, u as useDirection } from "./index-yUS8KoxU.js";
import { u as useComposedRefs } from "./index-DPbSRAbD.js";
import { R as Root, T as Trigger, b as Content, c as createCollapsibleScope } from "./index-BrZkK7cW.js";
import { u as useId } from "./index-DYndF6Sn.js";
import { c as cn } from "./utils-2v2HxlWs.js";
import { C as ChevronDown } from "./chevron-down-gIU8OsEH.js";
import { B as Badge } from "./badge-BlQlNngM.js";
import { B as Button } from "./button-CTnHNrH8.js";
import { S as Skeleton } from "./skeleton-Cwq6arIw.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-bpKGDaaq.js";
import { R as RefreshCw } from "./refresh-cw-D1Rv7uio.js";
import { c as createLucideIcon } from "./createLucideIcon-BGWdtUCJ.js";
import { B as BookOpen } from "./book-open-DS2-X7o9.js";
import { M as MessageSquare } from "./message-square-DPd9AoY2.js";
import { C as CircleAlert } from "./circle-alert-D81m_w7k.js";
import { D as Database } from "./database-CADlqd_q.js";
import { C as Cpu } from "./cpu-Cr_ioSd5.js";
import { F as FileText } from "./file-text-ZAufnVPm.js";
import { G as Globe } from "./globe--tJa3NSQ.js";
import { T as Terminal } from "./terminal-D73Q7VO6.js";
import { S as ShieldCheck } from "./shield-check-DNUGUjo-.js";
import { U as Users } from "./users-BCFHEKUR.js";
import { P as Package } from "./package-CosknzeL.js";
import { S as Settings } from "./settings-CDqnrNMc.js";
import "./index-BNXq-E6T.js";
import "./index-dLX_aGK4.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
];
const Printer = createLucideIcon("printer", __iconNode);
var ACCORDION_NAME = "Accordion";
var ACCORDION_KEYS = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
var [Collection, useCollection, createCollectionScope] = createCollection(ACCORDION_NAME);
var [createAccordionContext] = createContextScope(ACCORDION_NAME, [
  createCollectionScope,
  createCollapsibleScope
]);
var useCollapsibleScope = createCollapsibleScope();
var Accordion$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { type, ...accordionProps } = props;
    const singleProps = accordionProps;
    const multipleProps = accordionProps;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeAccordion, children: type === "multiple" ? /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImplMultiple, { ...multipleProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImplSingle, { ...singleProps, ref: forwardedRef }) });
  }
);
Accordion$1.displayName = ACCORDION_NAME;
var [AccordionValueProvider, useAccordionValueContext] = createAccordionContext(ACCORDION_NAME);
var [AccordionCollapsibleProvider, useAccordionCollapsibleContext] = createAccordionContext(
  ACCORDION_NAME,
  { collapsible: false }
);
var AccordionImplSingle = React.forwardRef(
  (props, forwardedRef) => {
    const {
      value: valueProp,
      defaultValue,
      onValueChange = () => {
      },
      collapsible = false,
      ...accordionSingleProps
    } = props;
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue ?? "",
      onChange: onValueChange,
      caller: ACCORDION_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AccordionValueProvider,
      {
        scope: props.__scopeAccordion,
        value: React.useMemo(() => value ? [value] : [], [value]),
        onItemOpen: setValue,
        onItemClose: React.useCallback(() => collapsible && setValue(""), [collapsible, setValue]),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionCollapsibleProvider, { scope: props.__scopeAccordion, collapsible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImpl, { ...accordionSingleProps, ref: forwardedRef }) })
      }
    );
  }
);
var AccordionImplMultiple = React.forwardRef((props, forwardedRef) => {
  const {
    value: valueProp,
    defaultValue,
    onValueChange = () => {
    },
    ...accordionMultipleProps
  } = props;
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? [],
    onChange: onValueChange,
    caller: ACCORDION_NAME
  });
  const handleItemOpen = React.useCallback(
    (itemValue) => setValue((prevValue = []) => [...prevValue, itemValue]),
    [setValue]
  );
  const handleItemClose = React.useCallback(
    (itemValue) => setValue((prevValue = []) => prevValue.filter((value2) => value2 !== itemValue)),
    [setValue]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AccordionValueProvider,
    {
      scope: props.__scopeAccordion,
      value,
      onItemOpen: handleItemOpen,
      onItemClose: handleItemClose,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionCollapsibleProvider, { scope: props.__scopeAccordion, collapsible: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImpl, { ...accordionMultipleProps, ref: forwardedRef }) })
    }
  );
});
var [AccordionImplProvider, useAccordionContext] = createAccordionContext(ACCORDION_NAME);
var AccordionImpl = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, disabled, dir, orientation = "vertical", ...accordionProps } = props;
    const accordionRef = React.useRef(null);
    const composedRefs = useComposedRefs(accordionRef, forwardedRef);
    const getItems = useCollection(__scopeAccordion);
    const direction = useDirection(dir);
    const isDirectionLTR = direction === "ltr";
    const handleKeyDown = composeEventHandlers(props.onKeyDown, (event) => {
      var _a;
      if (!ACCORDION_KEYS.includes(event.key)) return;
      const target = event.target;
      const triggerCollection = getItems().filter((item) => {
        var _a2;
        return !((_a2 = item.ref.current) == null ? void 0 : _a2.disabled);
      });
      const triggerIndex = triggerCollection.findIndex((item) => item.ref.current === target);
      const triggerCount = triggerCollection.length;
      if (triggerIndex === -1) return;
      event.preventDefault();
      let nextIndex = triggerIndex;
      const homeIndex = 0;
      const endIndex = triggerCount - 1;
      const moveNext = () => {
        nextIndex = triggerIndex + 1;
        if (nextIndex > endIndex) {
          nextIndex = homeIndex;
        }
      };
      const movePrev = () => {
        nextIndex = triggerIndex - 1;
        if (nextIndex < homeIndex) {
          nextIndex = endIndex;
        }
      };
      switch (event.key) {
        case "Home":
          nextIndex = homeIndex;
          break;
        case "End":
          nextIndex = endIndex;
          break;
        case "ArrowRight":
          if (orientation === "horizontal") {
            if (isDirectionLTR) {
              moveNext();
            } else {
              movePrev();
            }
          }
          break;
        case "ArrowDown":
          if (orientation === "vertical") {
            moveNext();
          }
          break;
        case "ArrowLeft":
          if (orientation === "horizontal") {
            if (isDirectionLTR) {
              movePrev();
            } else {
              moveNext();
            }
          }
          break;
        case "ArrowUp":
          if (orientation === "vertical") {
            movePrev();
          }
          break;
      }
      const clampedIndex = nextIndex % triggerCount;
      (_a = triggerCollection[clampedIndex].ref.current) == null ? void 0 : _a.focus();
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AccordionImplProvider,
      {
        scope: __scopeAccordion,
        disabled,
        direction: dir,
        orientation,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: __scopeAccordion, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            ...accordionProps,
            "data-orientation": orientation,
            ref: composedRefs,
            onKeyDown: disabled ? void 0 : handleKeyDown
          }
        ) })
      }
    );
  }
);
var ITEM_NAME = "AccordionItem";
var [AccordionItemProvider, useAccordionItemContext] = createAccordionContext(ITEM_NAME);
var AccordionItem$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, value, ...accordionItemProps } = props;
    const accordionContext = useAccordionContext(ITEM_NAME, __scopeAccordion);
    const valueContext = useAccordionValueContext(ITEM_NAME, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    const triggerId = useId();
    const open = value && valueContext.value.includes(value) || false;
    const disabled = accordionContext.disabled || props.disabled;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AccordionItemProvider,
      {
        scope: __scopeAccordion,
        open,
        disabled,
        triggerId,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Root,
          {
            "data-orientation": accordionContext.orientation,
            "data-state": getState(open),
            ...collapsibleScope,
            ...accordionItemProps,
            ref: forwardedRef,
            disabled,
            open,
            onOpenChange: (open2) => {
              if (open2) {
                valueContext.onItemOpen(value);
              } else {
                valueContext.onItemClose(value);
              }
            }
          }
        )
      }
    );
  }
);
AccordionItem$1.displayName = ITEM_NAME;
var HEADER_NAME = "AccordionHeader";
var AccordionHeader = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, ...headerProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(HEADER_NAME, __scopeAccordion);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.h3,
      {
        "data-orientation": accordionContext.orientation,
        "data-state": getState(itemContext.open),
        "data-disabled": itemContext.disabled ? "" : void 0,
        ...headerProps,
        ref: forwardedRef
      }
    );
  }
);
AccordionHeader.displayName = HEADER_NAME;
var TRIGGER_NAME = "AccordionTrigger";
var AccordionTrigger$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, ...triggerProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(TRIGGER_NAME, __scopeAccordion);
    const collapsibleContext = useAccordionCollapsibleContext(TRIGGER_NAME, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.ItemSlot, { scope: __scopeAccordion, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Trigger,
      {
        "aria-disabled": itemContext.open && !collapsibleContext.collapsible || void 0,
        "data-orientation": accordionContext.orientation,
        id: itemContext.triggerId,
        ...collapsibleScope,
        ...triggerProps,
        ref: forwardedRef
      }
    ) });
  }
);
AccordionTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "AccordionContent";
var AccordionContent$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, ...contentProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(CONTENT_NAME, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content,
      {
        role: "region",
        "aria-labelledby": itemContext.triggerId,
        "data-orientation": accordionContext.orientation,
        ...collapsibleScope,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ["--radix-accordion-content-height"]: "var(--radix-collapsible-content-height)",
          ["--radix-accordion-content-width"]: "var(--radix-collapsible-content-width)",
          ...props.style
        }
      }
    );
  }
);
AccordionContent$1.displayName = CONTENT_NAME;
function getState(open) {
  return open ? "open" : "closed";
}
var Root2 = Accordion$1;
var Item = AccordionItem$1;
var Header = AccordionHeader;
var Trigger2 = AccordionTrigger$1;
var Content2 = AccordionContent$1;
function Accordion({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "accordion", ...props });
}
function AccordionItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Item,
    {
      "data-slot": "accordion-item",
      className: cn("border-b last:border-b-0", className),
      ...props
    }
  );
}
function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { className: "flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Trigger2,
    {
      "data-slot": "accordion-trigger",
      className: cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" })
      ]
    }
  ) });
}
function AccordionContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      "data-slot": "accordion-content",
      className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("pt-0 pb-4", className), children })
    }
  );
}
const PLATFORM_SURFACES = [
  {
    label: "WhatsApp",
    icon: "💬",
    desc: "Main chatbot via WhatsApp Business API"
  },
  {
    label: "Telegram",
    icon: "✈️",
    desc: "Full bot via webhook (https://bot.localbazar.shop/telegram/webhook)"
  },
  { label: "SMS", icon: "📱", desc: "Two-way SMS chatbot for feature phones" },
  {
    label: "Web Admin",
    icon: "🌐",
    desc: "React + TypeScript admin dashboard"
  },
  {
    label: "iOS App",
    icon: "🍎",
    desc: "Cross-platform (version-tracked per brand)"
  },
  {
    label: "Android App",
    icon: "🤖",
    desc: "Cross-platform (version-tracked per brand)"
  }
];
const _CITY_MODULES = [
  { key: "Shopping", desc: "Product catalog, orders, POS" },
  { key: "Jobs", desc: "Job postings and applications" },
  { key: "AdhocJobs", desc: "Daily and ad-hoc job matching" },
  { key: "Property", desc: "Property listings (buy/rent)" },
  { key: "Transport", desc: "Sarthi ride booking" },
  { key: "Shuttle", desc: "Community shuttle service" },
  { key: "FreeRide", desc: "Free ride sharing for Sarthi partners" },
  { key: "Events", desc: "Event listing and ticketing" },
  { key: "Matrimony", desc: "Elite matrimony matching" },
  { key: "Donations", desc: "Donation requests and fulfillment" },
  { key: "Family", desc: "Family group management" },
  { key: "Recipes", desc: "Recipe sharing and discovery" },
  { key: "Promotions", desc: "Influencer advertising" },
  { key: "SupportTickets", desc: "Support ticket system" },
  { key: "ONDC", desc: "ONDC e-commerce enrollment" },
  { key: "old_items", desc: "Old / second-hand item marketplace" },
  { key: "Healthcare", desc: "Healthcare appointment booking" },
  { key: "Tours", desc: "Tour packages" },
  { key: "ProfessionalServices", desc: "Multi-rate professional services" },
  { key: "Lending", desc: "Lending with reminders" },
  { key: "MarketSearch", desc: "Market & commodity price search" },
  { key: "Sports", desc: "Live cricket/football scores (India leagues)" },
  { key: "Elections", desc: "Election results (India, upcoming + past)" },
  { key: "Community", desc: "Rent parking, room, food service, manager" },
  {
    key: "LanguageLearning",
    desc: "Language courses, AI assistant, word search"
  },
  {
    key: "Manufacturer",
    desc: "Manufacturer direct-sell, distributor network"
  },
  { key: "BusBooking", desc: "Bus ticket booking via PaySprint" },
  { key: "TrainBooking", desc: "Train ticket booking via PaySprint" },
  { key: "FlightBooking", desc: "Flight booking via PaySprint" }
];
const BACKEND_ENTITIES = [
  {
    name: "User (Customer)",
    fields: [
      "id",
      "phone",
      "name",
      "city",
      "pincode",
      "role",
      "subscriptionPlanId",
      "registrationDate",
      "isActive"
    ]
  },
  {
    name: "Merchant",
    fields: [
      "id",
      "phone",
      "businessName",
      "category",
      "location",
      "isManufacturer",
      "isActive",
      "orderCount",
      "avgRating",
      "branches",
      "kyc"
    ]
  },
  {
    name: "Delivery Partner",
    fields: [
      "id",
      "phone",
      "name",
      "city",
      "vehicleType",
      "status",
      "earnings",
      "totalTrips"
    ]
  },
  {
    name: "Manufacturer",
    fields: [
      "id",
      "businessName",
      "productCategories",
      "customerCarePhone",
      "customerCareEmail",
      "registeredCity",
      "createdAt"
    ]
  },
  {
    name: "Distributor Network",
    fields: [
      "id",
      "manufacturerId",
      "distributorPhone",
      "distributorCode",
      "city",
      "pincode",
      "schemeApplicable",
      "marginPercent",
      "marginEarned",
      "routeDescription",
      "assignedDeliveryPartnerPhone"
    ]
  },
  {
    name: "Product",
    fields: [
      "id",
      "merchantId",
      "title",
      "baseRate",
      "qty",
      "category",
      "barcodeValue",
      "isActive",
      "bulkRates",
      "expiry"
    ]
  },
  {
    name: "Manufacturer Product",
    fields: [
      "id",
      "manufacturerId",
      "productName",
      "hsnCode",
      "batchCode",
      "batchNumber",
      "expiryDate",
      "manufactureDate",
      "originCity",
      "priceToCustomer",
      "priceToDistributor",
      "bulkPricingTiers",
      "isReturnable",
      "isDiscontinued",
      "b2bCode",
      "stockQty"
    ]
  },
  {
    name: "Order",
    fields: [
      "id",
      "customerId",
      "merchantId",
      "deliveryPartnerId",
      "items",
      "total",
      "status",
      "tip",
      "createdAt"
    ]
  },
  {
    name: "Job",
    fields: [
      "id",
      "posterId",
      "title",
      "description",
      "category",
      "location",
      "salaryMin",
      "salaryMax",
      "jobType",
      "isAdhoc",
      "isOpen",
      "endDate"
    ]
  },
  {
    name: "Property",
    fields: [
      "id",
      "ownerId",
      "type",
      "title",
      "description",
      "price",
      "city",
      "pincode",
      "status"
    ]
  },
  {
    name: "Healthcare Appointment",
    fields: [
      "id",
      "customerId",
      "providerId",
      "date",
      "timeSlot",
      "status",
      "notes",
      "createdAt"
    ]
  },
  {
    name: "Tour Package",
    fields: [
      "id",
      "operatorId",
      "destination",
      "title",
      "price",
      "duration",
      "maxPassengers",
      "rating"
    ]
  },
  {
    name: "Professional Service",
    fields: [
      "id",
      "merchantPhone",
      "serviceType",
      "specialization",
      "pricePerHour",
      "areaRates",
      "city",
      "availability",
      "rating"
    ]
  },
  {
    name: "Lending Record",
    fields: [
      "id",
      "lenderPhone",
      "borrowerPhone",
      "itemName",
      "itemCategory",
      "returnDate",
      "charge",
      "reminderFrequency",
      "status"
    ]
  },
  {
    name: "Language Course",
    fields: [
      "id",
      "creatorPhone",
      "title",
      "languagePair",
      "price",
      "status",
      "enrollmentCount",
      "lessons",
      "createdDate"
    ]
  },
  {
    name: "Word Definition",
    fields: [
      "id",
      "word",
      "language",
      "ipa",
      "ancientTranslation",
      "translations",
      "examples"
    ]
  },
  {
    name: "Bus / Train / Flight Booking",
    fields: [
      "id",
      "customerId",
      "serviceType",
      "from",
      "to",
      "date",
      "fare",
      "referenceId",
      "status",
      "paySprintRef"
    ]
  },
  {
    name: "Support Ticket",
    fields: [
      "id",
      "raisedBy",
      "role",
      "subject",
      "description",
      "status",
      "createdAt"
    ]
  },
  {
    name: "Blog",
    fields: [
      "id",
      "authorId",
      "title",
      "location",
      "category",
      "content",
      "reviews"
    ]
  },
  {
    name: "Community Member",
    fields: [
      "id",
      "phone",
      "name",
      "city",
      "pincode",
      "communityId",
      "approvedAt"
    ]
  },
  {
    name: "Visitor Check-In",
    fields: [
      "id",
      "visitorPhone",
      "visitorName",
      "communityId",
      "reason",
      "checkinAt",
      "checkoutAt",
      "approvedBy"
    ]
  },
  {
    name: "Menu Option",
    fields: [
      "id",
      "optionLabel",
      "flowId",
      "sortOrder",
      "roles",
      "cityModuleKey",
      "isActive",
      "createdAt",
      "updatedAt"
    ]
  },
  {
    name: "Flow Definition",
    fields: [
      "id",
      "name",
      "flowJson",
      "environment",
      "version",
      "createdAt",
      "updatedAt"
    ]
  },
  {
    name: "Bot Log",
    fields: [
      "id",
      "platform",
      "senderId",
      "messageText",
      "flowTriggered",
      "direction",
      "status",
      "errorDetail",
      "timestamp",
      "rawPayload"
    ]
  },
  {
    name: "PaySprint Credential",
    fields: [
      "id",
      "serviceType",
      "environment",
      "partnerId",
      "authorisedKey",
      "partnerKey",
      "baseUrl",
      "isActive",
      "lastTestResult",
      "lastTestedAt"
    ]
  },
  {
    name: "PaySprint API Log",
    fields: [
      "id",
      "serviceType",
      "environment",
      "endpoint",
      "requestBody",
      "responseBody",
      "httpStatus",
      "latencyMs",
      "isError",
      "errorMessage",
      "createdAt"
    ]
  },
  {
    name: "Employee",
    fields: [
      "id",
      "merchantId",
      "name",
      "phone",
      "role",
      "isActive",
      "hireDate"
    ]
  },
  {
    name: "Employee Attendance",
    fields: [
      "id",
      "employeeId",
      "date",
      "checkInTime",
      "checkOutTime",
      "notes"
    ]
  },
  {
    name: "Employee Leave Request",
    fields: [
      "id",
      "employeeId",
      "leaveType",
      "fromDate",
      "toDate",
      "reason",
      "status",
      "createdAt"
    ]
  },
  {
    name: "Inventory Item",
    fields: [
      "id",
      "manufacturerId",
      "productId",
      "productName",
      "currentStock",
      "reorderLevel",
      "batchCode",
      "expiryDate",
      "lastUpdated"
    ]
  },
  {
    name: "Expiry Return",
    fields: [
      "id",
      "manufacturerId",
      "productId",
      "returnedById",
      "returnedBy",
      "quantity",
      "reason",
      "status",
      "createdAt"
    ]
  },
  {
    name: "Manufacturer Complaint",
    fields: [
      "id",
      "manufacturerId",
      "filedById",
      "filedBy",
      "subject",
      "description",
      "status",
      "createdAt"
    ]
  },
  {
    name: "Sale Record",
    fields: [
      "id",
      "manufacturerId",
      "buyerId",
      "buyerType",
      "invoiceNo",
      "items",
      "totalAmount",
      "paymentStatus",
      "createdAt"
    ]
  },
  {
    name: "App Version",
    fields: [
      "id",
      "brandName",
      "platform",
      "version",
      "buildNumber",
      "releaseDate",
      "isActive",
      "createdAt"
    ]
  },
  {
    name: "Subscription Plan",
    fields: [
      "id",
      "name",
      "targetRole",
      "orderLimit",
      "durationDays",
      "priceFlat",
      "features",
      "isActive"
    ]
  },
  {
    name: "Customer Rating",
    fields: [
      "id",
      "customerId",
      "orderId",
      "rating",
      "comment",
      "ratedById",
      "ratedByRole",
      "createdAt"
    ]
  },
  {
    name: "Tip Record",
    fields: [
      "id",
      "toPartnerId",
      "fromCustomerId",
      "amount",
      "entityId",
      "entityType",
      "timestamp"
    ]
  }
];
const ADMIN_FORMS = [
  {
    name: "User Registration",
    saves: "Customer profile; triggers city-gated menu loading",
    fields: [
      { name: "Phone", type: "tel", notes: "10-digit Indian mobile" },
      { name: "Name", type: "text", notes: "Full name" },
      { name: "City", type: "select", notes: "From full city list" },
      { name: "Pincode", type: "text", notes: "6-digit postal code" }
    ]
  },
  {
    name: "Merchant Registration",
    saves: "Merchant record; activates Merchant tab",
    fields: [
      { name: "Business Name", type: "text", notes: "" },
      { name: "Owner Name", type: "text", notes: "" },
      { name: "Phone", type: "tel", notes: "Validated, unique" },
      { name: "City", type: "select", notes: "" },
      { name: "Pincode", type: "text", notes: "6-digit" },
      { name: "Category", type: "select", notes: "From 70+ category list" },
      { name: "GST Number", type: "text", notes: "Optional" },
      {
        name: "Is Manufacturer",
        type: "checkbox",
        notes: "Unlocks manufacturer documents"
      }
    ]
  },
  {
    name: "Manufacturer Registration",
    saves: "Manufacturer profile; activates Manufacturer tab; generates DIST-XXXXX codes",
    fields: [
      { name: "Business Name", type: "text", notes: "" },
      { name: "Product Categories", type: "multi-select", notes: "" },
      { name: "Customer Care Phone", type: "tel", notes: "" },
      { name: "Customer Care Email", type: "email", notes: "" },
      { name: "GST Certificate", type: "file", notes: "Required document" },
      { name: "PAN", type: "text", notes: "Required document" },
      {
        name: "Business Registration",
        type: "file",
        notes: "Required document"
      }
    ]
  },
  {
    name: "Manufacturer Product",
    saves: "ManufacturerProduct; discontinued products hidden from distributors and customers",
    fields: [
      { name: "Product Name", type: "text", notes: "" },
      { name: "HSN Code", type: "text", notes: "Mandatory for GST" },
      { name: "Batch Code", type: "text", notes: "" },
      { name: "Batch Number", type: "text", notes: "" },
      { name: "Origin City", type: "select", notes: "City of manufacture" },
      {
        name: "Manufacture Date",
        type: "date-range",
        notes: "1 week / 1 month / 1 year range"
      },
      { name: "Expiry Date", type: "date", notes: "Optional" },
      { name: "Price to Customer", type: "number", notes: "" },
      { name: "Price to Distributor", type: "number", notes: "" },
      {
        name: "Bulk Pricing Tiers",
        type: "multi-input",
        notes: "minQty / maxQty / pricePerUnit"
      },
      {
        name: "Is B2B",
        type: "checkbox",
        notes: "Enables returnable/exchange flag"
      },
      { name: "Is Returnable", type: "checkbox", notes: "B2B only" },
      {
        name: "B2B Code",
        type: "text",
        notes: "Auto-generated for registered distributors"
      }
    ]
  },
  {
    name: "Distributor Add",
    saves: "DistributorNetwork; validated against merchant registry; generates distributor code",
    fields: [
      {
        name: "Merchant Phone",
        type: "tel",
        notes: "Validated against merchant registration"
      },
      { name: "City", type: "select", notes: "" },
      { name: "Pincode", type: "text", notes: "" },
      { name: "Scheme", type: "text", notes: "Discount/pricing scheme name" },
      { name: "Margin %", type: "number", notes: "" },
      { name: "Route Description", type: "textarea", notes: "" },
      {
        name: "Delivery Partner Phone",
        type: "tel",
        notes: "Optional assignment"
      }
    ]
  },
  {
    name: "Product Add / Edit",
    saves: "Product record; merchant catalog",
    fields: [
      { name: "Name", type: "text", notes: "" },
      { name: "Description", type: "textarea", notes: "" },
      { name: "Price", type: "number", notes: "Base price" },
      {
        name: "Location Prices",
        type: "multi-input",
        notes: "Per city/branch pricing"
      },
      { name: "Stock", type: "number", notes: "" },
      { name: "Category", type: "select", notes: "" },
      {
        name: "Barcode (EAN-13)",
        type: "text",
        notes: "Auto-generated or manual"
      },
      { name: "Expiry Date", type: "date", notes: "Optional" }
    ]
  },
  {
    name: "PaySprint API Config",
    saves: "PaySprintCredential per service; used for all booking/payment flows",
    fields: [
      { name: "Partner ID", type: "text", notes: "UAT and Live separate" },
      { name: "Authorised Key", type: "password", notes: "JWT/API key" },
      { name: "Partner Key", type: "password", notes: "" },
      { name: "Environment", type: "select", notes: "UAT / Live" },
      {
        name: "Service Type",
        type: "select",
        notes: "Bus / Train / Flight / Recharge / Bill / FastTag / LPG / Municipality / Insurance"
      },
      { name: "Base URL", type: "url", notes: "Override for UAT/Live" }
    ]
  },
  {
    name: "City Module Toggle",
    saves: "Module on/off per city; menus and flows reflect immediately",
    fields: [
      { name: "City", type: "select", notes: "" },
      { name: "Module", type: "select", notes: "One of 29+ modules" },
      { name: "Enabled", type: "toggle", notes: "" }
    ]
  },
  {
    name: "Branding",
    saves: "BrandingConfig; updates welcome message in all flow registry flows",
    fields: [
      {
        name: "Brand Name",
        type: "text",
        notes: "Admin-only; Internet Identity required"
      },
      {
        name: "iOS Version",
        type: "text",
        notes: "Tracked per brand; locked on update"
      },
      {
        name: "Android Version",
        type: "text",
        notes: "Tracked per brand; locked on update"
      }
    ]
  },
  {
    name: "Professional Service — Area Rates",
    saves: "ProfessionalService with areaRates array; customers see their area rate during search",
    fields: [
      { name: "Service Type", type: "text", notes: "" },
      {
        name: "Global Rate (₹/hr)",
        type: "number",
        notes: "Fallback if no area rate set"
      },
      { name: "City", type: "select", notes: "" },
      {
        name: "Area",
        type: "select",
        notes: "Fixed list per city (e.g. Andheri, Bandra)"
      },
      {
        name: "Area Rate (₹/hr)",
        type: "number",
        notes: "Overrides global rate for this area"
      }
    ]
  },
  {
    name: "Job Posting",
    saves: "Job record with multi-location opportunities",
    fields: [
      { name: "Title", type: "text", notes: "" },
      { name: "Description", type: "textarea", notes: "" },
      { name: "Category", type: "select", notes: "" },
      {
        name: "Locations",
        type: "multi-input",
        notes: "Multiple cities/areas per posting"
      },
      { name: "Salary Min / Max", type: "number", notes: "" },
      {
        name: "Willing to Relocate",
        type: "checkbox",
        notes: "Shows in city-filter searches"
      }
    ]
  },
  {
    name: "Language Course",
    saves: "LanguageCourse (pending admin approval); commission applied on paid sale",
    fields: [
      { name: "Title", type: "text", notes: "" },
      { name: "Language Pair", type: "text", notes: "e.g. Hindi → English" },
      { name: "Price", type: "number", notes: "0 = free" },
      { name: "Description", type: "textarea", notes: "" },
      {
        name: "Lessons",
        type: "multi-input",
        notes: "Each with title, content, quiz"
      }
    ]
  },
  {
    name: "Employee Add (Merchant)",
    saves: "Employee record; enables attendance and leave tracking",
    fields: [
      { name: "Name", type: "text", notes: "" },
      { name: "Phone", type: "tel", notes: "" },
      {
        name: "Role",
        type: "select",
        notes: "Sale / Purchase / Restock / Accounts / etc."
      },
      { name: "Hire Date", type: "date", notes: "" }
    ]
  },
  {
    name: "Visitor Check-In",
    saves: "VisitorRecord in community; approval required by community member",
    fields: [
      { name: "Visitor Phone", type: "tel", notes: "" },
      { name: "Visitor Name", type: "text", notes: "" },
      { name: "Community ID", type: "select", notes: "" },
      { name: "Reason for Visit", type: "textarea", notes: "" }
    ]
  }
];
const CHANNEL_SCRIPTS = [
  {
    channel: "Telegram",
    icon: "✈️",
    steps: [
      "Create a bot with @BotFather and copy the HTTP API token",
      "In Admin → Telegram Configuration, enter the token and save",
      "Set webhook URL to https://bot.localbazar.shop/telegram/webhook",
      "Use 'Test Connection' to verify the bot responds",
      "Debug tools available: Poll Now, Webhook Diagnostics, Force Clear Webhook, Test HTTP Outcall",
      "Bot Logs captures every incoming payload with raw request body"
    ]
  },
  {
    channel: "WhatsApp",
    icon: "💬",
    steps: [
      "Apply for WhatsApp Business API access (Meta Business Manager)",
      "In Admin → WhatsApp Configuration, enter API key and Phone Number ID",
      "Set callback URL to https://bot.localbazar.shop",
      "Verify webhook with the token from Admin → WhatsApp Config",
      "All 75+ chatbot flows available after setup"
    ]
  },
  {
    channel: "SMS",
    icon: "📱",
    steps: [
      "Obtain long-code or short-code from an SMS provider",
      "In Admin → SMS Configuration, enter sender ID, API key, and route",
      "Point inbound SMS webhook to https://bot.localbazar.shop/sms",
      "All major flows available via SMS (text-only, no media attachments)"
    ]
  }
];
const _PAYSPRINT_SERVICES = [
  {
    name: "Bus Booking",
    endpoint: "/api/v1/service/bus/search",
    desc: "Search trips, block seats, confirm booking"
  },
  {
    name: "Train Booking",
    endpoint: "/api/v1/service/train/search",
    desc: "Search trains, book tickets, PNR tracking"
  },
  {
    name: "Flight Booking",
    endpoint: "/api/v1/service/flight/search",
    desc: "Search flights, book seats, e-ticket"
  },
  {
    name: "Mobile Recharge",
    endpoint: "/api/v1/service/recharge",
    desc: "Prepaid/postpaid mobile recharge"
  },
  {
    name: "Bill Payment (BBPS)",
    endpoint: "/api/v1/service/bbps/fetchbill",
    desc: "Electricity, gas, water, broadband"
  },
  {
    name: "FastTag Recharge",
    endpoint: "/api/v1/service/fasttag/recharge",
    desc: "NETC FASTag top-up"
  },
  {
    name: "LPG Booking",
    endpoint: "/api/v1/service/lpg/booking",
    desc: "LPG cylinder booking"
  },
  {
    name: "Municipality Tax",
    endpoint: "/api/v1/service/municipality/pay",
    desc: "Property tax, water tax payments"
  },
  {
    name: "Insurance Premium",
    endpoint: "/api/v1/service/insurance/premium",
    desc: "Motor, health, life premium payments"
  }
];
const _ROLES_MATRIX = [
  {
    role: "Customer",
    accesses: [
      "Browse merchant products and place orders",
      "Book rides (Sarthi), shuttles, buses, trains, flights",
      "Search jobs, browse and apply with location preference",
      "Search professional services by area (see area-specific rates)",
      "Browse manufacturer products (if distributor-linked)",
      "Mobile recharge, bill payment, FastTag, LPG, municipality payments",
      "Search properties, book healthcare, tour packages",
      "Enroll in language courses, search word definitions",
      "Post and read blogs, donate, create matrimony profile",
      "Family group management and marketplace (old items)",
      "Search market/commodity prices with AI recommendations",
      "View live cricket/football scores and election results",
      "Rate merchants, delivery partners, and manufacturer products",
      "Manage lending records with reminders"
    ]
  },
  {
    role: "Merchant",
    accesses: [
      "Manage product catalog with EAN-13 barcodes and location-specific prices",
      "Receive and process orders (restricted when plan expired)",
      "View customer ratings and reviews (paid subscription)",
      "Add and manage employees: attendance, leave, check-in/checkout",
      "Generate thermal-print receipts via browser print dialog",
      "Scan product barcodes to look up and edit products",
      "Manage restock orders and supplier relationships",
      "Browse manufacturer products (requires distributor registration)",
      "Be marked as manufacturer — access manufacturer dashboard",
      "Multi-branch POS with branch-specific pricing"
    ]
  },
  {
    role: "Delivery Partner",
    accesses: [
      "Accept and fulfill delivery orders",
      "Track earnings, tips, and petrol expenses",
      "Shift check-in/check-out with daily summary",
      "Rate customers after completed orders",
      "Visitor check-in at society gates",
      "View delivery route assignments from manufacturer/distributor"
    ]
  },
  {
    role: "Manufacturer",
    accesses: [
      "Register business with GST, PAN, and business registration",
      "Add products with HSN/batch codes, bulk pricing, B2B codes, expiry",
      "Manage distributor network (city/pincode/scheme/margin)",
      "Sell direct to distributors and customers",
      "Process expiry returns (distributor-gated)",
      "View and respond to product complaints",
      "Track product ratings and reviews",
      "Add employees and assign to sale/purchase/restock/accounts roles",
      "Manage inventory register with batch tracking",
      "Accounts and bills with pending payment tracking",
      "Assign delivery partners with route descriptions",
      "Discontinue products (hidden from distributors and customers)"
    ]
  },
  {
    role: "Admin",
    accesses: [
      "Full dashboard: users, merchants, orders, deliveries, analytics",
      "City module toggles (29+ modules per city)",
      "Single unified flow registry: create, edit, seed, health-check",
      "Menu repository: sync, add, edit, delete options per role",
      "Branding page (Internet Identity required): change app name",
      "App version management (iOS + Android per brand)",
      "PaySprint API configuration (UAT + Live per service)",
      "Telegram, WhatsApp, SMS channel configuration",
      "Flow Health Agent: diagnostics + auto-fix proposals",
      "Script Executor: run all flows with auto-generated test data",
      "Multi-Role Simulator: Customer + Merchant + Delivery side-by-side",
      "Data Explorer: view, add, edit, delete all 36+ entity tables",
      "Import/Export: all modules with category-level checkboxes",
      "Load Sample Data: 12-step seeding in dependency order",
      "Bot Logs: full payload inspection for Telegram/WhatsApp/SMS",
      "Community member management and city list control",
      "Language course approval with commission settings"
    ]
  }
];
const ROLE_TABS = [
  {
    role: "customer",
    label: "Customer",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
  },
  {
    role: "merchant",
    label: "Merchant",
    color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
  },
  {
    role: "delivery",
    label: "Delivery Partner",
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
  },
  {
    role: "sarthi",
    label: "Manufacturer / Sarthi",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
  },
  {
    role: "all",
    label: "Admin / All Roles",
    color: "bg-muted text-muted-foreground"
  }
];
function roleBadgeColor(role) {
  var _a;
  return ((_a = ROLE_TABS.find((r) => r.role === role)) == null ? void 0 : _a.color) ?? "bg-muted text-muted-foreground";
}
function SectionHeader({
  icon,
  title,
  subtitle
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-6 pb-4 border-b border-border print:border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-primary", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground", children: title }),
      subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: subtitle })
    ] })
  ] });
}
function FlowList({ flows }) {
  const safeFlows = (flows ?? []).filter(Boolean);
  if (safeFlows.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic py-4", children: "No flows found for this role in the registry." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "multiple", className: "space-y-1", children: safeFlows.map((flow) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AccordionItem,
    {
      value: flow.id,
      className: "border border-border rounded-lg px-4 bg-card",
      "data-ocid": `flow.item.${flow.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "py-3 hover:no-underline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-foreground", children: flow.name }),
          flow.moduleKey && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: flow.moduleKey })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionContent, { className: "pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: flow.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-3", children: (flow.roles ?? []).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-xs px-2 py-0.5 rounded-full font-medium ${roleBadgeColor(r)}`,
              children: r
            },
            r
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Trigger Payload" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs bg-muted px-2 py-1 rounded font-mono", children: flow.triggerPayload })
          ] }),
          flow.flowJson && (() => {
            try {
              const json = JSON.parse(flow.flowJson);
              const nodes = json.nodes;
              if (Array.isArray(nodes) && nodes.length > 0) {
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: [
                    "Steps (",
                    nodes.length,
                    ")"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-1", children: nodes.map((node, i) => {
                    const data = node.data ?? {};
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "li",
                      {
                        className: "flex gap-2 text-xs",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-center leading-5 font-semibold", children: i + 1 }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                            String(
                              data.label ?? data.prompt ?? data.name ?? `Step ${i + 1}`
                            ),
                            typeof data.inputType === "string" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 text-muted-foreground", children: [
                              "— ",
                              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: data.inputType })
                            ] }) : data.inputType != null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 text-muted-foreground", children: [
                              "— ",
                              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: String(data.inputType) })
                            ] }) : null
                          ] })
                        ]
                      },
                      String(node.id ?? i)
                    );
                  }) })
                ] });
              }
            } catch {
            }
            return null;
          })()
        ] })
      ]
    },
    flow.id
  )) });
}
function ProjectDocumentationPage() {
  const [flows, setFlows] = reactExports.useState([]);
  const [flowsLoading, setFlowsLoading] = reactExports.useState(true);
  const [refreshing, setRefreshing] = reactExports.useState(false);
  const {
    data: menuOptions = [],
    isLoading: menuLoading,
    error: menuError
  } = useGetAllMenuOptions();
  const { data: health } = useGetMenuRepositoryHealth();
  const { actor } = useBackendActor();
  reactExports.useEffect(() => {
    if (!actor) return;
    setFlowsLoading(true);
    const actorAny = actor;
    if (typeof actorAny.getAllFlows === "function") {
      actorAny.getAllFlows().then((result) => {
        const raw = result != null && typeof result === "object" && "ok" in result ? result.ok : result;
        const allFlowsResult = Array.isArray(raw) ? raw : [];
        setFlows(
          allFlowsResult.map((f) => ({
            ...f,
            id: String((f == null ? void 0 : f.id) ?? ""),
            name: String((f == null ? void 0 : f.name) ?? ""),
            description: String((f == null ? void 0 : f.description) ?? ""),
            category: (f == null ? void 0 : f.category) ?? "customer",
            triggerPayload: String((f == null ? void 0 : f.triggerPayload) ?? ""),
            roles: Array.isArray(f == null ? void 0 : f.roles) ? f.roles : []
          }))
        );
      }).catch(() => setFlows([])).finally(() => setFlowsLoading(false));
    } else {
      setFlowsLoading(false);
    }
  }, [actor]);
  async function handleRefresh() {
    setRefreshing(true);
    try {
      const actorAny = actor;
      if (actor && typeof actorAny.getAllFlows === "function") {
        const result = await actorAny.getAllFlows();
        const raw = result != null && typeof result === "object" && "ok" in result ? result.ok : result;
        const allFlowsResult = Array.isArray(raw) ? raw : [];
        setFlows(
          allFlowsResult.map((f) => ({
            ...f,
            id: String((f == null ? void 0 : f.id) ?? ""),
            name: String((f == null ? void 0 : f.name) ?? ""),
            description: String((f == null ? void 0 : f.description) ?? ""),
            category: (f == null ? void 0 : f.category) ?? "customer",
            triggerPayload: String((f == null ? void 0 : f.triggerPayload) ?? ""),
            roles: Array.isArray(f == null ? void 0 : f.roles) ? f.roles : []
          }))
        );
      }
    } catch {
    }
    setRefreshing(false);
  }
  const flowsByRole = ROLE_TABS.reduce(
    (acc, { role }) => {
      acc[role] = flows.filter((f) => {
        const roles = Array.isArray(f.roles) ? f.roles : [];
        if (role === "all") return roles.includes("all");
        return roles.includes(role);
      });
      return acc;
    },
    {}
  );
  const menuByRole = {
    customer: [],
    merchant: [],
    delivery_partner: [],
    manufacturer: [],
    all: []
  };
  for (const opt of menuOptions ?? []) {
    if (opt == null) continue;
    const roles = Array.isArray(opt.roles) ? opt.roles : [];
    for (const role of roles) {
      if (!role) continue;
      const key = String(role).toLowerCase().replace(/\s+/g, "_");
      if (key in menuByRole) {
        menuByRole[key].push(opt);
      } else {
        menuByRole.all.push(opt);
      }
    }
    if (roles.length === 0) menuByRole.all.push(opt);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @media print {
          body { background: #fff !important; color: #000 !important; }
          [data-sidebar], aside, nav, .no-print, header { display: none !important; }
          main { padding: 0 !important; margin: 0 !important; width: 100% !important; }
          .print-hidden { display: none !important; }
          details, details[open], [data-state="closed"] > div { display: block !important; }
          [data-state] > div { display: block !important; height: auto !important; overflow: visible !important; }
          * { box-shadow: none !important; }
          a { text-decoration: none !important; color: inherit !important; }
          h1, h2, h3 { page-break-after: avoid; }
          tr, li, section { page-break-inside: avoid; }
        }
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-5xl mx-auto px-4 py-8 space-y-12",
        "data-ocid": "project-docs.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "LocalBazar Kart 🛒" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Complete project documentation — features, flows, menus, admin forms, integrations, and setup" }),
              health && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
                  health.flowCount,
                  " flows in registry"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
                  health.menuOptionCount ?? 0,
                  " menu options"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 print-hidden no-print", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  onClick: handleRefresh,
                  disabled: refreshing,
                  "data-ocid": "project-docs.refresh_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      RefreshCw,
                      {
                        className: `h-3.5 w-3.5 mr-1.5 ${refreshing ? "animate-spin" : ""}`
                      }
                    ),
                    "Refresh Flows"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  onClick: () => window.print(),
                  "data-ocid": "project-docs.print_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-3.5 w-3.5 mr-1.5" }),
                    "Print / Save as PDF"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "project-docs.overview_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeader,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5" }),
                title: "Project Overview",
                subtitle: "Platform-wide statistics and surface summary"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6", children: [
              { label: "Surfaces", value: PLATFORM_SURFACES.length },
              { label: "Flows", value: flowsLoading ? "…" : flows.length },
              { label: "Admin Forms", value: ADMIN_FORMS.length },
              { label: "Data Entities", value: BACKEND_ENTITIES.length }
            ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-lg border border-border bg-card p-4 text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-primary", children: s.value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: s.label })
                ]
              },
              s.label
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3", children: PLATFORM_SURFACES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: s.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: s.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: s.desc })
                  ] })
                ]
              },
              s.label
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "project-docs.flows_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeader,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-5 w-5" }),
                title: "All Flows by Role",
                subtitle: flowsLoading ? "Loading flows from registry…" : `${flows.length} flows loaded from the single unified flow registry`
              }
            ),
            flowsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 rounded-lg" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "customer", "data-ocid": "project-docs.role_tabs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "mb-4 flex-wrap h-auto gap-1", children: ROLE_TABS.map(({ role, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: role,
                  "data-ocid": `project-docs.role_tab.${role}`,
                  children: [
                    label,
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 text-xs opacity-60", children: [
                      "(",
                      (flowsByRole[role] ?? []).length,
                      ")"
                    ] })
                  ]
                },
                role
              )) }),
              ROLE_TABS.map(({ role, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsContent,
                {
                  value: role,
                  "data-ocid": `project-docs.flows_list.${role}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: (flowsByRole[role] ?? []).length }),
                      " ",
                      "flows tagged for ",
                      label
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FlowList, { flows: flowsByRole[role] ?? [] })
                  ]
                },
                role
              ))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "project-docs.menus_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeader,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-5 w-5" }),
                title: "Menu Repository",
                subtitle: "Live menu options synced from the single unified flow registry"
              }
            ),
            menuError ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-lg border border-destructive/30 bg-destructive/5 text-sm text-destructive", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 flex-shrink-0" }),
              menuError instanceof Error ? menuError.message : String(
                (menuError == null ? void 0 : menuError.errorDetail) ?? "Failed to load menu options"
              )
            ] }) : menuLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 rounded" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "customer", "data-ocid": "project-docs.menu_tabs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "mb-4 flex-wrap h-auto gap-1", children: [
                { key: "customer", label: "Customer" },
                { key: "merchant", label: "Merchant" },
                { key: "delivery_partner", label: "Delivery Partner" },
                { key: "manufacturer", label: "Manufacturer" },
                { key: "all", label: "All Roles" }
              ].map(({ key, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: key,
                  "data-ocid": `project-docs.menu_tab.${key}`,
                  children: [
                    label,
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 text-xs opacity-60", children: [
                      "(",
                      (menuByRole[key] ?? []).length,
                      ")"
                    ] })
                  ]
                },
                key
              )) }),
              [
                { key: "customer", label: "Customer" },
                { key: "merchant", label: "Merchant" },
                { key: "delivery_partner", label: "Delivery Partner" },
                { key: "manufacturer", label: "Manufacturer" },
                { key: "all", label: "All Roles" }
              ].map(({ key, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                TabsContent,
                {
                  value: key,
                  "data-ocid": `project-docs.menu_list.${key}`,
                  children: (menuByRole[key] ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground italic py-4", children: [
                    "No menu options for ",
                    label,
                    ". Open Menu Repository → Sync to populate."
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: (menuByRole[key] ?? []).map((opt, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center justify-between px-3 py-2 rounded border border-border bg-card text-sm",
                      "data-ocid": `project-docs.menu_item.${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate", children: String(opt.optionLabel ?? opt.label ?? "—") }),
                          opt.flowId != null && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Badge,
                            {
                              variant: "secondary",
                              className: "text-xs shrink-0",
                              children: String(opt.flowId)
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                          opt.cityModuleKey != null && /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs bg-muted px-1.5 py-0.5 rounded", children: String(opt.cityModuleKey) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Badge,
                            {
                              variant: opt.isActive ? "default" : "outline",
                              className: "text-xs",
                              children: opt.isActive ? "Active" : "Inactive"
                            }
                          )
                        ] })
                      ]
                    },
                    String(opt.id ?? idx)
                  )) })
                },
                key
              ))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "project-docs.data_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeader,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "h-5 w-5" }),
                title: "Backend Data Tables",
                subtitle: `${BACKEND_ENTITIES.length} entity types with their key fields`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "multiple", className: "space-y-2", children: BACKEND_ENTITIES.map((entity, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              AccordionItem,
              {
                value: entity.name,
                className: "border border-border rounded-lg px-4 bg-card",
                "data-ocid": `project-docs.entity.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "py-3 hover:no-underline", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-foreground", children: entity.name }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: entity.fields.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "code",
                    {
                      className: "text-xs bg-muted px-2 py-0.5 rounded font-mono",
                      children: f
                    },
                    f
                  )) }) })
                ]
              },
              entity.name
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "project-docs.modules_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeader,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-5 w-5" }),
                title: "City-Toggleable Modules",
                subtitle: `${_CITY_MODULES.length} modules — each can be enabled/disabled per city from the admin panel`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2", children: _CITY_MODULES.map((mod, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-start gap-2 px-3 py-2.5 rounded border border-border bg-card",
                "data-ocid": `project-docs.module.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs shrink-0 mt-0.5", children: mod.key }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: mod.desc })
                ]
              },
              mod.key
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "project-docs.forms_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeader,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5" }),
                title: "Admin Forms Reference",
                subtitle: "All major forms with fields, input types, and what they save"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "multiple", className: "space-y-2", children: ADMIN_FORMS.map((form, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              AccordionItem,
              {
                value: form.name,
                className: "border border-border rounded-lg px-4 bg-card",
                "data-ocid": `project-docs.form.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "py-3 hover:no-underline", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-foreground", children: form.name }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionContent, { className: "pb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Saves:" }),
                      " ",
                      form.saves
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs border-collapse", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-1.5 pr-4 font-semibold text-muted-foreground", children: "Field" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-1.5 pr-4 font-semibold text-muted-foreground", children: "Input Type" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-1.5 font-semibold text-muted-foreground", children: "Notes" })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: form.fields.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "tr",
                        {
                          className: "border-b border-border/50 last:border-0",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-4 font-medium text-foreground", children: f.name }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-muted px-1.5 py-0.5 rounded text-[11px]", children: f.type }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 text-muted-foreground", children: f.notes || "—" })
                          ]
                        },
                        f.name
                      )) })
                    ] }) })
                  ] })
                ]
              },
              form.name
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "project-docs.channels_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeader,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-5 w-5" }),
                title: "Channel Scripts & Setup",
                subtitle: "Step-by-step setup instructions for all chatbot channels"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              CHANNEL_SCRIPTS.map((ch) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "border border-border rounded-lg bg-card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30 rounded-t-lg", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: ch.icon }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: ch.channel })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "px-4 py-3 space-y-2", children: ch.steps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-center text-xs leading-5 font-bold", children: i + 1 }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: step })
                    ] }, step)) })
                  ]
                },
                ch.channel
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-lg bg-card px-4 py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "h-4 w-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "Key Endpoints" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: [
                  ["Telegram Webhook", "POST /telegram/webhook"],
                  ["WhatsApp Callback", "POST / (root)"],
                  ["SMS Inbound", "POST /sms"],
                  ["Canister Version", "GET /canister-version"],
                  ["Canister Status", "GET /canister-status"],
                  ["Telegram Debug", "GET /telegram/debug"]
                ].map(([label, endpoint]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground w-36 flex-shrink-0", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono bg-muted px-2 py-0.5 rounded", children: endpoint })
                ] }, label)) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "project-docs.roles_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeader,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5" }),
                title: "Roles & Permissions",
                subtitle: "What each role can access across all surfaces"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "multiple", className: "space-y-2", children: _ROLES_MATRIX.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              AccordionItem,
              {
                value: entry.role,
                className: "border border-border rounded-lg px-4 bg-card",
                "data-ocid": `project-docs.role.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "py-3 hover:no-underline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-primary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: entry.role }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
                      entry.accesses.length,
                      " capabilities"
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: entry.accesses.map((access) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-xs mt-0.5", children: "▸" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: access })
                  ] }, access)) }) })
                ]
              },
              entry.role
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "project-docs.paysprint_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeader,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-5 w-5" }),
                title: "PaySprint Integration",
                subtitle: "9 payment and booking services via PaySprint API (UAT + Live)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              _PAYSPRINT_SERVICES.map((svc, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-start justify-between gap-3 px-4 py-3 rounded-lg border border-border bg-card",
                  "data-ocid": `project-docs.paysprint.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: svc.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: svc.desc })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs bg-muted px-2 py-1 rounded font-mono shrink-0", children: svc.endpoint })
                  ]
                },
                svc.name
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-4 rounded-lg border border-border bg-muted/30", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Admin Configuration" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground", children: [
                  "Navigate to ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Admin → PaySprint API" }),
                  ". Each service has separate UAT and Live credential rows (Partner ID, Authorised Key, Partner Key, Base URL). Use the",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Test Connection" }),
                  " button per service to verify credentials before going live."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-2", children: [
                  "Callback URL:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-muted px-1.5 py-0.5 rounded text-xs font-mono", children: "https://bot.localbazar.shop" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "project-docs.manufacturer_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeader,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-5 w-5" }),
                title: "Manufacturer Flow",
                subtitle: "Direct-to-customer and direct-to-distributor sales with full supply chain"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              {
                title: "Registration & Setup",
                items: [
                  "Register with GST certificate, PAN, and business registration document",
                  "Define product categories (multi-select)",
                  "Set customer care phone and email (visible to customers and distributors)",
                  "Mark as manufacturer from merchant account to access both dashboards"
                ]
              },
              {
                title: "Product Management",
                items: [
                  "Add products with HSN code, batch code, batch number, expiry date (optional)",
                  "Set origin city and manufacture date range (1 week / 1 month / 1 year)",
                  "Configure bulk pricing tiers (1–50 / 51–100 / 100+ units)",
                  "Auto-generate B2B product codes for distributor-registered buyers",
                  "Mark products as B2B — enables returnable/exchange flag",
                  "Discontinue products — immediately hidden from distributors and customers"
                ]
              },
              {
                title: "Distributor Network",
                items: [
                  "Add distributors with city, pincode, scheme name, and margin %",
                  "Distributor must be validated against existing merchant phone registration",
                  "Auto-generate unique distributor code (DIST-XXXXX) on registration",
                  "Assign delivery partner with route description and phone number",
                  "Expiry returns only allowed for registered distributor network members"
                ]
              },
              {
                title: "Operations & Analytics",
                items: [
                  "Track direct customer orders and distributor wholesale orders in one POS view",
                  "Manage employees with roles: sale, purchase, restock, inventory, accounts",
                  "Inventory register with batch tracking and reorder levels",
                  "Accounts and bills with pending payment tracking per merchant party",
                  "View product ratings and complaints from customers and distributors"
                ]
              }
            ].map((block) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-lg border border-border bg-card px-4 py-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground mb-3", children: block.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: block.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 text-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5", children: "▸" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: item })
                  ] }, item)) })
                ]
              },
              block.title
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "project-docs.proservices_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeader,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-5 w-5" }),
                title: "Professional Services — Multi-Rate",
                subtitle: "Area-specific pricing for service professionals"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card px-4 py-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground mb-3", children: "How It Works" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-2", children: [
                  "Service professional sets a global default rate (₹/hr) during registration",
                  "Optionally adds area-specific rates for key areas in their city (fixed list per city: e.g. Andheri, Bandra, Borivali in Mumbai)",
                  "Customer searches for a service — selects their area from the dropdown",
                  "System returns the area-specific rate if set; otherwise falls back to the global default rate silently",
                  "Only the single applicable rate is shown per professional — no side-by-side comparison"
                ].map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-center text-xs leading-5 font-semibold", children: i + 1 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: step })
                ] }, step)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card px-4 py-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground mb-2", children: "Data Model: areaRates" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "block text-xs bg-muted p-3 rounded font-mono whitespace-pre", children: `areaRates: Array<{
  area: string;        // e.g. "Andheri"
  ratePerHour: number; // overrides globalRate for this area
}>` })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "project-docs.language_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeader,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5" }),
                title: "Language Learning Module",
                subtitle: "User-created and AI-powered courses, word search, and daily learning"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              {
                title: "Language Courses",
                items: [
                  "Browse free and paid courses filtered by language pair and difficulty",
                  "Users create courses with title, lessons (text + quiz), and price",
                  "Admin approval required before a user-created course goes live",
                  "Commission applicable on paid course sales (set in admin)",
                  "Pay per course individually — not bundled in subscription",
                  "Enrolled courses shown in My Learning with progress bars and daily streak"
                ]
              },
              {
                title: "Word Search",
                items: [
                  "Search any word or phrase — returns translations in 10+ languages",
                  "Ancient translations included: Sanskrit, Latin, Ancient Greek, IPA pronunciation",
                  "Example sentences provided with each definition",
                  "Seeded reference table of root words as fallback",
                  "Available as a quick widget on all main pages"
                ]
              },
              {
                title: "AI Learning Assistant",
                items: [
                  "Daily guided lessons auto-triggered at a set time for each enrolled learner",
                  "Vocabulary drills, grammar tips, and contextual corrections",
                  "Chat interface: ask questions and receive real-time feedback",
                  "HTTP outcalls to AI service for personalised guidance"
                ]
              },
              {
                title: "Chatbot Flow",
                items: [
                  "Flow ID: fun-learning or language-learning",
                  "Steps: search words, browse courses, enroll, daily practice reminders",
                  "Available via WhatsApp, Telegram, SMS, and the Chat Simulator",
                  "Like/dislike on course lessons with real-time vote counts"
                ]
              }
            ].map((block) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-lg border border-border bg-card px-4 py-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground mb-3", children: block.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: block.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 text-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5", children: "▸" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: item })
                  ] }, item)) })
                ]
              },
              block.title
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "project-docs.community_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeader,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5" }),
                title: "Community Services",
                subtitle: "Resident-facing features for societies and communities"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
              {
                title: "Visitor Check-In / Check-Out",
                desc: "Visitors arrive → enter phone and reason → community member approves → check-in timestamped → check-out recorded. Full daily history visible in community panel. Delivery partners also check in/out when visiting society gates."
              },
              {
                title: "Community Member Management",
                desc: "Every registered phone number is auto-added to a community panel. Searchable by phone, name, or location. City dropdown shows all available cities. Community ID auto-assigned on registration."
              },
              {
                title: "Parking, Room & Food Service",
                desc: "Admin-enabled communities get: Rent Parking (book community parking slots), Rent Room (book common rooms), Food Service (order community meals), and Community Manager Services. All gated by city module toggle."
              },
              {
                title: "Employee Attendance (Merchant)",
                desc: "Merchants add employees with roles (sale, purchase, restock, inventory, accounts). Employees check in/out daily. Leave applications submitted by employee, approved/rejected by merchant. Full attendance history per employee."
              }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-lg border border-border bg-card px-4 py-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground mb-1.5", children: item.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: item.desc })
                ]
              },
              item.title
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "project-docs.sample_data_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeader,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-5 w-5" }),
                title: "Sample Data & Simulator",
                subtitle: "Built-in tools to populate and test the platform"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-lg bg-card px-4 py-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground mb-2", children: "Load Sample Data" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-3", children: [
                  "Navigate to ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Admin → Dashboard" }),
                  " and click",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Load Sample Data" }),
                  ". The loader creates records in strict dependency order:"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-1.5 text-sm", children: [
                  ["1", "Customers (3 records)"],
                  ["2", "Merchants (3 records, with products)"],
                  ["3", "Delivery Partners (2 records)"],
                  [
                    "4",
                    "Manufacturers (3 records) + Products (with HSN/batch/expiry)"
                  ],
                  [
                    "5",
                    "Distributors (linked to manufacturers, validated against merchants)"
                  ],
                  ["6", "Jobs (with multiple location opportunities)"],
                  ["7", "Properties, Healthcare Providers, Tour Packages"],
                  ["8", "Professional Services (with area rates)"],
                  ["9", "Events, Donations, Matrimony profiles"],
                  [
                    "10",
                    "Orders (linking customers, merchants, delivery partners)"
                  ],
                  ["11", "Bus / Train / Flight Bookings"],
                  ["12", "Language Courses (approved) + Word Definitions"]
                ].map(([num, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-center text-xs leading-5 font-semibold", children: num }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: label })
                ] }, num)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-lg bg-card px-4 py-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "h-4 w-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "Script Executor" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-2", children: [
                  "Navigate to ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Admin → Script Executor" }),
                  ". Select any flow and click ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Run Flow" }),
                  "."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 text-sm", children: [
                  "Each step runs with auto-generated valid test values",
                  "Blue bubbles show input sent; grey bubbles show bot response",
                  "Green/red badges show pass/fail per step",
                  "All entities created during the run are saved to backend tables",
                  "Run All executes every flow and shows a health report"
                ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-xs mt-0.5", children: "▸" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: item })
                ] }, item)) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "border-t border-border pt-6 pb-2 text-xs text-muted-foreground print:block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "© ",
              (/* @__PURE__ */ new Date()).getFullYear(),
              " LocalBazar Kart. Built with love using",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "underline",
                  children: "caffeine.ai"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1", children: "Documentation auto-generated from the single unified flow registry." })
          ] })
        ]
      }
    )
  ] });
}
export {
  ProjectDocumentationPage as default
};
