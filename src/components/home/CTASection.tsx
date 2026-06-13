"use client";

import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { useState } from "react";
import BookingModal from "@/components/shared/BookingModal";

export default function CTASection() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <section style={{ padding: "5rem 0", background: "var(--bg-secondary)", position: "relative", overflow: "hidden" }}>
        {/* Background orbs */}
        <div style={{
          position: "absolute", top: 0, left: "25%",
          width: "400px", height: "400px", borderRadius: "999px",
          background: "radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)",
          filter: "blur(60px)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: 0, right: "25%",
          width: "400px", height: "400px", borderRadius: "999px",
          background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)",
          filter: "blur(60px)", pointerEvents: "none",
        }} />
        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(var(--border-color) 1px,transparent 1px),linear-gradient(90deg,var(--border-color) 1px,transparent 1px)",
          backgroundSize: "55px 55px", opacity: 0.25,
        }} />

        <div className="container-custom" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "8px 18px", borderRadius: "999px",
            background: "var(--bg-card)", border: "1px solid rgba(0,212,255,0.2)",
            fontSize: "12px", color: "var(--text-secondary)", marginBottom: "2rem",
          }}>
            <span style={{
              width: "8px", height: "8px", borderRadius: "999px", background: "#00D4FF",
              animation: "glowPulse 2s ease-in-out infinite",
            }} />
            Limited spots available this month
          </div>

          <h2 style={{
            fontFamily: "Space Grotesk, sans-serif", fontWeight: 800,
            fontSize: "clamp(2rem,5vw,4rem)", color: "var(--text-primary)",
            marginBottom: "1.5rem", maxWidth: "700px", margin: "0 auto 1.5rem", lineHeight: 1.15,
          }}>
            Ready to Start Your{" "}
            <span style={{ background: "linear-gradient(135deg,#00D4FF,#8B5CF6,#F59E0B)", backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Digital Quest?
            </span>
          </h2>

          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
            Join 50+ businesses that chose Corexoquest to transform their digital presence. Get a{" "}
            <strong style={{ color: "var(--text-primary)" }}>free digital audit</strong> — no strings attached.
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "3rem" }}>
            <Link
              href="/contact"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "1rem 2.5rem", borderRadius: "1rem",
                background: "linear-gradient(135deg,#00D4FF,#8B5CF6)",
                color: "white", fontWeight: 700, fontSize: "1rem",
                fontFamily: "Space Grotesk,sans-serif", textDecoration: "none",
                boxShadow: "0 8px 30px rgba(0,212,255,0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 14px 45px rgba(0,212,255,0.4)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(0,212,255,0.3)"; }}
            >
              Get Free Audit <ArrowRight size={18} />
            </Link>
            <button
              onClick={() => setIsBookingOpen(true)}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "1rem 2.5rem", borderRadius: "1rem",
                background: "var(--bg-card)", color: "var(--text-primary)",
                border: "1px solid var(--border-color)",
                fontWeight: 700, fontSize: "1rem",
                fontFamily: "Space Grotesk,sans-serif", cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.4)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)"; (e.currentTarget as HTMLElement).style.transform = ""; }}
            >
              <Calendar size={16} style={{ color: "#8B5CF6" }} />
              Book Strategy Call
            </button>
          </div>

          {/* Trust signals */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}>
            {["✓ Free 30-min consultation", "✓ No long-term contracts", "✓ Results in 30 days", "✓ 100% satisfaction guarantee"].map((item) => (
              <span key={item} style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{item}</span>
            ))}
          </div>
        </div>
      </section>
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
