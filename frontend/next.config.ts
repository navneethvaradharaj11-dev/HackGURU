import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/hackathons',
        destination: '/events?category=Hackathon',
        permanent: false,
      },
      {
        source: '/symposiums',
        destination: '/events?category=Symposium',
        permanent: false,
      },
      {
        source: '/workshops',
        destination: '/events?category=Workshop',
        permanent: false,
      },
      {
        source: '/robotics',
        destination: '/events?category=Competition',
        permanent: false,
      },
      {
        source: '/directory',
        destination: '/explore',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

