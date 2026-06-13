"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, FolderOpen, MessageSquare, DollarSign, Users, LogOut, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/actions/auth";
import type { SessionPayload } from "@/lib/session";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Blog Posts", href: "/admin/blogs", icon: FileText },
  { label: "Portfolio", href: "/admin/portfolio", icon: FolderOpen },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Pricing", href: "/admin/pricing", icon: DollarSign },
  { label: "Users", href: "/admin/users", icon: Users, adminOnly: true },
];

interface AdminSidebarProps {
  session: SessionPayload;
}

export default function AdminSidebar({ session }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="w-60 flex-shrink-0 glass border-r border-[var(--border-color)] min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-[var(--border-color)]">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#8B5CF6] flex items-center justify-center">
            <span className="text-white font-display font-bold text-xs">CQ</span>
          </div>
          <div>
            <div className="font-display font-bold text-sm text-[var(--text-primary)]">
              Corexoquest
            </div>
            <div className="text-xs text-[var(--text-secondary)]">Admin Panel</div>
          </div>
        </Link>
      </div>

      {/* User info */}
      <div className="px-4 py-3 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#8B5CF6] flex items-center justify-center text-white text-xs font-bold">
            {session.name.charAt(0)}
          </div>
          <div>
            <div className="text-xs font-semibold text-[var(--text-primary)] truncate max-w-[120px]">
              {session.name}
            </div>
            <div
              className="text-xs font-medium"
              style={{
                color:
                  session.role === "ADMIN"
                    ? "#F59E0B"
                    : session.role === "EDITOR"
                    ? "#00D4FF"
                    : "#64748B",
              }}
            >
              {session.role}
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          if (item.adminOnly && session.role !== "ADMIN") return null;
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                active
                  ? "bg-gradient-to-r from-[#00D4FF]/15 to-[#8B5CF6]/10 text-[var(--accent-primary)] border border-[rgba(0,212,255,0.2)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"
              )}
            >
              <div className="flex items-center gap-2.5">
                <item.icon size={16} className={active ? "text-[var(--accent-primary)]" : ""} />
                {item.label}
              </div>
              {active && <ChevronRight size={12} className="text-[var(--accent-primary)]" />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-[var(--border-color)]">
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:bg-[rgba(239,68,68,0.08)] hover:text-red-400 transition-all"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </form>
        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mt-1"
        >
          ↗ View Website
        </Link>
      </div>
    </aside>
  );
}
