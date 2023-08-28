/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // generate static site
  images: { unoptimized: true } // image optimization not supported for output 'export'
}

module.exports = nextConfig
