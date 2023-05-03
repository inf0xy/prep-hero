/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports')();
const { join } = require('path')

const nextConfig = removeImports({
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  sassOptions: {
    includePaths: [join(__dirname, 'styles')],
  },
});

module.exports = nextConfig;
