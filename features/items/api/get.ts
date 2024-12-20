import api from "@/config/api";
import type { Paging } from "@/types/paging";
import type { Item } from "@/features/items/types/item";
import type { QueryConfig } from "@/types/query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export interface GetItemsParams {
  search?: string | null;
  pageSize?: number | null;
  pageNumber?: number | null;
}

export interface GetItemsResponse {
  items: Item[];
  paging: Paging;
}

export async function getItems({
  search,
  pageSize,
  pageNumber,
}: GetItemsParams = {}) {
  return api.get<GetItemsResponse>(`/items`, {
    params: {
      search,
      page_size: pageSize,
      page_number: pageNumber,
    },
  });
}

export const getItemsQueryOptions = ({
  search,
  pageSize,
  pageNumber,
}: GetItemsParams = {}) => {
  return queryOptions({
    queryKey: ["items", { search, pageSize, pageNumber }],
    queryFn: () =>
      getItems({
        search,
        pageSize,
        pageNumber,
      }),
  });
};

export interface UseItemsOptions extends GetItemsParams {
  queryConfig?: QueryConfig<typeof getItemsQueryOptions>;
}

export function useItems({
  search,
  pageSize,
  pageNumber,
  queryConfig,
}: UseItemsOptions) {
  return useQuery({
    ...getItemsQueryOptions({ search, pageSize, pageNumber }),
    ...queryConfig,
  });
}

export interface GetItemParams {
  id: string;
}

export interface GetItemResponse {
  item: Item;
}

export async function getItem({ id }: GetItemParams) {
  return api.get<GetItemResponse>(`/items/${id}`);
}

export const getItemQueryOptions = ({ id }: GetItemParams) => {
  return queryOptions({
    queryKey: [`items`, id],
    queryFn: () => getItem({ id }),
  });
};

export interface UseItemOptions extends GetItemParams {
  queryConfig?: QueryConfig<typeof getItemQueryOptions>;
}

export function useItem({ id, queryConfig }: UseItemOptions) {
  return useQuery({
    ...getItemQueryOptions({ id }),
    ...queryConfig,
  });
}
