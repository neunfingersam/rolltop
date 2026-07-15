/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./i18n.ts');

const nextConfig = {
  images: {
    // images are local — no remote patterns needed
  },
};

module.exports = withNextIntl(nextConfig);
