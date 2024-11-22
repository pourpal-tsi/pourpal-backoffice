export interface Order {
  order_id: string;
  order_number: string;
  user_id: string;
  status: string;
  delivery_information: DeliveryInformation;
  order_items: OrderItem[];
  total_price: OrderPrice;
  created_at: string;
}

export interface DeliveryInformation {
  recipient_name: string;
  recipient_phone: string;
  recipient_city: string;
  recipient_street_address: string;
}

export interface OrderItem {
  item_id: string;
  quantity: number;
}

export interface OrderPrice {
  currency: "€" | "$";
  amount: string;
}
