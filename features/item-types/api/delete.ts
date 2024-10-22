import api from "@/config/api";
import { MutationConfig } from "@/types/query";
import { useMutation } from "@tanstack/react-query";

export async function deleteItemType(id: string) {
  return api.delete(`/item-types/${id}`);
}

export interface UseDeleteItemTypeOptions {
  mutationConfig?: MutationConfig<typeof deleteItemType>;
}

export function useDeleteItemType({
  mutationConfig,
}: UseDeleteItemTypeOptions = {}) {
  return useMutation({
    ...mutationConfig,
    mutationKey: ["item-types"],
    mutationFn: deleteItemType,
  });
}
