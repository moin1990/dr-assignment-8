"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn.email({ email, password, callbackURL: redirect });
      if (result.error) {
        toast.error(result.error.message || "Login failed. Check your credentials.");
      } else {
        toast.success("Welcome back!");
        router.push(redirect);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await signIn.social({ provider: "google", callbackURL: redirect });
    } catch {
      toast.error("Google login failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="page-enter" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-cream)", padding: "40px 16px" }}>
      {/* Decorative bg */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: "50%", height: "100%", background: "var(--color-charcoal)", clipPath: "polygon(0 0, 70% 0, 100% 100%, 0 100%)" }} className="hidden lg:block" />
      </div>

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 900, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderRadius: 4, overflow: "hidden", boxShadow: "0 30px 80px rgba(26,24,20,0.2)", minHeight: 550 }} className="grid-cols-1 lg:!grid-cols-[1fr_1fr]">
        {/* Left decorative panel */}
        <div
          className="hidden lg:flex"
          style={{ background: "var(--color-charcoal)", padding: "60px 48px", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden" }}
        >
          <div style={{ position: "absolute", inset: 0, opacity: 0.08, backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=40')", backgroundSize: "cover" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ marginBottom: 32 }}>
              <div style={{ width: 40, height: 40, background: "linear-gradient(135deg, var(--color-terracotta), var(--color-brass))", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, padding: 5, borderRadius: 4, marginBottom: 20 }}>
                {[0,1,2,3].map(i => <div key={i} style={{ background: i%2===0 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)", borderRadius: 1 }} />)}
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", color: "var(--color-cream)", fontWeight: 300, lineHeight: 1.1, marginBottom: 16 }}>
                Welcome to<br /><em style={{ fontStyle: "italic", color: "var(--color-terracotta-light)" }}>Tiles Gallery</em>
              </h2>
              <p style={{ color: "var(--color-stone)", fontSize: "0.85rem", lineHeight: 1.7, letterSpacing: "0.03em" }}>
                Sign in to access our exclusive tile details, save your favourites, and connect with our community of interior design enthusiasts.
              </p>
            </div>
            <div style={{ padding: "20px 0", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              {["View exclusive tile details", "Save your favourites", "Get design inspiration"].map((feat) => (
                <p key={feat} style={{ color: "var(--color-stone)", fontSize: "0.78rem", letterSpacing: "0.05em", marginBottom: 8 }}>
                  <span style={{ color: "var(--color-brass)", marginRight: 8 }}>◆</span>{feat}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div style={{ background: "var(--color-white)", padding: "60px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--color-charcoal)", fontWeight: 400, marginBottom: 8 }}>Sign In</h1>
          <p style={{ color: "var(--color-stone)", fontSize: "0.78rem", letterSpacing: "0.05em", marginBottom: 32 }}>
            Don't have an account?{" "}
            <Link href="/register" style={{ color: "var(--color-terracotta)", textDecoration: "none", fontWeight: 600 }}>Register here</Link>
          </p>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            style={{ width: "100%", background: "var(--color-charcoal)", color: "var(--color-cream)", border: "none", padding: "12px", fontSize: "0.8rem", letterSpacing: "0.08em", cursor: "pointer", borderRadius: 2, fontFamily: "var(--font-body)", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 20, opacity: googleLoading ? 0.7 : 1 }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            {googleLoading ? "Connecting..." : "Continue with Google"}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(158,151,137,0.3)" }} />
            <span style={{ fontSize: "0.7rem", color: "var(--color-stone)", letterSpacing: "0.1em", textTransform: "uppercase" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "rgba(158,151,137,0.3)" }} />
          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-stone)", marginBottom: 6, fontFamily: "var(--font-body)" }}>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{ width: "100%", padding: "12px 14px", border: "1px solid rgba(158,151,137,0.4)", borderRadius: 2, fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-charcoal)", background: "var(--color-cream)", outline: "none", transition: "border-color 0.2s" }}
                onFocus={(e) => { e.target.style.borderColor = "var(--color-terracotta)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(158,151,137,0.4)"; }}
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-stone)", marginBottom: 6, fontFamily: "var(--font-body)" }}>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: "100%", padding: "12px 14px", border: "1px solid rgba(158,151,137,0.4)", borderRadius: 2, fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-charcoal)", background: "var(--color-cream)", outline: "none", transition: "border-color 0.2s" }}
                onFocus={(e) => { e.target.style.borderColor = "var(--color-terracotta)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(158,151,137,0.4)"; }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", background: "var(--color-terracotta)", color: "var(--color-cream)", border: "none", padding: "13px", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", borderRadius: 2, fontFamily: "var(--font-body)", fontWeight: 600, opacity: loading ? 0.7 : 1, transition: "background 0.2s" }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}><div className="loading loading-spinner" style={{ color: "var(--color-terracotta)", width: 40 }} /></div>}>
      <LoginForm />
    </Suspense>
  );
}
