/** @type {import("next").NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: "/",
      destination: "/inventory",
      permanent: true,
    },
  ],
};

export default nextConfig;
