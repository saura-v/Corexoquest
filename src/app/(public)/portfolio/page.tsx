import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { PORTFOLIO_PROJECTS } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore Corexoquest's portfolio of delivered projects — web apps, e-commerce stores, mobile apps, SaaS platforms, and more.",
};

export default function PortfolioPage() {
  return (
    <div style={{ paddingTop: "80px", background: "var(--bg-primary)", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <section style={{ padding: "5rem 0", position: "relative", overflow: "hidden", background: "var(--bg-primary)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--border-color) 1px,transparent 1px),linear-gradient(90deg,var(--border-color) 1px,transparent 1px)", backgroundSize: "55px 55px", opacity: 0.35, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "4rem", right: "15%", width: "450px", height: "450px", borderRadius: "999px", background: "radial-gradient(circle,rgba(139,92,246,0.06) 0%,transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div className="container-custom" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 18px", borderRadius: "999px", background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "var(--accent)", fontSize: "12px", fontWeight: 600, marginBottom: "1.5rem" }}>
            🏆 Our Work
          </span>
          <h1 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 800, fontSize: "clamp(2.4rem,6vw,4.5rem)", color: "var(--text-primary)", marginBottom: "1.25rem", lineHeight: 1.1 }}>
            Projects That{" "}
            <span style={{ background: "linear-gradient(135deg,#00D4FF 0%,#8B5CF6 50%,#F59E0B 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Speak for Themselves</span>
          </h1>
          <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", maxWidth: "620px", margin: "0 auto", lineHeight: 1.7 }}>
            Real projects. Real results. From Kathmandu restaurants to global SaaS platforms — here&apos;s what we build.
          </p>
        </div>
      </section>

      {/* ── Projects Grid ── */}
      <section style={{ padding: "0 0 5rem", background: "var(--bg-primary)" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: "1.5rem" }}>
            {PORTFOLIO_PROJECTS.map((project, index) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                style={{ display: "block", textDecoration: "none", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "1.5rem", overflow: "hidden", boxShadow: "var(--shadow)", transition: "all 0.35s", position: "relative" }}
                className="portfolio-card"
              >
                {/* Featured badge */}
                {project.featured && (
                  <div style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 20, background: "#F59E0B", color: "#04050D", fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "999px" }}>
                    Featured
                  </div>
                )}

                {/* Cover */}
                <div style={{ position: "relative", height: "210px", overflow: "hidden", background: `linear-gradient(135deg,${project.color}25,${project.color}55)` }}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,0,0,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.05) 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", color: project.color }}>
                    <div>
                      <div style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 900, fontSize: "3.5rem", opacity: 0.18, lineHeight: 1 }}>
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div style={{ fontSize: "0.8rem", fontWeight: 600, opacity: 0.5, marginTop: "4px" }}>{project.category}</div>
                    </div>
                  </div>
                  {/* Bottom fade */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: `linear-gradient(to top, var(--bg-card), transparent)` }} />
                  <div style={{ position: "absolute", top: "12px", left: "12px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 600, padding: "4px 12px", borderRadius: "999px", background: `${project.color}28`, color: project.color, border: `1px solid ${project.color}45` }}>{project.category}</span>
                  </div>
                  <div style={{ position: "absolute", top: "12px", right: project.featured ? "6rem" : "12px", opacity: 0.7 }}>
                    <ExternalLink size={14} style={{ color: project.color }} />
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "1.5rem" }}>
                  <h3 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, fontSize: "0.98rem", color: "var(--text-primary)", marginBottom: "0.5rem", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: "1.25rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
                    {project.description}
                  </p>

                  {/* Results */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.5rem", marginBottom: "1rem" }}>
                    {Object.values(project.results).map((r) => (
                      <div key={r.label} style={{ textAlign: "center", padding: "0.5rem", borderRadius: "10px", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}>
                        <div style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, fontSize: "0.82rem", color: project.color }}>{r.value}</div>
                        <div style={{ fontSize: "10px", color: "var(--text-secondary)", marginTop: "2px", lineHeight: 1.3 }}>{r.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag} style={{ fontSize: "10px", padding: "3px 8px", borderRadius: "999px", background: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "5rem 0", background: "var(--bg-secondary)", textAlign: "center" }}>
        <div className="container-custom">
          <h2 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3rem)", color: "var(--text-primary)", marginBottom: "1rem" }}>
            Want to See Your Project Here?
          </h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: "520px", margin: "0 auto 2rem", lineHeight: 1.7, fontSize: "1.05rem" }}>
            Let&apos;s build something extraordinary together. Your success story starts with a free consultation.
          </p>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "1rem 2.5rem", borderRadius: "14px", background: "linear-gradient(135deg,#00D4FF,#8B5CF6)", color: "white", fontWeight: 700, fontFamily: "Space Grotesk,sans-serif", textDecoration: "none", boxShadow: "0 8px 28px rgba(0,212,255,0.25)", transition: "all 0.3s" }}>
            Start Your Project <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <style>{`
        .portfolio-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.12) !important; border-color: rgba(0,212,255,0.25) !important; }
      `}</style>
    </div>
  );
}
