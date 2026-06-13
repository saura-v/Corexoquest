import { verifySession } from "@/lib/dal";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { FileText, FolderOpen, MessageSquare, Users, TrendingUp, Eye, Clock, ArrowRight } from "lucide-react";

async function getStats() {
  try {
    const [totalBlogs, pendingBlogs, totalProjects, unreadMessages, totalUsers] = await Promise.all([
      prisma.blog.count(),
      prisma.blog.count({ where: { status: "PENDING" } }),
      prisma.portfolio.count(),
      prisma.contactMessage.count({ where: { status: "UNREAD" } }),
      prisma.user.count(),
    ]);
    const recentMessages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
    const recentBlogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
    return { totalBlogs, pendingBlogs, totalProjects, unreadMessages, totalUsers, recentMessages, recentBlogs };
  } catch {
    return { totalBlogs: 0, pendingBlogs: 0, totalProjects: 0, unreadMessages: 0, totalUsers: 0, recentMessages: [], recentBlogs: [] };
  }
}

export default async function AdminDashboard() {
  const session = await verifySession();
  const stats = await getStats();

  const statCards = [
    { label: "Total Blog Posts", value: stats.totalBlogs, icon: FileText, color: "#00D4FF", href: "/admin/blogs", sub: `${stats.pendingBlogs} pending review` },
    { label: "Portfolio Projects", value: stats.totalProjects, icon: FolderOpen, color: "#8B5CF6", href: "/admin/portfolio", sub: "Published projects" },
    { label: "Unread Messages", value: stats.unreadMessages, icon: MessageSquare, color: "#F59E0B", href: "/admin/messages", sub: "Awaiting response", urgent: stats.unreadMessages > 0 },
    { label: "Team Members", value: stats.totalUsers, icon: Users, color: "#10B981", href: "/admin/users", sub: "Admin & editors" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display font-bold text-2xl text-[var(--text-primary)]">
          Dashboard
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Good morning, {session.name}. Here&apos;s your overview.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`group relative glass border rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300 ${
              card.urgent ? "border-[rgba(245,158,11,0.4)]" : "border-[var(--border-color)] hover:border-[rgba(0,212,255,0.2)]"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${card.color}15`, border: `1px solid ${card.color}30` }}
              >
                <card.icon size={18} style={{ color: card.color }} />
              </div>
              <ArrowRight size={14} className="text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
            <div className="font-display font-bold text-3xl text-[var(--text-primary)] mb-1">
              {card.value}
            </div>
            <div className="text-sm font-medium text-[var(--text-secondary)]">{card.label}</div>
            <div className="text-xs text-[var(--text-secondary)] mt-0.5 opacity-70">{card.sub}</div>
          </Link>
        ))}
      </div>

      {/* Recent activity grid */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Recent messages */}
        <div className="glass border border-[var(--border-color)] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-sm text-[var(--text-primary)]">
              Recent Messages
            </h2>
            <Link href="/admin/messages" className="text-xs text-[var(--accent-primary)] hover:underline">
              View all →
            </Link>
          </div>
          {stats.recentMessages.length === 0 ? (
            <p className="text-xs text-[var(--text-secondary)] text-center py-6">No messages yet</p>
          ) : (
            <div className="space-y-3">
              {stats.recentMessages.map((msg) => (
                <Link
                  key={msg.id}
                  href="/admin/messages"
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--bg-card)] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#8B5CF6] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {msg.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[var(--text-primary)] truncate">{msg.name}</span>
                      {msg.status === "UNREAD" && (
                        <span className="text-xs bg-[rgba(245,158,11,0.2)] text-[#F59E0B] px-1.5 py-0.5 rounded-full ml-2 flex-shrink-0">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] truncate">{msg.message}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent blog posts */}
        <div className="glass border border-[var(--border-color)] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-sm text-[var(--text-primary)]">
              Blog Queue
            </h2>
            <Link href="/admin/blogs" className="text-xs text-[var(--accent-primary)] hover:underline">
              View all →
            </Link>
          </div>
          {stats.recentBlogs.length === 0 ? (
            <p className="text-xs text-[var(--text-secondary)] text-center py-6">No posts submitted yet</p>
          ) : (
            <div className="space-y-3">
              {stats.recentBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  href="/admin/blogs"
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--bg-card)] transition-colors"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: blog.status === "PENDING" ? "rgba(245,158,11,0.15)" : blog.status === "APPROVED" ? "rgba(0,212,255,0.15)" : "rgba(239,68,68,0.15)",
                      color: blog.status === "PENDING" ? "#F59E0B" : blog.status === "APPROVED" ? "#00D4FF" : "#EF4444",
                    }}
                  >
                    <FileText size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate line-clamp-1">{blog.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-full"
                        style={{
                          background: blog.status === "PENDING" ? "rgba(245,158,11,0.15)" : blog.status === "APPROVED" ? "rgba(0,212,255,0.15)" : "rgba(239,68,68,0.15)",
                          color: blog.status === "PENDING" ? "#F59E0B" : blog.status === "APPROVED" ? "#00D4FF" : "#EF4444",
                        }}
                      >
                        {blog.status}
                      </span>
                      <span className="text-xs text-[var(--text-secondary)]">{blog.authorName}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="glass border border-[var(--border-color)] rounded-2xl p-5">
        <h2 className="font-display font-semibold text-sm text-[var(--text-primary)] mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Review Pending Posts", href: "/admin/blogs", color: "#F59E0B" },
            { label: "View All Messages", href: "/admin/messages", color: "#00D4FF" },
            { label: "Add Portfolio Project", href: "/admin/portfolio", color: "#8B5CF6" },
            { label: "Manage Pricing", href: "/admin/pricing", color: "#10B981" },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="text-xs font-medium px-4 py-2 rounded-xl border transition-all hover:-translate-y-0.5"
              style={{
                color: action.color,
                borderColor: `${action.color}40`,
                background: `${action.color}08`,
              }}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
