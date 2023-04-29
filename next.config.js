/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports')();

const nextConfig = removeImports({
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
});

module.exports = nextConfig;
