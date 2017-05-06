const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('./paths')

const { noop } = require('lodash')

/* Parts */

const entry = (env) => {
  if (env.devServer) {
    return {
      main: [
        // activate HMR for React
        'react-hot-loader/patch',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack-dev-server/client?http://localhost:8080',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        'webpack/hot/only-dev-server',
        './index.js'
      ],
      vendor: ['react', 'react-dom'],
    }
  }

  return {
    main: './index.js',
    vendor: ['react', 'react-dom'],
  }
}

const output = (env) => ({
  // use [chunkhash] in production only
  // because it increases compilation time
  filename: env.production ? '[name].[chunkhash].js' : '[name].js',
  path: paths.dist(),
  // necessary for HMR to know where to load the hot update chunks
  publicPath: env.devServer ? '/' : '',
})

const javascriptRule = () => ({
  test: /\.js$/,
  loader: 'babel-loader',
  include: paths.src(),
})

const cssRule = () => ({
  test: /\.css$/,
  use: [
    {
      loader: 'style-loader'
    }, {
      loader: 'css-loader',
      options: { modules: true },
    },
  ],
})

const hotModuleReplacementPlugins = () => ([
  // enable HMR globally
  new webpack.HotModuleReplacementPlugin(),
  // prints more readable module names in the browser console on HMR updates
  new webpack.NamedModulesPlugin(),
])

const splitChunks = () =>
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
    paths.dist(),
  ], {
    root: paths.root(),
  })

const createHtml = (env) => {
  const htmlWebpackPlugin = new HtmlWebpackPlugin({
    title: 'Webpack Demo',
    template: paths.src('index.ejs'),
  })

  if (env.production) {
    return [
      htmlWebpackPlugin,
      new InlineManifestWebpackPlugin({
        name: 'webpackManifest',
      }),
    ]
  }

  return [htmlWebpackPlugin]
}

module.exports = (env = { production: false }) => ({
  context: paths.src(),
  entry: entry(env),
  output: output(env),
  module: {
    rules: [
      javascriptRule(),
      cssRule(),
    ],
  },
  plugins: [
    ...(env.devServer ? hotModuleReplacementPlugins() : []),
    // env.devServer ? noop : splitChunks(),
    splitChunks(),
    env.devServer ? noop : cleanDist(),
    ...createHtml(env),
  ],
  devtool: 'inline-source-map',
  devServer: env.devServer ? {
    // enable HMR on the server
    hot: true,
    contentBase: output(env).path,
    publicPath: output(env).publicPath,
  } : {},
})
