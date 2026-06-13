import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";

// PrismaLibSql in new adapter versions takes a config object directly
const adapter = new PrismaLibSql({ url: "file:./dev.db" });
// @ts-ignore — Prisma 7 adapter API
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding Corexoquest database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("Admin@2026!", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@corexoquest.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@corexoquest.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin user created:", admin.email);

  // Create editor user
  const editorPassword = await bcrypt.hash("Editor@2026!", 10);
  const editor = await prisma.user.upsert({
    where: { email: "editor@corexoquest.com" },
    update: {},
    create: {
      name: "Editor User",
      email: "editor@corexoquest.com",
      password: editorPassword,
      role: "EDITOR",
    },
  });
  console.log("✅ Editor user created:", editor.email);

  // Create viewer user
  const viewerPassword = await bcrypt.hash("Viewer@2026!", 10);
  await prisma.user.upsert({
    where: { email: "viewer@corexoquest.com" },
    update: {},
    create: {
      name: "Viewer User",
      email: "viewer@corexoquest.com",
      password: viewerPassword,
      role: "VIEWER",
    },
  });
  console.log("✅ Viewer user created");

  // Create sample blog posts
  const blogPosts = [
    {
      title: "How We Helped a Kathmandu Restaurant 10x Their Online Orders in 90 Days",
      slug: "restaurant-10x-online-orders",
      excerpt: "A deep-dive case study on how a comprehensive digital strategy including SEO, social media, and a new ordering platform transformed a local restaurant's online presence.",
      content: `<p>When NepalBite came to us, they had a beautiful restaurant but almost zero online presence. Their competitors were dominating local search results and social media, while NepalBite struggled to fill tables on weekday evenings.</p>

<h2>The Challenge</h2>
<p>NepalBite needed a complete digital transformation. Their website was outdated, they had no social media strategy, and they weren't showing up in local search results at all. Their main competitor was getting 500+ monthly visitors from Google while NepalBite had fewer than 20.</p>

<h2>Our Strategy</h2>
<p>We took a three-pronged approach:</p>
<ul>
<li><strong>Website Redesign:</strong> Built a modern, fast Next.js website with an integrated online ordering system</li>
<li><strong>Local SEO:</strong> Optimized their Google Business Profile, built local citations, and created location-specific landing pages</li>
<li><strong>Social Media:</strong> Launched Instagram and Facebook campaigns showcasing their food, with daily posting and community engagement</li>
</ul>

<h2>The Results</h2>
<p>Within 90 days of implementation, NepalBite saw dramatic results:</p>
<ul>
<li>Online orders increased by 10x (from ~15/week to 150+/week)</li>
<li>Website traffic grew from 20 to 800+ monthly visitors</li>
<li>Google ranking moved to #1 for "restaurant Kathmandu" locally</li>
<li>Revenue grew by 340% year-over-year</li>
</ul>

<h2>Key Takeaways</h2>
<p>This case study proves that even traditional brick-and-mortar businesses can achieve explosive growth with the right digital strategy. The combination of a fast website, local SEO, and consistent social media creates a powerful compounding effect.</p>`,
      category: "Case Study",
      tags: JSON.stringify(["Digital Marketing", "Case Study", "Local SEO", "E-Commerce"]),
      authorName: "Corexoquest Team",
      authorEmail: "info@corexoquest.com",
      status: "APPROVED",
      views: 1247,
      publishedAt: new Date("2026-05-15"),
    },
    {
      title: "SEO Case Study: 0 to 50,000 Monthly Visitors for a Nepal E-Commerce Store",
      slug: "seo-0-to-50k-visitors-case-study",
      excerpt: "We reveal the exact technical SEO strategy, content plan, and link building approach that took an e-commerce store from near-zero to 50K monthly organic visitors.",
      content: `<p>When StyleHaus approached us, they had a beautiful Shopify store selling premium Nepali fashion to international buyers — but they were invisible on Google. After 6 months of SEO work, they were getting 50,000 organic visitors per month.</p>

<h2>Month 1-2: Technical Foundation</h2>
<p>We started with a comprehensive technical SEO audit that revealed critical issues:</p>
<ul>
<li>Site speed was 6.2 seconds (we got it to 1.8 seconds)</li>
<li>Mobile experience was broken on several product pages</li>
<li>Duplicate content issues across 40% of product pages</li>
<li>No structured data markup</li>
</ul>

<h2>Month 3-4: Content Strategy</h2>
<p>We created a content hub targeting informational keywords in the fashion and e-commerce space, publishing 8 long-form guides per month.</p>

<h2>Month 5-6: Link Building</h2>
<p>We secured 45 high-quality backlinks from fashion blogs, business directories, and industry publications.</p>

<h2>Results</h2>
<p>50,000 monthly organic visitors generating $180,000 in monthly revenue from SEO alone — a 12x return on their SEO investment.</p>`,
      category: "SEO",
      tags: JSON.stringify(["SEO", "E-Commerce", "Case Study", "Content Marketing"]),
      authorName: "SEO Team",
      authorEmail: "seo@corexoquest.com",
      status: "APPROVED",
      views: 892,
      publishedAt: new Date("2026-04-28"),
    },
    {
      title: "The Complete Guide to Building a High-Converting Landing Page in 2026",
      slug: "high-converting-landing-page-guide-2026",
      excerpt: "Everything you need to know about building landing pages that convert visitors into leads — from headline psychology to CTA placement to A/B testing frameworks.",
      content: `<p>A landing page can make or break your digital marketing campaign. After building 200+ landing pages for clients across multiple industries, we've identified the exact elements that separate high-converting pages from average ones.</p>

<h2>The Anatomy of a High-Converting Landing Page</h2>
<p>Every high-converting landing page has these essential elements:</p>
<ul>
<li><strong>A compelling headline</strong> that speaks directly to the visitor's pain point</li>
<li><strong>Social proof</strong> (testimonials, logos, numbers)</li>
<li><strong>A single clear CTA</strong> (not multiple competing buttons)</li>
<li><strong>Fast load time</strong> (under 3 seconds)</li>
<li><strong>Mobile optimization</strong></li>
</ul>

<h2>Headline Psychology</h2>
<p>Your headline is the most important element. It should answer: "What's in it for me?" within 3 seconds of arrival. Use numbers, make a bold promise, or address a specific pain point directly.</p>

<h2>CTA Placement Science</h2>
<p>Based on our A/B testing across 50+ campaigns, the optimal CTA placement is: above the fold, in the middle of the page, and at the bottom. Three CTAs on a long-form page increases conversion by an average of 23%.</p>`,
      category: "Web Design",
      tags: JSON.stringify(["Web Design", "CRO", "Landing Pages", "A/B Testing"]),
      authorName: "Design Team",
      authorEmail: "design@corexoquest.com",
      status: "APPROVED",
      views: 2103,
      publishedAt: new Date("2026-04-10"),
    },
  ];

  for (const post of blogPosts) {
    await prisma.blog.upsert({
      where: { slug: post.slug },
      update: {},
      create: post as any,
    });
  }
  console.log("✅ Blog posts created");

  // Create pricing plans
  const pricingPlans = [
    {
      name: "Starter",
      description: "Perfect for small businesses and startups launching their digital journey.",
      price: "$499",
      period: "month",
      features: JSON.stringify([
        "5-page responsive website",
        "Basic SEO setup",
        "2 social media platforms",
        "Monthly performance report",
        "Email support (48hr response)",
        "Google Analytics setup",
        "1 month of maintenance",
      ]),
      highlighted: false,
      badge: null,
      sortOrder: 1,
    },
    {
      name: "Growth",
      description: "For growing businesses that need a comprehensive digital strategy.",
      price: "$1,299",
      period: "month",
      features: JSON.stringify([
        "15-page custom website",
        "Advanced SEO (on-page + technical)",
        "4 social media platforms",
        "Google Ads / Meta Ads management",
        "Content creation (4 blogs/month)",
        "Weekly reporting dashboard",
        "Priority email & WhatsApp support",
        "CRO consultation",
        "3 months of maintenance",
      ]),
      highlighted: true,
      badge: "Most Popular",
      sortOrder: 2,
    },
    {
      name: "Enterprise",
      description: "Full-service digital transformation for businesses ready to dominate.",
      price: "Custom",
      period: "pricing",
      features: JSON.stringify([
        "Unlimited pages + custom features",
        "Full SEO + link building",
        "All social media platforms",
        "Multi-channel paid advertising",
        "Unlimited content creation",
        "Real-time analytics dashboard",
        "Dedicated account manager",
        "Weekly strategy calls",
        "12 months of maintenance",
        "24/7 emergency support",
      ]),
      highlighted: false,
      badge: "Best Value",
      sortOrder: 3,
    },
  ];

  for (const plan of pricingPlans) {
    await prisma.pricing.upsert({
      where: { id: plan.name.toLowerCase() },
      update: {},
      create: { id: plan.name.toLowerCase(), ...plan },
    });
  }
  console.log("✅ Pricing plans created");

  // Create sample testimonials
  const testimonials = [
    {
      name: "Rajesh Shrestha",
      role: "CEO",
      company: "TechVentures Nepal",
      rating: 5,
      content: "Corexoquest completely transformed our digital presence. Our website now generates 3x more leads than before, and their SEO work pushed us to page 1 on Google within 4 months.",
      featured: true,
      sortOrder: 1,
    },
    {
      name: "Sarah Mitchell",
      role: "Marketing Director",
      company: "GlobalEdge Solutions",
      rating: 5,
      content: "Working with Corexoquest has been one of the best business decisions we've made. They built our e-commerce platform and our revenue went from $50K to $500K in the first year.",
      featured: true,
      sortOrder: 2,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t }).catch(() => {});
  }
  console.log("✅ Testimonials created");

  // Create stats
  const statsData = [
    { label: "Projects Delivered", value: 150, suffix: "+", sortOrder: 1 },
    { label: "Happy Clients", value: 50, suffix: "+", sortOrder: 2 },
    { label: "Countries Served", value: 20, suffix: "+", sortOrder: 3 },
    { label: "Years Experience", value: 7, suffix: "+", sortOrder: 4 },
  ];

  for (const stat of statsData) {
    await prisma.stat.create({ data: stat }).catch(() => {});
  }
  console.log("✅ Stats created");

  console.log("\n🎉 Database seeded successfully!");
  console.log("\n📋 Admin Credentials:");
  console.log("   Email: admin@corexoquest.com");
  console.log("   Password: Admin@2026!");
  console.log("\n   Editor Email: editor@corexoquest.com");
  console.log("   Password: Editor@2026!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
