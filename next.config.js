const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {
    domains: [
      "https://backend_bd.enrichcous.com:4443",
      "vntt.com.vn",
      "http://localhost:3000",
      "https://front_bd.enrichcous.com:4443"
    ],
  },
  trailingSlash: true,

  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  },
  // webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },


  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.target = "electron-renderer";
  //   }
  //   return config;
  // },
};

module.exports = withBundleAnalyzer(nextConfig);
