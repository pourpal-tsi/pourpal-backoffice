import backend from "@/lib/client-config";

export interface ItemBrand {
  brand_id: string;
  brand: string;
}

interface ItemBrandsResponse {
  brands: ItemBrand[];
}

export async function getItemBrands() {
  const result = await backend.get("/item-brands");
  return (result as ItemBrandsResponse).brands;
}
