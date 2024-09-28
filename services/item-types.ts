import backend from "@/lib/client-config";

export interface ItemType {
  type_id: string;
  type: string;
}

interface ItemTypesResponse {
  types: ItemType[];
}

export async function getItemTypes() {
  const result = await backend.get("/items/types");
  return (result as ItemTypesResponse).types;
}
