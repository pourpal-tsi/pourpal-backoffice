import { z } from "zod";
import { itemSchema } from "@/features/items/types/input";

import api from "@/config/api";
import { MutationConfig } from "@/types/query";
import { useMutation } from "@tanstack/react-query";

export const updateItemSchema = itemSchema;

export type UpdateItemRequest = z.infer<typeof updateItemSchema>;

export interface UpdateItemParams {
  id: string;
  body: UpdateItemRequest;
}

export async function updateItem({ id, body }: UpdateItemParams) {
  return api.put(`/items/${id}`, { body });
}

export interface UseUpdateItemOptions {
  mutationConfig?: MutationConfig<typeof updateItem>;
}

export function useUpdateItem({ mutationConfig }: UseUpdateItemOptions = {}) {
  return useMutation({
    ...mutationConfig,
    mutationKey: ["items"],
    mutationFn: updateItem,
  });
}
