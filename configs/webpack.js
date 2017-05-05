const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('./paths')

module.exports = (env) => ({
  entry: {
    main: paths.src('index.js'),
    vendor: ['react', 'react-dom'],
  },
  output: {
    // use [chunkhash] in production only
    // because it increases compilation time
    filename: '[name].[chunkhash].js',
    path: paths.dist(),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: paths.src(),
        options: {
          babelrc: false,
          presets: [
            ['es2015', { modules: false }],
            'stage-2',
            'react',
          ],
        },
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor', // specify the common bundle's name.
        // implicit common vendor chunk
        // https://webpack.js.org/guides/code-splitting-libraries/#implicit-common-vendor-chunk
        // minChunks(module) {
        //   return module.context && module.context.indexOf('node_modules') !== -1
        // },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
    new CleanWebpackPlugin([
      paths.dist(),
    ]),
    new HtmlWebpackPlugin({
      title: 'Webpack Demo',
      template: paths.src('index.ejs'),
    }),
  ],
})
