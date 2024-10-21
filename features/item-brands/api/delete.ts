import api from "@/config/api";
import { MutationConfig } from "@/types/query";
import { useMutation } from "@tanstack/react-query";

export async function deleteItemBrand(id: string) {
  return api.delete(`/item-brands/${id}`);
}

export interface UseDeleteItemBrandOptions {
  mutationConfig?: MutationConfig<typeof deleteItemBrand>;
}

export function useDeleteItemBrand({
  mutationConfig,
}: UseDeleteItemBrandOptions = {}) {
  return useMutation({
    ...mutationConfig,
    mutationKey: ["item-brands"],
    mutationFn: deleteItemBrand,
  });
}
