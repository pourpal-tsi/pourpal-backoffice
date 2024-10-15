/*
 * A catch-all proxy route that automatically redirects all HTTP requests to the
 * backend API, passing JWT from request cookies into the authorization header.
 * This way, the frontend code can interact with its own `/api` routes as if
 * they were the real backend.
 */

import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  return proxy(request, "GET");
}

export async function POST(request: NextRequest) {
  return proxy(request, "POST");
}

export async function PUT(request: NextRequest) {
  return proxy(request, "PUT");
}

export async function DELETE(request: NextRequest) {
  return proxy(request, "DELETE");
}

export async function PATCH(request: NextRequest) {
  return proxy(request, "PATCH");
}

export async function HEAD(request: NextRequest) {
  return proxy(request, "HEAD");
}

export async function OPTIONS(request: NextRequest) {
  return proxy(request, "OPTIONS");
}

async function proxy(request: NextRequest, method: string) {
  const { pathname, search } = request.nextUrl;
  const endpoint = pathname.split("/api")[1] || "/";

  const accessToken = cookies().get("accessToken")?.value;
  const headers = {
    ...request.headers,
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  return fetch(process.env.BACKEND_API_URL + endpoint + search, {
    ...(request.body && { body: await request.blob() }),
    headers,
    method,
  });
}
