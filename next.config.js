/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/:path*",
      },
    ];
  },
  images: {
    domains: ["radiant-oasis-81819.herokuapp.com"],
  },
};

module.exports = nextConfig;
