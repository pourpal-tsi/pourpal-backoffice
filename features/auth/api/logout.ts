import { useMutation } from "@tanstack/react-query";
import { MutationConfig } from "@/types/query";
import api from "@/config/api";

export async function logout() {
  return api.post("/auth/logout");
}

export interface UseLogoutOptions {
  mutationConfig?: MutationConfig<typeof logout>;
}

export function useLogout({ mutationConfig }: UseLogoutOptions = {}) {
  return useMutation({
    ...mutationConfig,
    mutationKey: ["auth"],
    mutationFn: logout,
  });
}
