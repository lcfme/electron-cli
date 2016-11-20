const gulp = require('gulp')
const eslint = require('gulp-eslint')
const runSequence = require('run-sequence')
const combine = require('stream-combiner2')
const babel = require('gulp-babel')
const gutil = require('gulp-util')

gulp.task('dev',(done)=> {
  runSequence('lint','babel','watch',done)
})

gulp.task('lint', () => {
  const taskSrc = combine.obj([
    gulp.src(['src/**/*.js']),
    eslint({ fix: true }),
    eslint.format(),
    gulp.dest('lib')
  ])

  return taskSrc.on('error', handleError)
})

gulp.task('babel',()=> {
  const taskSrc = combine.obj([
    gulp.src('./src/**/*.js'),
    babel(),
    gulp.dest('./dist')
  ])

  return taskSrc.on('error', handleError)
})

gulp.task('watch',()=> {
  gulp.watch(['src/**/*.js'],['babel'])
})

function handleError (err) {
  gutil.log(gutil.colors.magenta(err.toString()))

  this.emit('end')
}
