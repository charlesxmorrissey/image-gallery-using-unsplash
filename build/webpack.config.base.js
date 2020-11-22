'use strict'

const webpack = require('webpack')
const eslintFormatter = require('eslint-formatter-pretty')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dotenv = require('dotenv').config()

const config = require('./config')

const webpackConfig = {
  ...config.appStats,

  entry: {
    app: config.appIndexJs,
  },

  output: {
    path: config.appBuild,
    chunkFilename: '[name].chunk.js',
    filename: '[name].js',
  },

  resolve: {
    extensions: ['.js'],
    modules: [config.appSrc, 'node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: config.appSrc,
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/i,
        use: 'raw-loader',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),

    new ESLintPlugin({
      context: config.appSrc,
      emitWarning: true,
      formatter: eslintFormatter,
    }),

    new HtmlWebpackPlugin({
      description: config.appTemplateMeta.description,
      template: config.appTemplateMeta.template,
      title: config.appTemplateMeta.title,
    }),
  ],
}

module.exports = webpackConfig
