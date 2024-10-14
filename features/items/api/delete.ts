import api from "@/config/api";
import { MutationConfig } from "@/types/query";
import { useMutation } from "@tanstack/react-query";

export async function deleteItem(id: string) {
  return api.delete(`/items/${id}`);
}

export interface UseDeleteItemOptions {
  mutationConfig?: MutationConfig<typeof deleteItem>;
}

export function useDeleteItem({ mutationConfig }: UseDeleteItemOptions = {}) {
  return useMutation({
    ...mutationConfig,
    mutationKey: ["items"],
    mutationFn: deleteItem,
  });
}
