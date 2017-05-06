const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('./paths')

const { noop } = require('lodash')

/* Parts */

const output = (env) => ({
  // use [chunkhash] in production only
  // because it increases compilation time
  filename: env.production ? '[name].[chunkhash].js' : '[name].js',
  path: paths.dist(),
})

const javascriptRule = () => ({
  test: /\.js$/,
  loader: 'babel-loader',
  include: paths.src(),
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
  entry: {
    main: paths.src('index.js'),
    vendor: ['react', 'react-dom'],
  },
  output: output(env),
  module: {
    rules: [
      javascriptRule(),
    ],
  },
  plugins: [
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
    }),

    env.devServer ? noop : cleanDist(),
    ...createHtml(env),
  ],
})
