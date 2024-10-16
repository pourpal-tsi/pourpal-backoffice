import { NextRequest, NextResponse } from "next/server";
import { AuthenticationResponse } from "@/types/auth";
import { createSessionCookie } from "@/lib/auth";
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
    const accessTokenCookie = createSessionCookie(data);
    cookies().set(accessTokenCookie);
    return NextResponse.json({ status: 200 });
  }

  return response;
}
