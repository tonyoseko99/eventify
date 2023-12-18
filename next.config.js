/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "unsplash.com", "eventtools.event.microsoft.com"],
  },
};

module.exports = nextConfig;
