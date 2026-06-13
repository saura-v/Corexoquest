"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/session";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginState = {
  errors?: { email?: string[]; password?: string[]; general?: string[] };
  message?: string;
} | undefined;

export async function login(state: LoginState, formData: FormData): Promise<LoginState> {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { email, password } = validatedFields.data;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return { errors: { general: ["Invalid email or password"] } };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return { errors: { general: ["Invalid email or password"] } };
    }

    await createSession({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as "ADMIN" | "EDITOR" | "VIEWER",
    });
  } catch {
    return { errors: { general: ["Something went wrong. Please try again."] } };
  }

  redirect("/admin");
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/admin/login");
}
