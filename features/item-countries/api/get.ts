import api from "@/config/api";
import type { ItemCountry } from "@/features/item-countries/types/model";
import type { QueryConfig } from "@/types/query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export interface GetItemCountriesResponse {
  countries: ItemCountry[];
}

export async function getItemCountries() {
  return api.get<GetItemCountriesResponse>("/item-countries");
}

export const getItemCountriesQueryOptions = () => {
  return queryOptions({
    queryKey: ["item-countries"],
    queryFn: () => getItemCountries(),
  });
};

export interface UseItemCountriesOptions {
  queryConfig?: QueryConfig<typeof getItemCountriesQueryOptions>;
}

export function useItemCountries({
  queryConfig,
}: UseItemCountriesOptions = {}) {
  return useQuery({
    ...getItemCountriesQueryOptions(),
    ...queryConfig,
  });
}
