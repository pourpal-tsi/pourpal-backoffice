import { jwtDecode } from "jwt-decode";
import { AuthenticationResponse } from "@/types/auth";

export function createSessionCookie(values: AuthenticationResponse) {
  const { access_token } = values;
  return {
    name: "accessToken",
    value: access_token,
    expires: (jwtDecode(access_token).exp ?? 0) * 1000,
    sameSite: "strict" as const,
    httpOnly: true,
    secure: true,
  };
}
