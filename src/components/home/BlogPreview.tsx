import Link from "next/link";
import { ArrowRight } from "lucide-react";
import prisma from "@/lib/prisma";
import BlogCards from "./BlogCards";

async function getLatestPosts() {
  try {
    return await prisma.blog.findMany({
      where: { status: "APPROVED" },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: { id: true, title: true, slug: true, excerpt: true, category: true, views: true, publishedAt: true, createdAt: true },
    });
  } catch {
    return [];
  }
}

const fallbackPosts = [
  {
    id: "1", title: "How We Helped a Kathmandu Restaurant 10x Their Online Orders in 90 Days",
    slug: "restaurant-10x-online-orders",
    excerpt: "A deep-dive case study on how a comprehensive digital strategy including SEO, social media, and a new ordering platform transformed a local restaurant's online presence.",
    category: "Case Study", views: 1247,
    createdAt: new Date("2026-05-15"), publishedAt: new Date("2026-05-15"),
  },
  {
    id: "2", title: "SEO Case Study: From 0 to 50,000 Monthly Visitors for a Nepal E-Commerce Store",
    slug: "seo-0-to-50k-visitors-case-study",
    excerpt: "We reveal the exact technical SEO strategy, content plan, and link building approach that took an e-commerce store from near-zero to 50K monthly organic visitors.",
    category: "SEO", views: 892,
    createdAt: new Date("2026-04-28"), publishedAt: new Date("2026-04-28"),
  },
  {
    id: "3", title: "The Complete Guide to Building a High-Converting Landing Page in 2026",
    slug: "high-converting-landing-page-guide-2026",
    excerpt: "Everything you need to know about building landing pages that convert visitors into leads — from headline psychology to CTA placement to A/B testing frameworks.",
    category: "Web Design", views: 2103,
    createdAt: new Date("2026-04-10"), publishedAt: new Date("2026-04-10"),
  },
];

export default async function BlogPreview() {
  const posts = await getLatestPosts();
  const displayPosts = posts.length > 0 ? posts : fallbackPosts;

  return (
    <section style={{ padding: "5rem 0", background: "var(--bg-primary)" }}>
      <div className="container-custom">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
          <div>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "6px 16px", borderRadius: "999px",
              background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)",
              color: "#10B981", fontSize: "12px", fontWeight: 600, marginBottom: "12px",
            }}>
              📝 Latest Insights
            </span>
            <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3rem)", color: "var(--text-primary)" }}>
              From Our Blog
            </h2>
          </div>
          <Link href="/blog" style={{
            display: "flex", alignItems: "center", gap: "6px",
            fontSize: "0.875rem", fontWeight: 600,
            color: "var(--accent)", textDecoration: "none", marginTop: "0.5rem",
          }}>
            All Articles <ArrowRight size={16} />
          </Link>
        </div>

        <BlogCards posts={displayPosts} />
      </div>
    </section>
  );
}
