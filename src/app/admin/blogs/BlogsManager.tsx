"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Eye, Trash2, Filter, Search } from "lucide-react";
import toast from "react-hot-toast";
import { formatDate } from "@/lib/utils";
import type { BlogStatus } from "@/types";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  status: string;
  authorName: string;
  authorEmail: string;
  views: number;
  createdAt: Date;
}

interface BlogsManagerProps {
  initialBlogs: Blog[];
}

export default function BlogsManager({ initialBlogs }: BlogsManagerProps) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [filter, setFilter] = useState<"ALL" | BlogStatus>("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<string | null>(null);

  const filtered = blogs.filter((b) => {
    if (filter !== "ALL" && b.status !== filter) return false;
    if (search && !b.title.toLowerCase().includes(search.toLowerCase()) && !b.authorName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const updateStatus = async (id: string, status: BlogStatus) => {
    setLoading(id);
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      setBlogs((prev) => prev.map((b) => b.id === id ? { ...b, status } : b));
      toast.success(`Post ${status === "APPROVED" ? "approved" : "rejected"} successfully`);
    } catch {
      toast.error("Failed to update status");
    } finally {
      setLoading(null);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Delete this post permanently?")) return;
    setLoading(id);
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      toast.success("Post deleted");
    } catch {
      toast.error("Failed to delete post");
    } finally {
      setLoading(null);
    }
  };

  const statusCounts = {
    ALL: blogs.length,
    PENDING: blogs.filter((b) => b.status === "PENDING").length,
    APPROVED: blogs.filter((b) => b.status === "APPROVED").length,
    REJECTED: blogs.filter((b) => b.status === "REJECTED").length,
  };

  const statusColor: Record<string, string> = {
    PENDING: "#F59E0B",
    APPROVED: "#10B981",
    REJECTED: "#EF4444",
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display font-bold text-2xl text-[var(--text-primary)]">Blog Management</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Review and approve submitted articles</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:border-[#00D4FF] transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {(["ALL", "PENDING", "APPROVED", "REJECTED"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === status
                  ? "bg-[var(--accent-primary)] text-[#04050D]"
                  : "glass border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {status} ({statusCounts[status]})
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass border border-[var(--border-color)] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                {["Title", "Author", "Category", "Status", "Date", "Views", "Actions"].map((h) => (
                  <th key={h} className="text-left text-xs font-medium text-[var(--text-secondary)] px-4 py-3 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-sm text-[var(--text-secondary)]">
                    No blog posts found
                  </td>
                </tr>
              ) : (
                filtered.map((blog) => (
                  <tr key={blog.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-card)] transition-colors">
                    <td className="px-4 py-3 max-w-xs">
                      <p className="text-sm font-medium text-[var(--text-primary)] truncate">{blog.title}</p>
                      <p className="text-xs text-[var(--text-secondary)] truncate">{blog.excerpt}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-[var(--text-primary)]">{blog.authorName}</div>
                      <div className="text-xs text-[var(--text-secondary)]">{blog.authorEmail}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-1 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs font-medium px-2 py-1 rounded-lg"
                        style={{
                          background: `${statusColor[blog.status]}15`,
                          color: statusColor[blog.status],
                          border: `1px solid ${statusColor[blog.status]}30`,
                        }}
                      >
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--text-secondary)] whitespace-nowrap">
                      {formatDate(blog.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--text-secondary)]">
                      {blog.views}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        {blog.status === "PENDING" && (
                          <>
                            <button
                              onClick={() => updateStatus(blog.id, "APPROVED")}
                              disabled={loading === blog.id}
                              className="p-1.5 rounded-lg text-[#10B981] hover:bg-[rgba(16,185,129,0.1)] transition-colors disabled:opacity-50"
                              title="Approve"
                            >
                              <CheckCircle2 size={15} />
                            </button>
                            <button
                              onClick={() => updateStatus(blog.id, "REJECTED")}
                              disabled={loading === blog.id}
                              className="p-1.5 rounded-lg text-[#EF4444] hover:bg-[rgba(239,68,68,0.1)] transition-colors disabled:opacity-50"
                              title="Reject"
                            >
                              <XCircle size={15} />
                            </button>
                          </>
                        )}
                        {blog.status === "APPROVED" && (
                          <a
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-[#00D4FF] hover:bg-[rgba(0,212,255,0.1)] transition-colors"
                            title="View"
                          >
                            <Eye size={15} />
                          </a>
                        )}
                        <button
                          onClick={() => deletePost(blog.id)}
                          disabled={loading === blog.id}
                          className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[#EF4444] hover:bg-[rgba(239,68,68,0.1)] transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
