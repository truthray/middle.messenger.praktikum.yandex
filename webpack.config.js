const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
        fallback: {
            path: false,
            fs: false,
        },
    },
    devServer: {
        watchFiles: 'dist',
        compress: true,
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: 'ts-loader',
                options: {
                    configFile: path.resolve(__dirname, 'tsconfig.json'),
                },
                exclude: /(node_modules)/,
            },
            { 
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.pug$/,
                include: path.join(__dirname, 'src'),
                loader: 'pug-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['es2015'],
                  },
                },
              },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
              template: './src/index.pug',
              filename: './index.html',
              inject: true,
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
};
