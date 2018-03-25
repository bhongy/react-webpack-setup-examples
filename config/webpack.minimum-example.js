'use strict';

/**
 * Example of minimum config for Webpack 4.
 * ---
 * What this does is pretty close to `config/webpack.js`.
 *
 * Showcasing how easy to get start with Webpack 4 (#0CJS - zero config js)
 * Practically you have to provide little config for `input` and `output`
 * Relying on mode to set `optimizations` seems to work pretty well.
 * You'll have to provide all loaders and
 * a smaller set of plugins (many are moved to `optimization`).
 *
 * check out `config/webpack.js` for thorough documentation.
 */

/**
 * Note: expect to use with `webpack-cli` like:
 *
 * ```bash
 * yarn add -D webpack-cli
 * webpack --config/webpack.minimum-example.js --mode <development|production>
 * ```
 */

const CaseSensitivePathPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const project = require('./project');

// webpack-cli will warn if mode is not provided
// as either 'development' or 'production'
module.exports = (_ /* env */, { mode } /* args */) => {
  const production = mode === 'production';
  return {
    mode,
    // use default input config - default entry is `<root>/src`
    // ref: https://medium.com/webpack/webpack-4-beta-try-it-today-6b1d27d7d7e2

    output: {
      filename: production ? '[name]-[chunkhash:8].js' : '[name].js',
      // Webpack 4 default outputs to `<root>/dist`
      // ref: https://medium.com/webpack/webpack-4-beta-try-it-today-6b1d27d7d7e2
      path: project.paths.build(),
    },

    // similar to `config/webpack.js`
    resolve: {
      alias: {
        '@app': project.paths.src(),
      },
    },

    // similar to `config/webpack.js`
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.js$/,
              include: project.paths.src(),
              use: [
                {
                  loader: 'babel-loader',
                  options: Object.assign(
                    {
                      babelrc: false,
                      cacheDirectory: !production,
                    },
                    require('./babel')[mode]
                  ),
                },
              ],
            },
            {
              test: /\.css$/,
              include: project.paths.src(),
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    import: false,
                    importLoaders: 1,
                    localIdentName: production
                      ? '[hash:base64:8]'
                      : '[name]__[local]--[hash:base64:6]',
                    modules: true,
                    minimize: production,
                    sourceMap: true,
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    parser: 'postcss-scss',
                    plugins: require('./postcss-plugins')[mode],
                    sourceMap: true,
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    // similar to `config/webpack.js`
    plugins: [
      new CaseSensitivePathPlugin(),
      new MiniCssExtractPlugin({
        filename: production ? '[name]-[chunkhash:8].css' : '[name].css',
      }),
      new HtmlWebpackPlugin({
        title: 'Webpack Demo',
        template: project.paths.src('index.ejs'),
      }),
    ],
  };
};
