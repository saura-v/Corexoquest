"use client";

import { useState } from "react";
import { MapPin, Mail, Phone, MessageSquare, Send, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

const services = [
  "Web Design & Development", "Mobile App Development", "SEO Optimization",
  "PPC & Paid Advertising", "Social Media Management", "Content Marketing",
  "Graphic Design & Branding", "E-Commerce Development", "UI/UX Design",
  "Email Marketing", "Cloud & DevOps", "Data Analytics", "General Enquiry",
];

const budgets = [
  "Under $500", "$500–$1,000", "$1,000–$5,000",
  "$5,000–$10,000", "$10,000–$25,000", "$25,000+",
];

const contactItems = [
  { icon: Mail, title: "Email Us", value: "info.corexoquest@gmail.com", sub: "We reply within 24 hours", color: "#00D4FF", href: "mailto:info.corexoquest@gmail.com" },
  { icon: Phone, title: "WhatsApp", value: "+977 9716390682", sub: "Mon–Sat 9am–6pm NPT", color: "#25D366", href: "https://wa.me/9779716390682" },
  { icon: MapPin, title: "Based In", value: "Kathmandu, Nepal", sub: "Serving clients worldwide", color: "#8B5CF6", href: null },
  { icon: Clock, title: "Business Hours", value: "Sun–Fri: 9am–6pm NPT", sub: "Emergency support 24/7", color: "#F59E0B", href: null },
];

const perks = [
  "Free 30-min consultation",
  "No long-term contracts",
  "Results in 30 days",
  "100% satisfaction guarantee",
  "Senior-level experts only",
  "Transparent reporting",
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "",
    service: "", budget: "", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please WhatsApp us directly.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "12px",
    background: "var(--bg-primary)",
    border: "1.5px solid var(--border-color)",
    fontSize: "0.9rem",
    color: "var(--text-primary)",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    fontFamily: "Inter, sans-serif",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "12px",
    fontWeight: 600,
    color: "var(--text-secondary)",
    marginBottom: "6px",
    letterSpacing: "0.03em",
  };

  return (
    <div style={{ paddingTop: "80px", background: "var(--bg-primary)", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <section style={{ padding: "4rem 0 3rem", position: "relative", overflow: "hidden" }}>
        {/* Background decoration */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(var(--border-color) 1px,transparent 1px),linear-gradient(90deg,var(--border-color) 1px,transparent 1px)",
          backgroundSize: "55px 55px", opacity: 0.3,
        }} />
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: "700px", height: "300px", borderRadius: "999px",
          background: "radial-gradient(ellipse, rgba(0,212,255,0.08) 0%, transparent 70%)",
          filter: "blur(40px)", pointerEvents: "none",
        }} />

        <div className="container-custom" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "6px 18px", borderRadius: "999px",
            background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.2)",
            color: "var(--accent)", fontSize: "12px", fontWeight: 600, marginBottom: "1.25rem",
          }}>
            📬 Get In Touch
          </span>

          <h1 style={{
            fontFamily: "Space Grotesk, sans-serif", fontWeight: 800,
            fontSize: "clamp(2.2rem,5vw,4rem)", color: "var(--text-primary)",
            lineHeight: 1.15, marginBottom: "1rem",
          }}>
            Let&apos;s Start Your{" "}
            <span style={{
              background: "linear-gradient(135deg,#00D4FF,#8B5CF6,#F59E0B)",
              backgroundSize: "200%",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Digital Quest
            </span>
          </h1>

          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}>
            Ready to grow your business online? Fill out the form below and we&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section style={{ padding: "0 0 5rem" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1.5rem", alignItems: "start" }}
            className="contact-grid">

            {/* ── Left: Contact Info ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

              {/* Info cards */}
              {contactItems.map((item) => (
                <div key={item.title} style={{
                  background: "var(--bg-card)", border: "1px solid var(--border-color)",
                  borderRadius: "1.25rem", padding: "1.25rem",
                  display: "flex", alignItems: "flex-start", gap: "14px",
                  boxShadow: "var(--shadow)", transition: "all 0.3s ease",
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "12px", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: `${item.color}15`, border: `1.5px solid ${item.color}30`,
                  }}>
                    <item.icon size={18} style={{ color: item.color }} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {item.title}
                    </div>
                    {item.href ? (
                      <a href={item.href} style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", textDecoration: "none", display: "block", wordBreak: "break-all" }}>
                        {item.value}
                      </a>
                    ) : (
                      <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>{item.value}</div>
                    )}
                    <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>{item.sub}</div>
                  </div>
                </div>
              ))}

              {/* Perks card */}
              <div style={{
                background: "var(--bg-card)", border: "1px solid var(--border-color)",
                borderRadius: "1.25rem", padding: "1.5rem", boxShadow: "var(--shadow)",
              }}>
                <h3 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)", marginBottom: "1rem" }}>
                  Why Work With Us?
                </h3>
                <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {perks.map((p) => (
                    <li key={p} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                      <CheckCircle2 size={15} style={{ color: "#00D4FF", flexShrink: 0 }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/9779716390682?text=Hi%20Corexoquest!%20I%27d%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                  padding: "0.9rem 1.5rem", borderRadius: "14px",
                  background: "linear-gradient(135deg,#25D366,#128C7E)",
                  color: "white", textDecoration: "none", fontWeight: 700,
                  fontFamily: "Space Grotesk,sans-serif", fontSize: "0.9rem",
                  boxShadow: "0 8px 24px rgba(37,211,102,0.25)", transition: "all 0.3s ease",
                }}
              >
                <MessageSquare size={18} />
                Chat on WhatsApp Instead
              </a>
            </div>

            {/* ── Right: Form ── */}
            <div>
              {submitted ? (
                <div style={{
                  background: "var(--bg-card)", border: "1px solid rgba(0,212,255,0.3)",
                  borderRadius: "1.5rem", padding: "4rem 2rem",
                  textAlign: "center", display: "flex", flexDirection: "column",
                  alignItems: "center", gap: "1rem", boxShadow: "var(--shadow)",
                }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: "999px",
                    background: "rgba(0,212,255,0.1)", border: "2px solid rgba(0,212,255,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <CheckCircle2 size={36} style={{ color: "#00D4FF" }} />
                  </div>
                  <h2 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "var(--text-primary)" }}>
                    Message Received! 🎉
                  </h2>
                  <p style={{ color: "var(--text-secondary)", maxWidth: "420px", lineHeight: 1.7 }}>
                    Thank you for reaching out! Our team will review your message and get back to you within 24 hours.
                  </p>
                  <a
                    href="https://wa.me/9779716390682"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "8px",
                      padding: "0.85rem 2rem", borderRadius: "12px",
                      background: "#25D366", color: "white", textDecoration: "none",
                      fontWeight: 700, fontSize: "0.9rem",
                    }}
                  >
                    <MessageSquare size={16} /> Chat on WhatsApp
                  </a>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    background: "var(--bg-card)", border: "1px solid var(--border-color)",
                    borderRadius: "1.5rem", padding: "2rem",
                    boxShadow: "var(--shadow)",
                    display: "flex", flexDirection: "column", gap: "1.25rem",
                  }}
                >
                  {/* Form header */}
                  <div style={{ marginBottom: "0.5rem" }}>
                    <h2 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "var(--text-primary)", marginBottom: "4px" }}>
                      Send Us a Message
                    </h2>
                    <p style={{ fontSize: "0.83rem", color: "var(--text-secondary)" }}>All fields marked * are required.</p>
                  </div>

                  {/* Row 1 */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input
                        name="name" value={form.name} onChange={handleChange}
                        required placeholder="Your full name"
                        style={inputStyle}
                        onFocus={e => { e.currentTarget.style.borderColor = "#00D4FF"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,212,255,0.1)"; }}
                        onBlur={e => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.boxShadow = "none"; }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address *</label>
                      <input
                        name="email" type="email" value={form.email} onChange={handleChange}
                        required placeholder="you@company.com"
                        style={inputStyle}
                        onFocus={e => { e.currentTarget.style.borderColor = "#00D4FF"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,212,255,0.1)"; }}
                        onBlur={e => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.boxShadow = "none"; }}
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={labelStyle}>Phone Number</label>
                      <input
                        name="phone" value={form.phone} onChange={handleChange}
                        placeholder="+977 98XXXXXXXX"
                        style={inputStyle}
                        onFocus={e => { e.currentTarget.style.borderColor = "#00D4FF"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,212,255,0.1)"; }}
                        onBlur={e => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.boxShadow = "none"; }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Company / Website</label>
                      <input
                        name="company" value={form.company} onChange={handleChange}
                        placeholder="Your company or website"
                        style={inputStyle}
                        onFocus={e => { e.currentTarget.style.borderColor = "#00D4FF"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,212,255,0.1)"; }}
                        onBlur={e => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.boxShadow = "none"; }}
                      />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={labelStyle}>Service Interested In</label>
                      <select
                        name="service" value={form.service} onChange={handleChange}
                        style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                        onFocus={e => { e.currentTarget.style.borderColor = "#00D4FF"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,212,255,0.1)"; }}
                        onBlur={e => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.boxShadow = "none"; }}
                      >
                        <option value="">Select a service...</option>
                        {services.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Budget Range</label>
                      <select
                        name="budget" value={form.budget} onChange={handleChange}
                        style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                        onFocus={e => { e.currentTarget.style.borderColor = "#00D4FF"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,212,255,0.1)"; }}
                        onBlur={e => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.boxShadow = "none"; }}
                      >
                        <option value="">Select budget...</option>
                        {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={labelStyle}>Tell Us About Your Project *</label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange}
                      required rows={5}
                      placeholder="Describe your project, goals, timeline, and any specific requirements..."
                      style={{ ...inputStyle, resize: "none" }}
                      onFocus={e => { e.currentTarget.style.borderColor = "#00D4FF"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,212,255,0.1)"; }}
                      onBlur={e => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                      padding: "1rem", borderRadius: "14px",
                      background: "linear-gradient(135deg,#00D4FF,#8B5CF6)",
                      color: "white", fontWeight: 700, fontSize: "1rem",
                      fontFamily: "Space Grotesk,sans-serif", border: "none",
                      cursor: loading ? "not-allowed" : "pointer",
                      opacity: loading ? 0.7 : 1,
                      boxShadow: "0 8px 28px rgba(0,212,255,0.25)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={e => { if (!loading) { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 14px 40px rgba(0,212,255,0.4)"; } }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(0,212,255,0.25)"; }}
                  >
                    {loading ? (
                      "Sending your message..."
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <p style={{ textAlign: "center", fontSize: "12px", color: "var(--text-muted)" }}>
                    🔒 By submitting, you agree to our privacy policy. We&apos;ll never spam you.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Responsive grid fix ── */}
      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
        select option {
          background: var(--bg-card);
          color: var(--text-primary);
        }
        input::placeholder, textarea::placeholder {
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
