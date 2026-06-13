"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Play, Sparkles, Zap, Globe, Award, TrendingUp } from "lucide-react";
import BookingModal from "@/components/shared/BookingModal";

const rotatingWords = [
  "Websites",
  "Mobile Apps",
  "SEO Campaigns",
  "Brand Identities",
  "E-Commerce Stores",
  "Digital Strategies",
];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  // Rotating words
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setFade(true);
      }, 300);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    const particles: {
      x: number; y: number; vx: number; vy: number;
      r: number; opacity: number; color: string;
    }[] = [];

    const colors = ["#00D4FF", "#8B5CF6", "#F59E0B"];
    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.4,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        const hex = Math.round(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fillStyle = p.color + hex;
        ctx.fill();
        p.x = (p.x + p.vx + w) % w;
        p.y = (p.y + p.vy + h) % h;
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,212,255,${(1 - d / 100) * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden hero-section"
        style={{ background: "var(--hero-bg, linear-gradient(135deg, #04050D 0%, #080C1A 50%, #04050D 100%))" }}>

        {/* Particle canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.7 }} />

        {/* Grid pattern */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />

        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-[700px] h-[700px] pointer-events-none rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute bottom-20 right-1/4 w-[700px] h-[700px] pointer-events-none rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none rounded-full"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)", filter: "blur(60px)" }} />

        {/* Floating stats — desktop */}
        <div className="hidden xl:block">
          {[
            { icon: Zap, text: "150+ Projects", color: "#00D4FF", style: { top: "20%", left: "2%" } },
            { icon: Globe, text: "20+ Countries", color: "#8B5CF6", style: { top: "65%", left: "1%" } },
            { icon: Award, text: "5★ Rated Agency", color: "#F59E0B", style: { top: "18%", right: "2%" } },
            { icon: TrendingUp, text: "4.9x Avg. ROAS", color: "#10B981", style: { top: "68%", right: "1%" } },
          ].map((b, i) => (
            <div key={b.text}
              className="absolute flex items-center gap-2 px-3 py-2 rounded-2xl border"
              style={{
                ...b.style,
                background: "var(--hero-stat-bg)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderColor: `${b.color}25`,
                animation: `float ${6 + i}s ease-in-out ${i * 0.8}s infinite`,
              }}>
              <b.icon size={13} style={{ color: b.color }} />
              <span className="text-xs font-medium whitespace-nowrap" style={{ color: "var(--hero-stat-text)" }}>{b.text}</span>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="container-custom relative z-10 pt-28 pb-20 text-center">

          {/* Top badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: "rgba(0,212,255,0.08)",
              border: "1px solid rgba(0,212,255,0.2)",
              backdropFilter: "blur(10px)",
            }}>
            <Sparkles size={13} className="text-[#00D4FF]" />
            <span className="text-xs font-medium text-[#94A3B8]">Nepal&apos;s #1 Digital Growth Agency</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" style={{ animation: "glowPulse 2s ease-in-out infinite" }} />
          </div>

          {/* Main heading */}
          <h1 className="font-display font-bold leading-tight mb-6"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", color: "var(--text-primary)" }}>
            We Build{" "}
            <span
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #00D4FF, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                minWidth: "8ch",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                opacity: fade ? 1 : 0,
                transform: fade ? "translateY(0)" : "translateY(10px)",
              }}>
              {rotatingWords[wordIndex]}
            </span>
            <br />
            <span style={{ color: "var(--text-primary)" }}>That Drive </span>
            <span style={{
              background: "linear-gradient(135deg, #F59E0B, #00D4FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Real Results</span>
          </h1>

          {/* Tagline */}
          <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem", lineHeight: 1.7, maxWidth: "700px", margin: "0 auto 2.5rem" }}>
            Your Quest for Digital Excellence Starts Here. We help businesses in Nepal and worldwide
            grow faster with <strong style={{ color: "var(--text-primary)" }}>world-class digital solutions</strong>.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/contact"
              className="group flex items-center gap-2 font-display font-semibold text-white"
              style={{
                padding: "1rem 2.5rem",
                borderRadius: "1rem",
                background: "linear-gradient(135deg, #00D4FF, #8B5CF6)",
                boxShadow: "0 0 30px rgba(0,212,255,0.35), 0 8px 25px rgba(0,0,0,0.3)",
                fontSize: "1rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(0,212,255,0.5), 0 12px 35px rgba(0,0,0,0.3)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(0,212,255,0.35), 0 8px 25px rgba(0,0,0,0.3)"; }}
            >
              Start Your Quest
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button onClick={() => setIsBookingOpen(true)}
              className="group flex items-center gap-2 font-display font-semibold"
              style={{
                padding: "1rem 2.5rem",
                borderRadius: "1rem",
                background: "var(--hero-btn-secondary-bg)",
                border: "1px solid var(--hero-btn-secondary-border)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                color: "var(--hero-btn-secondary-text)",
                fontSize: "1rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.5)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--hero-btn-secondary-border)"; (e.currentTarget as HTMLElement).style.transform = ""; }}
            >
              <Play size={16} style={{ color: "#00D4FF" }} />
              Book Free Call
            </button>
          </div>

          {/* Social proof bar */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {[
              { value: "150+", label: "Projects" },
              { value: "50+", label: "Clients" },
              { value: "20+", label: "Countries" },
              { value: "4.9★", label: "Rating" },
            ].map((s, i) => (
              <div key={s.label} className="text-center">
                <div className="font-display font-bold text-2xl" style={{
                  background: ["#00D4FF", "#8B5CF6", "#F59E0B", "#10B981"][i],
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  {s.value}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ animation: "float 2s ease-in-out infinite" }}>
          <span className="text-xs" style={{ color: "#475569" }}>Scroll to explore</span>
          <div className="w-5 h-8 rounded-full flex justify-center pt-1.5"
            style={{ border: "1px solid rgba(0,212,255,0.2)" }}>
            <div className="w-1 h-2 rounded-full bg-[#00D4FF]" style={{ animation: "float 1.5s ease-in-out infinite" }} />
          </div>
        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
