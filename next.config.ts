import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://v852rvkaop.ufs.sh/**'), new URL('https://example.com/**'), new URL('https://images.unsplash.com/**')]
  }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

