/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  exclude: [/pages\/dashboard\/layout\.tsx$/],
};

module.exports = nextConfig;
