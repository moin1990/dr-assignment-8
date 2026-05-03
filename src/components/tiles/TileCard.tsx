import Link from "next/link";
import { Tile } from "@/types";

interface TileCardProps {
  tile: Tile;
  showDetails?: boolean;
}

export default function TileCard({ tile, showDetails = true }: TileCardProps) {
  return (
    <div
      className="tile-card"
      style={{
        background: "var(--color-white)",
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid rgba(158,151,137,0.2)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", paddingBottom: "75%", overflow: "hidden" }}>
        <img
          src={tile.image}
          alt={tile.title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          loading="lazy"
        />
        {/* Category badge */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: "rgba(26,24,20,0.75)",
            backdropFilter: "blur(4px)",
            color: "var(--color-brass)",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "4px 10px",
            borderRadius: 2,
            fontFamily: "var(--font-body)",
          }}
        >
          {tile.category}
        </div>
        {/* Stock badge */}
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: tile.inStock ? "rgba(125,154,125,0.85)" : "rgba(158,151,137,0.85)",
            color: "white",
            fontSize: "0.62rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "4px 8px",
            borderRadius: 2,
            fontFamily: "var(--font-body)",
          }}
        >
          {tile.inStock ? "In Stock" : "Sold Out"}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "18px 20px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem",
            fontWeight: 500,
            color: "var(--color-charcoal)",
            marginBottom: 4,
            lineHeight: 1.2,
          }}
        >
          {tile.title}
        </h3>
        <p
          style={{
            fontSize: "0.72rem",
            color: "var(--color-stone)",
            letterSpacing: "0.08em",
            marginBottom: 10,
          }}
        >
          {tile.material} · {tile.dimensions}
        </p>
        <p
          style={{
            fontSize: "0.8rem",
            color: "var(--color-charcoal)",
            lineHeight: 1.6,
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            marginBottom: 14,
          }}
        >
          {tile.description}
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
          <div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.3rem",
                color: "var(--color-terracotta)",
                fontWeight: 600,
              }}
            >
              ${tile.price.toFixed(2)}
            </span>
            <span style={{ fontSize: "0.65rem", color: "var(--color-stone)", letterSpacing: "0.08em", marginLeft: 4 }}>
              /{tile.currency === "USD" ? "sqm" : tile.currency}
            </span>
          </div>

          {showDetails && (
            <Link
              href={`/tile/${tile.id}`}
              style={{
                background: "var(--color-terracotta)",
                color: "var(--color-cream)",
                padding: "8px 18px",
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                borderRadius: 2,
                textDecoration: "none",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-clay)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--color-terracotta)"; }}
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
