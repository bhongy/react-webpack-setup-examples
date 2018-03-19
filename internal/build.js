'use strict';

const chalk = require('chalk');
const fs = require('fs-extra');
const { argv } = require('yargs');
const webpack = require('webpack');
const project = require('../config/project');

function build (mode /*: 'development' | 'production' */, configPath = 'config/webpack') {
  const webpackConfig = require(project.paths.root(configPath))({ mode });
  const compiler = webpack(webpackConfig);
  return new Promise((resolve, reject) => {
    console.log(`🤖  Webpack is building your ${mode} bundles ... `);
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      }
      resolve(stats);
    });
  });
}

fs
  .emptyDir(project.paths.build())
  .then(() => build(argv.mode, argv.config))
  .then(stats => {
    console.log(chalk.green('Webpack build succeeded.'));
    const elapsedTime = (stats.endTime - stats.startTime) / 1000;
    console.log(`Total compilation time: ${elapsedTime.toFixed(2)}s`);
  })
  .catch(err => {
    console.error('Webpack build failed.');
    console.error(err);
    process.exit(1);
  });
