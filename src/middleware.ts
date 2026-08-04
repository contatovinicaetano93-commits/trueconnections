import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = getSessionCookie(request);

  const isLogin = pathname.startsWith("/associados/login");
  const isMembers = pathname.startsWith("/associados") && !isLogin;
  const isAdmin = pathname.startsWith("/admin");

  if ((isMembers || isAdmin) && !sessionCookie) {
    return NextResponse.redirect(new URL("/associados/login", request.url));
  }

  if (isLogin && sessionCookie) {
    return NextResponse.redirect(new URL("/associados", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/associados/:path*", "/admin/:path*"],
};
