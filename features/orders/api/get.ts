import api from "@/config/api";
import type { Paging } from "@/types/paging";
import type { QueryConfig } from "@/types/query";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { Order } from "@/features/orders/types/order";

export interface GetOrdersParams {
  pageSize?: number | null;
  pageNumber?: number | null;
}

export interface GetOrdersResponse {
  orders: Order[];
  paging: Paging;
}

export async function getOrders({
  pageSize,
  pageNumber,
}: GetOrdersParams = {}) {
  return api.get<GetOrdersResponse>(`/orders`, {
    params: {
      page_size: pageSize,
      page_number: pageNumber,
    },
  });
}

export const getOrdersQueryOptions = ({
  pageSize,
  pageNumber,
}: GetOrdersParams = {}) => {
  return queryOptions({
    queryKey: ["orders", { pageSize, pageNumber }],
    queryFn: () =>
      getOrders({
        pageSize,
        pageNumber,
      }),
  });
};

export interface UseOrdersOptions extends GetOrdersParams {
  queryConfig?: QueryConfig<typeof getOrdersQueryOptions>;
}

export function useOrders({
  pageSize,
  pageNumber,
  queryConfig,
}: UseOrdersOptions) {
  return useQuery({
    ...getOrdersQueryOptions({ pageSize, pageNumber }),
    ...queryConfig,
  });
}
