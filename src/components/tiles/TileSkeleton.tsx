export default function TileSkeleton() {
  return (
    <div
      style={{
        background: "var(--color-white)",
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid rgba(158,151,137,0.2)",
      }}
    >
      <div className="skeleton-shine" style={{ paddingBottom: "75%", width: "100%" }} />
      <div style={{ padding: "18px 20px 20px" }}>
        <div className="skeleton-shine" style={{ height: 24, width: "70%", borderRadius: 2, marginBottom: 8 }} />
        <div className="skeleton-shine" style={{ height: 14, width: "50%", borderRadius: 2, marginBottom: 12 }} />
        <div className="skeleton-shine" style={{ height: 14, width: "100%", borderRadius: 2, marginBottom: 6 }} />
        <div className="skeleton-shine" style={{ height: 14, width: "80%", borderRadius: 2, marginBottom: 18 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="skeleton-shine" style={{ height: 28, width: 70, borderRadius: 2 }} />
          <div className="skeleton-shine" style={{ height: 34, width: 100, borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );
}
