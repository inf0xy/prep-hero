/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports')();
const { join } = require('path')
const withTM = require('next-transpile-modules')(['react-markdown']);

const nextConfig = withTM(removeImports({
  reactStrictMode: true,
  experimental: { esmExternals: true },
  sassOptions: {
    includePaths: [join(__dirname, 'styles')],
  },
}));

module.exports = nextConfig;
