import { z } from "zod";
import { MutationConfig } from "@/types/query";
import { useMutation } from "@tanstack/react-query";
import api from "@/config/api";

export const createItemBrandSchema = z.object({
  brand: z.string().min(1, "Required"),
});

export type CreateItemBrandRequest = z.infer<typeof createItemBrandSchema>;

export async function createItemBrand(body: CreateItemBrandRequest) {
  return api.post("/item-brands", { body });
}

export interface UseCreateItemBrandOptions {
  mutationConfig?: MutationConfig<typeof createItemBrand>;
}

export function useCreateItemBrand({
  mutationConfig,
}: UseCreateItemBrandOptions = {}) {
  return useMutation({
    ...mutationConfig,
    mutationKey: ["item-brands"],
    mutationFn: createItemBrand,
  });
}
