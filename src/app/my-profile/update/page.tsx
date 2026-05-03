"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, authClient } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [form, setForm] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login?redirect=/my-profile/update");
    }
    if (session) {
      setForm({
        name: session.user.name || "",
        image: session.user.image || "",
      });
    }
  }, [session, isPending, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setLoading(true);
    try {
      await authClient.updateUser({
        name: form.name,
        image: form.image || undefined,
      });
      toast.success("Profile updated successfully!");
      router.push("/my-profile");
    } catch {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="loading loading-spinner" style={{ width: 48, color: "var(--color-terracotta)" }} />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="page-enter">
      {/* Header */}
      <div style={{ background: "var(--color-charcoal)", padding: "48px 0", borderBottom: "1px solid rgba(181,160,80,0.2)" }}>
        <div className="container mx-auto px-4">
          <nav style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.08em", color: "var(--color-stone)", display: "flex", gap: 8, alignItems: "center", marginBottom: 20 }}>
            <Link href="/" style={{ color: "var(--color-stone)", textDecoration: "none" }}>Home</Link>
            <span>›</span>
            <Link href="/my-profile" style={{ color: "var(--color-stone)", textDecoration: "none" }}>My Profile</Link>
            <span>›</span>
            <span style={{ color: "var(--color-terracotta)" }}>Update Information</span>
          </nav>
          <p style={{ color: "var(--color-brass)", fontSize: "0.72rem", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "var(--font-body)", marginBottom: 10 }}>◆ Account Settings</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--color-cream)", fontWeight: 300 }}>
            Update Information
          </h1>
        </div>
      </div>

      {/* Form */}
      <section style={{ padding: "60px 0 80px", background: "var(--color-cream)" }}>
        <div className="container mx-auto px-4" style={{ maxWidth: 700 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Form Card */}
            <div style={{ background: "var(--color-white)", border: "1px solid rgba(158,151,137,0.2)", borderRadius: 4, padding: "40px 36px" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--color-charcoal)", fontWeight: 400, marginBottom: 28 }}>
                Edit Profile
              </h2>

              <form onSubmit={handleUpdate}>
                {/* Name */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-stone)", marginBottom: 8, fontFamily: "var(--font-body)" }}>
                    Display Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    style={{ width: "100%", padding: "12px 14px", border: "1px solid rgba(158,151,137,0.4)", borderRadius: 2, fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-charcoal)", background: "var(--color-cream)", outline: "none", transition: "border-color 0.2s" }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--color-terracotta)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(158,151,137,0.4)"; }}
                  />
                </div>

                {/* Image URL */}
                <div style={{ marginBottom: 28 }}>
                  <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-stone)", marginBottom: 8, fontFamily: "var(--font-body)" }}>
                    Profile Photo URL
                  </label>
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => { setForm({ ...form, image: e.target.value }); setPreviewError(false); }}
                    placeholder="https://example.com/photo.jpg"
                    style={{ width: "100%", padding: "12px 14px", border: "1px solid rgba(158,151,137,0.4)", borderRadius: 2, fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-charcoal)", background: "var(--color-cream)", outline: "none", transition: "border-color 0.2s" }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--color-terracotta)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(158,151,137,0.4)"; }}
                  />
                  <p style={{ fontSize: "0.68rem", color: "var(--color-stone)", letterSpacing: "0.03em", marginTop: 6 }}>
                    Paste a direct link to your profile image
                  </p>
                </div>

                {/* Buttons */}
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{ flex: 1, background: "var(--color-terracotta)", color: "var(--color-cream)", border: "none", padding: "13px 20px", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", borderRadius: 2, fontFamily: "var(--font-body)", fontWeight: 600, opacity: loading ? 0.7 : 1, transition: "background 0.2s" }}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                  <Link
                    href="/my-profile"
                    style={{ flex: 1, border: "1px solid rgba(158,151,137,0.4)", color: "var(--color-stone)", padding: "13px 20px", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", borderRadius: 2, textDecoration: "none", fontFamily: "var(--font-body)", textAlign: "center", display: "block" }}
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>

            {/* Preview Card */}
            <div>
              <div style={{ background: "var(--color-white)", border: "1px solid rgba(158,151,137,0.2)", borderRadius: 4, padding: "32px 28px", textAlign: "center" }}>
                <p style={{ fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-stone)", fontFamily: "var(--font-body)", marginBottom: 20 }}>Live Preview</p>

                {/* Avatar Preview */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                  {form.image && !previewError ? (
                    <img
                      src={form.image}
                      alt="Preview"
                      onError={() => setPreviewError(true)}
                      style={{ width: 90, height: 90, borderRadius: "50%", objectFit: "cover", border: "3px solid var(--color-terracotta)", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
                    />
                  ) : (
                    <div style={{ width: 90, height: 90, borderRadius: "50%", background: "linear-gradient(135deg, var(--color-terracotta), var(--color-brass))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", color: "white", fontFamily: "var(--font-display)", fontWeight: 600, border: "3px solid rgba(194,98,45,0.3)" }}>
                      {form.name?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                  )}
                </div>

                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--color-charcoal)", fontWeight: 400, marginBottom: 4 }}>
                  {form.name || "Your Name"}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--color-stone)", letterSpacing: "0.05em" }}>
                  {session.user.email}
                </p>

                <div style={{ marginTop: 20, padding: "12px", background: "var(--color-parchment)", borderRadius: 3 }}>
                  <p style={{ fontSize: "0.72rem", color: "var(--color-stone)", fontFamily: "var(--font-body)" }}>
                    {previewError ? "⚠️ Image URL could not be loaded" : form.image ? "✓ Image URL looks valid" : "No image URL provided"}
                  </p>
                </div>
              </div>

              {/* Info box */}
              <div style={{ background: "rgba(181,160,80,0.1)", border: "1px solid rgba(181,160,80,0.25)", borderRadius: 4, padding: "16px 20px", marginTop: 12 }}>
                <p style={{ fontSize: "0.75rem", color: "var(--color-charcoal)", fontFamily: "var(--font-body)", lineHeight: 1.7 }}>
                  <span style={{ color: "var(--color-brass)", fontWeight: 600 }}>Tip:</span> Use a publicly accessible direct image link (e.g. from Imgur, Gravatar, or your website).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
