import { NextRequest, NextResponse } from "next/server";
import { AuthenticationResponse } from "@/types/auth";
import { createSessionCookies } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const response = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
    body: await request.blob(),
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = (await response.json()) as AuthenticationResponse;
    const { accessTokenCookie, refreshTokenCookie } =
      createSessionCookies(data);

    cookies().set(accessTokenCookie);
    cookies().set(refreshTokenCookie);

    return NextResponse.json({});
  }

  return response;
}
