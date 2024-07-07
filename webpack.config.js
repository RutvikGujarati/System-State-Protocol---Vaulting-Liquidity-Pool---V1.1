// next.config.js
const path = require('path');

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias['console-browserify'] = path.resolve(__dirname, 'node_modules/console-browserify/index.js');
    return config;
  },
};
