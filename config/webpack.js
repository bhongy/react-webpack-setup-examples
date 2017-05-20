const { noop } = require('lodash')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const project = require('../config/project')

const commonConfig = {
  context: project.paths.src(),
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: project.paths.src(),
    }, {
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: { modules: true },
      }],
    }]
  },
}

const devServerConfig = {
  entry: {
    main: [
      // activate HMR for React
      'react-hot-loader/patch',

      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint
      'webpack-hot-middleware/client',

      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates
      'webpack/hot/only-dev-server',

      // TODO: extract to variable
      './index.js'
    ],
    // TODO: extract to variable
    vendor: ['react', 'react-dom'],
  },

  output: {
    filename: '[name].js',
    path: project.paths.dist(),
    // necessary for HMR to know where to load the hot update chunks
    publicPath: '/',
  },

  devtool: 'cheap-module-eval-source-map',

  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),
    // prints more readable module names in the browser console on HMR updates
    // otherwise HMR will log module id instead
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.EvalSourceMapDevToolPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      // important: "manifest" has to follow "vendor"
      // otherwise it will be included in "vendor" and cause
      // vendor [chunkhash] to change everytime
      names: ['vendor', 'manifest'],
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack Demo',
      template: project.paths.src('index.ejs'),
    }),
  ]
}

const buildConfig = {
  entry: {
    // main: ['./index.js'],
    main: './index.js',
    vendor: ['react', 'react-dom'],
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
  ]
}

const debugBuildConfig = {
  output: {
    filename: '[name].js',
    path: project.paths.dist(),
    publicPath: '',
  },
}

const productionBuildConfig = {
  output: {
    // use [chunkhash] in production only
    // because it increases compilation time
    filename: '[name].[chunkhash:12].js',
    path: project.paths.dist(),
    publicPath: 'https://cdn.google.com',
  },
}

module.exports = (environment) => {
  const env = Object.assign({
    devServer: false,
    production: false,
  }, environment)

  if (env.devServer) {
    return Object.assign({}, commonConfig, devServerConfig)
  }

  // !devServer -> build (debug)
  if (!env.production) {
    return Object.assign({}, commonConfig, buildConfig, debugBuildConfig)
  }

  // !devServer -> build (production)
  return Object.assign({}, commonConfig, buildConfig, productionBuildConfig)
}
