const gulp = require('gulp')
const eslint = require('gulp-eslint')
const runSequence = require('run-sequence')
const combine = require('stream-combiner2')
const babel = require('gulp-babel')
const gutil = require('gulp-util')
const chmod = require('gulp-chmod')
const mocha = require('gulp-mocha')

gulp.task('dev',(done)=> {
  runSequence('lint','babel','watch','chmod','mocha',done)
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

gulp.task('chmod',()=> {
  const taskSrc = combine.obj([
    gulp.src(['dist/cli.js']),
    chmod({
      owner: {read:true,write:true,execute:true},
      group: {execute:true},
      others: {execute:true}
    }),
    gulp.dest('dist')
  ])

  return taskSrc.on('error',handleError)
})

gulp.task('babel',()=> {
  const taskSrc = combine.obj([
    gulp.src('./src/**/*.js'),
    babel(),
    gulp.dest('./dist')
  ])

  return taskSrc.on('error', handleError)
})

gulp.task('mocha',()=> {
  const taskSrc = combine.obj([
    gulp.src('./test/**/*-test.js',{read: false}),
    mocha({
      reporter: 'progress',
      require: ['./test/.setup.js']
    })
  ])
})

gulp.task('watch',()=> {
  gulp.watch(['src/**/*.js'],['babel'])
  gulp.watch(['dist/cli.js'],['chmod'])
})

function handleError (err) {
  gutil.log(gutil.colors.magenta(err.toString()))

  this.emit('end')
}
