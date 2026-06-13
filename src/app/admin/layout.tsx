import type { ReactNode } from "react";
import { verifySession } from "@/lib/dal";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await verifySession();

  return (
    <div className="flex min-h-screen bg-[var(--bg-primary)]">
      <AdminSidebar session={session} />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 flex items-center justify-between px-6 border-b border-[var(--border-color)] glass sticky top-0 z-10">
          <div className="text-sm text-[var(--text-secondary)]">
            Welcome back, <span className="text-[var(--text-primary)] font-medium">{session.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div
              className="text-xs font-medium px-2.5 py-1 rounded-lg"
              style={{
                background: session.role === "ADMIN" ? "rgba(245,158,11,0.1)" : "rgba(0,212,255,0.1)",
                color: session.role === "ADMIN" ? "#F59E0B" : "#00D4FF",
              }}
            >
              {session.role}
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
