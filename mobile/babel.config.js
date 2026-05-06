const path = require('path');
const fs = require('fs');

module.exports = function (api) {
  api.cache.using(() => {
    const envPath = path.join(__dirname, '.env');
    try {
      return fs.statSync(envPath).mtimeMs;
    } catch {
      return 0;
    }
  });
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
        },
      ],
    ],
  };
};
