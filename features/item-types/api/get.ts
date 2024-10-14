import api from "@/config/api";
import type { ItemType } from "@/features/item-types/types/model";
import type { QueryConfig } from "@/types/query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export interface GetItemTypesResponse {
  types: ItemType[];
}

export async function getItemTypes() {
  return api.get<GetItemTypesResponse>("/item-types");
}

export const getItemTypesQueryOptions = () => {
  return queryOptions({
    queryKey: ["item-types"],
    queryFn: () => getItemTypes(),
  });
};

export interface UseItemTypesOptions {
  queryConfig?: QueryConfig<typeof getItemTypesQueryOptions>;
}

export function useItemTypes({ queryConfig }: UseItemTypesOptions = {}) {
  return useQuery({
    ...getItemTypesQueryOptions(),
    ...queryConfig,
  });
}
