"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    router.push("/");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/all-tiles", label: "All Tiles" },
    { href: "/my-profile", label: "My Profile" },
  ];

  return (
    <header
      style={{
        background: "var(--color-dark)",
        borderBottom: "1px solid rgba(181,160,80,0.2)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
      className="shadow-lg"
    >
      <nav className="container mx-auto px-4 py-0">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              style={{
                width: 36,
                height: 36,
                background:
                  "linear-gradient(135deg, var(--color-terracotta), var(--color-brass))",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
                padding: 5,
                borderRadius: 4,
                transition: "transform 0.3s ease",
              }}
              className="group-hover:scale-110"
            >
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    background:
                      i % 2 === 0
                        ? "rgba(255,255,255,0.9)"
                        : "rgba(255,255,255,0.4)",
                    borderRadius: 1,
                  }}
                />
              ))}
            </div>
            <div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-cream)",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  lineHeight: 1,
                  display: "block",
                }}
              >
                Tiles Gallery
              </span>
              <span
                style={{
                  color: "var(--color-brass)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Premium Collection
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                style={{
                  color:
                    pathname === link.href
                      ? "var(--color-terracotta-light)"
                      : "var(--color-stone)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontWeight: pathname === link.href ? 600 : 400,
                  transition: "color 0.2s ease",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <div
                className="skeleton-shine"
                style={{ width: 80, height: 32, borderRadius: 4 }}
              />
            ) : session ? (
              <div className="flex items-center gap-3">
                <Link href="/my-profile" className="flex items-center gap-2 group">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        border: "2px solid var(--color-terracotta)",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: "var(--color-terracotta)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                      }}
                    >
                      {session.user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span
                    style={{
                      color: "var(--color-stone)",
                      fontSize: "0.78rem",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {session.user.name?.split(" ")[0]}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    background: "transparent",
                    border: "1px solid var(--color-stone)",
                    color: "var(--color-stone)",
                    padding: "6px 16px",
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    borderRadius: 2,
                    transition: "all 0.2s ease",
                    fontFamily: "var(--font-body)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-terracotta)";
                    e.currentTarget.style.color = "var(--color-terracotta-light)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-stone)";
                    e.currentTarget.style.color = "var(--color-stone)";
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                style={{
                  background: "var(--color-terracotta)",
                  color: "var(--color-cream)",
                  padding: "8px 24px",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderRadius: 2,
                  fontFamily: "var(--font-body)",
                  transition: "all 0.2s ease",
                  fontWeight: 600,
                  display: "inline-block",
                }}
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: "var(--color-cream)", background: "none", border: "none", cursor: "pointer", fontSize: "1.5rem" }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{
              background: "var(--color-dark)",
              borderTop: "1px solid rgba(181,160,80,0.2)",
              padding: "16px 0",
            }}
            className="md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "10px 0",
                  color: pathname === link.href ? "var(--color-terracotta-light)" : "var(--color-stone)",
                  fontSize: "0.85rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              {session ? (
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  style={{ color: "var(--color-stone)", background: "none", border: "1px solid var(--color-stone)", padding: "8px 20px", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2, fontFamily: "var(--font-body)" }}
                >
                  Logout
                </button>
              ) : (
                <Link href="/login" onClick={() => setMenuOpen(false)} style={{ display: "inline-block", background: "var(--color-terracotta)", color: "var(--color-cream)", padding: "8px 24px", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 2 }}>
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
