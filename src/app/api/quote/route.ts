import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { sendQuoteEmail } from "@/lib/email";

const QuoteSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, "Service is required"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  description: z.string().min(10, "Please describe your project").max(2000),
  paymentMethod: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = QuoteSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: validated.error.flatten() },
        { status: 400 }
      );
    }

    const data = validated.data;

    await prisma.quoteRequest.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        service: data.service,
        budget: data.budget,
        timeline: data.timeline,
        description: data.description,
        paymentMethod: data.paymentMethod,
      },
    });

    try {
      await sendQuoteEmail(data);
    } catch {}

    return NextResponse.json(
      { success: true, message: "Quote request submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Quote error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
