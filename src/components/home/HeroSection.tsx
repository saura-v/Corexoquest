"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Play, Star, TrendingUp, Zap, CheckCircle2, Globe, Users, Code2, Smartphone, Search } from "lucide-react";
import BookingModal from "@/components/shared/BookingModal";

const rotatingWords = [
  "Websites",
  "Mobile Apps",
  "SEO Campaigns",
  "Brand Identities",
  "E-Commerce",
  "SaaS Products",
];

const recentWins = [
  { client: "NepaBite Restaurant", result: "10× more orders in 90 days", color: "#00D4FF" },
  { client: "StyleHaus Fashion", result: "$2M revenue generated online", color: "#8B5CF6" },
  { client: "NexBoard SaaS", result: "50,000 users in 6 months", color: "#F59E0B" },
];

const techIcons = [
  { icon: Code2, label: "Next.js", color: "#E2E8F0" },
  { icon: Smartphone, label: "React Native", color: "#61DAFB" },
  { icon: Search, label: "SEO Pro", color: "#10B981" },
  { icon: Globe, label: "Global CDN", color: "#8B5CF6" },
  { icon: Zap, label: "Fast & Secure", color: "#F59E0B" },
];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [winIndex, setWinIndex] = useState(0);
  const [winFade, setWinFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => { setWordIndex((p) => (p + 1) % rotatingWords.length); setFade(true); }, 320);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWinFade(false);
      setTimeout(() => { setWinIndex((p) => (p + 1) % recentWins.length); setWinFade(true); }, 300);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const win = recentWins[winIndex];

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#020409" }}>

        {/* ── Aurora blobs ── */}
        <div className="aurora-blob aurora-1" />
        <div className="aurora-blob aurora-2" />
        <div className="aurora-blob aurora-3" />

        {/* ── Noise texture overlay ── */}
        <div className="noise-overlay" />

        {/* ── Grid ── */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(0,212,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.025) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

        {/* ── Main grid layout ── */}
        <div className="container-custom relative z-10 hero-grid" style={{ paddingTop: "7rem", paddingBottom: "4rem" }}>

          {/* ──── LEFT COLUMN ──── */}
          <div className="hero-left">

            {/* Badge */}
            <div className="hero-badge">
              <span className="badge-dot" />
              <span>Nepal&apos;s #1 Digital Growth Agency</span>
              <span style={{ color: "#475569", fontSize: "10px" }}>• Est. 2019</span>
            </div>

            {/* Headline */}
            <h1 className="hero-headline">
              <span style={{ color: "#E2E8F0", display: "block", marginBottom: "0.1em" }}>We Build</span>
              <span className="hero-rotating-word" style={{
                opacity: fade ? 1 : 0,
                transform: fade ? "translateY(0) skewY(0deg)" : "translateY(12px) skewY(1deg)",
              }}>
                {rotatingWords[wordIndex]}
              </span>
              <span style={{ color: "#94A3B8", display: "block", fontSize: "0.6em", fontWeight: 400, marginTop: "0.2em", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                That Drive Real Results
              </span>
            </h1>

            {/* Description */}
            <p style={{ fontSize: "1.05rem", color: "#64748B", lineHeight: 1.75, maxWidth: "480px", marginBottom: "2.5rem" }}>
              From Kathmandu to the world — we help businesses dominate their market with{" "}
              <span style={{ color: "#94A3B8", fontWeight: 600 }}>world-class digital solutions</span>{" "}
              at startup-friendly prices.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "3rem" }}>
              <Link href="/contact" className="hero-cta-primary">
                Start Your Quest
                <ArrowRight size={17} />
              </Link>
              <button onClick={() => setIsBookingOpen(true)} className="hero-cta-secondary">
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Play size={11} fill="#00D4FF" style={{ color: "#00D4FF", marginLeft: 1 }} />
                </div>
                Book Free Call
              </button>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              {[
                { value: "150+", label: "Projects", color: "#00D4FF" },
                { value: "50+", label: "Clients", color: "#8B5CF6" },
                { value: "20+", label: "Countries", color: "#F59E0B" },
                { value: "4.9★", label: "Rating", color: "#10B981" },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 800, fontSize: "1.4rem", color: s.color, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: "0.72rem", color: "#475569", marginTop: "3px", letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ──── RIGHT COLUMN ──── */}
          <div className="hero-right">

            {/* Card 1: Live result ticker */}
            <div className="hero-card" style={{ marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px #10B981", display: "inline-block" }} />
                <span style={{ fontSize: "10px", fontWeight: 700, color: "#10B981", textTransform: "uppercase", letterSpacing: "0.1em" }}>Live Results</span>
              </div>
              <div style={{ transition: "all 0.3s ease", opacity: winFade ? 1 : 0, transform: winFade ? "translateY(0)" : "translateY(6px)" }}>
                <div style={{ fontSize: "0.78rem", color: "#475569", marginBottom: "4px" }}>{win.client}</div>
                <div style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, fontSize: "1rem", color: win.color }}>
                  ✦ {win.result}
                </div>
              </div>
              <div style={{ display: "flex", gap: "6px", marginTop: "10px" }}>
                {recentWins.map((_, i) => (
                  <div key={i} style={{ height: 3, borderRadius: 2, flex: 1, background: i === winIndex ? win.color : "rgba(255,255,255,0.08)", transition: "all 0.3s" }} />
                ))}
              </div>
            </div>

            {/* Card 2: Metrics 2-up */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              {[
                { icon: TrendingUp, label: "Avg. ROAS", value: "4.9×", color: "#00D4FF", sub: "across all campaigns" },
                { icon: Users, label: "Client Retention", value: "98%", color: "#8B5CF6", sub: "clients come back" },
              ].map((m) => (
                <div key={m.label} className="hero-card">
                  <div style={{ width: 32, height: 32, borderRadius: "10px", background: `${m.color}14`, border: `1px solid ${m.color}22`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" }}>
                    <m.icon size={15} style={{ color: m.color }} />
                  </div>
                  <div style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 800, fontSize: "1.5rem", color: m.color, lineHeight: 1 }}>{m.value}</div>
                  <div style={{ fontSize: "10px", fontWeight: 600, color: "#64748B", marginTop: "2px" }}>{m.label}</div>
                  <div style={{ fontSize: "9px", color: "#334155", marginTop: "2px" }}>{m.sub}</div>
                </div>
              ))}
            </div>

            {/* Card 3: Verified quality */}
            <div className="hero-card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ fontSize: "10px", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em" }}>Why Clients Choose Us</span>
                <div style={{ display: "flex", gap: "2px" }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={9} fill="#F59E0B" style={{ color: "#F59E0B" }} />)}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                {[
                  "Senior-level team on every project",
                  "Transparent weekly reporting",
                  "Results-first approach, always",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <CheckCircle2 size={12} style={{ color: "#10B981", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.78rem", color: "#64748B" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech row */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "1rem", justifyContent: "center" }}>
              {techIcons.map((t) => (
                <div key={t.label} title={t.label} style={{ display: "flex", alignItems: "center", gap: "5px", padding: "5px 10px", borderRadius: "8px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", fontSize: "10px", color: "#475569" }}>
                  <t.icon size={11} style={{ color: t.color }} />
                  {t.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom scroll hint */}
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", animation: "float 2s ease-in-out infinite" }}>
          <span style={{ fontSize: "10px", color: "#334155", letterSpacing: "0.1em", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: "1px", height: "32px", background: "linear-gradient(180deg,rgba(0,212,255,0.5),transparent)" }} />
        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      <style>{`
        /* Aurora background blobs */
        .aurora-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(100px);
        }
        .aurora-1 {
          width: 600px; height: 500px;
          top: -10%; left: -5%;
          background: radial-gradient(circle, rgba(0,212,255,0.10) 0%, transparent 65%);
          animation: aurMove1 12s ease-in-out infinite;
        }
        .aurora-2 {
          width: 700px; height: 600px;
          bottom: -20%; right: -10%;
          background: radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 65%);
          animation: aurMove2 15s ease-in-out infinite;
        }
        .aurora-3 {
          width: 500px; height: 400px;
          top: 50%; left: 35%;
          background: radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 65%);
          animation: aurMove3 10s ease-in-out infinite;
        }
        @keyframes aurMove1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(4%,6%) scale(1.08); }
          66% { transform: translate(-3%,3%) scale(0.96); }
        }
        @keyframes aurMove2 {
          0%,100% { transform: translate(0,0) scale(1.05); }
          33% { transform: translate(-5%,-4%) scale(1); }
          66% { transform: translate(3%,-6%) scale(1.1); }
        }
        @keyframes aurMove3 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-8%,5%) scale(1.15); }
        }

        /* Noise overlay */
        .noise-overlay {
          position: absolute; inset: 0; pointer-events: none; z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          opacity: 0.025;
        }

        /* Grid layout */
        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr; gap: 3rem; }
          .hero-right { order: -1; }
        }

        /* Left column */
        .hero-left { display: flex; flex-direction: column; }

        /* Badge */
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 14px 6px 10px; border-radius: 999px; width: fit-content;
          background: rgba(0,212,255,0.05); border: 1px solid rgba(0,212,255,0.14);
          margin-bottom: 2rem;
          font-size: 11px; color: #94A3B8; font-weight: 500; letter-spacing: 0.02em;
        }
        .badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 0 0 rgba(16,185,129,0.5);
          animation: badgePulse 2.5s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes badgePulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
          50% { box-shadow: 0 0 0 5px rgba(16,185,129,0); }
        }

        /* Headline */
        .hero-headline {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: clamp(2.6rem, 5vw, 4.2rem);
          line-height: 1.05;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }
        .hero-rotating-word {
          display: block;
          background: linear-gradient(135deg, #00D4FF 0%, #8B5CF6 60%, #F59E0B 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200%;
          animation: gradientShift 4s ease infinite;
          transition: opacity 0.32s ease, transform 0.32s cubic-bezier(0.34,1.56,0.64,1);
          min-height: 1.1em;
        }

        /* CTAs */
        .hero-cta-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 0.9rem 2rem; border-radius: 14px;
          background: linear-gradient(135deg, #00D4FF, #8B5CF6);
          color: white; font-weight: 700; font-family: 'Space Grotesk',sans-serif;
          font-size: 0.95rem; text-decoration: none;
          box-shadow: 0 0 0 0 rgba(0,212,255,0.4), 0 8px 24px rgba(0,0,0,0.4);
          transition: all 0.3s ease;
        }
        .hero-cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 40px rgba(0,212,255,0.35), 0 12px 30px rgba(0,0,0,0.4);
        }
        .hero-cta-secondary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 0.9rem 1.75rem; border-radius: 14px;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.09);
          color: #94A3B8; font-weight: 600; font-family: 'Space Grotesk',sans-serif;
          font-size: 0.95rem; cursor: pointer;
          transition: all 0.3s ease;
        }
        .hero-cta-secondary:hover {
          border-color: rgba(0,212,255,0.3);
          color: #E2E8F0;
          transform: translateY(-2px);
        }

        /* Right column glass cards */
        .hero-right {
          display: flex; flex-direction: column;
        }
        .hero-card {
          background: rgba(13,21,37,0.6);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 1.25rem;
          padding: 1.1rem 1.25rem;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: all 0.3s ease;
        }
        .hero-card:hover {
          border-color: rgba(0,212,255,0.12);
          background: rgba(13,21,37,0.75);
        }

        @media (max-width: 640px) {
          .hero-headline { font-size: 2.4rem; }
          .hero-cta-primary, .hero-cta-secondary { width: 100%; justify-content: center; }
        }
      `}</style>
    </>
  );
}
