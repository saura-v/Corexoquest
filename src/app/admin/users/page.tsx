import { verifyAdmin } from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserPlus, Shield, Edit2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

async function getUsers() {
  try {
    return await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
  } catch {
    return [];
  }
}

export default async function AdminUsersPage() {
  await verifyAdmin();
  const users = await getUsers();

  const roleColor: Record<string, string> = {
    ADMIN: "#F59E0B",
    EDITOR: "#00D4FF",
    VIEWER: "#64748B",
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-[var(--text-primary)]">Team Members</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">{users.length} users</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#00D4FF] to-[#8B5CF6] hover:opacity-90 transition-opacity">
          <UserPlus size={16} /> Add User
        </button>
      </div>

      {/* Role info */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { role: "ADMIN", desc: "Full access to all features including user management", color: "#F59E0B" },
          { role: "EDITOR", desc: "Can manage blogs, portfolio, and messages", color: "#00D4FF" },
          { role: "VIEWER", desc: "Read-only access to dashboard and messages", color: "#64748B" },
        ].map((r) => (
          <div key={r.role} className="glass border border-[var(--border-color)] rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={14} style={{ color: r.color }} />
              <span className="text-sm font-medium" style={{ color: r.color }}>{r.role}</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">{r.desc}</p>
          </div>
        ))}
      </div>

      <div className="glass border border-[var(--border-color)] rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border-color)]">
              {["User", "Email", "Role", "Joined", "Actions"].map((h) => (
                <th key={h} className="text-left text-xs font-medium text-[var(--text-secondary)] px-4 py-3 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-card)] transition-colors last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: `linear-gradient(135deg, ${roleColor[user.role]}, ${roleColor[user.role]}80)` }}
                    >
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-[var(--text-primary)]">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{user.email}</td>
                <td className="px-4 py-3">
                  <span
                    className="text-xs font-medium px-2 py-1 rounded-lg"
                    style={{ background: `${roleColor[user.role]}15`, color: roleColor[user.role], border: `1px solid ${roleColor[user.role]}30` }}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-[var(--text-secondary)]">{formatDate(user.createdAt)}</td>
                <td className="px-4 py-3">
                  <button className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[#8B5CF6] hover:bg-[rgba(139,92,246,0.1)] transition-colors">
                    <Edit2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
