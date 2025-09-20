/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config.js');
const dotenv = require('dotenv');

const nextTranslate = require('next-translate-plugin');
const nextConfig = () => {
  dotenv.config({ path: '.env' });

  return {
    reactStrictMode: false,
    serverRuntimeConfig: {
      PROJECT_ROOT: __dirname,
    },
    i18n,
    webpack: (config, { isServer, webpack }) => {
      return config;
    },
    images: {
      domains: ['images.pexels.com'],
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
  };
};

module.exports = nextTranslate({ ...nextConfig() });
