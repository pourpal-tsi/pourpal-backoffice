import { RestClient } from "@/lib/api";

const api = new RestClient({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL,
});

export default api;
