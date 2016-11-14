const gulp = require('gulp')
const eslint = require('gulp-eslint')
const runSequence = require('run-sequence')
const combine = require('stream-combiner2')
const gutil = require('gulp-util')

gulp.task('dev',(done)=> {
  runSequence('lint',done)
})

gulp.task('lint', () => {
  const taskSrc = combine.obj([
    gulp.src(['lib/**/*.js']),
    eslint({ fix: true }),
    eslint.format(),
    gulp.dest('lib')
  ])

  return taskSrc.on('error', handleError)
})

function handleError (err) {
  gutil.log(gutil.colors.magenta(err.toString()))

  this.emit('end')
}
