/** @type {import("next").NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: "/",
      destination: "/login",
      permanent: false,
    },
    {
      source: "/store",
      destination: "/store/inventory",
      permanent: false,
    },
  ],
};

export default nextConfig;
