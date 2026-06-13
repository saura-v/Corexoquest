"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Users, FolderOpen, Globe, Star } from "lucide-react";

const stats = [
  { icon: FolderOpen, value: 150, suffix: "+", label: "Projects Delivered", desc: "Across industries worldwide", color: "#00D4FF" },
  { icon: Users, value: 50, suffix: "+", label: "Happy Clients", desc: "Businesses that trust us", color: "#8B5CF6" },
  { icon: Globe, value: 20, suffix: "+", label: "Countries Served", desc: "Global reach from Nepal", color: "#F59E0B" },
  { icon: Star, value: 5, suffix: "★", label: "Average Rating", desc: "Across all platforms", color: "#10B981" },
];

export default function StatsSection() {
  return (
    <section style={{ padding: "5rem 0", background: "var(--bg-secondary)", position: "relative", overflow: "hidden" }}>
      {/* Grid pattern */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(0,212,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.035) 1px, transparent 1px)",
        backgroundSize: "55px 55px",
      }} />

      <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "6px 16px", borderRadius: "999px",
            background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)",
            color: "var(--accent2)", fontSize: "12px", fontWeight: 600, marginBottom: "16px",
          }}>
            📊 Our Numbers
          </span>
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3rem)", color: "var(--text-primary)" }}>
            Numbers That{" "}
            <span style={{ background: "linear-gradient(135deg,#00D4FF,#8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Tell Our Story
            </span>
          </h2>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.25rem", marginBottom: "3.5rem" }}>
          {stats.map((stat) => (
            <div key={stat.label}
              style={{
                background: "var(--bg-card)", border: "1px solid var(--border-color)",
                borderRadius: "1.5rem", padding: "1.75rem", textAlign: "center",
                transition: "all 0.35s ease", position: "relative", overflow: "hidden",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${stat.color}40`;
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow = `0 12px 40px ${stat.color}16`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border-color)";
                el.style.transform = "";
                el.style.boxShadow = "";
              }}
            >
              {/* Icon */}
              <div style={{
                width: 48, height: 48, borderRadius: "14px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: `${stat.color}14`, border: `1px solid ${stat.color}28`,
                margin: "0 auto 1rem",
              }}>
                <stat.icon size={22} style={{ color: stat.color }} />
              </div>

              {/* Number */}
              <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: "3rem", lineHeight: 1, color: stat.color, marginBottom: "0.5rem" }}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>

              <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                {stat.label}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                {stat.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Countries row */}
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
            Trusted by businesses in
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
            {["🇳🇵 Nepal", "🇺🇸 USA", "🇬🇧 UK", "🇦🇺 Australia", "🇨🇦 Canada", "🇩🇪 Germany", "🇮🇳 India", "🇸🇬 Singapore"].map((c) => (
              <span key={c} style={{
                fontSize: "0.8rem", fontWeight: 500, padding: "5px 14px",
                borderRadius: "999px", border: "1px solid var(--border-color)",
                color: "var(--text-secondary)", background: "var(--bg-primary)",
              }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
