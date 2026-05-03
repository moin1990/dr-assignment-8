import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--color-cream)",
        padding: "40px 16px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 520 }}>
        {/* Decorative tile grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 48px)",
            gap: 6,
            justifyContent: "center",
            marginBottom: 36,
            opacity: 0.6,
          }}
        >
          {[
            "var(--color-terracotta)",
            "var(--color-parchment)",
            "var(--color-brass)",
            "var(--color-parchment)",
            "var(--color-charcoal)",
            "var(--color-parchment)",
            "var(--color-brass)",
            "var(--color-parchment)",
            "var(--color-terracotta)",
          ].map((color, i) => (
            <div
              key={i}
              style={{
                width: 48,
                height: 48,
                background: color,
                borderRadius: 3,
                opacity: i === 4 ? 1 : 0.5,
              }}
            />
          ))}
        </div>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.72rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--color-terracotta)",
            marginBottom: 12,
          }}
        >
          ◆ Error 404
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            color: "var(--color-charcoal)",
            fontWeight: 300,
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          Tile Not Found
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            color: "var(--color-stone)",
            lineHeight: 1.8,
            letterSpacing: "0.03em",
            marginBottom: 40,
          }}
        >
          The tile you're looking for seems to have been moved, discontinued, or
          never existed. Let's get you back to our gallery.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/"
            style={{
              background: "var(--color-terracotta)",
              color: "var(--color-cream)",
              padding: "12px 32px",
              fontSize: "0.78rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              borderRadius: 2,
              textDecoration: "none",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              display: "inline-block",
            }}
          >
            ← Back to Home
          </Link>
          <Link
            href="/all-tiles"
            style={{
              border: "1px solid var(--color-terracotta)",
              color: "var(--color-terracotta)",
              padding: "12px 32px",
              fontSize: "0.78rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              borderRadius: 2,
              textDecoration: "none",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              display: "inline-block",
            }}
          >
            Browse Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
