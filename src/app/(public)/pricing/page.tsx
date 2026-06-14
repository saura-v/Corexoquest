"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Zap, Star, Crown, X, HelpCircle, Shield, CreditCard } from "lucide-react";

const plans = [
  {
    id: "starter", name: "Starter", icon: Zap, color: "#00D4FF", badge: null,
    description: "Perfect for small businesses and startups launching their digital journey.",
    price: { monthly: "$499", yearly: "$399" }, period: "/ month",
    features: ["5-page responsive website", "Basic SEO setup", "2 social media platforms", "Monthly performance report", "Email support (48hr response)", "Google Analytics setup", "1 month of maintenance"],
    notIncluded: ["PPC campaigns", "Advanced analytics", "Priority support"],
  },
  {
    id: "growth", name: "Growth", icon: Star, color: "#8B5CF6", badge: "Most Popular",
    description: "For growing businesses that need a comprehensive digital strategy.",
    price: { monthly: "$1,299", yearly: "$999" }, period: "/ month",
    features: ["15-page custom website", "Advanced SEO (on-page + technical)", "4 social media platforms", "Google Ads / Meta Ads management", "Content creation (4 blogs/month)", "Weekly reporting dashboard", "Priority email & WhatsApp support", "CRO consultation", "3 months of maintenance"],
    notIncluded: ["Custom app development"],
  },
  {
    id: "enterprise", name: "Enterprise", icon: Crown, color: "#F59E0B", badge: "Best Value",
    description: "Full-service digital transformation for businesses ready to dominate.",
    price: { monthly: "Custom", yearly: "Custom" }, period: "pricing",
    features: ["Unlimited pages + custom features", "Full SEO + link building", "All social media platforms", "Multi-channel paid advertising", "Unlimited content creation", "Real-time analytics dashboard", "Dedicated account manager", "Weekly strategy calls", "Mobile app development (add-on)", "E-commerce integration", "12 months of maintenance", "24/7 emergency support"],
    notIncluded: [],
  },
];

