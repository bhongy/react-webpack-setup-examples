'use strict';

const express = require('express');
const webpack = require('webpack');
const project = require('../config/project');
const webpackConfig = require('../config/webpack4')(
  { watch: true },
  { mode: 'development' }
);

const app = express();
const compiler = webpack(webpackConfig);

app.use(
  require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
    },
  })
);

app.use(require('webpack-hot-middleware')(compiler));

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
