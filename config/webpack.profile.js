'use strict';

// capture build profile to be used with analyze tools
// https://webpack.js.org/configuration/other-options/#profile
// TODO: currently doesn't work ... make it work :)
module.exports = (env, args) =>
  Object.assign(require('./webpack')(env, args), {
    parallelism: 1,
    profile: true,
  });