const faqs = [
  { q: "Do you offer custom packages?", a: "Absolutely! Every business is unique. We tailor our packages to fit your specific needs, goals, and budget. Contact us for a custom quote." },
  { q: "What payment methods do you accept?", a: "We accept PayPal, Payoneer, bank transfer, and major credit cards. We also offer flexible payment schedules for longer engagements." },
  { q: "Is there a contract lock-in period?", a: "We operate month-to-month with no long-term contracts. However, we offer significant discounts for 6-month and 12-month commitments." },
  { q: "How quickly will I see results?", a: "Results vary by service — paid ads can show results within 7 days, while SEO typically takes 3-6 months to show significant organic growth. We set clear expectations in our kickoff call." },
  { q: "What if I'm not satisfied?", a: "We have a 100% satisfaction guarantee. If you're not happy with our work in the first 30 days, we'll refund your payment — no questions asked." },
  { q: "Do you work with businesses outside Nepal?", a: "Yes! We serve clients in 20+ countries. Our team works across time zones and we're experienced with international business requirements." },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ paddingTop: "80px", background: "var(--bg-primary)", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <section style={{ padding: "5rem 0", position: "relative", overflow: "hidden", background: "var(--bg-primary)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--border-color) 1px,transparent 1px),linear-gradient(90deg,var(--border-color) 1px,transparent 1px)", backgroundSize: "55px 55px", opacity: 0.3, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "400px", background: "radial-gradient(ellipse,rgba(139,92,246,0.07) 0%,transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div className="container-custom" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 18px", borderRadius: "999px", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", color: "#F59E0B", fontSize: "12px", fontWeight: 600, marginBottom: "1.5rem" }}>
            💰 Transparent Pricing
          </span>
          <h1 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 800, fontSize: "clamp(2.4rem,6vw,4.5rem)", color: "var(--text-primary)", marginBottom: "1.25rem", lineHeight: 1.1 }}>
            Investment That{" "}
            <span style={{ background: "linear-gradient(135deg,#00D4FF 0%,#8B5CF6 50%,#F59E0B 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Pays for Itself</span>
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", maxWidth: "560px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Flexible pricing built for every stage of business growth. No hidden fees, no surprises.
          </p>

          {/* Billing toggle */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "14px", padding: "4px", boxShadow: "var(--shadow)" }}>
            <button
              onClick={() => setBilling("monthly")}
              style={{
                padding: "8px 20px", borderRadius: "10px", fontSize: "14px", fontWeight: 600,
                cursor: "pointer", border: "none", transition: "all 0.2s ease",
                background: billing === "monthly" ? "var(--accent-primary)" : "transparent",
                color: billing === "monthly" ? "#04050D" : "var(--text-secondary)",
                fontFamily: "Space Grotesk,sans-serif",
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              style={{
                padding: "8px 20px", borderRadius: "10px", fontSize: "14px", fontWeight: 600,
                cursor: "pointer", border: "none", transition: "all 0.2s ease", display: "flex", alignItems: "center", gap: "8px",
                background: billing === "yearly" ? "linear-gradient(135deg,#00D4FF,#8B5CF6)" : "transparent",
                color: billing === "yearly" ? "white" : "var(--text-secondary)",
                fontFamily: "Space Grotesk,sans-serif",
              }}
            >
              Yearly
              <span style={{ fontSize: "10px", background: "#F59E0B", color: "#04050D", padding: "2px 7px", borderRadius: "999px", fontWeight: 700 }}>Save 25%</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Pricing Cards ── */}
      <section style={{ padding: "0 0 5rem", background: "var(--bg-primary)" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem", maxWidth: "1050px", margin: "0 auto", alignItems: "start" }} className="pricing-grid">
            {plans.map((plan) => {
              const isPopular = plan.badge === "Most Popular";
              return (
                <div
                  key={plan.id}
                  style={{
                    position: "relative",
                    background: "var(--bg-card)",
                    border: `1px solid ${isPopular ? `${plan.color}50` : "var(--border-color)"}`,
                    borderRadius: "1.5rem",
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: isPopular ? `0 24px 64px ${plan.color}20, var(--shadow)` : "var(--shadow)",
                    transform: isPopular ? "scale(1.03)" : "none",
                    transition: "all 0.3s ease",
                  }}
                  className="pricing-card"
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div style={{
                      position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)",
                      padding: "4px 16px", borderRadius: "999px", fontSize: "11px", fontWeight: 700,
                      color: "white", whiteSpace: "nowrap",
                      background: isPopular ? "linear-gradient(135deg,#8B5CF6,#00D4FF)" : "linear-gradient(135deg,#F59E0B,#EF4444)",
                      boxShadow: `0 4px 12px ${plan.color}40`,
                    }}>
                      {plan.badge}
                    </div>
                  )}

                  {/* Icon + name */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <div style={{ width: 48, height: 48, borderRadius: "14px", background: `${plan.color}14`, border: `1.5px solid ${plan.color}28`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                      <plan.icon size={22} style={{ color: plan.color }} />
                    </div>
                    <h3 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: "6px" }}>{plan.name}</h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border-color)" }}>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "6px" }}>
                      <span style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 900, fontSize: "2.8rem", color: plan.color, lineHeight: 1 }}>
                        {billing === "yearly" ? plan.price.yearly : plan.price.monthly}
                      </span>
                      <span style={{ fontSize: "13px", color: "var(--text-secondary)", paddingBottom: "6px" }}>{plan.period}</span>
                    </div>
                    {billing === "yearly" && plan.id !== "enterprise" && (
                      <div style={{ fontSize: "12px", color: "#10B981", marginTop: "6px", fontWeight: 600 }}>
                        ✓ Save {plan.id === "starter" ? "$1,200" : "$3,600"} per year
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "1.5rem", flex: 1, listStyle: "none", padding: 0, margin: "0 0 1.5rem 0" }}>
                    {plan.features.map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                        <CheckCircle2 size={15} style={{ color: plan.color, flexShrink: 0, marginTop: "1px" }} />
                        <span style={{ fontSize: "13.5px", color: "var(--text-secondary)", lineHeight: 1.5 }}>{f}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px", opacity: 0.4 }}>
                        <X size={15} style={{ color: "var(--text-secondary)", flexShrink: 0, marginTop: "1px" }} />
                        <span style={{ fontSize: "13.5px", color: "var(--text-secondary)", textDecoration: "line-through" }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={`/contact?plan=${plan.id}`}
                    style={{
                      display: "block", textAlign: "center",
                      padding: "12px 16px", borderRadius: "12px",
                      fontSize: "14px", fontWeight: 700, fontFamily: "Space Grotesk,sans-serif",
                      textDecoration: "none", transition: "all 0.2s ease",
                      ...(isPopular
                        ? { background: "linear-gradient(135deg,#8B5CF6,#00D4FF)", color: "white", boxShadow: "0 8px 24px rgba(139,92,246,0.3)" }
                        : { background: `${plan.color}10`, color: plan.color, border: `1.5px solid ${plan.color}40` }
                      ),
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; }}
                  >
                    {plan.id === "enterprise" ? "Get Custom Quote →" : "Get Started →"}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Payment methods */}
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "12px" }}>
              <Shield size={14} style={{ color: "#10B981" }} />
              <span style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: 500 }}>100% Secure · 30-day money-back guarantee</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Accepted:</span>
              {["PayPal", "Payoneer", "Bank Transfer", "Credit Card"].map((m) => (
                <span key={m} style={{ fontSize: "12px", fontWeight: 500, padding: "4px 12px", borderRadius: "8px", background: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Custom Quote ── */}
      <section style={{ padding: "5rem 0", background: "var(--bg-secondary)" }}>
        <div className="container-custom" style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.5rem)", color: "var(--text-primary)", marginBottom: "1rem" }}>Need a Custom Quote?</h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "1.05rem", marginBottom: "2rem" }}>
            Tell us about your project and we&apos;ll create a detailed proposal with transparent pricing.
          </p>
          <Link
            href="/contact?type=quote"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", borderRadius: "14px", background: "linear-gradient(135deg,#F59E0B,#8B5CF6)", color: "white", fontWeight: 700, fontFamily: "Space Grotesk,sans-serif", fontSize: "1rem", textDecoration: "none", boxShadow: "0 8px 28px rgba(245,158,11,0.25)", transition: "all 0.3s ease" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; }}
          >
            Get Custom Quote <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "5rem 0", background: "var(--bg-primary)" }}>
        <div className="container-custom" style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 16px", borderRadius: "999px", background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.2)", color: "var(--accent)", fontSize: "12px", fontWeight: 600, marginBottom: "1rem" }}>
              <HelpCircle size={12} /> FAQ
            </span>
            <h2 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,3.5vw,2.5rem)", color: "var(--text-primary)" }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "14px", overflow: "hidden", boxShadow: "var(--shadow)" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", textAlign: "left", background: "none", border: "none", cursor: "pointer" }}
                >
                  <span style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 600, fontSize: "14px", color: "var(--text-primary)", paddingRight: "1rem" }}>{faq.q}</span>
                  <span style={{ fontSize: "22px", fontWeight: 300, color: "var(--accent)", flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.2s ease", lineHeight: 1 }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 20px 18px", fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.75, borderTop: "1px solid var(--border-color)", paddingTop: "16px" }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .pricing-card:hover { box-shadow: 0 24px 64px rgba(0,0,0,0.15) !important; }
        @media (max-width: 900px) {
          .pricing-grid { grid-template-columns: 1fr !important; max-width: 480px !important; }
          .pricing-card { transform: none !important; }
        }
      `}</style>
    </div>
  );
}
