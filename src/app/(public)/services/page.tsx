import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Monitor, Smartphone, TrendingUp, Target, Share2, FileText, Palette, ShoppingCart, Layout, Mail, Cloud, BarChart2, CheckCircle2 } from "lucide-react";
import { SERVICES } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore all 12 digital services offered by Corexoquest — web development, SEO, PPC, social media management, branding, mobile apps, e-commerce, and more.",
};

const iconMap: Record<string, React.ElementType> = {
  Monitor, Smartphone, TrendingUp, Target, Share2, FileText,
  Palette, ShoppingCart, Layout, Mail, Cloud, BarChart2,
};

export default function ServicesPage() {
  const categories = [...new Set(SERVICES.map((s) => s.category))];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden bg-[var(--bg-primary)]">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="container-custom relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(0,212,255,0.2)] text-xs font-medium text-[var(--accent-primary)] mb-6 bg-[rgba(0,212,255,0.05)]">
            ⚡ Full-Stack Digital Solutions
          </span>
          <h1 className="font-display font-bold text-5xl sm:text-6xl text-[var(--text-primary)] mb-6">
            Everything Under{" "}
            <span className="gradient-text">One Roof</span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            From brand identity to full-stack development to paid advertising — we are your single
            digital partner for extraordinary growth.
          </p>
        </div>
      </section>

      {/* Services by category */}
      {categories.map((category) => (
        <section key={category} className="py-12 bg-[var(--bg-primary)]">
          <div className="container-custom">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)]">
                {category}
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-[var(--border-color)] to-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES.filter((s) => s.category === category).map((service) => {
                const Icon = iconMap[service.icon] || Monitor;
                return (
                  <Link
                    key={service.id}
                    href={`/services/${service.id}`}
                    className="group relative glass border border-[var(--border-color)] rounded-3xl p-6 hover:border-[rgba(0,212,255,0.25)] hover:-translate-y-2 transition-all duration-400 overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ background: `linear-gradient(135deg, ${service.color}04, transparent)` }}
                    />

                    <div className="relative">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                        style={{ background: `${service.color}15`, border: `1px solid ${service.color}30` }}
                      >
                        <Icon size={22} style={{ color: service.color }} />
                      </div>

                      <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-[#F59E0B] font-medium italic mb-3">
                        &ldquo;{service.tagline}&rdquo;
                      </p>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5 line-clamp-2">
                        {service.description}
                      </p>

                      <ul className="space-y-2 mb-5">
                        {service.features.slice(0, 3).map((f) => (
                          <li key={f} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                            <CheckCircle2 size={12} style={{ color: service.color, flexShrink: 0 }} />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: service.color }}>
                        Learn More
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="container-custom text-center">
          <h2 className="font-display font-bold text-4xl text-[var(--text-primary)] mb-4">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto mb-8 text-lg">
            Book a free 30-min consultation and we&apos;ll create a custom digital strategy just for your business.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-display font-semibold text-white bg-gradient-to-r from-[#00D4FF] to-[#8B5CF6] hover:opacity-90 hover:-translate-y-1 transition-all duration-300 group"
          >
            Get Free Strategy Session
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
