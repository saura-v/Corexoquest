import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Eye, PenSquare } from "lucide-react";
import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Digital marketing insights, SEO tips, web development tutorials, and growth strategies from the Corexoquest team.",
};

const categoryColors: Record<string, string> = {
  "Case Study": "#00D4FF", "SEO": "#10B981", "Web Design": "#8B5CF6",
  "PPC": "#EF4444", "Social Media": "#EC4899", "Branding": "#F59E0B",
  "Marketing": "#06B6D4", "Development": "#3B82F6",
};

async function getBlogPosts() {
  try {
    return await prisma.blog.findMany({ where: { status: "APPROVED" }, orderBy: { publishedAt: "desc" } });
  } catch { return []; }
}

const fallbackPosts = [
  { id: "1", title: "How We Helped a Kathmandu Restaurant 10x Their Online Orders in 90 Days", slug: "restaurant-10x-online-orders", excerpt: "A deep-dive case study revealing the exact digital strategy that transformed a local restaurant's online presence and drove 10x more orders.", category: "Case Study", authorName: "Corexoquest Team", views: 1247, createdAt: new Date("2026-05-15"), publishedAt: new Date("2026-05-15"), status: "APPROVED" as const, content: "", coverImage: null, tags: "[]", authorEmail: "", authorId: null, updatedAt: new Date() },
  { id: "2", title: "SEO Case Study: 0 to 50,000 Monthly Visitors for a Nepal E-Commerce Store", slug: "seo-0-to-50k-visitors-case-study", excerpt: "We reveal the exact technical SEO strategy that took an e-commerce store from near-zero to 50K monthly organic visitors in 6 months.", category: "SEO", authorName: "SEO Team", views: 892, createdAt: new Date("2026-04-28"), publishedAt: new Date("2026-04-28"), status: "APPROVED" as const, content: "", coverImage: null, tags: "[]", authorEmail: "", authorId: null, updatedAt: new Date() },
  { id: "3", title: "The Complete Guide to High-Converting Landing Pages in 2026", slug: "high-converting-landing-page-guide-2026", excerpt: "Everything you need to know about building landing pages that convert — from headline psychology to CTA placement to A/B testing.", category: "Web Design", authorName: "Design Team", views: 2103, createdAt: new Date("2026-04-10"), publishedAt: new Date("2026-04-10"), status: "APPROVED" as const, content: "", coverImage: null, tags: "[]", authorEmail: "", authorId: null, updatedAt: new Date() },
  { id: "4", title: "Why Most Small Businesses Fail at Digital Marketing (And How to Fix It)", slug: "why-small-businesses-fail-digital-marketing", excerpt: "Common digital marketing mistakes that are killing small business growth — and exactly how to fix each one with actionable strategies.", category: "Marketing", authorName: "Marketing Team", views: 3451, createdAt: new Date("2026-03-22"), publishedAt: new Date("2026-03-22"), status: "APPROVED" as const, content: "", coverImage: null, tags: "[]", authorEmail: "", authorId: null, updatedAt: new Date() },
  { id: "5", title: "How We Reduced a Client's Ad Spend by 40% While Doubling Their Leads", slug: "reduce-ad-spend-double-leads-case-study", excerpt: "A detailed breakdown of the PPC optimization strategy that cut wasted ad spend and doubled qualified lead generation for a B2B client.", category: "PPC", authorName: "PPC Team", views: 1876, createdAt: new Date("2026-03-05"), publishedAt: new Date("2026-03-05"), status: "APPROVED" as const, content: "", coverImage: null, tags: "[]", authorEmail: "", authorId: null, updatedAt: new Date() },
  { id: "6", title: "Building a Brand Identity That Commands Attention: Our Design Process", slug: "brand-identity-design-process", excerpt: "Behind the scenes of our branding process — from initial discovery to final brand guidelines. How we create identities that stick.", category: "Branding", authorName: "Design Team", views: 982, createdAt: new Date("2026-02-18"), publishedAt: new Date("2026-02-18"), status: "APPROVED" as const, content: "", coverImage: null, tags: "[]", authorEmail: "", authorId: null, updatedAt: new Date() },
];

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const displayPosts = posts.length > 0 ? posts : fallbackPosts;
  const featured = displayPosts[0];
  const rest = displayPosts.slice(1);
  const featuredColor = categoryColors[featured.category] || "#00D4FF";

  return (
    <div style={{ paddingTop: "80px", background: "var(--bg-primary)", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <section style={{ padding: "5rem 0", position: "relative", overflow: "hidden", background: "var(--bg-primary)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--border-color) 1px,transparent 1px),linear-gradient(90deg,var(--border-color) 1px,transparent 1px)", backgroundSize: "55px 55px", opacity: 0.35, pointerEvents: "none" }} />
        <div className="container-custom" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 18px", borderRadius: "999px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", color: "#10B981", fontSize: "12px", fontWeight: 600, marginBottom: "1.5rem" }}>
            📝 Digital Insights
          </span>
          <h1 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 800, fontSize: "clamp(2.4rem,6vw,4.5rem)", color: "var(--text-primary)", marginBottom: "1.25rem", lineHeight: 1.1 }}>
            Knowledge That{" "}
            <span style={{ background: "linear-gradient(135deg,#00D4FF 0%,#8B5CF6 50%,#F59E0B 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Drives Growth</span>
          </h1>
          <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}>
            Actionable insights, case studies, and expert guides from Nepal&apos;s leading digital agency.
          </p>
        </div>
      </section>

      {/* ── Featured post ── */}
      <section style={{ padding: "0 0 3rem", background: "var(--bg-primary)" }}>
        <div className="container-custom">
          <Link href={`/blog/${featured.slug}`} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderRadius: "1.5rem", overflow: "hidden", background: "var(--bg-card)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow)", textDecoration: "none", transition: "all 0.35s" }} className="blog-featured-card">
            {/* Cover */}
            <div style={{ position: "relative", minHeight: "260px", background: `linear-gradient(135deg,${featuredColor}30,${featuredColor}60)` }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
              <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "999px", background: "rgba(245,158,11,0.85)", color: "#04050D" }}>⭐ Featured</span>
              </div>
              <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", width: "80px", height: "80px", borderRadius: "50%", background: `${featuredColor}18`, border: `2px solid ${featuredColor}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 900, fontSize: "1.6rem", color: featuredColor }}>#1</span>
              </div>
            </div>
            {/* Content */}
            <div style={{ padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 600, padding: "4px 12px", borderRadius: "999px", background: `${featuredColor}18`, color: featuredColor, border: `1px solid ${featuredColor}30`, marginBottom: "1rem", width: "fit-content" }}>
                {featured.category}
              </span>
              <h2 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 800, fontSize: "clamp(1.1rem,2vw,1.5rem)", color: "var(--text-primary)", marginBottom: "0.75rem", lineHeight: 1.35 }}>
                {featured.title}
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                {featured.excerpt}
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: "12px", fontSize: "11px", color: "var(--text-muted)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Clock size={11} />{formatDate(featured.publishedAt || featured.createdAt)}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Eye size={11} />{featured.views.toLocaleString()}</span>
                </div>
                <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
                  Read Article <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── All posts grid ── */}
      <section style={{ padding: "0 0 5rem", background: "var(--bg-primary)" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.5rem" }}>
            {rest.map((post) => {
              const color = categoryColors[post.category] || "#00D4FF";
              return (
                <Link key={post.id} href={`/blog/${post.slug}`} style={{ display: "block", textDecoration: "none", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "1.5rem", overflow: "hidden", boxShadow: "var(--shadow)", transition: "all 0.35s" }} className="blog-card">
                  {/* Cover */}
                  <div style={{ height: "176px", position: "relative", background: `linear-gradient(135deg,${color}25,${color}55)` }}>
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)", backgroundSize: "22px 22px" }} />
                    <div style={{ position: "absolute", top: "12px", left: "12px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 600, padding: "4px 12px", borderRadius: "999px", background: `${color}30`, color, border: `1px solid ${color}50` }}>{post.category}</span>
                    </div>
                    <div style={{ position: "absolute", bottom: "-16px", right: "16px", fontSize: "5rem", fontWeight: 900, fontFamily: "Space Grotesk,sans-serif", color, opacity: 0.1, lineHeight: 1 }}>{post.id}</div>
                  </div>
                  <div style={{ padding: "1.25rem" }}>
                    <h3 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)", marginBottom: "0.5rem", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>{post.title}</h3>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>{post.excerpt}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "11px", color: "var(--text-muted)" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Clock size={11} />{formatDate(post.publishedAt || post.createdAt)}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Eye size={11} />{post.views.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Submit CTA ── */}
      <section style={{ padding: "5rem 0", background: "var(--bg-secondary)" }}>
        <div className="container-custom" style={{ textAlign: "center" }}>
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "1.5rem", padding: "2.5rem", maxWidth: "640px", margin: "0 auto", boxShadow: "var(--shadow)" }}>
            <div style={{ width: 52, height: 52, borderRadius: "14px", background: "rgba(139,92,246,0.1)", border: "1.5px solid rgba(139,92,246,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
              <PenSquare size={22} style={{ color: "#8B5CF6" }} />
            </div>
            <h2 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "var(--text-primary)", marginBottom: "0.75rem" }}>Want to Write for Us?</h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Are you a digital marketing expert? Submit your article for review and reach our global audience of business owners and marketers.
            </p>
            <Link href="/blog/submit" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "0.875rem 2rem", borderRadius: "12px", background: "linear-gradient(135deg,#8B5CF6,#00D4FF)", color: "white", fontWeight: 700, fontFamily: "Space Grotesk,sans-serif", textDecoration: "none", boxShadow: "0 8px 24px rgba(139,92,246,0.25)" }}>
              Submit an Article <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .blog-featured-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.12) !important; border-color: rgba(0,212,255,0.25) !important; }
        .blog-card:hover { transform: translateY(-5px); box-shadow: 0 16px 48px rgba(0,0,0,0.1) !important; border-color: rgba(0,212,255,0.2) !important; }
        @media (max-width: 768px) {
          .blog-featured-card { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
