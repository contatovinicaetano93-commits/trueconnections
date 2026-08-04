import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const publicAssociados = [
  "/associados/login",
  "/associados/cadastro",
  "/associados/esqueci-senha",
  "/associados/redefinir-senha",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = getSessionCookie(request);

  const isPublicAuth = publicAssociados.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
  const isMembers = pathname.startsWith("/associados") && !isPublicAuth;
  const isAdmin = pathname.startsWith("/admin");

  if ((isMembers || isAdmin) && !sessionCookie) {
    return NextResponse.redirect(new URL("/associados/login", request.url));
  }

  if (isPublicAuth && sessionCookie && pathname !== "/associados/redefinir-senha") {
    return NextResponse.redirect(new URL("/associados", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/associados/:path*", "/admin/:path*"],
};
