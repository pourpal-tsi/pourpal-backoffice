import backend from "@/lib/client-config";

export interface Country {
  code: string;
  name: string;
  emoji: string;
  unicode: string;
}

interface CountryResponse {
  countries: Country[];
}

export async function getCountries() {
  const result = await backend.get("/item-countries");
  return (result as CountryResponse).countries;
}
