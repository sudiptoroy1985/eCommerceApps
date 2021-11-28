const { merge } = require("webpack-merge");
const htmlwebpackplugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common.js");
const moduleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packages = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    new htmlwebpackplugin({
      template: "./public/index.html",
    }),
    new moduleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
      },
      shared: packages.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
