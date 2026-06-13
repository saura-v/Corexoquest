import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Heart, Zap, Globe, Users, Award, CheckCircle2, Share2, Hash } from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export const metadata: Metadata = {
  title: "About Us | Corexoquest",
  description: "Learn about Corexoquest — Nepal's digital agency on a quest to help businesses worldwide achieve digital excellence.",
};

const values = [
  { icon: Target, title: "Results-Driven", color: "#00D4FF", description: "Every strategy we implement is laser-focused on delivering measurable results — leads, revenue, and growth." },
  { icon: Heart, title: "Client-First", color: "#EC4899", description: "We treat every client's business as our own. Your success is literally our success — and we take that seriously." },
  { icon: Zap, title: "Innovation", color: "#F59E0B", description: "We stay ahead of digital trends, continuously learning and applying cutting-edge techniques and technologies." },
  { icon: Globe, title: "Global Thinking", color: "#8B5CF6", description: "Based in Nepal, thinking globally. We bring world-class digital expertise at startup-friendly prices." },
];

const team = [
  { name: "Alex Kumar", role: "Founder & CEO", bio: "10+ years in digital strategy. Former consultant for Fortune 500 companies.", color: "#00D4FF" },
  { name: "Priya Shrestha", role: "Head of Design", bio: "Award-winning UI/UX designer with a passion for pixel-perfect experiences.", color: "#8B5CF6" },
  { name: "Rahul Maharjan", role: "Lead Developer", bio: "Full-stack engineer specializing in Next.js, React Native, and cloud architecture.", color: "#F59E0B" },
  { name: "Sarah Johnson", role: "Marketing Director", bio: "Google Ads certified, ex-agency performance marketer. 8+ years driving digital ROI.", color: "#10B981" },
  { name: "Nikhil Thapa", role: "SEO Specialist", bio: "Technical SEO expert who has taken 20+ websites to the first page of Google.", color: "#EF4444" },
  { name: "Emily Chen", role: "Content Strategist", bio: "Content strategist and copywriter who turns complex ideas into compelling stories.", color: "#06B6D4" },
];

