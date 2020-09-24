const { series, parallel, src, dest, watch } = require('gulp')
const { sync } = require('glob')
const sass = require('gulp-sass')
const { join } = require('path')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const browserSync = require('browser-sync').create()
require('colors')
sass.compiler = require('node-sass')
const path = join(__dirname, 'src')

const compileSCSS = () =>
  src(sync(join(path, 'scss', '**/*.scss')))
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(join(path, 'dist')))

const compileJS = (cb) => {
  cb()
}

const minifyCSS = () =>
  src(sync(join(path, 'dist', '**/!(*.min).css')))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(
      rename(({ dirname, basename }) => ({
        dirname,
        basename: `${basename}.min`,
        extname: '.css',
      }))
    )
    .pipe(dest(join(path, 'dist')))

const minifyJS = (cb) => {
  cb()
}

const dev = () => {
  browserSync.init({
    server: {
      baseDir: join(path),
    },
  })
}

const watchJsAndSCSS = (cb) => {
  watch(
    sync(join(path, 'js', '**/*.js')),
    series(compileJS, minifyJS, realoadBrowser)
  )
  watch(
    sync(join(path, 'scss', '**/*.scss')),
    series(compileSCSS, minifyCSS, realoadBrowser)
  )
  cb()
}

const realoadBrowser = (cb) => {
  browserSync.reload()
  cb()
}

exports.default = series(
  parallel(compileJS, compileSCSS),
  parallel(minifyCSS, minifyJS),
  watchJsAndSCSS,
  dev
)
