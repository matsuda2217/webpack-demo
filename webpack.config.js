const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require("webpack-merge");
const parts = require('./webpack.part');

const commonConfig = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack demo"
      }),
    ],
    
  },
  parts.loadCSS(),
]);
const productionConfig = merge([])

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT
  }),
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

