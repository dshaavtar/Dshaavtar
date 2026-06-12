import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bus,
  Info,
  MessageCircle,
  Plane,
  Train,
} from "lucide-react";

const TRANSPORT_SERVICES = [
  {
    id: "bus",
    icon: Bus,
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-900/30",
    accentBorder: "border-blue-200 dark:border-blue-800",
    title: "Bus Booking",
    description:
      "Book bus tickets across India. Select your route, date, and seat preference via chatbot.",
    chatbotPath: "/chatbot",
    badges: ["AC Sleeper", "AC Seater", "Non-AC", "Volvo"],
  },
  {
    id: "train",
    icon: Train,
    color: "text-emerald-600",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    accentBorder: "border-emerald-200 dark:border-emerald-800",
    title: "Train Booking",
    description:
      "Book IRCTC train tickets, check PNR status, and manage your reservations seamlessly.",
    chatbotPath: "/chatbot",
    badges: ["Sleeper", "3A", "2A", "1A", "CC"],
  },
  {
    id: "flight",
    icon: Plane,
    color: "text-violet-600",
    bg: "bg-violet-100 dark:bg-violet-900/30",
    accentBorder: "border-violet-200 dark:border-violet-800",
    title: "Flight Booking",
    description:
      "Search and book domestic and international flights at the best fares.",
    chatbotPath: "/chatbot",
    badges: ["Economy", "Business", "One-way", "Round-trip"],
  },
];

export default function CustomerTransportBookingPage() {
  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div data-ocid="transport.page">
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <Bus className="w-6 h-6 text-primary" />
            Book Transport
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Book buses, trains, and flights across India — powered by our smart
            chatbot.
          </p>
        </div>

        {/* Info banner */}
        <div
          className="flex items-start gap-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4"
          data-ocid="transport.info_banner"
        >
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800 dark:text-blue-300">
            Transport bookings are powered by the chatbot — start a conversation
            to search routes, check availability, and complete your booking in
            minutes.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid gap-4" data-ocid="transport.services_list">
          {TRANSPORT_SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`bg-card border ${service.accentBorder} rounded-2xl p-5 shadow-card`}
                data-ocid={`transport.service.${idx + 1}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${service.bg}`}
                    >
                      <Icon className={`w-6 h-6 ${service.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-display font-semibold text-foreground text-base mb-1">
                        {service.title}
                      </h2>
                      <p className="text-sm text-muted-foreground mb-3">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {service.badges.map((badge) => (
                          <span
                            key={badge}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Link
                    to={service.chatbotPath}
                    data-ocid={`transport.book_button.${idx + 1}`}
                  >
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-shrink-0 flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Book via Chatbot
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Back link */}
        <div className="text-center pt-2">
          <Link
            to="/customer-dashboard"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="transport.back_link"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </>
  );
}
