const path = require("path");
const resolve = require("resolve");

const srcPath = path.resolve(__dirname, "src");

module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@": path.resolve(srcPath, "src/"),
      "@app": path.join(srcPath, "/app"),
      "@pages": path.join(srcPath, "/pages"),
      "@shared": path.join(srcPath, "/shared"),
    },
  },
  optimization: {
    usedExports: true,
  },
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
    ],
  },
};
