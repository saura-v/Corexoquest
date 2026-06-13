import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export const verifySession = cache(async () => {
  const session = await getSession();
  if (!session?.userId) {
    redirect("/admin/login");
  }
  return session;
});

export const verifyAdmin = cache(async () => {
  const session = await getSession();
  if (!session?.userId) redirect("/admin/login");
  if (session.role !== "ADMIN") {
    redirect("/admin");
  }
  return session;
});

export const verifyEditorOrAdmin = cache(async () => {
  const session = await getSession();
  if (!session?.userId) redirect("/admin/login");
  if (session.role === "VIEWER") {
    redirect("/admin");
  }
  return session;
});

export const getCurrentUser = cache(async () => {
  const session = await getSession();
  return session ?? null;
});
