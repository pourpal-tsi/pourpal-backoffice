import { RestClient } from "@/lib/api";

const api = new RestClient({
  baseUrl: "/api",
});

export default api;
