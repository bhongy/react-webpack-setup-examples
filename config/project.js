'use strict';

const path = require('path');
const url = require('url');

exports.browsers = ['last 2 versions'];

/**
 * Paths
 */

// resolve from where this file lives instead of using `process.cwd()`
// so it does not matter where or how we invoke the process
// generally either methods should work because we run through yarn
const rootPath = path.join(__dirname, '..');
const root = path.join.bind(null, rootPath);

exports.paths = {
  root,
  src: root.bind(null, 'src'),
  build: root.bind(null, 'build'),
};

exports.fakeCdnUrl = 'https://cdn.thanik.me/not-real';

const hmr = {
  // for webpack-hot-middleware: send heartbeat updates to the client
  // to keep the connection alive. Should be less than the client's
  // timeout setting.
  heartbeat: 10000,
  path: '/__webpack_hmr',
};

exports.hmr = Object.assign(
  {
    clientEntry(entry) {
      return [
        url.format({
          pathname: 'webpack-hot-middleware/client',
          query: {
            path: hmr.path,
            timeout: hmr.heartbeat / 2,
          },
        }),
      ].concat(entry);
    },
  },
  hmr
);
