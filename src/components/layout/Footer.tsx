"use client";

import Link from "next/link";
import { MapPin, Mail, Phone, Globe, Hash, Rss, Share2, Video, ArrowRight } from "lucide-react";

const services = [
  { label: "Web Development", href: "/services/web-development" },
  { label: "Mobile App Dev", href: "/services/mobile-app" },
  { label: "SEO Optimization", href: "/services/seo-optimization" },
  { label: "PPC Advertising", href: "/services/ppc-advertising" },
  { label: "Social Media", href: "/services/social-media" },
  { label: "Graphic Design", href: "/services/graphic-design" },
  { label: "E-Commerce", href: "/services/ecommerce" },
  { label: "Data Analytics", href: "/services/data-analytics" },
];

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Free Audit", href: "/contact?type=audit" },
];

const socials = [
  { icon: Globe, href: "#", label: "Facebook" },
  { icon: Hash, href: "#", label: "Twitter/X" },
  { icon: Share2, href: "#", label: "Instagram" },
  { icon: Rss, href: "#", label: "LinkedIn" },
  { icon: Video, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-color)", position: "relative", overflow: "hidden" }}>
      {/* Bg blobs */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "24rem", height: "24rem", borderRadius: "999px", background: "#00D4FF", opacity: 0.03, transform: "translate(-50%,-50%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: "24rem", height: "24rem", borderRadius: "999px", background: "#8B5CF6", opacity: 0.03, transform: "translate(50%,50%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>

        {/* Top CTA Banner */}
        <div style={{ padding: "3rem 0", borderBottom: "1px solid var(--border-color)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
          <div>
            <h3 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: "4px" }}>
              Ready to Start Your Quest?
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              Get a free digital audit and discover your growth potential.
            </p>
          </div>
          <Link
            href="/contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "0.75rem 1.75rem", borderRadius: "12px",
              background: "linear-gradient(135deg,#00D4FF,#8B5CF6)",
              color: "white", fontWeight: 700, fontSize: "0.9rem",
              fontFamily: "Space Grotesk,sans-serif", textDecoration: "none",
              whiteSpace: "nowrap", boxShadow: "0 4px 20px rgba(0,212,255,0.25)",
              transition: "all 0.2s ease",
            }}
          >
            Get Free Audit <ArrowRight size={15} />
          </Link>
        </div>

        {/* Main Grid */}
        <div style={{ padding: "3rem 0", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "2rem", borderBottom: "1px solid var(--border-color)" }}>

          {/* Brand */}
          <div style={{ gridColumn: "span 1" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", marginBottom: "1rem" }}>
              <div style={{ width: 36, height: 36, borderRadius: "10px", background: "linear-gradient(135deg,#00D4FF,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: "white", fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, fontSize: "0.875rem" }}>CQ</span>
              </div>
              <span style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, fontSize: "1.15rem", color: "var(--text-primary)" }}>Corexoquest</span>
            </Link>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
              Your Quest for Digital Excellence Starts Here. A full-service digital agency based in Nepal, serving clients worldwide.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a href="mailto:info.corexoquest@gmail.com" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", color: "var(--text-secondary)", textDecoration: "none" }}>
                <Mail size={13} style={{ color: "var(--accent)", flexShrink: 0 }} />
                info.corexoquest@gmail.com
              </a>
              <a href="https://wa.me/9779716390682" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", color: "var(--text-secondary)", textDecoration: "none" }}>
                <Phone size={13} style={{ color: "#25D366", flexShrink: 0 }} />
                +977 9716390682
              </a>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                <MapPin size={13} style={{ color: "var(--accent2)", flexShrink: 0 }} />
                Kathmandu, Nepal • Worldwide
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)", marginBottom: "1rem" }}>
              Our Services
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} style={{ fontSize: "0.83rem", color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)", marginBottom: "1rem" }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} style={{ fontSize: "0.83rem", color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)", marginBottom: "0.75rem" }}>
              Stay Updated
            </h4>
            <p style={{ fontSize: "0.83rem", color: "var(--text-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
              Get weekly digital marketing insights and industry news.
            </p>
            <form style={{ display: "flex", flexDirection: "column", gap: "8px" }} action="/api/contact" method="POST">
              <input
                type="email"
                placeholder="Your email address"
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: "10px",
                  background: "var(--bg-card)", border: "1px solid var(--border-color)",
                  fontSize: "0.83rem", color: "var(--text-primary)", outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: "10px",
                  background: "linear-gradient(135deg,#00D4FF,#8B5CF6)",
                  color: "white", fontWeight: 600, fontSize: "0.875rem",
                  fontFamily: "Space Grotesk,sans-serif", border: "none",
                  cursor: "pointer",
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ padding: "1.5rem 0", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
            © {new Date().getFullYear()} Corexoquest. All rights reserved. Made with ❤️ in Nepal.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                style={{
                  width: 32, height: 32, borderRadius: "8px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "var(--bg-card)", border: "1px solid var(--border-color)",
                  color: "var(--text-secondary)", textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)"; }}
              >
                <s.icon size={13} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
