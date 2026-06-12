import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Car,
  CreditCard,
  Flame,
  Info,
  MessageCircle,
  Shield,
  Smartphone,
  Zap,
} from "lucide-react";

const PAYMENT_SERVICES = [
  {
    id: "mobile-recharge",
    icon: Smartphone,
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-900/30",
    accentBorder: "border-blue-200 dark:border-blue-800",
    title: "Mobile Recharge",
    description:
      "Prepaid and postpaid recharge for all operators — Jio, Airtel, Vi, BSNL and more.",
    chatbotPath: "/chatbot",
    badges: ["Jio", "Airtel", "Vi", "BSNL", "Prepaid", "Postpaid"],
  },
  {
    id: "utility-bill",
    icon: Zap,
    color: "text-amber-600",
    bg: "bg-amber-100 dark:bg-amber-900/30",
    accentBorder: "border-amber-200 dark:border-amber-800",
    title: "Utility Bill Payment",
    description:
      "Pay electricity, water, and gas bills for all major state utilities instantly.",
    chatbotPath: "/chatbot",
    badges: ["Electricity", "Water", "Gas", "Broadband"],
  },
  {
    id: "fastag",
    icon: Car,
    color: "text-cyan-600",
    bg: "bg-cyan-100 dark:bg-cyan-900/30",
    accentBorder: "border-cyan-200 dark:border-cyan-800",
    title: "FASTag Recharge",
    description:
      "Recharge your FASTag account for seamless toll payments across all highways.",
    chatbotPath: "/chatbot",
    badges: ["NHAI", "All Banks", "Vehicle No."],
  },
  {
    id: "lpg",
    icon: Flame,
    color: "text-orange-600",
    bg: "bg-orange-100 dark:bg-orange-900/30",
    accentBorder: "border-orange-200 dark:border-orange-800",
    title: "LPG Cylinder Booking",
    description:
      "Book LPG refills for HP Gas, Indane, and Bharat Gas with home delivery.",
    chatbotPath: "/chatbot",
    badges: ["HP Gas", "Indane", "Bharat Gas"],
  },
  {
    id: "insurance",
    icon: Shield,
    color: "text-emerald-600",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    accentBorder: "border-emerald-200 dark:border-emerald-800",
    title: "Insurance Payment",
    description:
      "Pay premiums for life, health, vehicle, and property insurance from all major insurers.",
    chatbotPath: "/chatbot",
    badges: ["Life", "Health", "Vehicle", "Property"],
  },
  {
    id: "municipality",
    icon: Building2,
    color: "text-violet-600",
    bg: "bg-violet-100 dark:bg-violet-900/30",
    accentBorder: "border-violet-200 dark:border-violet-800",
    title: "Municipality Payment",
    description:
      "Pay property tax, trade license, water connection, and other municipal dues.",
    chatbotPath: "/chatbot",
    badges: ["Property Tax", "Trade License", "Water"],
  },
];

export default function CustomerBillPaymentsPage() {
  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div data-ocid="bill-payments.page">
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-primary" />
            Bill Payments & Recharge
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Recharge, pay bills, and manage all your utility payments in one
            place.
          </p>
        </div>

        {/* Info banner */}
        <div
          className="flex items-start gap-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4"
          data-ocid="bill-payments.info_banner"
        >
          <Info className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-800 dark:text-emerald-300">
            Payments are powered by the chatbot — start a conversation to enter
            your account details and complete your payment securely.
          </p>
        </div>

        {/* Service cards */}
        <div
          className="grid sm:grid-cols-2 gap-4"
          data-ocid="bill-payments.services_list"
        >
          {PAYMENT_SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`bg-card border ${service.accentBorder} rounded-2xl p-4 shadow-card`}
                data-ocid={`bill-payments.service.${idx + 1}`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${service.bg}`}
                  >
                    <Icon className={`w-5 h-5 ${service.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-display font-semibold text-foreground text-sm">
                      {service.title}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {service.badges.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <Link
                  to={service.chatbotPath}
                  data-ocid={`bill-payments.pay_button.${idx + 1}`}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Pay via Chatbot
                    <ArrowRight className="w-3 h-3 ml-auto" />
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Back link */}
        <div className="text-center pt-2">
          <Link
            to="/customer-dashboard"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="bill-payments.back_link"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </>
  );
}
