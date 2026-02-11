import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/profile"];
const authPaths = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  // Protected routes: redirect to /login if not authenticated
  if (protectedPaths.some((p) => pathname.startsWith(p))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Auth routes: redirect to / if already authenticated
  if (authPaths.some((p) => pathname.startsWith(p))) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/login", "/signup"],
};
