"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { PORTFOLIO_PROJECTS } from "@/lib/utils";

export default function PortfolioPreview() {
  const featured = PORTFOLIO_PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <section style={{ padding: "5rem 0", background: "var(--bg-secondary)" }}>
      <div className="container-custom">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
          <div>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "6px 16px", borderRadius: "999px",
              background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)",
              color: "#F59E0B", fontSize: "12px", fontWeight: 600, marginBottom: "12px",
            }}>
              🏆 Our Work
            </span>
            <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3rem)", color: "var(--text-primary)" }}>
              Featured Projects
            </h2>
          </div>
          <Link href="/portfolio" style={{
            display: "flex", alignItems: "center", gap: "6px",
            fontSize: "0.875rem", fontWeight: 600,
            color: "var(--accent)", textDecoration: "none", marginTop: "0.5rem",
          }}>
            View All Projects <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))", gap: "1.5rem" }}>
          {featured.map((project, index) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.slug}`}
              style={{
                display: "block", textDecoration: "none",
                background: "var(--bg-card)", border: "1px solid var(--border-color)",
                borderRadius: "1.5rem", overflow: "hidden",
                transition: "all 0.35s ease",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${project.color}40`;
                el.style.transform = "translateY(-6px)";
                el.style.boxShadow = `0 20px 60px ${project.color}16`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border-color)";
                el.style.transform = "";
                el.style.boxShadow = "";
              }}
            >
              {/* Cover */}
              <div style={{
                height: "200px", position: "relative", overflow: "hidden",
                background: `linear-gradient(135deg, ${project.color}20, ${project.color}40)`,
              }}>
                {/* Grid overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)",
                  backgroundSize: "30px 30px",
                }} />
                {/* Number */}
                <div style={{
                  position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  flexDirection: "column", gap: "8px",
                }}>
                  <div style={{ fontSize: "5rem", fontFamily: "Space Grotesk,sans-serif", fontWeight: 900, color: project.color, opacity: 0.18, lineHeight: 1 }}>
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 600, color: project.color, opacity: 0.7 }}>{project.category}</div>
                </div>
                {/* External link */}
                <div style={{
                  position: "absolute", top: "12px", right: "12px",
                  width: "32px", height: "32px", borderRadius: "999px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)",
                }}>
                  <ExternalLink size={13} style={{ color: "#fff" }} />
                </div>
                {/* Category badge */}
                <div style={{ position: "absolute", bottom: "12px", left: "12px" }}>
                  <span style={{
                    fontSize: "11px", fontWeight: 600, padding: "4px 12px",
                    borderRadius: "999px", background: `${project.color}25`,
                    color: project.color, border: `1px solid ${project.color}40`,
                  }}>
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "1.5rem" }}>
                <h3 style={{
                  fontFamily: "Space Grotesk,sans-serif", fontWeight: 700,
                  fontSize: "1rem", color: "var(--text-primary)", marginBottom: "0.5rem", lineHeight: 1.35,
                  display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden",
                }}>
                  {project.title}
                </h3>
                <p style={{
                  fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1rem",
                  display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden",
                }}>
                  {project.description}
                </p>

                {/* Results */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px", marginBottom: "1rem" }}>
                  {Object.values(project.results).map((result) => (
                    <div key={result.label} style={{
                      textAlign: "center", padding: "8px 4px",
                      borderRadius: "10px", background: "var(--bg-primary)",
                      border: "1px solid var(--border-color)",
                    }}>
                      <div style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, fontSize: "0.9rem", color: project.color }}>{result.value}</div>
                      <div style={{ fontSize: "10px", color: "var(--text-secondary)", lineHeight: 1.3, marginTop: "2px" }}>{result.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} style={{
                      fontSize: "11px", padding: "3px 10px", borderRadius: "999px",
                      background: "var(--bg-primary)", border: "1px solid var(--border-color)",
                      color: "var(--text-secondary)",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
