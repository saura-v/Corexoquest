"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Zap, Star, Crown, X, HelpCircle } from "lucide-react";

const plans = [
  {
    id: "starter",
    name: "Starter",
    icon: Zap,
    description: "Perfect for small businesses and startups launching their digital journey.",
    price: { monthly: "$499", yearly: "$399" },
    period: "/ month",
    color: "#00D4FF",
    badge: null,
    features: [
      "5-page responsive website",
      "Basic SEO setup",
      "2 social media platforms",
      "Monthly performance report",
      "Email support (48hr response)",
      "Google Analytics setup",
      "1 month of maintenance",
    ],
    notIncluded: [
      "PPC campaigns",
      "Advanced analytics",
      "Priority support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    icon: Star,
    description: "For growing businesses that need a comprehensive digital strategy.",
    price: { monthly: "$1,299", yearly: "$999" },
    period: "/ month",
    color: "#8B5CF6",
    badge: "Most Popular",
    features: [
      "15-page custom website",
      "Advanced SEO (on-page + technical)",
      "4 social media platforms",
      "Google Ads / Meta Ads management",
      "Content creation (4 blogs/month)",
      "Weekly reporting dashboard",
      "Priority email & WhatsApp support",
      "CRO consultation",
      "3 months of maintenance",
    ],
    notIncluded: [
      "Custom app development",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Crown,
    description: "Full-service digital transformation for businesses ready to dominate.",
    price: { monthly: "Custom", yearly: "Custom" },
    period: "pricing",
    color: "#F59E0B",
    badge: "Best Value",
    features: [
      "Unlimited pages + custom features",
      "Full SEO + link building",
      "All social media platforms",
      "Multi-channel paid advertising",
      "Unlimited content creation",
      "Real-time analytics dashboard",
      "Dedicated account manager",
      "Weekly strategy calls",
      "Mobile app development (add-on)",
      "E-commerce integration",
      "12 months of maintenance",
      "24/7 emergency support",
    ],
    notIncluded: [],
  },
];

const faqs = [
  {
    q: "Do you offer custom packages?",
    a: "Absolutely! Every business is unique. We tailor our packages to fit your specific needs, goals, and budget. Contact us for a custom quote.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept PayPal, Payoneer, bank transfer, and major credit cards. We also offer flexible payment schedules for longer engagements.",
  },
  {
    q: "Is there a contract lock-in period?",
    a: "We operate month-to-month with no long-term contracts. However, we offer significant discounts for 6-month and 12-month commitments.",
  },
  {
    q: "How quickly will I see results?",
    a: "Results vary by service — paid ads can show results within 7 days, while SEO typically takes 3-6 months to show significant organic growth. We set clear expectations in our kickoff call.",
  },
  {
    q: "What if I'm not satisfied?",
    a: "We have a 100% satisfaction guarantee. If you're not happy with our work in the first 30 days, we'll refund your payment — no questions asked.",
  },
  {
    q: "Do you work with businesses outside Nepal?",
    a: "Yes! We serve clients in 20+ countries. Our team works across time zones and we're experienced with international business requirements.",
  },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden bg-[var(--bg-primary)]">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 70%)" }}
        />
        <div className="container-custom relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(245,158,11,0.2)] text-xs font-medium text-[#F59E0B] mb-6 bg-[rgba(245,158,11,0.05)]">
            💰 Transparent Pricing
          </span>
          <h1 className="font-display font-bold text-5xl sm:text-6xl text-[var(--text-primary)] mb-6">
            Investment That{" "}
            <span className="gradient-text">Pays for Itself</span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
            Flexible pricing built for every stage of business growth. No hidden fees, no surprises.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 glass border border-[var(--border-color)] rounded-2xl p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                billing === "monthly"
                  ? "bg-[var(--accent-primary)] text-[#04050D]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                billing === "yearly"
                  ? "bg-gradient-to-r from-[#00D4FF] to-[#8B5CF6] text-white"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Yearly
              <span className="text-xs bg-[#F59E0B] text-[#04050D] px-2 py-0.5 rounded-full font-bold">
                Save 25%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 bg-[var(--bg-primary)]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative glass border rounded-3xl p-7 flex flex-col transition-all duration-400 ${
                  plan.badge === "Most Popular"
                    ? "border-[rgba(139,92,246,0.5)] scale-105 shadow-2xl"
                    : "border-[var(--border-color)] hover:border-[rgba(0,212,255,0.25)] hover:-translate-y-1"
                }`}
                style={
                  plan.badge === "Most Popular"
                    ? { boxShadow: "0 20px 60px rgba(139,92,246,0.2)" }
                    : {}
                }
              >
                {/* Badge */}
                {plan.badge && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                    style={{
                      background:
                        plan.badge === "Most Popular"
                          ? "linear-gradient(135deg, #8B5CF6, #00D4FF)"
                          : "linear-gradient(135deg, #F59E0B, #EF4444)",
                    }}
                  >
                    {plan.badge}
                  </div>
                )}

                {/* Plan header */}
                <div className="mb-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: `${plan.color}15`, border: `1px solid ${plan.color}30` }}
                  >
                    <plan.icon size={22} style={{ color: plan.color }} />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span
                      className="font-display font-bold text-4xl"
                      style={{ color: plan.color }}
                    >
                      {billing === "yearly" ? plan.price.yearly : plan.price.monthly}
                    </span>
                    <span className="text-sm text-[var(--text-secondary)] mb-1">{plan.period}</span>
                  </div>
                  {billing === "yearly" && plan.id !== "enterprise" && (
                    <p className="text-xs text-[#10B981] mt-1">
                      Save {plan.id === "starter" ? "$1,200" : "$3,600"}/year
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color: plan.color }} />
                      <span className="text-sm text-[var(--text-secondary)]">{f}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <li key={f} className="flex items-start gap-2 opacity-40">
                      <X size={15} className="flex-shrink-0 mt-0.5 text-[var(--text-secondary)]" />
                      <span className="text-sm text-[var(--text-secondary)] line-through">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={`/contact?plan=${plan.id}`}
                  className="block text-center py-3 rounded-xl font-display font-semibold text-sm transition-all hover:-translate-y-0.5"
                  style={
                    plan.badge === "Most Popular"
                      ? {
                          background: "linear-gradient(135deg, #8B5CF6, #00D4FF)",
                          color: "white",
                        }
                      : {
                          border: `1px solid ${plan.color}60`,
                          color: plan.color,
                          background: `${plan.color}08`,
                        }
                  }
                >
                  {plan.id === "enterprise" ? "Get Custom Quote" : "Get Started"}
                </Link>
              </div>
            ))}
          </div>

          {/* PayPal / Payoneer info */}
          <div className="text-center mt-10">
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              Secure payments via
            </p>
            <div className="flex items-center justify-center gap-4">
              {["PayPal", "Payoneer", "Bank Transfer", "Credit Card"].map((method) => (
                <span
                  key={method}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg glass border border-[var(--border-color)] text-[var(--text-secondary)]"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Get a Quote section */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl text-[var(--text-primary)] mb-4">
            Need a Custom Quote?
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 text-lg">
            Tell us about your project and we&apos;ll create a detailed proposal with transparent pricing.
          </p>
          <Link
            href="/contact?type=quote"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-display font-semibold text-white bg-gradient-to-r from-[#F59E0B] to-[#8B5CF6] hover:opacity-90 hover:-translate-y-1 transition-all duration-300 group"
          >
            Get Custom Quote
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-[var(--bg-primary)]">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(0,212,255,0.2)] text-xs font-medium text-[var(--accent-primary)] mb-4 bg-[rgba(0,212,255,0.05)]">
              <HelpCircle size={12} /> FAQ
            </span>
            <h2 className="font-display font-bold text-3xl text-[var(--text-primary)]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="glass border border-[var(--border-color)] rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-display font-semibold text-sm text-[var(--text-primary)]">
                    {faq.q}
                  </span>
                  <span
                    className={`text-[var(--accent-primary)] transition-transform duration-200 ${
                      openFaq === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-color)] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
