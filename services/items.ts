export interface Item {
  id: string;
  name: string;
  type: string;
  brand: string;
  price: number;
  country: string;
  volume: number;
  alcoholVolume: number;
  quantity: number;
  description: string;
  imageUrl: string;
}

// Mock in-memory storage for testing.
let items: Item[] = [];

// Auto-increment counter for identifiers.
let sequence = 1000;

export async function getItems() {
  return [...items];
}

export async function getItem(id: string) {
  return items.find((it) => it.id == id);
}

export async function createItem(item: Item) {
  const result = { ...item, id: "SKU" + String(sequence++) };
  items.push(result);
  return result;
}

export async function updateItem(item: Item) {
  items = items.map((it) => (it.id == item.id ? item : it));
}

export async function deleteItem(id: string) {
  items = items.filter((it) => it.id != id);
}
