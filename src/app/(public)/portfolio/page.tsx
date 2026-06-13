import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { PORTFOLIO_PROJECTS } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore Corexoquest's portfolio of delivered projects — web apps, e-commerce stores, mobile apps, SaaS platforms, and more.",
};

const categories = ["All", ...new Set(PORTFOLIO_PROJECTS.map((p) => p.category))];

export default function PortfolioPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden bg-[var(--bg-primary)]">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="container-custom relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(0,212,255,0.2)] text-xs font-medium text-[var(--accent-primary)] mb-6 bg-[rgba(0,212,255,0.05)]">
            🏆 Our Work
          </span>
          <h1 className="font-display font-bold text-5xl sm:text-6xl text-[var(--text-primary)] mb-6">
            Projects That{" "}
            <span className="gradient-text">Speak for Themselves</span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Real projects. Real results. From Kathmandu restaurants to global SaaS platforms — here&apos;s what we build.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-[var(--bg-primary)]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO_PROJECTS.map((project, index) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className="group relative glass border border-[var(--border-color)] rounded-3xl overflow-hidden hover:border-[rgba(0,212,255,0.3)] hover:-translate-y-2 transition-all duration-400"
              >
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-20 bg-[#F59E0B] text-[#04050D] text-xs font-bold px-3 py-1 rounded-full">
                    Featured
                  </div>
                )}

                {/* Cover */}
                <div
                  className="relative h-52 overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${project.color}20, ${project.color}40)` }}
                >
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center" style={{ color: project.color }}>
                    <div className="text-center">
                      <div className="text-6xl font-display font-bold opacity-15">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="text-sm font-medium opacity-50 mt-1">{project.category}</div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[var(--bg-card)] to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-xs font-medium px-3 py-1 rounded-full"
                      style={{ background: `${project.color}25`, color: project.color, border: `1px solid ${project.color}40` }}
                    >
                      {project.category}
                    </span>
                  </div>
                  <ExternalLink
                    size={14}
                    className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display font-bold text-base text-[var(--text-primary)] mb-2 leading-snug group-hover:text-[var(--accent-primary)] transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Results */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {Object.values(project.results).map((r) => (
                      <div key={r.label} className="text-center p-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                        <div className="font-display font-bold text-xs" style={{ color: project.color }}>
                          {r.value}
                        </div>
                        <div className="text-xs text-[var(--text-secondary)] mt-0.5 leading-tight text-[10px]">
                          {r.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="container-custom text-center">
          <h2 className="font-display font-bold text-4xl text-[var(--text-primary)] mb-4">
            Want to See Your Project Here?
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto mb-8 text-lg">
            Let&apos;s build something extraordinary together. Your success story starts with a free consultation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-display font-semibold text-white bg-gradient-to-r from-[#00D4FF] to-[#8B5CF6] hover:opacity-90 hover:-translate-y-1 transition-all duration-300 group"
          >
            Start Your Project
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
