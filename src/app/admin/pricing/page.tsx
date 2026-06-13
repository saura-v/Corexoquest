import { verifyAdmin } from "@/lib/dal";
import prisma from "@/lib/prisma";
import { Plus, Edit2, Trash2, Star } from "lucide-react";
import { parseJsonField } from "@/lib/utils";

async function getPricingPlans() {
  try {
    return await prisma.pricing.findMany({ orderBy: { sortOrder: "asc" } });
  } catch {
    return [];
  }
}

export default async function AdminPricingPage() {
  await verifyAdmin();
  const plans = await getPricingPlans();

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-[var(--text-primary)]">Pricing Plans</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">{plans.length} plans configured</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#00D4FF] to-[#8B5CF6] hover:opacity-90 transition-opacity">
          <Plus size={16} /> Add Plan
        </button>
      </div>

      {plans.length === 0 ? (
        <div className="glass border border-[var(--border-color)] rounded-2xl py-16 text-center">
          <p className="text-sm text-[var(--text-secondary)]">No pricing plans yet. Seed the database to get started.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {plans.map((plan) => {
            const features = parseJsonField<string[]>(plan.features, []);
            return (
              <div
                key={plan.id}
                className={`glass border rounded-3xl p-5 ${plan.highlighted ? "border-[rgba(139,92,246,0.4)]" : "border-[var(--border-color)]"}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">{plan.name}</h3>
                    {plan.badge && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[rgba(139,92,246,0.1)] text-[#8B5CF6] border border-[rgba(139,92,246,0.2)]">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  {plan.highlighted && <Star size={16} className="text-[#F59E0B]" />}
                </div>

                <div className="font-display font-bold text-3xl text-[var(--accent-primary)] mb-3">
                  {plan.price}
                  <span className="text-sm font-normal text-[var(--text-secondary)]"> /{plan.period}</span>
                </div>

                <p className="text-sm text-[var(--text-secondary)] mb-4">{plan.description}</p>

                <ul className="space-y-1 mb-5">
                  {features.slice(0, 4).map((f) => (
                    <li key={f} className="text-xs text-[var(--text-secondary)] flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[var(--accent-primary)]" />
                      {f}
                    </li>
                  ))}
                  {features.length > 4 && (
                    <li className="text-xs text-[var(--text-secondary)]">+{features.length - 4} more features</li>
                  )}
                </ul>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-colors">
                    <Edit2 size={12} /> Edit
                  </button>
                  <button className="p-2 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[#EF4444] hover:border-[rgba(239,68,68,0.3)] transition-colors">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
