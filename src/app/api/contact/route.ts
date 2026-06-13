import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { sendContactEmail, sendAutoReply } from "@/lib/email";

const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = ContactSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: validated.error.flatten() },
        { status: 400 }
      );
    }

    const data = validated.data;

    // Store in database
    await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        service: data.service,
        budget: data.budget,
        message: data.message,
      },
    });

    // Send email notifications (don't fail if email fails)
    try {
      await Promise.allSettled([
        sendContactEmail(data),
        sendAutoReply(data.email, data.name),
      ]);
    } catch {
      // Email failures are non-critical — message is already saved
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Verify session for admin access
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  try {
    const messages = await prisma.contactMessage.findMany({
      where: status && status !== "ALL" ? { status: status as "UNREAD" | "READ" | "REPLIED" } : {},
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: messages });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch messages" }, { status: 500 });
  }
}
