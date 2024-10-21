import { z } from "zod";
import { MutationConfig } from "@/types/query";
import { useMutation } from "@tanstack/react-query";
import api from "@/config/api";

export const updateItemBrandSchema = z.object({
  brand: z.string().min(1, "Required"),
});

export type UpdateItemBrandRequest = z.infer<typeof updateItemBrandSchema>;

export interface UpdateItemBrandParams {
  id: string;
  body: UpdateItemBrandRequest;
}

export async function updateItemBrand({ id, body }: UpdateItemBrandParams) {
  return api.put(`/item-brands/${id}`, { body });
}

export interface UseUpdateItemBrandOptions {
  mutationConfig?: MutationConfig<typeof updateItemBrand>;
}

export function useUpdateItemBrand({
  mutationConfig,
}: UseUpdateItemBrandOptions = {}) {
  return useMutation({
    ...mutationConfig,
    mutationKey: ["item-brands"],
    mutationFn: updateItemBrand,
  });
}
