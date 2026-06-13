import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatRelativeDate(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\S*$/, "") + "...";
}

export function parseJsonField<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const SERVICES = [
  {
    id: "web-development",
    title: "Web Design & Development",
    icon: "Monitor",
    category: "Development",
    tagline: "Custom, high-performance websites that convert",
    description:
      "We craft stunning, blazing-fast websites tailored to your brand. From landing pages to complex web applications — built with React, Next.js, and the latest technologies.",
    features: [
      "Custom UI/UX Design",
      "Responsive & Mobile-First",
      "SEO-Ready Architecture",
      "Performance Optimized (99+ Lighthouse)",
      "CMS Integration",
      "Ongoing Maintenance",
    ],
    color: "#00D4FF",
  },
  {
    id: "mobile-app",
    title: "Mobile App Development",
    icon: "Smartphone",
    category: "Development",
    tagline: "iOS & Android apps that users love",
    description:
      "We build cross-platform mobile applications using React Native and Flutter that deliver native performance with a single codebase — faster time to market, lower costs.",
    features: [
      "iOS & Android (React Native / Flutter)",
      "App Store & Play Store Publishing",
      "Push Notifications",
      "Offline Support",
      "Analytics Integration",
      "Post-Launch Support",
    ],
    color: "#8B5CF6",
  },
  {
    id: "seo-optimization",
    title: "SEO Optimization",
    icon: "TrendingUp",
    category: "Marketing",
    tagline: "Rank #1 on Google. Dominate your niche.",
    description:
      "Our data-driven SEO strategies combine technical excellence, on-page optimization, and authoritative link building to skyrocket your organic traffic and lead generation.",
    features: [
      "Technical SEO Audit",
      "Keyword Research & Strategy",
      "On-Page Optimization",
      "Link Building",
      "Local SEO",
      "Monthly Reporting",
    ],
    color: "#F59E0B",
  },
  {
    id: "ppc-advertising",
    title: "PPC & Paid Advertising",
    icon: "Target",
    category: "Marketing",
    tagline: "Every dollar spent, maximized for ROI",
    description:
      "We run laser-targeted Google Ads, Facebook/Instagram campaigns, and LinkedIn ads that generate qualified leads at the lowest cost per acquisition — with full transparency.",
    features: [
      "Google Ads (Search, Display, Shopping)",
      "Facebook & Instagram Ads",
      "LinkedIn & TikTok Ads",
      "Conversion Rate Optimization",
      "A/B Testing",
      "Real-Time Dashboard",
    ],
    color: "#EF4444",
  },
  {
    id: "social-media",
    title: "Social Media Management",
    icon: "Share2",
    category: "Marketing",
    tagline: "Build a loyal community around your brand",
    description:
      "From strategy to execution, we manage your social media presence across all platforms — creating engaging content, growing your following, and turning followers into customers.",
    features: [
      "Content Calendar & Strategy",
      "Daily Posting & Scheduling",
      "Community Management",
      "Influencer Outreach",
      "Analytics & Insights",
      "Crisis Management",
    ],
    color: "#EC4899",
  },
  {
    id: "content-marketing",
    title: "Content Marketing",
    icon: "FileText",
    category: "Marketing",
    tagline: "Content that educates, engages, and converts",
    description:
      "Our content team crafts compelling blog posts, case studies, whitepapers, and video scripts that establish your authority, improve SEO rankings, and nurture leads through the funnel.",
    features: [
      "Blog Writing & Strategy",
      "Video Script Writing",
      "Email Newsletter Content",
      "Whitepapers & Case Studies",
      "Infographics",
      "Content Distribution",
    ],
    color: "#10B981",
  },
  {
    id: "graphic-design",
    title: "Graphic Design & Branding",
    icon: "Palette",
    category: "Design",
    tagline: "A brand identity that commands attention",
    description:
      "We design powerful brand identities — logos, color palettes, typography, and complete brand guidelines that make your business instantly recognizable and unforgettable.",
    features: [
      "Logo Design",
      "Brand Identity System",
      "Marketing Collaterals",
      "Social Media Templates",
      "Packaging Design",
      "Brand Guidelines Document",
    ],
    color: "#F59E0B",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Development",
    icon: "ShoppingCart",
    category: "Development",
    tagline: "Online stores built to sell — 24/7",
    description:
      "We build high-converting e-commerce platforms on Shopify, WooCommerce, or custom stacks — with seamless checkout flows, inventory management, and payment gateway integrations.",
    features: [
      "Shopify & WooCommerce",
      "Custom E-Commerce Solutions",
      "Payment Gateway Integration",
      "Inventory Management",
      "Product Catalog Optimization",
      "Abandoned Cart Recovery",
    ],
    color: "#00D4FF",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    icon: "Layout",
    category: "Design",
    tagline: "Interfaces that feel intuitive and look stunning",
    description:
      "We design user-centered digital experiences through deep research, wireframing, prototyping, and usability testing — ensuring every interaction delights and converts.",
    features: [
      "User Research & Personas",
      "Wireframing & Prototyping",
      "Interactive Figma Designs",
      "Usability Testing",
      "Design System Creation",
      "Handoff to Developers",
    ],
    color: "#8B5CF6",
  },
  {
    id: "email-marketing",
    title: "Email Marketing",
    icon: "Mail",
    category: "Marketing",
    tagline: "Turn subscribers into loyal customers",
    description:
      "We design and execute high-performing email campaigns with personalized automation sequences, segmentation, and A/B testing that drive opens, clicks, and sales.",
    features: [
      "Campaign Strategy & Design",
      "Automation Sequences",
      "List Segmentation",
      "A/B Testing",
      "Deliverability Optimization",
      "Performance Analytics",
    ],
    color: "#06B6D4",
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    icon: "Cloud",
    category: "Development",
    tagline: "Scalable infrastructure built for growth",
    description:
      "We architect, deploy, and manage cloud infrastructure on AWS, GCP, or Azure — with CI/CD pipelines, containerization, and monitoring that keeps your applications fast and reliable.",
    features: [
      "AWS / GCP / Azure Setup",
      "CI/CD Pipeline Configuration",
      "Docker & Kubernetes",
      "Database Management",
      "Security Hardening",
      "24/7 Monitoring & Alerts",
    ],
    color: "#3B82F6",
  },
  {
    id: "data-analytics",
    title: "Data Analytics & Reporting",
    icon: "BarChart2",
    category: "Analytics",
    tagline: "Turn data into decisions that drive growth",
    description:
      "We set up comprehensive analytics dashboards, custom reporting, and data visualization solutions that give you real-time insights into every aspect of your business performance.",
    features: [
      "Google Analytics 4 Setup",
      "Custom Dashboard Creation",
      "Conversion Funnel Analysis",
      "Heatmap & Session Recording",
      "Automated Reports",
      "Data-Driven Strategy Consulting",
    ],
    color: "#F59E0B",
  },
];

