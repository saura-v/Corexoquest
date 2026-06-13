import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Heart, Zap, Globe, Users, Award, CheckCircle2, Share2, Hash } from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Corexoquest — Nepal's digital agency on a quest to help businesses worldwide achieve digital excellence.",
};

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description: "Every strategy we implement is laser-focused on delivering measurable results — leads, revenue, and growth.",
    color: "#00D4FF",
  },
  {
    icon: Heart,
    title: "Client-First",
    description: "We treat every client's business as our own. Your success is literally our success — and we take that seriously.",
    color: "#EC4899",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We stay ahead of digital trends, continuously learning and applying cutting-edge techniques and technologies.",
    color: "#F59E0B",
  },
  {
    icon: Globe,
    title: "Global Thinking",
    description: "Based in Nepal, thinking globally. We bring world-class digital expertise at a price that makes sense for your business.",
    color: "#8B5CF6",
  },
];

const teamMembers = [
  {
    name: "Alex Kumar",
    role: "Founder & CEO",
    bio: "10+ years in digital strategy. Former consultant for Fortune 500 companies.",
    color: "#00D4FF",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Priya Shrestha",
    role: "Head of Design",
    bio: "Award-winning UI/UX designer with a passion for pixel-perfect experiences.",
    color: "#8B5CF6",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Rahul Maharjan",
    role: "Lead Developer",
    bio: "Full-stack engineer specializing in Next.js, React Native, and cloud architecture.",
    color: "#F59E0B",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    bio: "Google Ads certified, ex-agency performance marketer. 8+ years driving digital ROI.",
    color: "#10B981",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Nikhil Thapa",
    role: "SEO Specialist",
    bio: "Technical SEO expert who has taken 20+ websites to the first page of Google.",
    color: "#EF4444",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Emily Chen",
    role: "Content Strategist",
    bio: "Content strategist and copywriter who turns complex ideas into compelling stories.",
    color: "#06B6D4",
    social: { linkedin: "#", twitter: "#" },
  },
];

