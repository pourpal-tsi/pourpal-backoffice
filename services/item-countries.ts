import api from "@/config/api";

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
  const result = await api.get("/item-countries");
  return (result as CountryResponse).countries;
}
