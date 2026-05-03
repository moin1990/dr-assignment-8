"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", photoUrl: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const result = await signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        image: form.photoUrl || undefined,
        callbackURL: "/login",
      });
      if (result.error) {
        toast.error(result.error.message || "Registration failed.");
      } else {
        toast.success("Account created! Please sign in.");
        router.push("/login");
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
      await signIn.social({ provider: "google", callbackURL: "/" });
    } catch {
      toast.error("Google login failed.");
      setGoogleLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid rgba(158,151,137,0.4)",
    borderRadius: 2,
    fontFamily: "var(--font-body)",
    fontSize: "0.85rem",
    color: "var(--color-charcoal)",
    background: "var(--color-cream)",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.7rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "var(--color-stone)",
    marginBottom: 6,
    fontFamily: "var(--font-body)",
  };

  return (
    <div className="page-enter" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-cream)", padding: "40px 16px" }}>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "var(--color-charcoal)", clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)" }} className="hidden lg:block" />
      </div>

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 900, display: "grid", borderRadius: 4, overflow: "hidden", boxShadow: "0 30px 80px rgba(26,24,20,0.2)" }} className="grid-cols-1 lg:grid-cols-2">
        {/* Left form */}
        <div style={{ background: "var(--color-white)", padding: "52px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--color-charcoal)", fontWeight: 400, marginBottom: 8 }}>Create Account</h1>
          <p style={{ color: "var(--color-stone)", fontSize: "0.78rem", letterSpacing: "0.05em", marginBottom: 28 }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "var(--color-terracotta)", textDecoration: "none", fontWeight: 600 }}>Sign in here</Link>
          </p>

          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            style={{ width: "100%", background: "var(--color-charcoal)", color: "var(--color-cream)", border: "none", padding: "11px", fontSize: "0.8rem", letterSpacing: "0.08em", cursor: "pointer", borderRadius: 2, fontFamily: "var(--font-body)", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 18, opacity: googleLoading ? 0.7 : 1 }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            {googleLoading ? "Connecting..." : "Continue with Google"}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(158,151,137,0.3)" }} />
            <span style={{ fontSize: "0.7rem", color: "var(--color-stone)", letterSpacing: "0.1em", textTransform: "uppercase" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "rgba(158,151,137,0.3)" }} />
          </div>

          <form onSubmit={handleRegister}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <div>
                <label style={labelStyle}>Name</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" style={{ ...inputStyle, borderColor: errors.name ? "var(--color-terracotta)" : undefined }} />
                {errors.name && <p style={{ fontSize: "0.68rem", color: "var(--color-terracotta)", marginTop: 4 }}>{errors.name}</p>}
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" style={{ ...inputStyle, borderColor: errors.email ? "var(--color-terracotta)" : undefined }} />
                {errors.email && <p style={{ fontSize: "0.68rem", color: "var(--color-terracotta)", marginTop: 4 }}>{errors.email}</p>}
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={labelStyle}>Photo URL (optional)</label>
              <input type="url" value={form.photoUrl} onChange={(e) => setForm({ ...form, photoUrl: e.target.value })} placeholder="https://example.com/your-photo.jpg" style={inputStyle} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Password</label>
              <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Min 6 characters" style={{ ...inputStyle, borderColor: errors.password ? "var(--color-terracotta)" : undefined }} />
              {errors.password && <p style={{ fontSize: "0.68rem", color: "var(--color-terracotta)", marginTop: 4 }}>{errors.password}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", background: "var(--color-terracotta)", color: "var(--color-cream)", border: "none", padding: "13px", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", borderRadius: 2, fontFamily: "var(--font-body)", fontWeight: 600, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>

        {/* Right panel */}
        <div className="hidden lg:flex" style={{ background: "var(--color-charcoal)", padding: "52px 48px", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.08, backgroundImage: "url('https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=600&q=40')", backgroundSize: "cover" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", color: "var(--color-cream)", fontWeight: 300, lineHeight: 1.15, marginBottom: 20 }}>
              Join Our<br /><em style={{ fontStyle: "italic", color: "var(--color-brass)" }}>Design Community</em>
            </h2>
            <p style={{ color: "var(--color-stone)", fontSize: "0.85rem", lineHeight: 1.7, letterSpacing: "0.03em", marginBottom: 28 }}>
              Become part of a growing community of interior designers, architects, and tile enthusiasts.
            </p>
            <div>
              {["Access premium tile details & pricing", "Browse 500+ curated tile styles", "Get personalised design recommendations", "Connect with global artisan makers"].map((feat) => (
                <p key={feat} style={{ color: "var(--color-stone)", fontSize: "0.78rem", letterSpacing: "0.03em", marginBottom: 10, display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: "var(--color-terracotta-light)", fontSize: "0.9rem" }}>✓</span>{feat}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