const milestones = [
  { year: "2019", title: "Founded", desc: "Corexoquest was born in Kathmandu with a mission to bring world-class digital solutions to Nepal.", color: "#00D4FF" },
  { year: "2020", title: "First 10 Clients", desc: "Rapidly grew to serve businesses across Nepal, launching our first major e-commerce projects.", color: "#8B5CF6" },
  { year: "2021", title: "Global Expansion", desc: "Started serving international clients in USA, UK, and Australia while maintaining our Nepali roots.", color: "#F59E0B" },
  { year: "2022", title: "Team of 15", desc: "Expanded our team with specialists in SEO, PPC, development, and design.", color: "#10B981" },
  { year: "2023", title: "100+ Projects", desc: "Hit the milestone of 100 successfully delivered projects with a 98% client retention rate.", color: "#EC4899" },
  { year: "2024", title: "Award-Winning", desc: "Recognized as Nepal's top digital agency, delivering campaigns with proven ROI for global clients.", color: "#06B6D4" },
  { year: "2025", title: "150+ Projects", desc: "Continued growth with new service offerings in AI integration and advanced analytics.", color: "#F59E0B" },
  { year: "2026", title: "The Quest Continues", desc: "Expanding into new markets and launching innovative digital products for clients worldwide.", color: "#8B5CF6" },
];

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "80px", background: "var(--bg-primary)", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <section style={{ padding: "5rem 0", position: "relative", overflow: "hidden", background: "var(--bg-primary)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--border-color) 1px,transparent 1px),linear-gradient(90deg,var(--border-color) 1px,transparent 1px)", backgroundSize: "55px 55px", opacity: 0.3, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "5rem", left: "25%", width: "500px", height: "500px", borderRadius: "999px", background: "radial-gradient(circle,rgba(0,212,255,0.06) 0%,transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div className="container-custom" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 18px", borderRadius: "999px", background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.2)", color: "var(--accent)", fontSize: "12px", fontWeight: 600, marginBottom: "1.5rem" }}>
              🌏 Our Story
            </span>
            <h1 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem,5vw,4rem)", color: "var(--text-primary)", lineHeight: 1.15, marginBottom: "1.25rem" }}>
              We&apos;re on a{" "}
              <span style={{ background: "linear-gradient(135deg,#00D4FF,#8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Quest</span>
              {" "}to Help<br />Businesses Grow
            </h1>
            <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "620px", margin: "0 auto 2rem" }}>
              Born in Kathmandu, Nepal — built for the world. Corexoquest is a team of digital strategists, designers, and developers united by one mission: helping businesses achieve extraordinary results online.
            </p>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "1rem 2.5rem", borderRadius: "14px", background: "linear-gradient(135deg,#00D4FF,#8B5CF6)", color: "white", fontWeight: 700, fontFamily: "Space Grotesk,sans-serif", textDecoration: "none", boxShadow: "0 8px 28px rgba(0,212,255,0.25)" }}>
              Work With Us <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section style={{ padding: "3rem 0", background: "var(--bg-secondary)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", textAlign: "center" }}>
            {[
              { value: 150, suffix: "+", label: "Projects Delivered", color: "#00D4FF" },
              { value: 50, suffix: "+", label: "Happy Clients", color: "#8B5CF6" },
              { value: 7, suffix: "+", label: "Years of Excellence", color: "#F59E0B" },
              { value: 20, suffix: "+", label: "Countries Served", color: "#10B981" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 800, fontSize: "2.5rem", color: s.color, marginBottom: "4px" }}>
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section style={{ padding: "5rem 0", background: "var(--bg-primary)" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }} className="about-mission-grid">
            <div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 16px", borderRadius: "999px", background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.2)", color: "var(--accent)", fontSize: "12px", fontWeight: 600, marginBottom: "1.25rem" }}>
                🎯 Our Mission
              </span>
              <h2 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,3.5vw,2.5rem)", color: "var(--text-primary)", marginBottom: "1.25rem", lineHeight: 1.25 }}>
                Digital Excellence Is Not a Destination,{" "}
                <span style={{ background: "linear-gradient(135deg,#00D4FF,#8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>It&apos;s a Quest</span>
              </h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "1rem" }}>
                We founded Corexoquest with a simple but powerful belief: that great digital experiences should be accessible to businesses of every size — not just enterprises with massive budgets.
              </p>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "2rem" }}>
                Based in Kathmandu, Nepal, we&apos;ve built a team of world-class digital experts who deliver Fortune 500-quality work at startup-friendly prices. Every strategy, every design, every campaign is crafted with one goal: your growth.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {["Senior-level experts on every project", "Transparent reporting & communication", "Data-driven strategies with proven ROI", "Long-term partnerships, not one-off projects"].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <CheckCircle2 size={16} style={{ color: "#00D4FF", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {values.map((v) => (
                <div key={v.title} style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "1.25rem", padding: "1.5rem", boxShadow: "var(--shadow)", transition: "all 0.3s ease" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", background: `${v.color}14`, border: `1.5px solid ${v.color}28`, marginBottom: "1rem" }}>
                    <v.icon size={20} style={{ color: v.color }} />
                  </div>
                  <h3 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>{v.title}</h3>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section style={{ padding: "5rem 0", background: "var(--bg-secondary)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 16px", borderRadius: "999px", background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", color: "var(--accent2)", fontSize: "12px", fontWeight: 600, marginBottom: "1rem" }}>
              <Users size={12} /> Meet the Team
            </span>
            <h2 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3rem)", color: "var(--text-primary)" }}>
              The Experts Behind{" "}
              <span style={{ background: "linear-gradient(135deg,#00D4FF,#8B5CF6,#F59E0B)", backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Your Quest</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.25rem" }}>
            {team.map((m) => (
              <div key={m.name} style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "1.5rem", padding: "2rem", textAlign: "center", boxShadow: "var(--shadow)", transition: "all 0.3s ease" }}>
                {/* Avatar */}
                <div style={{ width: 80, height: 80, borderRadius: "999px", margin: "0 auto 1rem", background: `linear-gradient(135deg,${m.color},${m.color}99)`, border: `3px solid ${m.color}40`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontFamily: "Space Grotesk,sans-serif", fontWeight: 800, fontSize: "1.4rem" }}>
                  {m.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "var(--text-primary)", marginBottom: "4px" }}>{m.name}</div>
                <div style={{ fontSize: "0.8rem", fontWeight: 600, color: m.color, marginBottom: "0.75rem" }}>{m.role}</div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: "1.25rem" }}>{m.bio}</p>
                <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                  {[{ icon: Share2, label: "LinkedIn" }, { icon: Hash, label: "Twitter" }].map(({ icon: Icon, label }) => (
                    <a key={label} href="#" aria-label={label} style={{ width: 32, height: 32, borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", textDecoration: "none", transition: "all 0.2s" }}>
                      <Icon size={13} />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section style={{ padding: "5rem 0", background: "var(--bg-primary)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 16px", borderRadius: "999px", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", color: "#F59E0B", fontSize: "12px", fontWeight: 600, marginBottom: "1rem" }}>
              <Award size={12} /> Our Journey
            </span>
            <h2 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3rem)", color: "var(--text-primary)" }}>
              From Kathmandu to the{" "}
              <span style={{ background: "linear-gradient(135deg,#00D4FF,#8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>World</span>
            </h2>
          </div>
          <div style={{ maxWidth: "780px", margin: "0 auto", position: "relative" }}>
            {/* Center line */}
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "2px", background: "linear-gradient(180deg,#00D4FF,#8B5CF6,#F59E0B)", transform: "translateX(-50%)" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {milestones.map((m, i) => (
                <div key={m.year} style={{ display: "flex", alignItems: "center", gap: "2rem", flexDirection: i % 2 === 0 ? "row" : "row-reverse" }}>
                  {/* Card */}
                  <div style={{ flex: 1, display: "flex", justifyContent: i % 2 === 0 ? "flex-end" : "flex-start" }}>
                    <div style={{ background: "var(--bg-card)", border: `1px solid ${m.color}30`, borderRadius: "1rem", padding: "1rem 1.25rem", maxWidth: "280px", boxShadow: "var(--shadow)" }}>
                      <div style={{ fontSize: "12px", fontWeight: 700, color: m.color, marginBottom: "4px" }}>{m.title}</div>
                      <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{m.desc}</p>
                    </div>
                  </div>
                  {/* Year dot */}
                  <div style={{ flexShrink: 0, width: 52, height: 52, borderRadius: "999px", border: `2px solid ${m.color}`, background: "var(--bg-card)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, boxShadow: `0 0 0 4px var(--bg-primary)` }}>
                    <span style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 800, fontSize: "11px", color: m.color }}>{m.year.slice(2)}</span>
                  </div>
                  <div style={{ flex: 1 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "5rem 0", background: "var(--bg-secondary)", textAlign: "center" }}>
        <div className="container-custom">
          <h2 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3rem)", color: "var(--text-primary)", marginBottom: "1rem" }}>
            Join Our{" "}
            <span style={{ background: "linear-gradient(135deg,#00D4FF,#8B5CF6,#F59E0B)", backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Growing Client Family</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: "520px", margin: "0 auto 2rem", lineHeight: 1.7, fontSize: "1.05rem" }}>
            Ready to take your digital presence to the next level? Let&apos;s start your quest together.
          </p>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "1rem 2.5rem", borderRadius: "14px", background: "linear-gradient(135deg,#00D4FF,#8B5CF6)", color: "white", fontWeight: 700, fontFamily: "Space Grotesk,sans-serif", textDecoration: "none", boxShadow: "0 8px 28px rgba(0,212,255,0.25)" }}>
            Start Your Quest <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .about-mission-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .about-mission-grid > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
