import api from "@/config/api";
import type { ItemBrand } from "@/features/item-brands/types/model";
import type { QueryConfig } from "@/types/query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export interface GetItemBrandsResponse {
  brands: ItemBrand[];
}

export async function getItemBrands() {
  return api.get<GetItemBrandsResponse>("/item-brands");
}

export const getItemBrandsQueryOptions = () => {
  return queryOptions({
    queryKey: ["item-brands"],
    queryFn: () => getItemBrands(),
  });
};

export interface UseItemBrandsOptions {
  queryConfig?: QueryConfig<typeof getItemBrandsQueryOptions>;
}

export function useItemBrands({ queryConfig }: UseItemBrandsOptions = {}) {
  return useQuery({
    ...getItemBrandsQueryOptions(),
    ...queryConfig,
  });
}
