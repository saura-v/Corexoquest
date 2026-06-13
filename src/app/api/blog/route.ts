import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { slugify } from "@/lib/utils";

const BlogSubmitSchema = z.object({
  title: z.string().min(5, "Title too short").max(200),
  excerpt: z.string().min(10).max(500),
  content: z.string().min(50, "Content too short"),
  category: z.string().min(1),
  tags: z.array(z.string()).optional().default([]),
  authorName: z.string().min(2),
  authorEmail: z.string().email(),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  try {
    const posts = await prisma.blog.findMany({
      where: status && status !== "ALL" ? { status: status as "PENDING" | "APPROVED" | "REJECTED" } : {},
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: posts });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = BlogSubmitSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: validated.error.flatten() },
        { status: 400 }
      );
    }

    const data = validated.data;
    const session = await getSession();

    // Generate unique slug
    let slug = slugify(data.title);
    const existing = await prisma.blog.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const post = await prisma.blog.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        tags: JSON.stringify(data.tags),
        authorName: data.authorName,
        authorEmail: data.authorEmail,
        authorId: session?.userId ?? null,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      { success: true, data: post, message: "Post submitted for review" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Blog submit error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
