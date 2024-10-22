import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { MutationConfig } from "@/types/query";
import { AuthenticationResponse } from "@/types/auth";
import api from "@/config/api";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Required").email(),
  password: z.string().trim().min(1, "Required"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export async function login(body: LoginInput) {
  return api.post<AuthenticationResponse>("/auth/login", { body });
}

export interface UseLoginOptions {
  mutationConfig?: MutationConfig<typeof login>;
}

export function useLogin({ mutationConfig }: UseLoginOptions = {}) {
  return useMutation({
    ...mutationConfig,
    mutationKey: ["auth"],
    mutationFn: login,
  });
}
