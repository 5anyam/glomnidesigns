/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: ['images.unsplash.com', 'assets.aceternity.com',],
    unoptimized: true,
},
eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during builds
  },

}

module.exports = nextConfig
