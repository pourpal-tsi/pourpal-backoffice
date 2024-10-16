import { NextRequest, NextResponse } from "next/server";

/** Routes which should only be available if the user is not logged in. */
const authenticationRoutes = ["/login"];

export async function middleware(request: NextRequest) {
  const { pathname: route } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  if (authenticationRoutes.includes(route) && accessToken) {
    return NextResponse.redirect(new URL("/store", request.url));
  } else if (!authenticationRoutes.includes(route) && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
