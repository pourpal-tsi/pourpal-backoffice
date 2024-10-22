import { z } from "zod";
import { MutationConfig } from "@/types/query";
import { useMutation } from "@tanstack/react-query";
import api from "@/config/api";

export const updateItemTypeSchema = z.object({
  type: z.string().min(1, "Required"),
});

export type UpdateItemTypeRequest = z.infer<typeof updateItemTypeSchema>;

export interface UpdateItemTypeParams {
  id: string;
  body: UpdateItemTypeRequest;
}

export async function updateItemType({ id, body }: UpdateItemTypeParams) {
  return api.put(`/item-types/${id}`, { body });
}

export interface UseUpdateItemTypeOptions {
  mutationConfig?: MutationConfig<typeof updateItemType>;
}

export function useUpdateItemType({
  mutationConfig,
}: UseUpdateItemTypeOptions = {}) {
  return useMutation({
    ...mutationConfig,
    mutationKey: ["item-types"],
    mutationFn: updateItemType,
  });
}
