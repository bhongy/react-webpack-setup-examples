const path = require('path')

/**
 * Paths
 */

const rootPath = path.resolve(__dirname, '..')
const root = path.resolve.bind(null, rootPath)

exports.paths = {
  root : root,
  src  : root.bind(null, 'src'),
  dist : root.bind(null, 'dist'),
}
