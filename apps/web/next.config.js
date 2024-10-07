/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // …
        serverComponentsExternalPackages: ['@react-pdf/renderer'],
      },
}

module.exports = nextConfig
