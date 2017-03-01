const gulp = require('gulp')
const eslint = require('gulp-eslint')
const runSequence = require('run-sequence')
const combine = require('stream-combiner2')
const babel = require('gulp-babel')
const gutil = require('gulp-util')
const chmod = require('gulp-chmod')
const mocha = require('gulp-mocha')
const del = require('del')

function handleError (err) {
  gutil.log(gutil.colors.magenta(err.toString()))

  this.emit('end')
}

gulp.task('dev', (done) => {
  runSequence('clean', 'lint', 'babel', 'chmod', 'mocha', 'copy', 'watch', done)
})

gulp.task('deploy', (done) => {
  runSequence('clean', 'babel', 'chmod', 'copy', done)
})

gulp.task('lint', () => {
  const taskSrc = combine.obj([
    gulp.src(['src/**/*.js']),
    eslint({ fix: true }),
    eslint.format(),
    gulp.dest('src')
  ])

  return taskSrc.on('error', handleError)
})

gulp.task('chmod', () => {
  const taskSrc = combine.obj([
    gulp.src(['dist/cli.js']),
    chmod({
      owner: { read: true, write: true, execute: true },
      group: { execute: true },
      others: { execute: true }
    }),
    gulp.dest('dist')
  ])

  return taskSrc.on('error', handleError)
})

gulp.task('clean', (cb) => {
  del(['dist', 'coverage']).then(() => {
    cb()
  })
})

gulp.task('copy', () => {
  {
    const taskSrc = combine.obj(
    gulp.src('templates/**/*'),
    gulp.dest('dist/templates')
  )

    return taskSrc.on('error', handleError)
  }
})

gulp.task('babel', () => {
  process.env.NODE_ENV = 'production'
  const taskSrc = combine.obj([
    gulp.src('./src/**/*.js'),
    babel(),
    gulp.dest('./dist')
  ])

  return taskSrc.on('error', handleError)
})

gulp.task('mocha', () => {
  process.env.NODE_ENV = 'test'
  const taskSrc = combine.obj([
    gulp.src('./test/**/*-test.js'),
    mocha({
      reporter: 'progress',
      require: ['./test/.setup.js']
    })
  ])

  return taskSrc.on('error', handleError)
})

gulp.task('watch', () => {
  gulp.watch(['src/**/*.js'], ['babel'])
  gulp.watch(['dist/cli.js'], ['chmod'])
})
