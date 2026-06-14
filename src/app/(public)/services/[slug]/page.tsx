import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight, ArrowLeft,
  Monitor, Smartphone, TrendingUp, Target, Share2, FileText,
  Palette, ShoppingCart, Layout, Mail, Cloud, BarChart2,
  CheckCircle2, Zap, Users, Award, ChevronRight,
} from "lucide-react";
import { SERVICES } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Monitor, Smartphone, TrendingUp, Target, Share2, FileText,
  Palette, ShoppingCart, Layout, Mail, Cloud, BarChart2,
};

const processSteps = [
  { title: "Discovery", sub: "Research & Analysis", desc: "We dive deep into your business, audience, and competition to uncover the exact strategy needed." },
  { title: "Strategy", sub: "Planning & Roadmap", desc: "A clear, data-driven plan with milestones, KPIs, and a roadmap built for your specific goals." },
  { title: "Execution", sub: "Build & Launch", desc: "Our expert team executes with precision — on time, on budget, no surprises." },
  { title: "Optimize", sub: "Monitor & Scale", desc: "Continuous measurement and improvement to maximize ROI and accelerate your growth." },
];

const trustStats = [
  { value: "150+", label: "Projects Delivered", icon: Award },
  { value: "98%", label: "Client Retention Rate", icon: Users },
  { value: "4.9★", label: "Average Rating", icon: Zap },
];

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.id }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const service = SERVICES.find((s) => s.id === slug);
  if (!service) return { title: "Service Not Found" };
  return { title: service.title, description: service.description };
}

