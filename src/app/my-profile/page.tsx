"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";

export default function MyProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login?redirect=/my-profile");
    }
  }, [session, isPending, router]);

  const handleLogout = async () => {
    await signOut();
    toast.success("Signed out successfully");
    router.push("/");
  };

  if (isPending) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="loading loading-spinner" style={{ width: 48, color: "var(--color-terracotta)" }} />
      </div>
    );
  }

  if (!session) return null;

  const { user } = session;
  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="page-enter">
      {/* Header */}
      <div style={{ background: "var(--color-charcoal)", padding: "48px 0 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=40')", backgroundSize: "cover" }} />
        <div className="container mx-auto px-4 text-center" style={{ position: "relative", zIndex: 1 }}>
          <p style={{ color: "var(--color-brass)", fontSize: "0.72rem", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "var(--font-body)", marginBottom: 24 }}>◆ My Account</p>

          {/* Avatar */}
          <div style={{ marginBottom: 20, display: "flex", justifyContent: "center" }}>
            {user.image ? (
              <img src={user.image} alt={user.name} style={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover", border: "3px solid var(--color-terracotta)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }} />
            ) : (
              <div style={{ width: 100, height: 100, borderRadius: "50%", background: "linear-gradient(135deg, var(--color-terracotta), var(--color-brass))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", color: "white", fontFamily: "var(--font-display)", fontWeight: 600, border: "3px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}>
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "var(--color-cream)", fontWeight: 300, marginBottom: 8 }}>{user.name}</h1>
          <p style={{ color: "var(--color-stone)", fontSize: "0.85rem", letterSpacing: "0.05em" }}>{user.email}</p>
          <p style={{ color: "var(--color-stone)", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 6 }}>Member since {memberSince}</p>
        </div>
      </div>

      {/* Main content */}
      <section style={{ padding: "60px 0", background: "var(--color-cream)" }}>
        <div className="container mx-auto px-4" style={{ maxWidth: 800 }}>
          {/* Profile Card */}
          <div style={{ background: "var(--color-white)", border: "1px solid rgba(158,151,137,0.2)", borderRadius: 4, padding: "36px 40px", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, paddingBottom: 20, borderBottom: "1px solid rgba(158,151,137,0.2)", flexWrap: "wrap", gap: 12 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--color-charcoal)", fontWeight: 400 }}>Profile Information</h2>
              <Link
                href="/my-profile/update"
                style={{ background: "var(--color-terracotta)", color: "var(--color-cream)", padding: "10px 24px", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 2, textDecoration: "none", fontFamily: "var(--font-body)", fontWeight: 600 }}
              >
                Update Profile
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: "Full Name", value: user.name },
                { label: "Email Address", value: user.email },
                { label: "Profile Photo", value: user.image || "No photo uploaded" },
                { label: "Account Status", value: "Active Member" },
                { label: "Member Since", value: memberSince },
                { label: "Account ID", value: `#${user.id?.slice(0, 8).toUpperCase()}` },
              ].map((item) => (
                <div key={item.label}>
                  <p style={{ fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-stone)", fontFamily: "var(--font-body)", marginBottom: 4 }}>{item.label}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--color-charcoal)", fontWeight: 500, wordBreak: "break-all" }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: "Browse Gallery", href: "/all-tiles", desc: "Explore all tiles", icon: "🏛️" },
              { label: "Update Profile", href: "/my-profile/update", desc: "Edit your info", icon: "✏️" },
              { label: "View Home", href: "/", desc: "Back to homepage", icon: "🏠" },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                style={{ background: "var(--color-white)", border: "1px solid rgba(158,151,137,0.2)", borderRadius: 4, padding: "24px 20px", textDecoration: "none", display: "block", transition: "all 0.2s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-terracotta)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(158,151,137,0.2)"; }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: 10 }}>{action.icon}</div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--color-charcoal)", fontWeight: 500, marginBottom: 4 }}>{action.label}</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--color-stone)", letterSpacing: "0.03em" }}>{action.desc}</p>
              </Link>
            ))}
          </div>

          {/* Logout */}
          <div style={{ textAlign: "center" }}>
            <button
              onClick={handleLogout}
              style={{ background: "transparent", border: "1px solid rgba(158,151,137,0.4)", color: "var(--color-stone)", padding: "12px 36px", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2, fontFamily: "var(--font-body)", transition: "all 0.2s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-terracotta)"; e.currentTarget.style.color = "var(--color-terracotta)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(158,151,137,0.4)"; e.currentTarget.style.color = "var(--color-stone)"; }}
            >
              Sign Out of Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
