import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/session";

const adminRoutes = ["/admin"];
const publicAdminRoutes = ["/admin/login"];

export default async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isAdminRoute = path.startsWith("/admin");
  const isPublicAdminRoute = publicAdminRoutes.includes(path);

  if (!isAdminRoute) return NextResponse.next();

  const sessionCookie = request.cookies.get("session")?.value;
  const session = await decrypt(sessionCookie);

  if (isPublicAdminRoute) {
    if (session?.userId) {
      return NextResponse.redirect(new URL("/admin", request.nextUrl));
    }
    return NextResponse.next();
  }

  if (!session?.userId) {
    return NextResponse.redirect(new URL("/admin/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)"],
};
