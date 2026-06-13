import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ArrowLeft, Monitor, Smartphone, TrendingUp, Target, Share2, FileText, Palette, ShoppingCart, Layout, Mail, Cloud, BarChart2 } from "lucide-react";
import { SERVICES } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Monitor, Smartphone, TrendingUp, Target, Share2, FileText,
  Palette, ShoppingCart, Layout, Mail, Cloud, BarChart2,
};

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.id }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const service = SERVICES.find((s) => s.id === slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = SERVICES.find((s) => s.id === slug);

  if (!service) notFound();

  const Icon = iconMap[service.icon] || Monitor;
  const relatedServices = SERVICES.filter((s) => s.id !== service.id && s.category === service.category).slice(0, 3);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden bg-[var(--bg-primary)]">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(circle, ${service.color}08 0%, transparent 70%)` }}
        />

        <div className="container-custom relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] mb-8 transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            All Services
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-5"
                style={{ background: `${service.color}15`, color: service.color, border: `1px solid ${service.color}30` }}
              >
                {service.category}
              </div>
              <h1 className="font-display font-bold text-4xl sm:text-5xl text-[var(--text-primary)] mb-4">
                {service.title}
              </h1>
              <p className="text-xl text-[var(--text-secondary)] italic mb-6" style={{ color: "#F59E0B" }}>
                &ldquo;{service.tagline}&rdquo;
              </p>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-white text-sm group"
                  style={{ background: `linear-gradient(135deg, ${service.color}, ${service.color}99)` }}
                >
                  Get Started
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact?type=audit"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-sm border text-[var(--text-primary)] border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors glass"
                >
                  Free Audit
                </Link>
              </div>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-2 gap-3">
              {service.features.map((feature, i) => (
                <div
                  key={feature}
                  className="glass border border-[var(--border-color)] rounded-2xl p-4 hover:border-[rgba(0,212,255,0.2)] transition-colors"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <CheckCircle2 size={16} className="mb-2" style={{ color: service.color }} />
                  <p className="text-sm text-[var(--text-secondary)] leading-snug">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl text-[var(--text-primary)]">
              Our <span style={{ color: service.color }}>{service.title}</span> Process
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {["Research & Discovery", "Strategy & Planning", "Execution & Build", "Monitor & Optimize"].map(
              (step, i) => (
                <div
                  key={step}
                  className="glass border border-[var(--border-color)] rounded-2xl p-5 text-center"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 font-display font-bold text-sm"
                    style={{ background: `${service.color}20`, color: service.color, border: `1px solid ${service.color}40` }}
                  >
                    {i + 1}
                  </div>
                  <h3 className="font-display font-semibold text-sm text-[var(--text-primary)]">{step}</h3>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Related services */}
      {relatedServices.length > 0 && (
        <section className="section-padding bg-[var(--bg-primary)]">
          <div className="container-custom">
            <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-8">
              Related Services
            </h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {relatedServices.map((s) => {
                const RelIcon = iconMap[s.icon] || Monitor;
                return (
                  <Link
                    key={s.id}
                    href={`/services/${s.id}`}
                    className="group glass border border-[var(--border-color)] rounded-2xl p-5 hover:border-[rgba(0,212,255,0.2)] hover:-translate-y-1 transition-all"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}
                    >
                      <RelIcon size={18} style={{ color: s.color }} />
                    </div>
                    <h3 className="font-display font-semibold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                      {s.title}
                    </h3>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-[var(--bg-secondary)]">
        <div className="container-custom text-center">
          <h2 className="font-display font-bold text-3xl text-[var(--text-primary)] mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto mb-8">
            Get a free {service.title} audit and discover how we can accelerate your growth.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-display font-semibold text-white hover:opacity-90 hover:-translate-y-1 transition-all duration-300 group"
            style={{ background: `linear-gradient(135deg, ${service.color}, #8B5CF6)` }}
          >
            Get Free Audit
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
