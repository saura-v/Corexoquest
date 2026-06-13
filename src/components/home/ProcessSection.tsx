"use client";

const steps = [
  { number: "01", title: "Discovery & Strategy", icon: "🔍", color: "#00D4FF",
    description: "We deep-dive into your business, goals, and competition to craft a winning digital strategy tailored specifically for you." },
  { number: "02", title: "Design & Prototype", icon: "✏️", color: "#8B5CF6",
    description: "Our designers create stunning, conversion-focused mockups that align with your brand identity and user expectations." },
  { number: "03", title: "Build & Develop", icon: "⚙️", color: "#F59E0B",
    description: "Our engineers bring designs to life with clean, scalable code using the latest technologies — built to last." },
  { number: "04", title: "Launch & Optimize", icon: "🚀", color: "#10B981",
    description: "We deploy your project, monitor performance, and continuously optimize for better results — your growth is our mission." },
];

export default function ProcessSection() {
  return (
    <section style={{ padding: "5rem 0", background: "var(--bg-primary)" }}>
      <div className="container-custom">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "6px 16px", borderRadius: "999px",
            background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)",
            color: "#F59E0B", fontSize: "12px", fontWeight: 600, marginBottom: "16px",
          }}>
            🔄 How We Work
          </span>
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3rem)", color: "var(--text-primary)", marginBottom: "1rem" }}>
            Our Proven{" "}
            <span style={{ background: "linear-gradient(135deg,#8B5CF6,#F59E0B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              4-Step Process
            </span>
          </h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: "550px", margin: "0 auto", lineHeight: 1.7 }}>
            A battle-tested process that delivers extraordinary results, every single time.
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))", gap: "1.25rem" }}>
          {steps.map((step, i) => (
            <div key={step.number}
              style={{
                background: "var(--bg-card)", border: "1px solid var(--border-color)",
                borderRadius: "1.5rem", padding: "2rem", position: "relative",
                overflow: "hidden", transition: "all 0.35s ease",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${step.color}40`;
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow = `0 12px 40px ${step.color}15`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border-color)";
                el.style.transform = "";
                el.style.boxShadow = "";
              }}
            >
              {/* Large number watermark */}
              <div style={{
                position: "absolute", top: "-8px", right: "16px",
                fontFamily: "Space Grotesk, sans-serif", fontWeight: 900,
                fontSize: "4.5rem", lineHeight: 1, color: step.color,
                opacity: 0.06, pointerEvents: "none", userSelect: "none",
              }}>
                {step.number}
              </div>

              {/* Icon */}
              <div style={{
                width: 52, height: 52, borderRadius: "14px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.5rem", background: `${step.color}14`,
                border: `1px solid ${step.color}28`, marginBottom: "1.25rem",
              }}>
                {step.icon}
              </div>

              {/* Step indicator */}
              <div style={{
                fontSize: "11px", fontWeight: 700, color: step.color,
                marginBottom: "0.5rem", letterSpacing: "0.08em",
              }}>
                STEP {step.number}
              </div>

              <h3 style={{
                fontFamily: "Space Grotesk, sans-serif", fontWeight: 700,
                fontSize: "1.05rem", color: "var(--text-primary)", marginBottom: "0.75rem",
              }}>
                {step.title}
              </h3>

              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                {step.description}
              </p>

              {/* Bottom accent line */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "3px",
                background: `linear-gradient(90deg, ${step.color}, transparent)`,
                opacity: 0.5,
              }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
