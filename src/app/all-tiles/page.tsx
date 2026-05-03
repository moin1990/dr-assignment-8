"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TileCard from "@/components/tiles/TileCard";
import TileSkeleton from "@/components/tiles/TileSkeleton";
import { Tile } from "@/types";

function AllTilesContent() {
  const searchParams = useSearchParams();
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [inputValue, setInputValue] = useState(searchParams.get("search") || "");

  const fetchTiles = useCallback((query: string) => {
    setLoading(true);
    const url = query ? `/api/tiles?search=${encodeURIComponent(query)}` : "/api/tiles";
    fetch(url)
      .then((r) => r.json())
      .then((data) => { setTiles(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchTiles(searchQuery);
  }, [searchQuery, fetchTiles]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputValue);
  };

  return (
    <div className="page-enter">
      {/* Hero Banner */}
      <div
        style={{
          background: "var(--color-charcoal)",
          padding: "60px 0 48px",
          borderBottom: "1px solid rgba(181,160,80,0.2)",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <p style={{ color: "var(--color-brass)", fontSize: "0.72rem", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "var(--font-body)", marginBottom: 12 }}>
            ◆ The Complete Collection
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              color: "var(--color-cream)",
              fontWeight: 300,
              marginBottom: 32,
            }}
          >
            All Tiles
          </h1>

          {/* Search Bar */}
          <form onSubmit={handleSearch} style={{ maxWidth: 560, margin: "0 auto", display: "flex", gap: 0 }}>
            <input
              type="text"
              placeholder="Search tiles by name, material, style..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{
                flex: 1,
                padding: "14px 20px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(181,160,80,0.3)",
                borderRight: "none",
                color: "var(--color-cream)",
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                letterSpacing: "0.05em",
                outline: "none",
                borderRadius: "2px 0 0 2px",
              }}
            />
            <button
              type="submit"
              style={{
                background: "var(--color-terracotta)",
                color: "var(--color-cream)",
                border: "none",
                padding: "14px 28px",
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                borderRadius: "0 2px 2px 0",
                transition: "background 0.2s",
              }}
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Results */}
      <section style={{ padding: "48px 0 80px", background: "var(--color-cream)" }}>
        <div className="container mx-auto px-4">
          {/* Results count */}
          <div style={{ marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              {searchQuery && (
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--color-stone)", letterSpacing: "0.05em" }}>
                  {loading ? "Searching..." : `${tiles.length} result${tiles.length !== 1 ? "s" : ""} for `}
                  {!loading && <em style={{ color: "var(--color-terracotta)", fontStyle: "normal" }}>"{searchQuery}"</em>}
                </p>
              )}
              {!searchQuery && !loading && (
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--color-stone)", letterSpacing: "0.05em" }}>
                  Showing all <span style={{ color: "var(--color-terracotta)" }}>{tiles.length}</span> tiles
                </p>
              )}
            </div>
            {searchQuery && (
              <button
                onClick={() => { setInputValue(""); setSearchQuery(""); }}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(158,151,137,0.4)",
                  color: "var(--color-stone)",
                  padding: "6px 16px",
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  borderRadius: 2,
                  fontFamily: "var(--font-body)",
                }}
              >
                Clear ✕
              </button>
            )}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => <TileSkeleton key={i} />)}
            </div>
          ) : tiles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tiles.map((tile) => <TileCard key={tile.id} tile={tile} />)}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>🔍</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--color-charcoal)", marginBottom: 12 }}>No tiles found</h3>
              <p style={{ color: "var(--color-stone)", fontSize: "0.85rem", marginBottom: 24 }}>
                Try searching with different keywords like "marble", "blue", or "mosaic"
              </p>
              <button
                onClick={() => { setInputValue(""); setSearchQuery(""); }}
                style={{ background: "var(--color-terracotta)", color: "var(--color-cream)", border: "none", padding: "10px 28px", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2, fontFamily: "var(--font-body)" }}
              >
                Show All Tiles
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function AllTilesPage() {
  return (
    <Suspense fallback={
      <div style={{ padding: "80px 0", textAlign: "center" }}>
        <div className="loading loading-spinner" style={{ color: "var(--color-terracotta)", width: 40, height: 40 }} />
      </div>
    }>
      <AllTilesContent />
    </Suspense>
  );
}
