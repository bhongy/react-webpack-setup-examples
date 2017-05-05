const path = require('path')
const root = path.resolve(__dirname, '..')

exports.src = (fragment = '') => path.resolve(root, 'src', fragment)
exports.dist = (fragment = '') => path.resolve(root, 'dist', fragment)
