import api from "@/config/api";

export interface ItemBrand {
  brand_id: string;
  brand: string;
}

interface ItemBrandsResponse {
  brands: ItemBrand[];
}

export async function getItemBrands() {
  const result = await api.get("/item-brands");
  return (result as ItemBrandsResponse).brands;
}
