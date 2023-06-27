/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img2.tapimg.com',
        port: '',
        pathname: '*/**',
      },
    ],
  },
}

module.exports = nextConfig
