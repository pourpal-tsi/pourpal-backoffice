import api from "@/config/api";
import type { ItemSchema } from "@/schemes/items";
import { RestClientParams } from "@/lib/api";

export interface Item {
  id: string;
  sku: string;
  title: string;
  type_id: string;
  type_name: string;
  brand_id: string;
  brand_name: string;
  price: string;
  origin_country_code: string;
  origin_country_name: string;
  volume: string;
  volume_unit: "ml" | "cl" | "dl" | "l";
  alcohol_volume: string;
  quantity: number;
  description: string;
  image_url: string;
}

interface PagingResponse {
  count: number;
  page_size: number;
  page_number: number;
  total_count: number;
  total_pages: number;
  first_page: boolean;
  last_page: boolean;
}

interface ItemsResponse {
  items: ItemResponse[];
  paging: PagingResponse;
}

interface ItemResponse {
  item_id: string;
  title: string;
  sku: string;
  image_url: string;
  description: string;
  type_id: string;
  type_name: string;
  price: {
    amount: {
      $numberDecimal: string;
    };
    currency: string;
  };
  volume: {
    amount: {
      $numberDecimal: string;
    };
    unit: "ml" | "cl" | "dl" | "l";
  };
  alcohol_volume: {
    amount: {
      $numberDecimal: string;
    };
    unit: string;
  };
  quantity: number;
  origin_country_code: string;
  origin_country_name: string;
  brand_id: string;
  brand_name: string;
  updated_at: {
    $date: string;
  };
  added_at: {
    $date: string;
  };
}

export interface GetItemsQueryParams {
  search?: string | null;
  page_size?: number | null;
  page_number?: number | null;
}

export async function getItems(props: GetItemsQueryParams = {}) {
  const result = (await api.get(`/items`, {
    params: props as RestClientParams,
  })) as ItemsResponse;

  return {
    items: result.items.map(convert),
    paging: result.paging,
  };
}

export async function createItem(item: ItemSchema) {
  await api.post("/items", { body: { ...item, id: undefined } });
}

export async function updateItem(item: ItemSchema) {
  await api.put(`/item/${item.id}`, { body: { ...item, id: undefined } });
}

export async function deleteItem(id: string) {
  await api.delete(`/item/${id}`);
}

function convert(response: ItemResponse): Item {
  return {
    id: response.item_id,
    sku: response.sku,
    title: response.title,
    type_id: response.type_id,
    type_name: response.type_name,
    brand_id: response.brand_id,
    brand_name: response.brand_name,
    price: response.price.amount.$numberDecimal,
    origin_country_code: response.origin_country_code,
    origin_country_name: response.origin_country_name,
    volume: response.volume.amount.$numberDecimal,
    volume_unit: response.volume.unit,
    alcohol_volume: response.alcohol_volume.amount.$numberDecimal,
    quantity: response.quantity,
    description: response.description,
    image_url: response.image_url,
  };
}
