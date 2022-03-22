const path = require("path");
const fs = require("fs");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const OptimizCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");
const { VueLoaderPlugin } = require("vue-loader");

const isDev = process.env.NODE_ENV === "development";
const idProd = !isDev;

const PATHS = {
  // Path to main app dir
  src: path.join(__dirname, "src"),
  // Path to Output dir
  dist: path.join(__dirname, "dist"),
  // Path to Second Output dir (js/css/fonts etc folder)
  assets: "assets/",
};

const PATHSPAGE = {
  // Path to main app dir
  src: path.join(__dirname, "src/pages"),
  // Path to Output dir
  dist: path.join(__dirname, "dist/pages"),
  // Path to Second Output dir (js/css/fonts etc folder)
  assets: "assets/",
};

const PAGES_DIR = PATHS.src
const PAGES = fs
  .readdirSync('./src/pages')
  .filter(fileName => fileName.endsWith('.html'))
// const PAGES_DIR = `${PATHS.src}/pug/pages/`;
// const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));
console.log(PAGES)
const fileName = (ext) =>
  isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;
const optimization = () => {
  const confObj = {
    splitChunks: { chunks: "all" },
  };

  if (idProd)
    confObj.minimizer = [
      new OptimizCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                "svgo",
                {
                  plugins: extendDefaultPlugins([
                    {
                      name: "removeViewBox",
                      active: false,
                    },
                    {
                      name: "addAttributesToSVGElement",
                      params: {
                        attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                      },
                    },
                  ]),
                },
              ],
            ],
          },
        },
      }),
    ];

  return confObj;
};
  
module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    main: "./js/main.js",
    index: "./js/pages/index.js",
    requisites: "./js/pages/requisites.js"
  },
  output: {
    filename: `./js/${fileName("js")}`,
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
    assetModuleFilename: "src/assets/images/[name].[ext]",
  },
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  optimization: optimization(),
  plugins: [
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/index.html"),
      minify: { collapseWhitespace: idProd },
      chunks: ["main"]
    }),
    new HTMLWebpackPlugin({
      filename: "requisites.html",
      template: path.resolve(__dirname, "src/pages/requisites.html"),
      minify: { collapseWhitespace: idProd },
      chunks: ["main"]
    }),
    // ...PAGES.map(page => new HTMLWebpackPlugin({
        
    //   template: path.resolve(__dirname, `src/pages/${page}`),
    //   filename: page,
    //   minify: {collapseWhitespace: idProd}
    // })),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `./css/${fileName("css")}`,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    new VueLoaderPlugin(),
  ],
  devtool: idProd ? false : "source-map",
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.pug$/,
        loader: "pug-loader",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
            },
          },
          "vue-style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + "/";
              },
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(?:|gif|jpg|jpeg|svg|png)$/,
        type: "asset/resource",
        generator: {
          filename: "img/[hash][ext][query]",
        },
      },
      {
        test: /\.(woff|woff2|eot|otf|ttf)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext][query]",
        },
      },
    ],
  },
};
