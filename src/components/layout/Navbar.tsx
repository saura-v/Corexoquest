"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Web Development", href: "/services/web-development" },
      { label: "Mobile App Development", href: "/services/mobile-app" },
      { label: "SEO Optimization", href: "/services/seo-optimization" },
      { label: "PPC & Paid Ads", href: "/services/ppc-advertising" },
      { label: "Social Media", href: "/services/social-media" },
      { label: "Graphic Design", href: "/services/graphic-design" },
      { label: "E-Commerce", href: "/services/ecommerce" },
      { label: "UI/UX Design", href: "/services/ui-ux-design" },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        padding: isScrolled ? "0.75rem 0" : "1.25rem 0",
        background: isScrolled ? "var(--nav-bg-scrolled)" : "transparent",
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
        borderBottom: isScrolled ? "1px solid var(--border-color)" : "none",
        boxShadow: isScrolled ? "var(--shadow)" : "none",
      }}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between" ref={dropdownRef}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF] to-[#8B5CF6]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-display font-bold text-base">CQ</span>
              </div>
            </div>
            <span className="font-display font-bold text-xl transition-colors" style={{ color: "var(--nav-logo-color)" }}>
              Corexoquest
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href} className="relative">
                {item.children ? (
                  <div>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                      className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                      style={{ color: pathname.startsWith(item.href) ? "var(--nav-text-active)" : "var(--nav-text)" }}
                    >
                      {item.label}
                      <ChevronDown size={14} className={cn("transition-transform duration-200", activeDropdown === item.label && "rotate-180")} />
                    </button>
                    {activeDropdown === item.label && (
                      <div
                        className="absolute top-full left-0 mt-2 w-56 rounded-2xl overflow-hidden z-50"
                        style={{
                          background: "var(--nav-dropdown-bg)",
                          backdropFilter: "blur(20px)",
                          WebkitBackdropFilter: "blur(20px)",
                          border: "1px solid var(--nav-dropdown-border)",
                          boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
                        }}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-3 text-sm transition-all duration-200"
                            style={{
                              color: pathname === child.href ? "var(--nav-text-active)" : "var(--nav-text)",
                              background: pathname === child.href ? "rgba(0,212,255,0.06)" : "transparent",
                            }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.06)";
                              (e.currentTarget as HTMLElement).style.color = "var(--nav-text-active)";
                            }}
                            onMouseLeave={e => {
                              (e.currentTarget as HTMLElement).style.background = pathname === child.href ? "rgba(0,212,255,0.06)" : "transparent";
                              (e.currentTarget as HTMLElement).style.color = pathname === child.href ? "var(--nav-text-active)" : "var(--nav-text)";
                            }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{ color: pathname === item.href ? "var(--nav-text-active)" : "var(--nav-text)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--nav-text-active)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = pathname === item.href ? "var(--nav-text-active)" : "var(--nav-text)"; }}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold font-display text-white bg-gradient-to-r from-[#00D4FF] to-[#8B5CF6] hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200"
              style={{ boxShadow: "0 4px 20px rgba(0,212,255,0.25)" }}
            >
              Free Audit
            </Link>
            <button
              className="lg:hidden p-2 rounded-xl transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="lg:hidden mt-4 pb-4 rounded-2xl overflow-hidden"
            style={{
              background: "var(--nav-dropdown-bg)",
              backdropFilter: "blur(20px)",
              border: "1px solid var(--border-color)",
            }}
          >
            <nav className="p-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className="block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{
                      color: pathname === item.href ? "var(--nav-text-active)" : "var(--nav-text)",
                      background: pathname === item.href ? "rgba(0,212,255,0.06)" : "transparent",
                    }}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 rounded-lg text-xs transition-colors"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          → {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="block w-full text-center px-4 py-3 rounded-xl text-sm font-semibold font-display text-white bg-gradient-to-r from-[#00D4FF] to-[#8B5CF6]"
                >
                  Get Free Audit
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