export const PORTFOLIO_PROJECTS = [
  {
    id: "1",
    title: "NepalBite — Restaurant Ordering Platform",
    slug: "nepalbite-restaurant-platform",
    description:
      "A full-stack online ordering system for a Kathmandu restaurant chain that increased online orders by 10x in 90 days.",
    coverImage: "/images/portfolio/nepalbite.jpg",
    category: "Web Development",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "React"],
    clientName: "NepalBite Restaurant Group",
    results: {
      stat1: { label: "Increase in Orders", value: "10x" },
      stat2: { label: "Revenue Growth", value: "340%" },
      stat3: { label: "Time to Deliver", value: "8 weeks" },
    },
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS", "AWS"],
    featured: true,
    color: "#00D4FF",
  },
  {
    id: "2",
    title: "StyleHaus — Fashion E-Commerce",
    slug: "stylehaus-fashion-ecommerce",
    description:
      "A premium fashion e-commerce store with AR try-on features, generating $500K in revenue in the first year.",
    coverImage: "/images/portfolio/stylehaus.jpg",
    category: "E-Commerce",
    tags: ["Shopify", "React", "GraphQL", "Stripe", "AR/VR"],
    clientName: "StyleHaus Fashion",
    results: {
      stat1: { label: "First Year Revenue", value: "$500K" },
      stat2: { label: "Conversion Rate", value: "4.2%" },
      stat3: { label: "Avg. Session Duration", value: "4.5 min" },
    },
    technologies: ["Shopify", "React", "GraphQL", "AR.js", "Stripe"],
    featured: true,
    color: "#8B5CF6",
  },
  {
    id: "3",
    title: "Nexboard — SaaS Analytics Dashboard",
    slug: "nexboard-saas-dashboard",
    description:
      "A complex SaaS analytics platform serving 2,000+ B2B clients with real-time data visualization and reporting.",
    coverImage: "/images/portfolio/nexboard.jpg",
    category: "SaaS",
    tags: ["React", "TypeScript", "D3.js", "AWS", "PostgreSQL"],
    clientName: "Nexboard Inc.",
    results: {
      stat1: { label: "Active B2B Clients", value: "2,000+" },
      stat2: { label: "Data Points Processed", value: "1M/day" },
      stat3: { label: "Uptime", value: "99.9%" },
    },
    technologies: ["React", "TypeScript", "D3.js", "AWS Lambda", "PostgreSQL", "Redis"],
    featured: true,
    color: "#F59E0B",
  },
  {
    id: "4",
    title: "NestNepal — Real Estate Platform",
    slug: "nestnepal-real-estate",
    description:
      "Nepal's leading property listing platform with virtual tours, AI-powered price estimation, and 15,000+ listings.",
    coverImage: "/images/portfolio/nestnepal.jpg",
    category: "Web Development",
    tags: ["Next.js", "Maps API", "AI/ML", "MongoDB", "Cloudinary"],
    clientName: "NestNepal Pvt. Ltd.",
    results: {
      stat1: { label: "Active Listings", value: "15,000+" },
      stat2: { label: "Monthly Users", value: "80,000" },
      stat3: { label: "Lead Generation", value: "500/month" },
    },
    technologies: ["Next.js", "MongoDB", "Google Maps API", "TensorFlow.js", "Cloudinary"],
    featured: false,
    color: "#10B981",
  },
  {
    id: "5",
    title: "CareConnect — Healthcare App",
    slug: "careconnect-healthcare-app",
    description:
      "A telemedicine mobile app connecting patients to doctors across Nepal with video consultations and prescription management.",
    coverImage: "/images/portfolio/careconnect.jpg",
    category: "Mobile App",
    tags: ["React Native", "Node.js", "WebRTC", "Firebase", "Stripe"],
    clientName: "CareConnect Health",
    results: {
      stat1: { label: "Registered Doctors", value: "500+" },
      stat2: { label: "Consultations/Month", value: "5,000" },
      stat3: { label: "App Store Rating", value: "4.8★" },
    },
    technologies: ["React Native", "Node.js", "WebRTC", "Firebase", "Stripe"],
    featured: false,
    color: "#EF4444",
  },
  {
    id: "6",
    title: "EduPath — E-Learning Platform",
    slug: "edupath-elearning-platform",
    description:
      "A comprehensive e-learning platform with live classes, recorded courses, and AI-powered personalized learning paths.",
    coverImage: "/images/portfolio/edupath.jpg",
    category: "Web Development",
    tags: ["Next.js", "WebRTC", "PostgreSQL", "AI/ML", "Stripe"],
    clientName: "EduPath International",
    results: {
      stat1: { label: "Enrolled Students", value: "12,000+" },
      stat2: { label: "Course Completion Rate", value: "73%" },
      stat3: { label: "Instructor Revenue", value: "$2M/yr" },
    },
    technologies: ["Next.js", "PostgreSQL", "WebRTC", "OpenAI API", "AWS S3"],
    featured: false,
    color: "#8B5CF6",
  },
];

