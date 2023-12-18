/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "unsplash.com", "www.google.com", "eventtools.event.microsoft.com"],
  },
};

module.exports = nextConfig;
