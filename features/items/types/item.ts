export interface Item {
  item_id: string;
  sku: string;
  title: string;
  type_id: string;
  type_name: string;
  brand_id: string;
  brand_name: string;
  origin_country_code: string;
  origin_country_name: string;
  alcohol_volume: ItemAlcoholVolume;
  volume: ItemVolume;
  price: ItemPrice;
  quantity: number;
  image_url: string;
  description: string;
  updated_at: string;
  added_at: string;
}

export interface ItemPrice {
  currency: "€" | "$";
  amount: string;
}

export interface ItemVolume {
  unit: "ml" | "cl" | "dl" | "l";
  amount: string;
}

export interface ItemAlcoholVolume {
  unit: "%";
  amount: string;
}
