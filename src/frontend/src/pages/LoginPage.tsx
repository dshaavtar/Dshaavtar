import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  Loader2,
  Lock,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../App";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setIdentityAuth } = useAuth();
  const { login: iiLogin, isLoginSuccess, identity } = useInternetIdentity();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // When II login completes, store principal and redirect
  useEffect(() => {
    if (isLoginSuccess && identity) {
      const principalId = identity.getPrincipal().toText();
      setIdentityAuth(principalId);
      navigate({ to: "/dashboard" });
    }
  }, [isLoginSuccess, identity, setIdentityAuth, navigate]);

  function handleIILogin() {
    setError("");
    setLoading(true);
    try {
      iiLogin();
    } catch {
      setError("Internet Identity login failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-sidebar flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/5 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary/10 translate-x-1/3 translate-y-1/3" />
        <div className="relative z-10 text-center max-w-sm">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-elevated">
            <MessageCircle className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold text-sidebar-foreground mb-3">
            LocalBazar Kart 🛒
          </h1>
          <p className="text-sidebar-foreground/60 text-base leading-relaxed mb-8">
            WhatsApp-powered local commerce platform for merchants, delivery
            partners, and customers.
          </p>
          <div className="space-y-3 text-left">
            {[
              "🛒 WhatsApp chatbot ordering",
              "📦 Real-time order tracking",
              "🚴 Delivery partner management",
              "💼 Jobs & Property listings",
              "📊 Advanced analytics",
            ].map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 text-sidebar-foreground/70 text-sm"
              >
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — login */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-display font-bold text-foreground">
                LocalBazar Kart 🛒
              </p>
              <p className="text-xs text-muted-foreground">Admin Dashboard</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Admin Sign In
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Authenticate with Internet Identity to access the admin dashboard.
            </p>
          </div>

          {/* II lock badge */}
          <div className="flex items-center gap-2 p-3 mb-6 bg-primary/5 border border-primary/20 rounded-lg">
            <Lock className="w-4 h-4 text-primary shrink-0" />
            <p className="text-xs text-muted-foreground">
              Admin access is secured via{" "}
              <span className="font-semibold text-foreground">
                Internet Identity
              </span>
              . Your claimed principal is permanently linked to this admin
              session.
            </p>
          </div>

          <Button
            type="button"
            onClick={handleIILogin}
            disabled={loading}
            data-ocid="login.ii_button"
            className="w-full gap-2"
            size="lg"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ShieldCheck className="w-4 h-4" />
            )}
            {loading
              ? "Opening Internet Identity…"
              : "Login with Internet Identity"}
          </Button>

          {error && (
            <div className="flex items-start gap-2 p-3 mt-4 bg-destructive/10 text-destructive rounded-lg text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <p className="text-center text-xs text-muted-foreground mt-6">
            Your Internet Computer principal will be registered as the admin on
            first login.
          </p>
        </div>
      </div>
    </div>
  );
}
