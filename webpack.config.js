const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require("webpack-merge");
const parts = require('./webpack.part');
const glob = require("glob");
const path = require('path');

const PATHS = {
  app: path.join(__dirname, "src"),
}
const commonConfig = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack demo"
      }),
    ],
  },
  parts.loadJavaScript({ include: PATHS.app }),
]);

const productionConfig = merge([
  parts.extractCSS({use: ["css-loader", parts.autoprefix()],
  }),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
  }),
  parts.loadImages({
    options: {
      limit: 100000,
      name: "[name].[ext]",
    },
  }),
]);

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT
  }),
  parts.loadCSS(),
  parts.loadImages(),
]);

module.exports = mode => {
  if (mode === "production") {
    return merge(commonConfig, productionConfig, { mode });
  } else {
    return merge(commonConfig, developmentConfig, { mode })
  }
}
// module.exports = {
//   plugins: [
//     new HtmlWebpackPlugin({
//       title: "Webpack demo"
//     })
//   ],
//   devServer: {
//     // display errors
//     stats: 'errors-only',
//     overlay: {
//       warnings: true,
//       errors: true
//     },
//     host: process.env.HOST,
//     port: process.env.PORT,
//     open: true
//   }
// }

