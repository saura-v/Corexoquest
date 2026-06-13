import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_PROJECTS } from "@/lib/utils";

export async function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return { title: project.title, description: project.description };
}

export default async function PortfolioDetailPage(props: PageProps<"/portfolio/[slug]">) {
  const { slug } = await props.params;
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const related = PORTFOLIO_PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${project.color}08 0%, var(--bg-primary) 60%)` }}
      >
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container-custom relative z-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] mb-8 transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            All Projects
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
                style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}
              >
                {project.category}
              </span>
              <h1 className="font-display font-bold text-4xl sm:text-5xl text-[var(--text-primary)] mb-4 leading-tight">
                {project.title}
              </h1>
              <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-6">
                {project.description}
              </p>
              {project.clientName && (
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  <span className="text-[var(--text-primary)] font-medium">Client:</span> {project.clientName}
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-white text-sm group"
                  style={{ background: `linear-gradient(135deg, ${project.color}, #8B5CF6)` }}
                >
                  Similar Project?
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-sm border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-colors glass"
                >
                  <ExternalLink size={15} /> Live Site
                </a>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-3 gap-4">
              {Object.values(project.results).map((r) => (
                <div
                  key={r.label}
                  className="text-center glass border border-[var(--border-color)] rounded-3xl p-5"
                >
                  <div className="font-display font-bold text-3xl mb-2" style={{ color: project.color }}>
                    {r.value}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] leading-snug">{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="section-padding bg-[var(--bg-primary)]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-4">
                Project Overview
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                {project.description} We designed and developed this project from concept to
                production, working closely with the client to understand their business goals and
                translate them into a powerful digital solution.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                The project required a deep understanding of the client&apos;s industry, target
                audience, and competitive landscape. We delivered a solution that not only met
                but exceeded all project goals, resulting in measurable business outcomes.
              </p>

              {/* Technologies */}
              <h3 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-4">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-xl text-sm font-medium bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {/* Project Info */}
              <div className="glass border border-[var(--border-color)] rounded-3xl p-6">
                <h3 className="font-display font-semibold text-sm text-[var(--text-primary)] mb-4">
                  Project Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Category</span>
                    <span className="text-[var(--text-primary)] font-medium">{project.category}</span>
                  </div>
                  {project.clientName && (
                    <div className="flex justify-between">
                      <span className="text-[var(--text-secondary)]">Client</span>
                      <span className="text-[var(--text-primary)] font-medium">{project.clientName}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Tags</span>
                    <span className="text-[var(--text-primary)] font-medium text-right">
                      {project.tags.slice(0, 2).join(", ")}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/contact"
                className="block text-center px-6 py-4 rounded-2xl font-display font-semibold text-white text-sm"
                style={{ background: `linear-gradient(135deg, ${project.color}, #8B5CF6)` }}
              >
                Start a Similar Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="container-custom">
          <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-8">
            More Projects
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/portfolio/${p.slug}`}
                className="group glass border border-[var(--border-color)] rounded-2xl overflow-hidden hover:border-[rgba(0,212,255,0.2)] hover:-translate-y-1 transition-all"
              >
                <div
                  className="h-32"
                  style={{ background: `linear-gradient(135deg, ${p.color}20, ${p.color}35)` }}
                />
                <div className="p-4">
                  <h3 className="font-display font-semibold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors line-clamp-2">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
