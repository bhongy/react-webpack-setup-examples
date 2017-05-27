const project = require('../config/project')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: project.paths.src(),
  entry: {
    main: ['./index.js'],
    vendor: project.entry.vendor,
  },

  output: {
    // use [chunkhash] in production only
    // because it increases compilation time
    filename: '[name].[chunkhash:12].js',
    path: project.paths.dist(),
    publicPath: 'https://cdn.google.com',
  },

  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: project.paths.src(),
    }, {
      test: /\.css$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
        options: { modules: true },
      }],
    }],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new CleanWebpackPlugin([
      project.paths.dist(),
    ], {
      root: project.paths.root(),
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack Demo',
      template: project.paths.src('index.ejs'),
    }),
    new InlineManifestWebpackPlugin({
      name: 'webpackManifest',
    }),
  ],
}
