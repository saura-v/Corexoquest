"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import { Eye, EyeOff, Lock, Mail, Zap } from "lucide-react";
import { useState } from "react";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)" }} />

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#8B5CF6] flex items-center justify-center">
              <span className="text-white font-display font-bold">CQ</span>
            </div>
            <span className="font-display font-bold text-xl text-[var(--text-primary)]">
              Corexoquest
            </span>
          </div>
          <h1 className="font-display font-bold text-2xl text-[var(--text-primary)]">
            Admin Panel
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Sign in to manage your website
          </p>
        </div>

        {/* Form */}
        <div className="glass border border-[var(--border-color)] rounded-3xl p-7">
          <form action={action} className="space-y-4">
            {/* General error */}
            {state?.errors?.general && (
              <div className="px-4 py-3 rounded-xl bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] text-sm text-red-400">
                {state.errors.general[0]}
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 flex items-center gap-1">
                <Mail size={12} /> Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@corexoquest.com"
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] transition-colors"
              />
              {state?.errors?.email && (
                <p className="text-xs text-red-400 mt-1">{state.errors.email[0]}</p>
              )}
            </div>

            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 flex items-center gap-1">
                <Lock size={12} /> Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {state?.errors?.password && (
                <p className="text-xs text-red-400 mt-1">{state.errors.password[0]}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-display font-semibold text-white bg-gradient-to-r from-[#00D4FF] to-[#8B5CF6] hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {pending ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Zap size={16} />
              )}
              {pending ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[var(--text-secondary)] mt-4">
          Authorized personnel only. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
}
