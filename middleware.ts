import { type NextRequest, NextResponse } from "next/server";

/** Routes which should only be available if the user is not logged in. */
const authenticationRoutes = ["/login"];

/** Routes which don't require authentication to access. */
const publicRoutes = ["/", ...authenticationRoutes];

export async function middleware(request: NextRequest) {
  const { pathname: route } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (authenticationRoutes.includes(route) && refreshToken) {
    return NextResponse.redirect(new URL("/store", request.url));
  } else if (publicRoutes.includes(route) || accessToken) {
    return NextResponse.next();
  } else if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
