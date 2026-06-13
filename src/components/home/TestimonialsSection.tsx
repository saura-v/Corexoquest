"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/utils";

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActive((p) => (p + 1) % TESTIMONIALS.length);

  const visible = [
    TESTIMONIALS[(active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length],
    TESTIMONIALS[active],
    TESTIMONIALS[(active + 1) % TESTIMONIALS.length],
  ];

  return (
    <section style={{ padding: "5rem 0", background: "var(--bg-secondary)", position: "relative", overflow: "hidden" }}>
      {/* Bg glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: "800px", height: "400px", pointerEvents: "none",
        background: "radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)",
        filter: "blur(40px)",
      }} />

      <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "6px 16px", borderRadius: "999px",
            background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)",
            color: "#10B981", fontSize: "12px", fontWeight: 600, marginBottom: "16px",
          }}>
            💬 Client Love
          </span>
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3rem)", color: "var(--text-primary)", marginBottom: "1rem" }}>
            What Our Clients{" "}
            <span style={{ background: "linear-gradient(135deg,#00D4FF,#8B5CF6,#F59E0B)", backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Say About Us
            </span>
          </h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            Real results, real stories. Here&apos;s what our clients have to say about working with Corexoquest.
          </p>
        </div>

        {/* Desktop 3-card carousel */}
        <div style={{ display: "none" }} className="md:flex" id="testimonial-desktop">
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", width: "100%", marginBottom: "2rem" }}>
            {visible.map((t, i) => (
              <div
                key={t.id}
                style={{
                  flex: 1,
                  background: "var(--bg-card)",
                  border: `1px solid ${i === 1 ? "rgba(0,212,255,0.25)" : "var(--border-color)"}`,
                  borderRadius: "1.5rem",
                  padding: "1.75rem",
                  transition: "all 0.5s ease",
                  transform: i === 1 ? "scale(1.04)" : "scale(0.96)",
                  opacity: i === 1 ? 1 : 0.55,
                  boxShadow: i === 1 ? "0 16px 60px rgba(0,212,255,0.08)" : "none",
                }}
              >
                <Quote size={24} style={{ color: "#00D4FF", opacity: 0.5, marginBottom: "1rem" }} />
                <p style={{
                  fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1.5rem",
                  display: "-webkit-box", WebkitLineClamp: 5, WebkitBoxOrient: "vertical" as const, overflow: "hidden",
                }}>
                  &ldquo;{t.content}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "999px", flexShrink: 0,
                    background: "linear-gradient(135deg,#00D4FF,#8B5CF6)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", fontWeight: 700, fontSize: "0.875rem",
                  }}>
                    {t.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)" }}>{t.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{t.role} at {t.company}</div>
                  </div>
                  <div style={{ display: "flex", gap: "2px" }}>
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={12} style={{ color: "#F59E0B", fill: "#F59E0B" }} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile single card */}
        <div className="md:hidden" style={{ marginBottom: "2rem" }}>
          <div style={{
            background: "var(--bg-card)", border: "1px solid rgba(0,212,255,0.2)",
            borderRadius: "1.5rem", padding: "1.75rem",
          }}>
            <Quote size={24} style={{ color: "#00D4FF", opacity: 0.5, marginBottom: "1rem" }} />
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              &ldquo;{TESTIMONIALS[active].content}&rdquo;
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: 40, height: 40, borderRadius: "999px",
                background: "linear-gradient(135deg,#00D4FF,#8B5CF6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontWeight: 700, fontSize: "0.875rem",
              }}>
                {TESTIMONIALS[active].name.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)" }}>{TESTIMONIALS[active].name}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{TESTIMONIALS[active].role} at {TESTIMONIALS[active].company}</div>
              </div>
              <div style={{ display: "flex", gap: "2px" }}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={12} style={{ color: "#F59E0B", fill: "#F59E0B" }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
          <button
            onClick={prev}
            style={{
              width: 40, height: 40, borderRadius: "999px", border: "1px solid var(--border-color)",
              background: "var(--bg-card)", color: "var(--text-secondary)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.2s ease",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
          >
            <ChevronLeft size={18} />
          </button>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  height: "8px", borderRadius: "999px", border: "none",
                  cursor: "pointer", transition: "all 0.3s ease",
                  width: i === active ? "24px" : "8px",
                  background: i === active ? "#00D4FF" : "var(--border-color)",
                }}
              />
            ))}
          </div>
          <button
            onClick={next}
            style={{
              width: 40, height: 40, borderRadius: "999px", border: "1px solid var(--border-color)",
              background: "var(--bg-card)", color: "var(--text-secondary)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.2s ease",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Show desktop carousel via CSS */}
      <style>{`
        @media (min-width: 768px) {
          #testimonial-desktop { display: block !important; }
        }
      `}</style>
    </section>
  );
}
