"use client";

import Link from "next/link";
import { ArrowRight, Clock, Eye } from "lucide-react";

type Post = {
  id: string; title: string; slug: string; excerpt: string;
  category: string; views: number;
  publishedAt: Date | null; createdAt: Date;
};

const categoryColors: Record<string, string> = {
  "Case Study": "#00D4FF", "SEO": "#10B981", "Web Design": "#8B5CF6",
  "PPC": "#EF4444", "Social Media": "#EC4899", "Branding": "#F59E0B",
};

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function BlogCards({ posts }: { posts: Post[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))", gap: "1.5rem" }}>
      {posts.map((post) => {
        const color = categoryColors[post.category] || "#00D4FF";
        return (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            style={{
              display: "block", textDecoration: "none",
              background: "var(--bg-card)", border: "1px solid var(--border-color)",
              borderRadius: "1.5rem", overflow: "hidden", transition: "all 0.35s ease",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = `${color}30`;
              el.style.transform = "translateY(-5px)";
              el.style.boxShadow = `0 16px 50px ${color}12`;
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--border-color)";
              el.style.transform = "";
              el.style.boxShadow = "";
            }}
          >
            {/* Cover */}
            <div style={{
              height: "176px", position: "relative", overflow: "hidden",
              background: `linear-gradient(135deg, ${color}15, ${color}30)`,
            }}>
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
                backgroundSize: "25px 25px",
              }} />
              <div style={{ position: "absolute", top: "12px", left: "12px" }}>
                <span style={{
                  fontSize: "11px", fontWeight: 600, padding: "4px 12px",
                  borderRadius: "999px", background: `${color}25`,
                  color, border: `1px solid ${color}40`,
                }}>
                  {post.category}
                </span>
              </div>
              <div style={{
                position: "absolute", bottom: "-12px", right: "16px",
                fontSize: "5rem", fontWeight: 900, fontFamily: "Space Grotesk,sans-serif",
                color, opacity: 0.07, lineHeight: 1,
              }}>
                {post.id}
              </div>
            </div>

            <div style={{ padding: "1.25rem" }}>
              <h3 style={{
                fontFamily: "Space Grotesk,sans-serif", fontWeight: 700,
                fontSize: "0.95rem", color: "var(--text-primary)",
                marginBottom: "0.5rem", lineHeight: 1.4,
                display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden",
              }}>
                {post.title}
              </h3>
              <p style={{
                fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1rem",
                display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden",
              }}>
                {post.excerpt}
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "11px", color: "var(--text-muted)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Clock size={11} />
                  {formatDate(post.publishedAt || post.createdAt)}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Eye size={11} />
                  {post.views.toLocaleString()} views
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
