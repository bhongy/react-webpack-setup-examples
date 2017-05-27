const express = require('express')
const project = require('../config/project')
const webpackConfig = require('../config/webpack')({ production: false })
const webpack = require('webpack')

const app = express()
const compiler = webpack(webpackConfig)

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
  },
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('*', (req, res) => {
  res.sendFile(project.paths.dist('index.html'))
})

const port = 8888

app.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log(`http://localhost:${port}`)
})
