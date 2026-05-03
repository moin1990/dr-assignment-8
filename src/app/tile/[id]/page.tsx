"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { getAllTiles, getTileById } from "@/lib/tiles";
import { Tile } from "@/types";
import TileCard from "@/components/tiles/TileCard";

export default function TileDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [tile, setTile] = useState<Tile | null>(null);
  const [relatedTiles, setRelatedTiles] = useState<Tile[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  const id = params.id as string;

  useEffect(() => {
    // Auth guard
    if (!isPending && !session) {
      router.push(`/login?redirect=/tile/${id}`);
      return;
    }
    if (session) {
      const found = getTileById(id);
      if (!found) {
        router.push("/not-found");
        return;
      }
      setTile(found);
      const allTiles = getAllTiles();
      const related = allTiles.filter((t) => t.id !== id && t.category === found.category).slice(0, 3);
      setRelatedTiles(related.length > 0 ? related : allTiles.filter((t) => t.id !== id).slice(0, 3));
      setLoading(false);
    }
  }, [id, session, isPending, router]);

  if (isPending || loading) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div className="loading loading-spinner" style={{ width: 48, height: 48, color: "var(--color-terracotta)" }} />
          <p style={{ marginTop: 16, color: "var(--color-stone)", fontFamily: "var(--font-body)", fontSize: "0.8rem", letterSpacing: "0.1em" }}>LOADING TILE...</p>
        </div>
      </div>
    );
  }

  if (!tile) return null;

  // Extra image angles (use same image with different params as demo)
  const images = [tile.image, tile.image.replace("w=600", "w=400"), tile.image.replace("q=80", "q=70")];

  return (
    <div className="page-enter">
      {/* Breadcrumb */}
      <div style={{ background: "var(--color-parchment)", borderBottom: "1px solid rgba(158,151,137,0.2)", padding: "12px 0" }}>
        <div className="container mx-auto px-4">
          <nav style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.08em", color: "var(--color-stone)", display: "flex", gap: 8, alignItems: "center" }}>
            <Link href="/" style={{ color: "var(--color-stone)", textDecoration: "none" }}>Home</Link>
            <span>›</span>
            <Link href="/all-tiles" style={{ color: "var(--color-stone)", textDecoration: "none" }}>All Tiles</Link>
            <span>›</span>
            <span style={{ color: "var(--color-terracotta)" }}>{tile.title}</span>
          </nav>
        </div>
      </div>

      {/* Main detail section */}
      <section style={{ padding: "60px 0", background: "var(--color-cream)" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* LEFT: Visuals */}
            <div>
              {/* Main image */}
              <div
                style={{
                  borderRadius: 4,
                  overflow: "hidden",
                  position: "relative",
                  paddingBottom: "80%",
                  background: "var(--color-parchment)",
                  border: "1px solid rgba(158,151,137,0.2)",
                  marginBottom: 12,
                }}
              >
                <img
                  src={images[activeImage]}
                  alt={tile.title}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.3s ease" }}
                />
                {/* Stock overlay */}
                {!tile.inStock && (
                  <div style={{ position: "absolute", inset: 0, background: "rgba(26,24,20,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "var(--color-cream)", fontFamily: "var(--font-display)", fontSize: "1.5rem", letterSpacing: "0.1em", border: "1px solid var(--color-cream)", padding: "8px 24px" }}>Sold Out</span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div style={{ display: "flex", gap: 8 }}>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 2,
                      overflow: "hidden",
                      border: `2px solid ${activeImage === idx ? "var(--color-terracotta)" : "rgba(158,151,137,0.3)"}`,
                      padding: 0,
                      cursor: "pointer",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT: Details */}
            <div>
              {/* Category & Stock */}
              <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                <span style={{ background: "var(--color-parchment)", color: "var(--color-terracotta)", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 2, fontFamily: "var(--font-body)", border: "1px solid rgba(194,98,45,0.3)" }}>
                  {tile.category}
                </span>
                <span style={{ background: tile.inStock ? "rgba(125,154,125,0.15)" : "rgba(158,151,137,0.15)", color: tile.inStock ? "#5a8a5a" : "var(--color-stone)", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 2, fontFamily: "var(--font-body)", border: `1px solid ${tile.inStock ? "rgba(125,154,125,0.3)" : "rgba(158,151,137,0.3)"}` }}>
                  {tile.inStock ? "✓ In Stock" : "✗ Out of Stock"}
                </span>
              </div>

              {/* Title */}
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--color-charcoal)", fontWeight: 400, lineHeight: 1.1, marginBottom: 8 }}>
                {tile.title}
              </h1>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--color-stone)", letterSpacing: "0.1em", marginBottom: 20, textTransform: "uppercase" }}>
                By {tile.creator}
              </p>

              {/* Price */}
              <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid rgba(158,151,137,0.2)" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", color: "var(--color-terracotta)", fontWeight: 600 }}>
                  ${tile.price.toFixed(2)}
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--color-stone)", marginLeft: 8 }}>per square metre</span>
              </div>

              {/* Description */}
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--color-charcoal)", fontWeight: 500, marginBottom: 10 }}>About This Tile</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-charcoal)", lineHeight: 1.8, letterSpacing: "0.03em" }}>
                  {tile.description}
                </p>
              </div>

              {/* Style */}
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--color-charcoal)", fontWeight: 500, marginBottom: 8 }}>Style Description</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-stone)", letterSpacing: "0.05em", fontStyle: "italic" }}>
                  {tile.style}
                </p>
              </div>

              {/* Specs */}
              <div style={{ background: "var(--color-parchment)", borderRadius: 4, padding: "20px", marginBottom: 24 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "var(--color-charcoal)", fontWeight: 500, marginBottom: 14, letterSpacing: "0.05em" }}>Specifications</h3>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                  {[
                    { label: "Material", value: tile.material },
                    { label: "Dimensions", value: tile.dimensions },
                    { label: "Category", value: tile.category },
                    { label: "Currency", value: tile.currency },
                  ].map((spec) => (
                    <div key={spec.label}>
                      <div style={{ fontSize: "0.65rem", color: "var(--color-stone)", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-body)", marginBottom: 2 }}>{spec.label}</div>
                      <div style={{ fontSize: "0.85rem", color: "var(--color-charcoal)", fontFamily: "var(--font-body)", fontWeight: 500 }}>{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div style={{ marginBottom: 32 }}>
                <p style={{ fontSize: "0.68rem", color: "var(--color-stone)", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-body)", marginBottom: 10 }}>Tags</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {tile.tags.map((tag) => (
                    <span key={tag} style={{ background: "var(--color-white)", border: "1px solid rgba(158,151,137,0.3)", color: "var(--color-charcoal)", fontSize: "0.72rem", letterSpacing: "0.05em", padding: "5px 12px", borderRadius: 20, fontFamily: "var(--font-body)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button
                  disabled={!tile.inStock}
                  style={{ flex: 1, minWidth: 160, background: tile.inStock ? "var(--color-terracotta)" : "var(--color-stone)", color: "var(--color-cream)", border: "none", padding: "14px 28px", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: tile.inStock ? "pointer" : "not-allowed", borderRadius: 2, fontFamily: "var(--font-body)", fontWeight: 600, transition: "background 0.2s" }}
                >
                  {tile.inStock ? "Request Sample" : "Notify When Available"}
                </button>
                <Link
                  href="/all-tiles"
                  style={{ flex: 1, minWidth: 140, border: "1px solid var(--color-terracotta)", color: "var(--color-terracotta)", padding: "14px 28px", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", borderRadius: 2, textDecoration: "none", fontFamily: "var(--font-body)", fontWeight: 600, textAlign: "center", display: "block" }}
                >
                  ← Back to Gallery
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Tiles */}
      {relatedTiles.length > 0 && (
        <section style={{ padding: "60px 0 80px", background: "var(--color-parchment)" }}>
          <div className="container mx-auto px-4">
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--color-charcoal)", fontWeight: 400, marginBottom: 8, textAlign: "center" }}>You May Also Like</h2>
            <div className="section-divider" style={{ margin: "0 auto 36px" }} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedTiles.map((t) => <TileCard key={t.id} tile={t} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
