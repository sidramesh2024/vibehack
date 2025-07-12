const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  // Remove static export to enable API routes
  // output: 'export', // Commented out for serverless functions
  trailingSlash: true, // Required for Netlify
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { 
    unoptimized: true,
    loader: 'default',
    domains: ['firebasestorage.googleapis.com'],
  },
  // Disable server-side features for static export
  // Note: rewrites and redirects don't work with static export
  // These will be handled by Netlify redirects
};

module.exports = nextConfig;
