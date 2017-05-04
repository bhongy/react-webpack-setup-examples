const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = (env) => ({
  entry: {
    main: './src/index.js',
    vendor: ['react', 'react-dom'],
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src'),
        options: {
          babelrc: false,
          presets: [
            ['es2015', { modules: false }],
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
      path.resolve(__dirname, 'dist'),
    ]),
    new HtmlWebpackPlugin({
      title: 'Webpack Demo',
      template: 'src/index.ejs',
    }),
  ],
})
