"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services", href: "/services",
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

const ITEM_STYLE: React.CSSProperties = {
  padding: "8px 16px",
  borderRadius: "10px",
  fontSize: "14px",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  textDecoration: "none",
  whiteSpace: "nowrap" as const,
  background: "transparent",
  border: "none",
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setActiveDropdown(null); }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setActiveDropdown(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          padding: isScrolled ? "10px 0" : "18px 0",
          transition: "all 0.4s ease",
        }}
      >
        <div className="container-custom">
          <div
            style={isScrolled ? {
              background: "var(--nav-bg-scrolled)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderRadius: "14px",
              border: "1px solid var(--border-color)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              padding: "6px 20px",
              transition: "all 0.4s ease",
            } : {
              padding: "0",
              transition: "all 0.4s ease",
            }}
          >
            <nav
              ref={dropdownRef}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
              {/* ── Logo ── */}
              <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}>
                <div style={{ position: "relative", width: 34, height: 34, borderRadius: "10px", overflow: "hidden", flexShrink: 0 }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #00D4FF, #8B5CF6)" }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "white", fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, fontSize: "13px" }}>CQ</span>
                  </div>
                </div>
                <span style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, fontSize: "18px", color: "var(--nav-logo-color)" }}>
                  Corexoquest
                </span>
              </Link>

              {/* ── Desktop nav ── */}
              <ul style={{ display: "flex", alignItems: "center", gap: "4px", listStyle: "none", margin: 0, padding: 0 }} className="desktop-nav">
                {navItems.map((item) => {
                  const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  return (
                    <li key={item.href} style={{ position: "relative" }}>
                      {item.children ? (
                        <>
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                            style={{
                              ...ITEM_STYLE,
                              color: isActive ? "var(--nav-text-active)" : "var(--nav-text)",
                              background: isActive ? "rgba(0,212,255,0.08)" : "transparent",
                            }}
                            onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.06)"; (e.currentTarget as HTMLElement).style.color = "var(--nav-text-active)"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = isActive ? "rgba(0,212,255,0.08)" : "transparent"; (e.currentTarget as HTMLElement).style.color = isActive ? "var(--nav-text-active)" : "var(--nav-text)"; }}
                          >
                            {item.label}
                            <ChevronDown size={13} style={{ opacity: 0.6, transition: "transform 0.2s", transform: activeDropdown === item.label ? "rotate(180deg)" : "rotate(0)" }} />
                          </button>

                          {activeDropdown === item.label && (
                            <div style={{
                              position: "absolute", top: "calc(100% + 8px)", left: 0,
                              width: "220px", borderRadius: "14px", overflow: "hidden", zIndex: 50,
                              background: "var(--nav-dropdown-bg)",
                              backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
                              border: "1px solid var(--nav-dropdown-border)",
                              boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
                              padding: "6px",
                            }}>
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  style={{
                                    display: "flex", alignItems: "center", gap: "8px",
                                    padding: "10px 14px", borderRadius: "10px",
                                    fontSize: "13px", textDecoration: "none",
                                    color: pathname === child.href ? "var(--nav-text-active)" : "var(--nav-text)",
                                    background: pathname === child.href ? "rgba(0,212,255,0.08)" : "transparent",
                                    transition: "all 0.15s ease",
                                  }}
                                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.07)"; (e.currentTarget as HTMLElement).style.color = "var(--nav-text-active)"; }}
                                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = pathname === child.href ? "rgba(0,212,255,0.08)" : "transparent"; (e.currentTarget as HTMLElement).style.color = pathname === child.href ? "var(--nav-text-active)" : "var(--nav-text)"; }}
                                >
                                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor", opacity: 0.4, flexShrink: 0 }} />
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          style={{
                            ...ITEM_STYLE,
                            color: isActive ? "var(--nav-text-active)" : "var(--nav-text)",
                            background: isActive ? "rgba(0,212,255,0.08)" : "transparent",
                            position: "relative",
                          }}
                          onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.06)"; (e.currentTarget as HTMLElement).style.color = "var(--nav-text-active)"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = isActive ? "rgba(0,212,255,0.08)" : "transparent"; (e.currentTarget as HTMLElement).style.color = isActive ? "var(--nav-text-active)" : "var(--nav-text)"; }}
                        >
                          {item.label}
                          {isActive && (
                            <span style={{ position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)", width: 4, height: 4, borderRadius: "50%", background: "#00D4FF" }} />
                          )}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* ── Right ── */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <ThemeToggle />
                <Link
                  href="/contact"
                  className="nav-audit-btn desktop-only"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "9px 18px", borderRadius: "10px",
                    fontSize: "14px", fontWeight: 600, fontFamily: "Space Grotesk,sans-serif",
                    color: "white", textDecoration: "none",
                    background: "linear-gradient(135deg, #00D4FF, #8B5CF6)",
                    boxShadow: "0 4px 16px rgba(0,212,255,0.3)",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,212,255,0.4)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,212,255,0.3)"; }}
                >
                  <Sparkles size={13} />
                  Free Audit
                </Link>
                <button
                  className="mobile-menu-btn"
                  style={{ color: "var(--text-secondary)", background: "rgba(0,212,255,0.05)", border: "1px solid var(--border-color)", padding: "8px", borderRadius: "10px", cursor: "pointer", display: "none" }}
                  onClick={() => setMobileOpen(!mobileOpen)}
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div className="container-custom" style={{ marginTop: "8px" }}>
            <div style={{
              borderRadius: "16px", overflow: "hidden",
              background: "var(--nav-dropdown-bg)",
              backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
              border: "1px solid var(--border-color)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            }}>
              <nav style={{ padding: "12px" }}>
                {navItems.map((item) => (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      style={{
                        display: "block", padding: "12px 16px", borderRadius: "10px",
                        fontSize: "14px", fontWeight: 500, textDecoration: "none",
                        color: pathname === item.href ? "var(--nav-text-active)" : "var(--nav-text)",
                        background: pathname === item.href ? "rgba(0,212,255,0.07)" : "transparent",
                        marginBottom: "2px",
                      }}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div style={{ marginLeft: "16px", marginBottom: "4px" }}>
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            style={{
                              display: "flex", alignItems: "center", gap: "8px",
                              padding: "8px 16px", borderRadius: "8px",
                              fontSize: "12px", textDecoration: "none",
                              color: "var(--text-secondary)", marginBottom: "2px",
                            }}
                          >
                            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "currentColor", opacity: 0.4, flexShrink: 0 }} />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div style={{ padding: "8px 4px 4px" }}>
                  <Link
                    href="/contact"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                      padding: "12px 16px", borderRadius: "10px",
                      fontSize: "14px", fontWeight: 600, fontFamily: "Space Grotesk,sans-serif",
                      color: "white", textDecoration: "none",
                      background: "linear-gradient(135deg, #00D4FF, #8B5CF6)",
                    }}
                  >
                    <Sparkles size={14} /> Get Free Audit
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      <style>{`
        @keyframes auditPulse {
          0%,100% { box-shadow: 0 4px 16px rgba(0,212,255,0.3), 0 0 0 0 rgba(0,212,255,0); }
          50% { box-shadow: 0 4px 20px rgba(0,212,255,0.4), 0 0 0 5px rgba(0,212,255,0); }
        }
        .nav-audit-btn { animation: auditPulse 3s ease-in-out infinite; }

        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .desktop-only { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 1025px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}
