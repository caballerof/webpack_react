const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const merge = require('webpack-merge');
/**
 * Configuration file for development environment.
 */
const { devConfig } = require('./webpack.config.dev');
/**
 * Configuration file for production environment.
 */
const { prodConfig } = require('./webpack.config.prod');
/**
 * Output folder for development build.
 */
const DEV_DIR = path.resolve(__dirname, './dist');
/**
 * Output folder for production build.
 */
const PROD_DIR = path.resolve(__dirname, './build');
/**
 * Entry point for webpack
 */
const APP_DIR = `${path.resolve(__dirname, './src')}/index.jsx`;

/**
 * Common config for both developer and production.
 */
const config = {
  entry: {
    bundle: APP_DIR,
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', 'airbnb'],
          },
        }, { loader: 'eslint-loader' }],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path]/[name].[contenthash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(otf|eot|ttf|woff|woff2)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path]/[name].[contenthash].[ext]',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new CleanWebpackPlugin(),
  ],
};

module.exports = (mode) => {
  if (mode === 'dev') {
    return merge(config, devConfig({ OUTPUT_DIR: DEV_DIR }));
  }
  return merge(config, prodConfig({ OUTPUT_DIR: PROD_DIR }));
};
