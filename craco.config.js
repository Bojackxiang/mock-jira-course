const CracoLessPlugin = require("craco-less");
/* craco.config.js */
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#1DA57A",
              "@font-size-base": " 16px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
