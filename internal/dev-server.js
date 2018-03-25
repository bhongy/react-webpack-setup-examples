'use strict';

const lodash = require('lodash');
const express = require('express');
const webpack = require('webpack');
const project = require('../config/project');
const webpackConfig = require('../config/webpack')({
  mode: 'development',
  watch: true,
});

const hmrWebpackConfig = lodash.defaults(
  {
    // assume entry is an object (key-value map)
    entry: lodash.mapValues(webpackConfig.entry, project.hmr.clientEntry),
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      ...webpackConfig.plugins,
    ],
    optimization: lodash.defaults(
      {
        noEmitOnErrors: true,
      },
      lodash.optimization
    ),
  },
  webpackConfig
);

const app = express();
const compiler = webpack(hmrWebpackConfig);

app.use(
  require('webpack-dev-middleware')(compiler, {
    publicPath: hmrWebpackConfig.output.publicPath,
    stats: {
      colors: true,
    },
  })
);

app.use(
  require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: project.hmr.path,
    heartbeat: project.hmr.heartbeat,
  })
);

app.get('*', (req, res) => {
  res.sendFile(project.paths.build('index.html'));
});

const port = 8888;

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`http://localhost:${port}`);
});
