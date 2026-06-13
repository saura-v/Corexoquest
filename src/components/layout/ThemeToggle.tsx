"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all duration-300 group overflow-hidden"
    >
      <span className="absolute inset-0 bg-[rgba(0,212,255,0.05)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {isDark ? (
        <Sun size={16} className="relative z-10 transition-transform duration-300 group-hover:rotate-12" />
      ) : (
        <Moon size={16} className="relative z-10 transition-transform duration-300 group-hover:-rotate-12" />
      )}
    </button>
  );
}
