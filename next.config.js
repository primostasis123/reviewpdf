/** @type {import('next').NextConfig} */
const cspHeader = `
    script-src  'self' 'unsafe-eval' 'unsafe-inline' *.paypal.com *.paypalobjects.com *.braintreegateway.com https://www.gstatic.com;
    connect-src 'self' https://*.paypal.com https://*.paypal.cn https://*.paypalobjects.com https://objects.paypal.cn  https://www.google-analytics.com 'unsafe-inline' https://*.qualtrics.com ;
    `
const nextConfig = {
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, webpack }
      ) => {
        config.resolve.alias.canvas = false
        config.resolve.alias.encoding = false
        return config
  },
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
    ],
  },
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'Content-Security-Policy',
  //           value: cspHeader.replace(/\n/g, ''),
  //         },
  //       ],
  //     },
  //   ]
  // },
}

module.exports = nextConfig
