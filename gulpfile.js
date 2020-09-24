const { series, parallel } = require('gulp')
require('colors')

const compileSCSS = (cb) => {
  cb()
}

const compileJS = (cb) => {
  cb()
}

const minifyCSS = (cb) => {
  cb()
}

const minifyJS = (cb) => {
  cb()
}

exports.default = series(
  parallel(compileJS, compileSCSS),
  parallel(minifyCSS, minifyJS)
)
