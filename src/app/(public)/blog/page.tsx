import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Eye, PenSquare } from "lucide-react";
import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Digital marketing insights, SEO tips, web development tutorials, and growth strategies from the Corexoquest team.",
};

const categoryColors: Record<string, string> = {
  "Case Study": "#00D4FF",
  "SEO": "#10B981",
  "Web Design": "#8B5CF6",
  "PPC": "#EF4444",
  "Social Media": "#EC4899",
  "Branding": "#F59E0B",
  "Marketing": "#06B6D4",
  "Development": "#3B82F6",
};

async function getBlogPosts() {
  try {
    return await prisma.blog.findMany({
      where: { status: "APPROVED" },
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    return [];
  }
}

const fallbackPosts = [
  {
    id: "1", title: "How We Helped a Kathmandu Restaurant 10x Their Online Orders in 90 Days",
    slug: "restaurant-10x-online-orders", excerpt: "A deep-dive case study revealing the exact digital strategy that transformed a local restaurant's online presence and drove 10x more orders.",
    category: "Case Study", authorName: "Corexoquest Team", views: 1247,
    createdAt: new Date("2026-05-15"), publishedAt: new Date("2026-05-15"),
    status: "APPROVED" as const, content: "", coverImage: null, tags: "[]", authorEmail: "", authorId: null, updatedAt: new Date(),
  },
  {
    id: "2", title: "SEO Case Study: 0 to 50,000 Monthly Visitors for a Nepal E-Commerce Store",
    slug: "seo-0-to-50k-visitors-case-study", excerpt: "We reveal the exact technical SEO strategy that took an e-commerce store from near-zero to 50K monthly organic visitors in 6 months.",
    category: "SEO", authorName: "SEO Team", views: 892,
    createdAt: new Date("2026-04-28"), publishedAt: new Date("2026-04-28"),
    status: "APPROVED" as const, content: "", coverImage: null, tags: "[]", authorEmail: "", authorId: null, updatedAt: new Date(),
  },
  {
    id: "3", title: "The Complete Guide to High-Converting Landing Pages in 2026",
    slug: "high-converting-landing-page-guide-2026", excerpt: "Everything you need to know about building landing pages that convert — from headline psychology to CTA placement to A/B testing.",
    category: "Web Design", authorName: "Design Team", views: 2103,
    createdAt: new Date("2026-04-10"), publishedAt: new Date("2026-04-10"),
    status: "APPROVED" as const, content: "", coverImage: null, tags: "[]", authorEmail: "", authorId: null, updatedAt: new Date(),
  },
  {
    id: "4", title: "Why Most Small Businesses Fail at Digital Marketing (And How to Fix It)",
    slug: "why-small-businesses-fail-digital-marketing", excerpt: "Common digital marketing mistakes that are killing small business growth — and exactly how to fix each one with actionable strategies.",
    category: "Marketing", authorName: "Marketing Team", views: 3451,
    createdAt: new Date("2026-03-22"), publishedAt: new Date("2026-03-22"),
    status: "APPROVED" as const, content: "", coverImage: null, tags: "[]", authorEmail: "", authorId: null, updatedAt: new Date(),
  },
  {
    id: "5", title: "How We Reduced a Client's Ad Spend by 40% While Doubling Their Leads",
    slug: "reduce-ad-spend-double-leads-case-study", excerpt: "A detailed breakdown of the PPC optimization strategy that cut wasted ad spend and doubled qualified lead generation for a B2B client.",
    category: "PPC", authorName: "PPC Team", views: 1876,
    createdAt: new Date("2026-03-05"), publishedAt: new Date("2026-03-05"),
    status: "APPROVED" as const, content: "", coverImage: null, tags: "[]", authorEmail: "", authorId: null, updatedAt: new Date(),
  },
  {
    id: "6", title: "Building a Brand Identity That Commands Attention: Our Design Process",
    slug: "brand-identity-design-process", excerpt: "Behind the scenes of our branding process — from initial discovery to final brand guidelines. How we create identities that stick.",
    category: "Branding", authorName: "Design Team", views: 982,
    createdAt: new Date("2026-02-18"), publishedAt: new Date("2026-02-18"),
    status: "APPROVED" as const, content: "", coverImage: null, tags: "[]", authorEmail: "", authorId: null, updatedAt: new Date(),
  },
];

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const displayPosts = posts.length > 0 ? posts : fallbackPosts;
  const featured = displayPosts[0];
  const rest = displayPosts.slice(1);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden bg-[var(--bg-primary)]">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="container-custom relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(16,185,129,0.2)] text-xs font-medium text-[#10B981] mb-6 bg-[rgba(16,185,129,0.05)]">
            📝 Digital Insights
          </span>
          <h1 className="font-display font-bold text-5xl sm:text-6xl text-[var(--text-primary)] mb-6">
            Knowledge That{" "}
            <span className="gradient-text">Drives Growth</span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            Actionable insights, case studies, and expert guides from Nepal&apos;s leading digital agency.
          </p>
        </div>
      </section>

      {/* Featured post */}
      <section className="py-12 bg-[var(--bg-primary)]">
        <div className="container-custom">
          <Link
            href={`/blog/${featured.slug}`}
            className="group relative glass border border-[var(--border-color)] rounded-3xl overflow-hidden hover:border-[rgba(0,212,255,0.3)] transition-all duration-400 hover:-translate-y-1 grid lg:grid-cols-2"
          >
            {/* Cover */}
            <div
              className="relative h-64 lg:h-auto"
              style={{
                background: `linear-gradient(135deg, ${categoryColors[featured.category] || "#00D4FF"}20, ${categoryColors[featured.category] || "#00D4FF"}40)`,
              }}
            >
              <div className="absolute inset-0 bg-grid opacity-20" />
              <div className="absolute top-4 left-4">
                <span
                  className="text-xs font-medium px-3 py-1 rounded-full"
                  style={{
                    background: `${categoryColors[featured.category] || "#00D4FF"}25`,
                    color: categoryColors[featured.category] || "#00D4FF",
                    border: `1px solid ${categoryColors[featured.category] || "#00D4FF"}40`,
                  }}
                >
                  ⭐ Featured
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col justify-center">
              <span
                className="text-xs font-medium px-3 py-1 rounded-full inline-block mb-4 w-fit"
                style={{
                  background: `${categoryColors[featured.category] || "#00D4FF"}15`,
                  color: categoryColors[featured.category] || "#00D4FF",
                }}
              >
                {featured.category}
              </span>
              <h2 className="font-display font-bold text-2xl lg:text-3xl text-[var(--text-primary)] mb-3 leading-snug group-hover:text-[var(--accent-primary)] transition-colors">
                {featured.title}
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {formatDate(featured.publishedAt || featured.createdAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={11} /> {featured.views.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-[var(--accent-primary)] group-hover:gap-2 transition-all">
                  Read Article <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* All posts grid */}
      <section className="pb-20 bg-[var(--bg-primary)]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => {
              const color = categoryColors[post.category] || "#00D4FF";
              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group glass border border-[var(--border-color)] rounded-3xl overflow-hidden hover:border-[rgba(0,212,255,0.2)] hover:-translate-y-2 transition-all duration-400"
                >
                  <div className="h-44 relative" style={{ background: `linear-gradient(135deg, ${color}15, ${color}30)` }}>
                    <div className="absolute inset-0 bg-grid opacity-20" />
                    <div className="absolute top-4 left-4">
                      <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: `${color}25`, color, border: `1px solid ${color}40` }}>
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-base text-[var(--text-primary)] mb-2 leading-snug line-clamp-2 group-hover:text-[var(--accent-primary)] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                      <span className="flex items-center gap-1"><Clock size={11} />{formatDate(post.publishedAt || post.createdAt)}</span>
                      <span className="flex items-center gap-1"><Eye size={11} />{post.views.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Submit a post CTA */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="container-custom text-center">
          <div className="glass border border-[var(--border-color)] rounded-3xl p-8 max-w-2xl mx-auto">
            <PenSquare size={32} className="text-[#8B5CF6] mx-auto mb-4" />
            <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-3">
              Want to Write for Us?
            </h2>
            <p className="text-[var(--text-secondary)] mb-6">
              Are you a digital marketing expert? Submit your article for review and reach our global audience of business owners and marketers.
            </p>
            <Link
              href="/blog/submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-white bg-gradient-to-r from-[#8B5CF6] to-[#00D4FF] hover:opacity-90 transition-opacity group"
            >
              Submit an Article
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
