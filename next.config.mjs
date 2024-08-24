/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vcard.thecard.co.in',
        port: '',
        pathname: '/uploads/**',
      },
      // Add more patterns if needed
    ],
  },
};

export default nextConfig;