const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const project = require('../config/project')
const { noop } = require('lodash')

module.exports = ({
  devServer = false,
  production = false,
}) => {
  const config = {
    context: project.paths.src(),
  }

  const mainEntry = devServer
    ? [
      // activate HMR for React
      'react-hot-loader/patch',
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint
      'webpack-dev-server/client',
      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates
      'webpack/hot/only-dev-server',
      './index.js'
    ]
    : './index.js'

  config.entry = {
    main: mainEntry,
    vendor: ['react', 'react-dom'],
  }

  config.output = {
    // use [chunkhash] in production only
    // because it increases compilation time
    filename: production ? '[name].[chunkhash:12].js' : '[name].js',
    path: project.paths.dist(),
    // necessary for HMR to know where to load the hot update chunks
    publicPath: devServer
      ? '/'
      : production
      ? 'https://cdn.google.com'
      : '',
  }

  config.module = {
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
  }

  const commonsChunk = () =>
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor', // specify the common bundle's name.
    //   // implicit common vendor chunk
    //   // https://webpack.js.org/guides/code-splitting-libraries/#implicit-common-vendor-chunk
    //   minChunks(module) {
    //     return module.context && module.context.indexOf('node_modules') !== -1
    //   },
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      // important: "manifest" has to follow "vendor"
      // otherwise it will be included in "vendor" and cause
      // vendor [chunkhash] to change everytime
      names: ['vendor', 'manifest'],
    })

  const cleanDist = () =>
    new CleanWebpackPlugin([
      project.paths.dist(),
    ], {
      root: project.paths.root(),
    })

  const htmlPlugin = () =>
    new HtmlWebpackPlugin({
      title: 'Webpack Demo',
      template: project.paths.src('index.ejs'),
    })

  if (devServer) {
    config.plugins = [
      // enable HMR globally
      new webpack.HotModuleReplacementPlugin(),
      // prints more readable module names in the browser console on HMR updates
      new webpack.NamedModulesPlugin(),
      commonsChunk(),
      htmlPlugin(),
    ]
  } else {
    config.plugins = [
      commonsChunk(),
      cleanDist(),
      htmlPlugin(),
      new InlineManifestWebpackPlugin({
        name: 'webpackManifest',
      }),
    ]
  }

  config.devtool = production
      ? 'hidden-source-map'
      : 'cheap-module-eval-source-map'

  if (devServer) {
    config.devServer = {
      // enable HMR on the server
      hot: true,
      contentBase: config.output.path,
      publicPath: config.output.publicPath,
    }
  }

  return config
}
