import { z } from "zod";
import { itemSchema } from "@/features/items/types/input";

import api from "@/config/api";
import { MutationConfig } from "@/types/query";
import { useMutation } from "@tanstack/react-query";

export const createItemSchema = itemSchema;

export type CreateItemRequest = z.infer<typeof createItemSchema>;

export async function createItem(body: CreateItemRequest) {
  return api.post("/items", { body });
}

export interface UseCreateItemOptions {
  mutationConfig?: MutationConfig<typeof createItem>;
}

export function useCreateItem({ mutationConfig }: UseCreateItemOptions = {}) {
  return useMutation({
    ...mutationConfig,
    mutationKey: ["items"],
    mutationFn: createItem,
  });
}
