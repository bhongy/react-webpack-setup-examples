module.exports = (env) => {  // Do not provide default, prefer explicitness
  if (env.production) {
    return require('./webpack.production')
  }

  return require('./webpack.development')
}
