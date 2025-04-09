const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[name][ext]',
        publicPath: ''
    },
    devServer: {
        static: './dist',
    },
    resolve: {
        extensions: [".ts"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.(svg|dds)/, type: 'asset/resource'}
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: "./src/index.html",
        favicon: "./src/favicon.ico"
    })],
    mode: "development"
};
