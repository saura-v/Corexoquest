export type Role = "ADMIN" | "EDITOR" | "VIEWER";
export type BlogStatus = "PENDING" | "APPROVED" | "REJECTED";
export type ProjectStatus = "DRAFT" | "PUBLISHED";
export type MessageStatus = "UNREAD" | "READ" | "REPLIED";

export interface SessionUser {
  userId: string;
  email: string;
  name: string;
  role: Role;
  expiresAt: Date;
}

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  color: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  category: string;
  tags: string[];
  clientName: string;
  results: Record<string, { label: string; value: string }>;
  technologies: string[];
  featured: boolean;
  color: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  category: string;
  tags: string[];
  status: BlogStatus;
  authorName: string;
  authorEmail: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date | null;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
  icon?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  timeline?: string;
  description: string;
  paymentMethod?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
