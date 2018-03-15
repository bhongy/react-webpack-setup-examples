'use strict';

/**
 * extrace CSS in dev or splitting runtime chunks hurts dev build time
 * but I think the slowness is not significant to my workflow and
 * and I found that it's valuable to keep behavior
 * in both dev and prod as close as possible
 * i.e. differences are:
 *   only minification in prod
 *   only debug instrumentation in dev
 */

const lodash = require('lodash');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CaseSensitivePathPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const project = require('./project');

/**
 * Use the function config to avoid relying on process.env.NODE_ENV
 * this allows reasoning about the config environment statically
 * and don't have to worry about whether/when NODE_ENV has changed
 */

module.exports = (
  // --env.watch, --env.foo=bar => { watch, true, foo: 'bar' }
  env = {},
  // args: passed by --mode development => { mode: 'development' }
  // webpack throws if `mode` is not either 'development' or 'production'
  { mode }
) => {
  const { watch = false } = env;
  const production = mode === 'production';

  if (watch && production) {
    throw new Error(
      'Webpack Config error. Running watch mode in production bundle is not supported.'
    );
  }
  // supported combinations: watch-dev, build-dev, build-prod

  return {
    mode,

    /**
     * Inputs
     */

    // absolute path. the `entry` and `module.rules.loader` option
    // are resolved relative to this directory
    context: project.paths.src(),
    entry: {
      main: watch
        ? [
          // provide HMR for the client
          // `require.resolve` get path to the module
          // instead of the module itself
          // this is from create-react-app
          require.resolve('react-dev-utils/webpackHotDevClient'),
          // ensure the app code comes after HMR instrumentation
          './index.js',
        ]
        : './index.js',
    },

    /**
     * Outputs
     */

    output: {
      filename: production ? '[name]-[chunkhash:8].js' : '[name].js',
      // where webpack will write output files to
      path: project.paths.build(),
      // where webpack will load your bundles from
      // i.e. `href` of the <script> tag
      // this needs to be an absolute path or url
      // so it is the same for any location.pathname
      publicPath: production ? project.fakeCdnUrl : '/',
    },

    /**
     * Resolve
     */

    resolve: {
      alias: {
        // convenient alias to the src folder to avoid ../../..
        // relative path in the client code
        '@app': project.paths.src(),
      },
    },

    /**
     * Loaders (module-level processing)
     */

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
                      // enable caching for faster webpack rebuild
                      cacheDirectory: watch,
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
                    sourceMap: true,
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    // 'postcss-scss' parser allows using inline comments "//"
                    // it will turn it to CSS comment "/* */"
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

    /**
     * Plugins (chunk-level processing)
     */

    // because it's prettier than dangle `.filter(p => p != null)` ~ :P
    plugins: lodash.compact([
      watch
        ? null
        : new CleanWebpackPlugin([project.paths.build()], {
          root: project.paths.root(),
        }),
      // prevent inconsistent errors in different environments (machines)
      // based on case sensitivity
      new CaseSensitivePathPlugin(),
      new MiniCssExtractPlugin({
        filename: production ? '[name]-[chunkhash:8].css' : '[name].css',
      }),
      new HtmlWebpackPlugin({
        title: 'Webpack Demo',
        template: project.paths.src('index.ejs'),
      }),
    ]),

    /**
     * Optimization (Webpack 4+)
     * ---
     * Most of these are set automatically with `config.mode`
     * List out for documentation purposes.
     */

    // https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a
    optimization: {
      /* enable in both dev and prod */

      mergeDuplicateChunks: true,
      // replacement for passing process.env.NODE_ENV
      // to webpack.DefinePlugin
      // this is needed for optimized production builds for libraries
      // like React
      nodeEnv: mode,
      // add comment of export information
      // used by other optimizations like tree-shaking
      providedExports: true,
      // remove module from chunk when it's already available in
      // all parent chunk groups
      removeAvailableModules: true,
      removeEmptyChunks: true,
      // extract manifest (webpack runtime and chunk hash maps) chunk
      //  into a separate file like runtime~main.js
      runtimeChunk: true,
      // replacement for CommonChunks plugin
      // it splits chunks more intelligently
      // no longer need to provide `vendor` to `entry`
      // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
      splitChunks: {
        chunks: 'all',
        name: true,
      },

      /* enable only in dev */

      // give names to chunks instead of numeric ids
      namedChunks: !production,
      // replacement for webpack.NamedModulesPlugin
      // give names to modules instead of numeric ids
      namedModules: !production,

      /* enable only in production */

      // replacement for webpack.optimize.ModuleConcatenationPlugin
      // find segments of module graph that can be
      // safely concatenate to a single module "scope hoisting"
      // flatten scope and improve runtime performance
      // depends on `optimization.providedExports`
      // and `optimization.usedExports`
      concatenateModules: production,
      // flag chunks that are subset of other bigger chunks
      // to avoid loading them if they're already included in the bigger chunks
      flagIncludedChunks: production,
      // replacement for webpack.optimize.UglifyJsPlugin
      // it will use uglify-js by default
      // TODO: figure out how to use custom minimizer
      //   or pass uglifyjs options
      //   `minimizer: [new UglifyJS()]` ?
      minimize: production,
      // replacement for webpack.NoEmitOnErrorsPlugin
      // skip the emitting phase when there are an error
      noEmitOnErrors: production,
      // replacement for webpack.optimize.OccurrenceOrderPlugin
      // give smaller module ids to more frequently used modules
      // to reduce filesize
      occurrenceOrder: production,
      // recognize `sideEffects` flag in package.json of libraries
      // depends on `optimization.providedExports`
      // and `optimization.usedExports`
      sideEffects: production,
      // determine used exports (i.e. for tree-shaking)
      // depends on `optimization.providedExports`
      usedExports: production,
    },

    /**
     * Miscelleneous
     */

    // exit process if encounter an error
    // default is false
    bail: !watch,
    // cache previous build result for faster re-build
    cache: watch,
    // webpack watch mode
    watch,

    // fastest option that shows original source (lines only)
    devtool: production ? 'hidden-source-map' : 'cheap-module-eval-source-map',
    performance: {
      // do not warn about bundle size in development
      hints: production ? 'warning' : false,
    },
    // do not collect build profile
    profile: false,
    stats: 'minimal',
    // compile for browser-like environment
    // target: 'web' is default
    target: 'web',
  };
};
