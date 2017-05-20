const express = require('express')
const webpack = require('webpack')
const project = require('./config/project')
const config = require('./config/webpack')({ devServer: true })

const app = express()
const compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
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
