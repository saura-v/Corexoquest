import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { slugify } from "@/lib/utils";

const PortfolioSchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().min(10).max(1000),
  content: z.string().optional().default(""),
  category: z.string().min(1),
  tags: z.array(z.string()).optional().default([]),
  clientName: z.string().optional(),
  clientUrl: z.string().url().optional().or(z.literal("")),
  projectUrl: z.string().url().optional().or(z.literal("")),
  technologies: z.array(z.string()).optional().default([]),
  featured: z.boolean().optional().default(false),
  results: z.record(z.string(), z.object({ label: z.string(), value: z.string() })).optional().default({}),
});

export async function GET() {
  try {
    const projects = await prisma.portfolio.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ featured: "desc" }, { sortOrder: "asc" }],
    });
    return NextResponse.json({ success: true, data: projects });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session || session.role === "VIEWER") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const validated = PortfolioSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: validated.error.flatten() },
        { status: 400 }
      );
    }

    const data = validated.data;
    let slug = slugify(data.title);
    const existing = await prisma.portfolio.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const project = await prisma.portfolio.create({
      data: {
        title: data.title,
        slug,
        description: data.description,
        content: data.content,
        category: data.category,
        tags: JSON.stringify(data.tags),
        clientName: data.clientName,
        clientUrl: data.clientUrl || null,
        projectUrl: data.projectUrl || null,
        technologies: JSON.stringify(data.technologies),
        featured: data.featured,
        results: JSON.stringify(data.results),
      },
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    console.error("Portfolio error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
