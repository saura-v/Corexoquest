"use client";

import Link from "next/link";
import { ArrowRight, Monitor, Smartphone, TrendingUp, Target, Share2, FileText, Palette, ShoppingCart, Layout, Mail, Cloud, BarChart2 } from "lucide-react";
import { SERVICES } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Monitor, Smartphone, TrendingUp, Target, Share2, FileText,
  Palette, ShoppingCart, Layout, Mail, Cloud, BarChart2,
};

export default function ServicesSection() {
  return (
    <section id="services" style={{ padding: "5rem 0", background: "var(--bg-primary)" }}>
      <div className="container-custom">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "6px 16px", borderRadius: "999px",
            background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.18)",
            color: "var(--accent)", fontSize: "12px", fontWeight: 600,
            marginBottom: "16px",
          }}>
            ⚡ What We Do
          </span>
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3rem)", color: "var(--text-primary)", marginBottom: "1rem" }}>
            Everything You Need to{" "}
            <span style={{ background: "linear-gradient(135deg,#00D4FF,#8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Dominate Online
            </span>
          </h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto", fontSize: "1.05rem", lineHeight: 1.7 }}>
            From brand identity to full-stack development to paid advertising — your one-stop digital powerhouse.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "1.25rem" }}>
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon] || Monitor;
            return (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                style={{
                  display: "block",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "1.5rem",
                  padding: "1.75rem",
                  textDecoration: "none",
                  transition: "all 0.35s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `${service.color}50`;
                  el.style.transform = "translateY(-5px)";
                  el.style.boxShadow = `0 16px 50px ${service.color}18`;
                  const hover = el.querySelector(".card-hover-bg") as HTMLElement;
                  if (hover) hover.style.opacity = "1";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border-color)";
                  el.style.transform = "";
                  el.style.boxShadow = "";
                  const hover = el.querySelector(".card-hover-bg") as HTMLElement;
                  if (hover) hover.style.opacity = "0";
                }}
              >
                {/* Hover bg glow */}
                <div className="card-hover-bg" style={{
                  position: "absolute", inset: 0, borderRadius: "1.5rem",
                  background: `linear-gradient(135deg, ${service.color}07, transparent)`,
                  opacity: 0, transition: "opacity 0.35s ease", pointerEvents: "none",
                }} />

                {/* Icon */}
                <div style={{
                  width: 48, height: 48, borderRadius: "14px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: `${service.color}16`, border: `1px solid ${service.color}28`,
                  marginBottom: "1rem",
                }}>
                  <Icon size={22} style={{ color: service.color }} />
                </div>

                {/* Category */}
                <span style={{
                  display: "inline-block", fontSize: "11px", fontWeight: 600,
                  padding: "3px 10px", borderRadius: "999px", marginBottom: "10px",
                  color: service.color, background: `${service.color}14`,
                }}>
                  {service.category}
                </span>

                <h3 style={{
                  fontFamily: "Space Grotesk, sans-serif", fontWeight: 700,
                  fontSize: "1rem", color: "var(--text-primary)",
                  marginBottom: "0.6rem", lineHeight: 1.35,
                }}>
                  {service.title}
                </h3>

                <p style={{
                  fontSize: "0.85rem", color: "var(--text-secondary)",
                  lineHeight: 1.65, marginBottom: "1.25rem",
                  display: "-webkit-box", WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical" as const, overflow: "hidden",
                }}>
                  {service.description}
                </p>

                <div style={{
                  display: "flex", alignItems: "center", gap: "5px",
                  fontSize: "12px", fontWeight: 700,
                  color: service.color, letterSpacing: "0.01em",
                }}>
                  Learn More
                  <ArrowRight size={13} />
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href="/services" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "0.9rem 2.2rem", borderRadius: "14px",
            background: "linear-gradient(135deg, #00D4FF, #8B5CF6)",
            color: "white", fontWeight: 700, fontSize: "0.95rem",
            fontFamily: "Space Grotesk, sans-serif", textDecoration: "none",
            boxShadow: "0 8px 28px rgba(0,212,255,0.25)",
            transition: "all 0.3s ease",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 14px 40px rgba(0,212,255,0.4)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(0,212,255,0.25)"; }}
          >
            Explore All Services <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
