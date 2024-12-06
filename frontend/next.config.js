const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // https://github.com/vercel/next.js/pull/56020
    // https://github.com/vercel/next.js/issues/49742
    // ! Not working with use client
    // optimizePackageImports: [
    //   // https://github.com/mantinedev/mantine/issues/4926
    //   '@mantine/core',
    //   '@mantine/hooks',
    //   // "@mantine/notifications", // errors: There are multiple modules with names that only differ in casing.
    //   '@mantine/form',
    //   '@mantine/dropzone',
    //   "@tabler/icons-react",
    //   "@thirdweb-dev/chains", // Attempted import error: '@blocto/sdk' does not contain a default export (imported as 'BloctoSDK').
    //   "@thirdweb-dev/react", // Attempted import error: '@blocto/sdk' does not contain a default export (imported as 'BloctoSDK').
    //   "@thirdweb-dev/sdk", // Attempted import error: '@blocto/sdk' does not contain a default export (imported as 'BloctoSDK').
    // ]
  }
}

module.exports = withBundleAnalyzer(nextConfig)
