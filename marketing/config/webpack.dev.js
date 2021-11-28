const { merge } = require("webpack-merge");
const htmlwebpackplugin = require("html-webpack-plugin");
const moduleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common.js");
const packages = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    new htmlwebpackplugin({
      template: "./public/index.html",
    }),
    new moduleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingApp": "./src/bootstrap",
      },
      shared: packages.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
