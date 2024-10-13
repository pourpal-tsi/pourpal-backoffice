import api from "@/config/api";

export interface ItemType {
  type_id: string;
  type: string;
}

interface ItemTypesResponse {
  types: ItemType[];
}

export async function getItemTypes() {
  const result = await api.get("/item-types");
  return (result as ItemTypesResponse).types;
}
