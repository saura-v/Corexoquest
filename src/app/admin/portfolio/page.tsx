import { verifyEditorOrAdmin } from "@/lib/dal";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";

async function getProjects() {
  try {
    return await prisma.portfolio.findMany({ orderBy: [{ featured: "desc" }, { sortOrder: "asc" }] });
  } catch {
    return [];
  }
}

export default async function AdminPortfolioPage() {
  await verifyEditorOrAdmin();
  const projects = await getProjects();

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-[var(--text-primary)]">Portfolio</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">{projects.length} projects</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#00D4FF] to-[#8B5CF6] hover:opacity-90 transition-opacity">
          <Plus size={16} /> Add Project
        </button>
      </div>

      <div className="glass border border-[var(--border-color)] rounded-2xl overflow-hidden">
        {projects.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-[var(--text-secondary)]">No portfolio projects yet. Add your first project!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-color)]">
                  {["Project", "Category", "Status", "Featured", "Actions"].map((h) => (
                    <th key={h} className="text-left text-xs font-medium text-[var(--text-secondary)] px-4 py-3 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-card)] transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-[var(--text-primary)]">{project.title}</p>
                      <p className="text-xs text-[var(--text-secondary)] line-clamp-1">{project.description}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-1 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                        {project.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-lg ${project.status === "PUBLISHED" ? "bg-[rgba(16,185,129,0.1)] text-[#10B981]" : "bg-[rgba(245,158,11,0.1)] text-[#F59E0B]"}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs ${project.featured ? "text-[#F59E0B]" : "text-[var(--text-secondary)]"}`}>
                        {project.featured ? "⭐ Featured" : "–"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <a href={`/portfolio/${project.slug}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-[#00D4FF] hover:bg-[rgba(0,212,255,0.1)] transition-colors">
                          <Eye size={14} />
                        </a>
                        <button className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[#8B5CF6] hover:bg-[rgba(139,92,246,0.1)] transition-colors">
                          <Edit2 size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[#EF4444] hover:bg-[rgba(239,68,68,0.1)] transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
