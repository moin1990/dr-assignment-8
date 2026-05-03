"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import TileCard from "@/components/tiles/TileCard";
import TileSkeleton from "@/components/tiles/TileSkeleton";
import { Tile } from "@/types";

export default function HomePage() {
  const [featuredTiles, setFeaturedTiles] = useState<Tile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tiles?featured=true")
      .then((r) => r.json())
      .then((data) => { setFeaturedTiles(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const marqueeItems = [
    "New Arrivals: Zellige Teal Handmade",
    "Weekly Feature: Modern Geometric Patterns",
    "Join the Community",
    "Exclusive: Italian Marble Collection",
    "Just In: Moroccan Artisan Series",
    "Free Shipping on Orders Over $500",
  ];

  return (
    <div className="page-enter">
      {/* HERO */}
      <section className="hero-pattern" style={{ minHeight: "85vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", background: "var(--color-charcoal)" }}>
        <div style={{ position: "absolute", right: 0, top: 0, width: "45%", height: "100%", overflow: "hidden", opacity: 0.18 }} className="hidden md:block">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(5, 1fr)", gap: 4, height: "100%", padding: 4 }}>
            {["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=60","https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=200&q=60","https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=200&q=60","https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&q=60","https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200&q=60","https://images.unsplash.com/photo-1553621042-f6e147245754?w=200&q=60","https://images.unsplash.com/photo-1595514535215-a96eddc7c4dc?w=200&q=60","https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&q=60","https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=200&q=60","https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=200&q=60","https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=200&q=60","https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&q=60","https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=60","https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=200&q=60","https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=200&q=60","https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&q=60","https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200&q=60","https://images.unsplash.com/photo-1553621042-f6e147245754?w=200&q=60","https://images.unsplash.com/photo-1595514535215-a96eddc7c4dc?w=200&q=60","https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&q=60"].map((src, i) => (
              <img key={i} src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, var(--color-charcoal) 55%, transparent 100%)" }} />
        <div className="container mx-auto px-4" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: 580 }}>
            <p className="animate__animated animate__fadeInDown" style={{ color: "var(--color-brass)", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 20, fontFamily: "var(--font-body)" }}>◆ Premium Tile Collection</p>
            <h1 className="animate__animated animate__fadeInUp" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 300, color: "var(--color-cream)", lineHeight: 1.05, marginBottom: 24 }}>
              Discover Your<br /><em style={{ fontStyle: "italic", color: "var(--color-terracotta-light)" }}>Perfect</em><br />Aesthetic
            </h1>
            <p style={{ color: "var(--color-stone)", fontSize: "0.9rem", lineHeight: 1.8, letterSpacing: "0.05em", marginBottom: 36, maxWidth: 440, fontFamily: "var(--font-body)" }}>From handcrafted Moroccan zellige to sleek Italian marble — explore our curated collection of the world's most exquisite tiles.</p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href="/all-tiles" style={{ background: "var(--color-terracotta)", color: "var(--color-cream)", padding: "14px 36px", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", borderRadius: 2, textDecoration: "none", fontFamily: "var(--font-body)", fontWeight: 600, display: "inline-block" }}>Browse Now →</Link>
              <a href="#featured" style={{ border: "1px solid rgba(158,151,137,0.4)", color: "var(--color-stone)", padding: "14px 36px", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", borderRadius: 2, textDecoration: "none", fontFamily: "var(--font-body)", display: "inline-block" }}>Featured Tiles</a>
            </div>
            <div style={{ display: "flex", gap: 32, marginTop: 48 }}>
              {[{ value: "500+", label: "Tile Styles" }, { value: "12", label: "Categories" }, { value: "30+", label: "Countries" }].map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--color-cream)", fontWeight: 300, lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontSize: "0.65rem", color: "var(--color-stone)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 4 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ background: "var(--color-terracotta)", padding: "12px 0" }}>
        <Marquee speed={40} gradient={false}>
          {marqueeItems.map((item, idx) => (
            <span key={idx} style={{ color: "var(--color-cream)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-body)", marginRight: 48 }}>◆ {item}</span>
          ))}
        </Marquee>
      </div>

      {/* FEATURED TILES */}
      <section id="featured" style={{ padding: "80px 0", background: "var(--color-cream)" }}>
        <div className="container mx-auto px-4">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ color: "var(--color-terracotta)", fontSize: "0.72rem", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "var(--font-body)", marginBottom: 12 }}>Handpicked For You</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: "var(--color-charcoal)", lineHeight: 1.1, marginBottom: 16 }}>Featured Tiles</h2>
            <div className="section-divider" />
            <p style={{ color: "var(--color-stone)", fontSize: "0.85rem", letterSpacing: "0.05em", maxWidth: 480, margin: "16px auto 0", lineHeight: 1.7 }}>Our editors' selection of the most captivating tiles — each chosen for its extraordinary character.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? Array.from({ length: 4 }).map((_, i) => <TileSkeleton key={i} />) : featuredTiles.map((tile) => <TileCard key={tile.id} tile={tile} />)}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link href="/all-tiles" style={{ border: "1px solid var(--color-terracotta)", color: "var(--color-terracotta)", padding: "12px 40px", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", borderRadius: 2, textDecoration: "none", fontFamily: "var(--font-body)", fontWeight: 600, display: "inline-block" }}>View All Tiles →</Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: "80px 0", background: "var(--color-parchment)" }}>
        <div className="container mx-auto px-4">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "var(--color-charcoal)", fontWeight: 400 }}>Explore by Material</h2>
            <div className="section-divider" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[{ name: "Ceramic", emoji: "🏺", count: "3 styles" }, { name: "Marble", emoji: "⬜", count: "2 styles" }, { name: "Terracotta", emoji: "🟤", count: "2 styles" }, { name: "Mosaic", emoji: "🔶", count: "2 styles" }, { name: "Slate", emoji: "◼", count: "1 style" }, { name: "Zellige", emoji: "✦", count: "1 style" }].map((cat) => (
              <Link key={cat.name} href={`/all-tiles?search=${cat.name.toLowerCase()}`} style={{ background: "var(--color-white)", border: "1px solid rgba(158,151,137,0.2)", borderRadius: 4, padding: "20px 16px", textAlign: "center", textDecoration: "none", display: "block", transition: "all 0.3s ease" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>{cat.emoji}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "var(--color-charcoal)", fontWeight: 500 }}>{cat.name}</div>
                <div style={{ fontSize: "0.68rem", color: "var(--color-stone)", letterSpacing: "0.08em", marginTop: 4 }}>{cat.count}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--color-dark)", padding: "80px 0", textAlign: "center" }}>
        <div className="container mx-auto px-4">
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--color-cream)", fontWeight: 300, marginBottom: 16 }}>
            Ready to Transform <em style={{ fontStyle: "italic", color: "var(--color-terracotta-light)" }}>Your Space?</em>
          </h2>
          <p style={{ color: "var(--color-stone)", fontSize: "0.88rem", letterSpacing: "0.05em", maxWidth: 440, margin: "0 auto 36px" }}>Browse over 500 premium tile styles from artisans around the world.</p>
          <Link href="/all-tiles" style={{ background: "var(--color-terracotta)", color: "var(--color-cream)", padding: "16px 48px", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", borderRadius: 2, textDecoration: "none", fontFamily: "var(--font-body)", fontWeight: 600, display: "inline-block" }}>Explore The Gallery →</Link>
        </div>
      </section>
    </div>
  );
}
