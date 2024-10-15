import { jwtDecode } from "jwt-decode";
import { AuthenticationResponse } from "@/types/auth";

export function createSessionCookies(values: AuthenticationResponse) {
  const { access_token, refresh_token } = values;
  const securityOptions = {
    sameSite: "strict" as const,
    httpOnly: true,
    secure: true,
  };

  return {
    accessTokenCookie: {
      name: "accessToken",
      value: access_token,
      expires: (jwtDecode(access_token).exp ?? 0) * 1000,
      ...securityOptions,
    },
    refreshTokenCookie: {
      name: "refreshToken",
      value: refresh_token,
      expires: (jwtDecode(refresh_token).exp ?? 0) * 1000,
      ...securityOptions,
    },
  };
}
