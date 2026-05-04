"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--color-dark)",
        borderTop: "1px solid rgba(181,160,80,0.2)",
        color: "var(--color-stone)",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: "linear-gradient(135deg, var(--color-terracotta), var(--color-brass))",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 2,
                  padding: 4,
                  borderRadius: 3,
                }}
              >
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)", borderRadius: 1 }} />
                ))}
              </div>
              <span style={{ fontFamily: "var(--font-display)", color: "var(--color-cream)", fontSize: "1.2rem", fontWeight: 600 }}>
                Tiles Gallery
              </span>
            </div>
            <p style={{ fontSize: "0.8rem", lineHeight: 1.7, letterSpacing: "0.03em", color: "var(--color-stone)" }}>
              Curating the world's finest tiles for discerning interiors. From handmade zellige to polished marble — your vision, perfected.
            </p>
            {/* Social links */}
            <div className="flex gap-3 mt-5">
              {["Instagram", "Pinterest", "Facebook"].map((social) => (
                <a
                  key={social}
                  href="#"
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-stone)",
                    padding: "5px 10px",
                    border: "1px solid rgba(158,151,137,0.3)",
                    borderRadius: 2,
                    transition: "all 0.2s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-terracotta)"; e.currentTarget.style.color = "var(--color-terracotta-light)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(158,151,137,0.3)"; e.currentTarget.style.color = "var(--color-stone)"; }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: "var(--font-display)", color: "var(--color-cream)", fontSize: "1.1rem", marginBottom: 16, fontWeight: 500 }}>
              Explore
            </h4>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { href: "/", label: "Home" },
                { href: "/all-tiles", label: "All Tiles" },
                { href: "/all-tiles?category=ceramic", label: "Ceramic" },
                { href: "/all-tiles?category=marble", label: "Marble" },
                { href: "/all-tiles?category=terracotta", label: "Terracotta" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: "0.8rem",
                      letterSpacing: "0.05em",
                      color: "var(--color-stone)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    className="hover:text-terracotta"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 style={{ fontFamily: "var(--font-display)", color: "var(--color-cream)", fontSize: "1.1rem", marginBottom: 16, fontWeight: 500 }}>
              Contact Us
            </h4>
            <div style={{ fontSize: "0.8rem", lineHeight: 1.8, letterSpacing: "0.03em" }}>
              <p style={{ marginBottom: 8 }}>
                <span style={{ color: "var(--color-brass)", letterSpacing: "0.1em", fontSize: "0.7rem", textTransform: "uppercase" }}>Email</span>
                <br />
                <a href="mailto:hello@tilesgallery.com" style={{ color: "var(--color-stone)", textDecoration: "none" }}>hello@tilesgallery.com</a>
              </p>
              <p style={{ marginBottom: 8 }}>
                <span style={{ color: "var(--color-brass)", letterSpacing: "0.1em", fontSize: "0.7rem", textTransform: "uppercase" }}>Phone</span>
                <br />
                +1 (800) TILES-01
              </p>
              <p>
                <span style={{ color: "var(--color-brass)", letterSpacing: "0.1em", fontSize: "0.7rem", textTransform: "uppercase" }}>Showroom</span>
                <br />
                123 Artisan Way, Design District
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "16px 0" }}>
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p style={{ fontSize: "0.72rem", letterSpacing: "0.05em" }}>
            © {currentYear} Tiles Gallery. All rights reserved.
          </p>
          <p style={{ fontSize: "0.72rem", letterSpacing: "0.05em" }}>
            Crafted with passion for beautiful interiors.
          </p>
        </div>
      </div>
    </footer>
  );
}