const milestones = [
  { year: "2019", title: "Founded", desc: "Corexoquest was born in Kathmandu with a mission to bring world-class digital solutions to Nepal." },
  { year: "2020", title: "First 10 Clients", desc: "Rapidly grew to serve businesses across Nepal, launching our first major e-commerce projects." },
  { year: "2021", title: "Global Expansion", desc: "Started serving international clients in USA, UK, and Australia while maintaining our Nepali roots." },
  { year: "2022", title: "Team of 15", desc: "Expanded our team with specialists in SEO, PPC, development, and design." },
  { year: "2023", title: "100+ Projects", desc: "Hit the milestone of 100 successfully delivered projects with a 98% client retention rate." },
  { year: "2024", title: "Award-Winning Agency", desc: "Recognized as Nepal's top digital agency, delivering campaigns with proven ROI for global clients." },
  { year: "2025", title: "150+ Projects", desc: "Continued growth with new service offerings in AI integration and advanced analytics." },
  { year: "2026", title: "The Quest Continues", desc: "Expanding into new markets and launching innovative digital products for clients worldwide." },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden bg-[var(--bg-primary)]">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)" }} />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(0,212,255,0.2)] text-xs font-medium text-[var(--accent-primary)] mb-6 bg-[rgba(0,212,255,0.05)]">
              🌏 Our Story
            </span>
            <h1 className="font-display font-bold text-5xl sm:text-6xl text-[var(--text-primary)] mb-6">
              We&apos;re on a{" "}
              <span className="gradient-text">Quest</span> to Help<br />
              Businesses Grow
            </h1>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
              Born in Kathmandu, Nepal — built for the world. Corexoquest is a team of digital
              strategists, designers, and developers united by one mission: helping businesses achieve
              extraordinary results online.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-display font-semibold text-white bg-gradient-to-r from-[#00D4FF] to-[#8B5CF6] hover:opacity-90 hover:-translate-y-1 transition-all duration-300 group"
            >
              Work With Us
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: 150, suffix: "+", label: "Projects Delivered", color: "#00D4FF" },
              { value: 50, suffix: "+", label: "Happy Clients", color: "#8B5CF6" },
              { value: 7, suffix: "+", label: "Years of Excellence", color: "#F59E0B" },
              { value: 20, suffix: "+", label: "Countries Served", color: "#10B981" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-bold text-4xl mb-1" style={{ color: stat.color }}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-[var(--text-secondary)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-[var(--bg-primary)]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(0,212,255,0.2)] text-xs font-medium text-[var(--accent-primary)] mb-5 bg-[rgba(0,212,255,0.05)]">
                🎯 Our Mission
              </span>
              <h2 className="font-display font-bold text-4xl text-[var(--text-primary)] mb-5">
                Digital Excellence Is Not a Destination,{" "}
                <span className="gradient-text">It&apos;s a Quest</span>
              </h2>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
                We founded Corexoquest with a simple but powerful belief: that great digital
                experiences should be accessible to businesses of every size — not just enterprises with
                massive budgets.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                Based in Kathmandu, Nepal, we&apos;ve built a team of world-class digital experts who
                deliver Fortune 500-quality work at startup-friendly prices. Every strategy, every
                design, every campaign is crafted with one goal in mind: your growth.
              </p>
              <div className="space-y-3">
                {[
                  "Senior-level experts on every project",
                  "Transparent reporting & communication",
                  "Data-driven strategies with proven ROI",
                  "Long-term partnerships, not one-off projects",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-[#00D4FF] flex-shrink-0" />
                    <span className="text-[var(--text-secondary)] text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="glass border border-[var(--border-color)] rounded-3xl p-5 hover:border-[rgba(0,212,255,0.2)] transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${value.color}15`, border: `1px solid ${value.color}30` }}
                  >
                    <value.icon size={18} style={{ color: value.color }} />
                  </div>
                  <h3 className="font-display font-semibold text-sm text-[var(--text-primary)] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(139,92,246,0.2)] text-xs font-medium text-[var(--accent-secondary)] mb-4 bg-[rgba(139,92,246,0.05)]">
              <Users size={12} /> Meet the Team
            </span>
            <h2 className="font-display font-bold text-4xl text-[var(--text-primary)]">
              The Experts Behind{" "}
              <span className="gradient-text">Your Quest</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="group glass border border-[var(--border-color)] rounded-3xl p-6 text-center hover:border-[rgba(0,212,255,0.2)] hover:-translate-y-2 transition-all duration-400"
              >
                {/* Avatar */}
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-display font-bold text-white border-2"
                  style={{
                    background: `linear-gradient(135deg, ${member.color}60, ${member.color}30)`,
                    borderColor: `${member.color}40`,
                  }}
                >
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>

                <div className="font-display font-bold text-lg text-[var(--text-primary)] mb-1">
                  {member.name}
                </div>
                <div className="text-xs font-medium mb-3" style={{ color: member.color }}>
                  {member.role}
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  {member.bio}
                </p>

                <div className="flex items-center justify-center gap-2">
                  <a
                    href={member.social.linkedin}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[#0077B5] hover:border-[#0077B5]/30 transition-all"
                  >
                    <Share2 size={14} />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30 transition-all"
                  >
                    <Hash size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-[var(--bg-primary)]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(245,158,11,0.2)] text-xs font-medium text-[#F59E0B] mb-4 bg-[rgba(245,158,11,0.05)]">
              <Award size={12} /> Our Journey
            </span>
            <h2 className="font-display font-bold text-4xl text-[var(--text-primary)]">
              From Kathmandu to the{" "}
              <span className="gradient-text-cyan-purple">World</span>
            </h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00D4FF] via-[#8B5CF6] to-[#F59E0B]" />

            <div className="space-y-8">
              {milestones.map((item, i) => (
                <div
                  key={item.year}
                  className={`flex items-center gap-6 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <div className="glass border border-[var(--border-color)] rounded-2xl p-4 inline-block max-w-xs hover:border-[rgba(0,212,255,0.2)] transition-colors">
                      <div className="font-display font-bold text-sm text-[var(--accent-primary)] mb-1">
                        {item.title}
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Year dot */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full glass border-2 border-[#00D4FF] flex items-center justify-center z-10">
                    <span className="text-xs font-display font-bold text-[#00D4FF]">
                      {item.year.slice(2)}
                    </span>
                  </div>

                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="container-custom text-center">
          <h2 className="font-display font-bold text-4xl text-[var(--text-primary)] mb-4">
            Join Our <span className="gradient-text">Growing Client Family</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto mb-8 text-lg">
            Ready to take your digital presence to the next level? Let&apos;s start your quest together.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-display font-semibold text-white bg-gradient-to-r from-[#00D4FF] to-[#8B5CF6] hover:opacity-90 hover:-translate-y-1 transition-all duration-300 group"
          >
            Start Your Quest
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
