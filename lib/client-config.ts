import { RestClient } from "@/lib/client";

const backend = new RestClient({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL,
});

export default backend;
