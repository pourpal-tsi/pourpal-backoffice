import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { MutationConfig } from "@/types/query";
import { AuthenticationResponse } from "@/types/auth";
import api from "@/config/api";

export const registerSchema = z.object({
  email: z.string().trim().min(1, "Required").email(),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export async function register(body: RegisterInput) {
  return api.post<AuthenticationResponse>("/auth/register/admin", { body });
}

export interface UseRegisterOptions {
  mutationConfig?: MutationConfig<typeof register>;
}

export function useRegister({ mutationConfig }: UseRegisterOptions = {}) {
  return useMutation({
    ...mutationConfig,
    mutationKey: ["auth"],
    mutationFn: register,
  });
}
