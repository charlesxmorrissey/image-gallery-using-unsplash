'use strict'

const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { merge } = require('webpack-merge')

const webpackConfig = require('./webpack.config.base')
const config = require('./config')

const webpackProdConfig = merge(webpackConfig, {
  mode: 'production',
  devtool: config.appProdSourceMap ? 'source-map' : false,

  output: {
    chunkFilename: 'js/[name].[chunkhash:8].js',
    filename: 'js/[name].[chunkhash:8].js',
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        sourceMap: config.appProdSourceMap,
        test: /\.js(\?.*)?$/i,
      }),

      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],

    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },

  plugins: [
    // Makes some environment variables available to our JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),

    // Removes the `dist` directory before compilation.
    new CleanWebpackPlugin([config.appBuild], {
      root: config.appBase,
    }),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
  ],
})

module.exports = webpackProdConfig
