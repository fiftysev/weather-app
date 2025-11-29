const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const webpack = require("webpack");

module.exports = (env, argv) => {
  const isDev = argv.mode === "development";

  return {
    entry: "./src/main.ts",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "weather-widget.js",
      library: {
        name: "WeatherWidget",
        type: "umd",
        umdNamedDefine: true,
      },
      globalObject: "this",
      clean: true,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".vue", ".json"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
          exclude: /node_modules/,
        },
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(false),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        inject: "body",
        scriptLoading: "blocking",
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      compress: true,
      port: 8080,
      hot: true,
      open: true,
    },
    devtool: isDev ? "eval-source-map" : false,
  };
};