export const TESTIMONIALS = [
  {
    id: "1",
    name: "Rajesh Shrestha",
    role: "CEO",
    company: "TechVentures Nepal",
    avatar: "/images/testimonials/1.jpg",
    rating: 5,
    content:
      "Corexoquest completely transformed our digital presence. Our website now generates 3x more leads than before, and their SEO work pushed us to page 1 on Google within 4 months. Absolutely world-class team.",
  },
  {
    id: "2",
    name: "Sarah Mitchell",
    role: "Marketing Director",
    company: "GlobalEdge Solutions",
    avatar: "/images/testimonials/2.jpg",
    rating: 5,
    content:
      "Working with Corexoquest has been one of the best business decisions we've made. They built our e-commerce platform from scratch and our revenue went from $50K to $500K in the first year. Truly exceptional.",
  },
  {
    id: "3",
    name: "Priya Maharjan",
    role: "Founder",
    company: "StyleHaus Fashion",
    avatar: "/images/testimonials/3.jpg",
    rating: 5,
    content:
      "The team at Corexoquest delivered far beyond our expectations. Not only did they create a beautiful website, but their social media management grew our Instagram from 2,000 to 50,000 followers in just 6 months!",
  },
  {
    id: "4",
    name: "David Chen",
    role: "CTO",
    company: "Nexboard Inc.",
    avatar: "/images/testimonials/4.jpg",
    rating: 5,
    content:
      "The SaaS dashboard they built for us handles millions of data points flawlessly. Their technical expertise is unmatched — React, Node.js, AWS — they handle everything with precision and speed.",
  },
  {
    id: "5",
    name: "Anita Gurung",
    role: "Operations Manager",
    company: "NepalBite",
    avatar: "/images/testimonials/5.jpg",
    rating: 5,
    content:
      "Our online orders went from near zero to 10x in just 90 days after launching our platform with Corexoquest. The entire process was seamless — from design to launch to ongoing support. Highly recommend!",
  },
  {
    id: "6",
    name: "Marcus Johnson",
    role: "Digital Director",
    company: "LuxeRetail Group",
    avatar: "/images/testimonials/6.jpg",
    rating: 5,
    content:
      "Corexoquest ran our Google Ads campaigns and achieved a 4.8x ROAS within the first month. They're not just service providers — they're strategic partners who genuinely care about your growth.",
  },
];
