import { z } from "zod";
import { MutationConfig } from "@/types/query";
import { useMutation } from "@tanstack/react-query";
import api from "@/config/api";

export const createItemTypeSchema = z.object({
  type: z.string().min(1, "Required"),
});

export type CreateItemTypeRequest = z.infer<typeof createItemTypeSchema>;

export async function createItemType(body: CreateItemTypeRequest) {
  return api.post("/item-types", { body });
}

export interface UseCreateItemTypeOptions {
  mutationConfig?: MutationConfig<typeof createItemType>;
}

export function useCreateItemType({
  mutationConfig,
}: UseCreateItemTypeOptions = {}) {
  return useMutation({
    ...mutationConfig,
    mutationKey: ["item-types"],
    mutationFn: createItemType,
  });
}
