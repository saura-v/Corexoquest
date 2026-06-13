"use client";

import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SubmitBlogPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "", excerpt: "", content: "", category: "",
    tags: "", authorName: "", authorEmail: "",
  });

  const categories = ["Case Study", "SEO", "Web Design", "PPC", "Social Media", "Branding", "Marketing", "Development"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      toast.success("Article submitted! Our team will review it within 48 hours.");
    } catch {
      toast.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:border-[#00D4FF] transition-colors";

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="text-center glass border border-[var(--border-color)] rounded-3xl p-10 max-w-md">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-3">
            Article Submitted!
          </h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Thank you for contributing. Our editorial team will review your article within 48 hours and notify you by email.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-white bg-gradient-to-r from-[#00D4FF] to-[#8B5CF6] hover:opacity-90 transition-opacity"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-[var(--bg-primary)] min-h-screen">
      <div className="container-custom max-w-2xl mx-auto py-12">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] mb-8 transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        <div className="mb-8">
          <h1 className="font-display font-bold text-4xl text-[var(--text-primary)] mb-3">
            Submit an <span className="gradient-text">Article</span>
          </h1>
          <p className="text-[var(--text-secondary)]">
            Share your expertise with our global audience. Articles are reviewed within 48 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass border border-[var(--border-color)] rounded-3xl p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Your Name *</label>
              <input name="authorName" value={form.authorName} onChange={handleChange} required placeholder="John Doe" className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Your Email *</label>
              <input name="authorEmail" type="email" value={form.authorEmail} onChange={handleChange} required placeholder="john@example.com" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Article Title *</label>
            <input name="title" value={form.title} onChange={handleChange} required placeholder="How I Grew My Business Using SEO..." className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Category *</label>
              <select name="category" value={form.category} onChange={handleChange} required className={inputClass}>
                <option value="">Select category...</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Tags (comma-separated)</label>
              <input name="tags" value={form.tags} onChange={handleChange} placeholder="SEO, Marketing, Growth" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Brief Summary *</label>
            <textarea name="excerpt" value={form.excerpt} onChange={handleChange} required rows={3} placeholder="A 2-3 sentence summary of your article..." className={inputClass + " resize-none"} />
          </div>

          <div>
            <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Full Article Content *</label>
            <textarea name="content" value={form.content} onChange={handleChange} required rows={12} placeholder="Write your full article here. You can use HTML for formatting..." className={inputClass + " resize-none font-mono text-xs"} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-display font-semibold text-white bg-gradient-to-r from-[#00D4FF] to-[#8B5CF6] hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? "Submitting..." : <><Send size={16} /> Submit for Review</>}
          </button>
        </form>
      </div>
    </div>
  );
}
