import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Eye, User, Tag, Share2, ArrowRight } from "lucide-react";
import prisma from "@/lib/prisma";
import { formatDate, parseJsonField } from "@/lib/utils";

async function getPost(slug: string) {
  try {
    const post = await prisma.blog.findUnique({
      where: { slug, status: "APPROVED" },
    });
    if (post) {
      await prisma.blog.update({
        where: { id: post.id },
        data: { views: { increment: 1 } },
      });
    }
    return post;
  } catch {
    return null;
  }
}

const fallbackContent = `
<p>In today's rapidly evolving digital landscape, businesses that fail to adapt their online strategies quickly find themselves left behind. At Corexoquest, we've seen this pattern repeat across dozens of client engagements — but we've also seen the dramatic turnarounds that are possible when the right digital strategy is executed with precision.</p>

<h2>The Challenge</h2>
<p>Every successful digital transformation begins with an honest assessment of where you are versus where you need to be. For most of our clients, this gap is larger than they initially realize — not because they haven't tried, but because digital success requires a coordinated, multi-channel approach that's difficult to execute without deep expertise.</p>

<h2>Our Approach</h2>
<p>We developed a comprehensive strategy that addressed both immediate pain points and long-term growth objectives. The strategy combined technical SEO improvements, targeted paid advertising, and a content marketing framework designed to build sustainable organic traffic.</p>

<h2>The Results</h2>
<p>Within 90 days of implementation, our client saw dramatic improvements across all key metrics. Organic traffic increased by 340%, paid ad cost-per-lead decreased by 52%, and overall revenue grew by 180%.</p>

<h2>Key Takeaways</h2>
<p>The success of this campaign reinforces several core principles we believe in at Corexoquest: data-driven decision making, consistent execution, and a focus on long-term sustainable growth rather than quick wins.</p>

<p>If you'd like to achieve similar results for your business, we'd love to chat. Book a free 30-minute strategy session with our team today.</p>
`;

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getPost(slug);

  // Use fallback for demo slugs
  const isDemo = [
    "restaurant-10x-online-orders", "seo-0-to-50k-visitors-case-study",
    "high-converting-landing-page-guide-2026", "why-small-businesses-fail-digital-marketing",
    "reduce-ad-spend-double-leads-case-study", "brand-identity-design-process",
  ].includes(slug);

  const demoPost = isDemo
    ? {
        id: slug,
        title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        slug,
        excerpt: "A detailed case study and guide from the Corexoquest team.",
        content: fallbackContent,
        category: "Case Study",
        authorName: "Corexoquest Team",
        authorEmail: "",
        authorId: null,
        coverImage: null,
        tags: '["Digital Marketing","Case Study"]',
        status: "APPROVED" as const,
        views: 1247,
        createdAt: new Date("2026-05-15"),
        updatedAt: new Date("2026-05-15"),
        publishedAt: new Date("2026-05-15"),
      }
    : null;

  const displayPost = post || demoPost;
  if (!displayPost) notFound();

  const tags = parseJsonField<string[]>(displayPost.tags, []);

  return (
    <div className="pt-20">
      <article>
        {/* Hero */}
        <header className="section-padding relative overflow-hidden bg-[var(--bg-primary)]">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="container-custom relative z-10 max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] mb-8 transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>

            <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-[rgba(0,212,255,0.1)] text-[#00D4FF] border border-[rgba(0,212,255,0.2)] mb-4">
              {displayPost.category}
            </span>

            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--text-primary)] mb-5 leading-tight">
              {displayPost.title}
            </h1>

            <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-6">
              {displayPost.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-5 text-sm text-[var(--text-secondary)] pb-6 border-b border-[var(--border-color)]">
              <span className="flex items-center gap-1.5">
                <User size={14} className="text-[#00D4FF]" />
                {displayPost.authorName}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-[#8B5CF6]" />
                {formatDate(displayPost.publishedAt || displayPost.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye size={14} className="text-[#F59E0B]" />
                {displayPost.views.toLocaleString()} views
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <section className="py-12 bg-[var(--bg-primary)]">
          <div className="container-custom max-w-3xl mx-auto">
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: displayPost.content || fallbackContent }}
            />

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-[var(--border-color)] flex flex-wrap items-center gap-2">
                <Tag size={14} className="text-[var(--text-secondary)]" />
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full glass border border-[var(--border-color)] text-[var(--text-secondary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share */}
            <div className="mt-8 flex items-center gap-3">
              <span className="text-sm text-[var(--text-secondary)] flex items-center gap-1">
                <Share2 size={14} /> Share:
              </span>
              {["Twitter", "LinkedIn", "Facebook"].map((platform) => (
                <button
                  key={platform}
                  className="text-xs px-3 py-1.5 rounded-lg glass border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all"
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
        </section>
      </article>

      {/* CTA */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="container-custom text-center">
          <div className="glass border border-[var(--border-color)] rounded-3xl p-8 max-w-2xl mx-auto">
            <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-3">
              Ready to Get Similar Results?
            </h2>
            <p className="text-[var(--text-secondary)] mb-6">
              Book a free consultation with our team and let&apos;s build your digital strategy.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-white bg-gradient-to-r from-[#00D4FF] to-[#8B5CF6] hover:opacity-90 transition-opacity group"
            >
              Get Free Consultation
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