export default async function ServiceDetailPage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = SERVICES.find((s) => s.id === slug);
  if (!service) notFound();

  const Icon = iconMap[service.icon] || Monitor;
  const relatedServices = SERVICES.filter((s) => s.id !== service.id && s.category === service.category).slice(0, 3);
  const c = service.color;

  return (
    <div style={{ paddingTop: "80px", background: "var(--bg-primary)", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <section style={{ padding: "5rem 0 4rem", position: "relative", overflow: "hidden", background: "var(--bg-primary)" }}>
        {/* Decorative bg icon */}
        <div style={{ position: "absolute", top: "50%", right: "-2%", transform: "translateY(-50%)", opacity: 0.04, pointerEvents: "none", color: c }}>
          <Icon size={480} />
        </div>
        <div style={{ position: "absolute", top: "-10%", right: "10%", width: "500px", height: "500px", borderRadius: "50%", background: `radial-gradient(circle,${c}10 0%,transparent 70%)`, filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--border-color) 1px,transparent 1px),linear-gradient(90deg,var(--border-color) 1px,transparent 1px)", backgroundSize: "55px 55px", opacity: 0.25, pointerEvents: "none" }} />

        <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
          <Link href="/services" className="svc-back-link">
            <ArrowLeft size={15} /> All Services
          </Link>

          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "5rem", alignItems: "center" }} className="service-hero-grid">
            {/* Left */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 14px", borderRadius: "999px", background: `${c}12`, border: `1px solid ${c}30`, color: c, fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: "1.5rem" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: c }} />
                {service.category}
              </div>

              <h1 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 900, fontSize: "clamp(2.4rem,5vw,4rem)", color: "var(--text-primary)", lineHeight: 1.05, marginBottom: "1.25rem", letterSpacing: "-0.03em" }}>
                {service.title}
              </h1>

              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.25rem" }}>
                <div style={{ height: "2px", width: "40px", background: `linear-gradient(90deg,${c},transparent)`, borderRadius: 2, flexShrink: 0 }} />
                <p style={{ fontFamily: "Space Grotesk,sans-serif", fontStyle: "italic", fontSize: "1.05rem", fontWeight: 500, color: c, margin: 0 }}>
                  &ldquo;{service.tagline}&rdquo;
                </p>
              </div>

              <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: "500px" }}>
                {service.description}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "12px" }}>
                <Link href="/contact" className="svc-cta-primary" style={{ "--svc-color": c } as React.CSSProperties}>
                  Get Started <ArrowRight size={16} />
                </Link>
                <Link href="/contact?type=audit" className="svc-cta-secondary">
                  Free Audit
                </Link>
              </div>
            </div>

            {/* Right — numbered feature list */}
            <div style={{ background: "var(--bg-card)", border: `1px solid ${c}25`, borderRadius: "1.5rem", padding: "2rem", boxShadow: `0 20px 60px ${c}08, var(--shadow)` }}>
              <div style={{ marginBottom: "1.25rem" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>What&apos;s Included</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 0 }}>
                {service.features.map((feature, i) => (
                  <div key={feature} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "14px 0", borderBottom: i < service.features.length - 1 ? "1px solid var(--border-color)" : "none" }}>
                    <span style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 900, fontSize: "1.4rem", color: c, opacity: 0.35, lineHeight: 1, minWidth: "2rem", textAlign: "right" as const }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px" }}>
                      <CheckCircle2 size={14} style={{ color: c, flexShrink: 0 }} />
                      <span style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 600, fontSize: "13.5px", color: "var(--text-primary)" }}>{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section style={{ padding: "2.5rem 0", background: "var(--bg-secondary)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", textAlign: "center" }}>
            {trustStats.map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: "6px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <s.icon size={16} style={{ color: c }} />
                  <span style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 800, fontSize: "1.5rem", color: c }}>{s.value}</span>
                </div>
                <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 500 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ padding: "5rem 0", background: "var(--bg-primary)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 14px", borderRadius: "999px", background: `${c}10`, border: `1px solid ${c}25`, color: c, fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: "1rem" }}>
              Our Process
            </span>
            <h2 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--text-primary)" }}>
              How We Deliver{" "}
              <span style={{ background: `linear-gradient(135deg,${c},#8B5CF6)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Results
              </span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5rem", position: "relative" }} className="process-grid">
            <div className="process-connector" style={{ position: "absolute", top: "28px", left: "12.5%", right: "12.5%", height: "2px", background: `linear-gradient(90deg,${c}50,#8B5CF650)`, zIndex: 0 }} />
            {processSteps.map((step, i) => (
              <div key={step.title} style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg,${c}20,${c}05)`, border: `2px solid ${c}50`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem", boxShadow: `0 0 0 6px var(--bg-primary)` }}>
                  <span style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 900, fontSize: "1rem", color: c }}>{i + 1}</span>
                </div>
                <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "1rem", padding: "1.25rem 1rem", boxShadow: "var(--shadow)" }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, color: c, textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: "4px" }}>{step.sub}</div>
                  <h3 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 800, fontSize: "1rem", color: "var(--text-primary)", marginBottom: "8px" }}>{step.title}</h3>
                  <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.65 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ── */}
      {relatedServices.length > 0 && (
        <section style={{ padding: "5rem 0", background: "var(--bg-secondary)" }}>
          <div className="container-custom">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap" as const, gap: "1rem" }}>
              <h2 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "var(--text-primary)" }}>Related Services</h2>
              <Link href="/services" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "13px", fontWeight: 600, color: "var(--accent)", textDecoration: "none" }}>
                View All <ChevronRight size={14} />
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }} className="related-grid">
              {relatedServices.map((s) => {
                const RelIcon = iconMap[s.icon] || Monitor;
                return (
                  <Link key={s.id} href={`/services/${s.id}`} className="svc-related-card" style={{ "--rel-color": s.color } as React.CSSProperties}>
                    <div style={{ width: 44, height: 44, borderRadius: "12px", background: `${s.color}12`, border: `1.5px solid ${s.color}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                      <RelIcon size={20} style={{ color: s.color }} />
                    </div>
                    <h3 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)", marginBottom: "6px" }}>{s.title}</h3>
                    <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>{s.tagline}</p>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: s.color, display: "flex", alignItems: "center", gap: "4px" }}>
                      Learn more <ArrowRight size={12} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section style={{ padding: "5rem 0", background: "var(--bg-primary)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center,${c}06 0%,transparent 70%)`, pointerEvents: "none" }} />
        <div className="container-custom" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: "20px", background: `${c}14`, border: `2px solid ${c}25`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
            <Icon size={28} style={{ color: c }} />
          </div>
          <h2 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,3rem)", color: "var(--text-primary)", marginBottom: "1rem" }}>
            Ready to Start Your{" "}
            <span style={{ background: `linear-gradient(135deg,${c},#8B5CF6)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {service.title}
            </span>{" "}
            Journey?
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text-secondary)", maxWidth: "500px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Get a free audit and discover exactly what&apos;s holding your business back — and how we fix it.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" as const }}>
            <Link href="/contact" className="svc-cta-primary" style={{ "--svc-color": c } as React.CSSProperties}>
              Get Free Audit <ArrowRight size={18} />
            </Link>
            <Link href="/pricing" className="svc-cta-secondary">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .svc-back-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 500; color: var(--text-secondary);
          text-decoration: none; margin-bottom: 2.5rem; transition: color 0.2s;
        }
        .svc-back-link:hover { color: ${c}; }

        .svc-cta-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 24px; border-radius: 12px;
          background: linear-gradient(135deg, ${c}, ${c}BB);
          color: white; font-weight: 700; font-family: 'Space Grotesk',sans-serif;
          font-size: 14px; text-decoration: none;
          box-shadow: 0 8px 24px ${c}30; transition: all 0.25s ease;
        }
        .svc-cta-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 32px ${c}40; }

        .svc-cta-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 24px; border-radius: 12px;
          background: var(--bg-card); border: 1px solid var(--border-color);
          color: var(--text-primary); font-weight: 600; font-family: 'Space Grotesk',sans-serif;
          font-size: 14px; text-decoration: none; transition: all 0.25s ease;
        }
        .svc-cta-secondary:hover { border-color: ${c}; color: ${c}; transform: translateY(-2px); }

        .svc-related-card {
          display: block; text-decoration: none;
          background: var(--bg-card); border: 1px solid var(--border-color);
          border-radius: 1.25rem; padding: 1.5rem;
          box-shadow: var(--shadow); transition: all 0.3s ease;
        }
        .svc-related-card:hover {
          border-color: ${c}40;
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.1);
        }

        @media (max-width: 900px) {
          .service-hero-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .process-grid { grid-template-columns: 1fr 1fr !important; }
          .process-connector { display: none !important; }
          .related-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 580px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
