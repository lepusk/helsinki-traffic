var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require("babelify");
var mocha = require('gulp-mocha');
var stylus = require('gulp-stylus');

gulp.task('default', ['build-js', 'build-css', 'watch'], function() {});

gulp.task('watch', function() {
  gulp.watch('./components/**/*.js', ['build-js']);
  gulp.watch('./stylus/**/*.styl', ['build-css']);
});

gulp.task('build-js', function() {
  return browserify('./components/app.js')
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('build-css', function() {
  return gulp.src('./stylus/app.styl')
    .pipe(stylus({
      'include css': true
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('test', function () {
  return gulp.src('./tests/**/*.js')
    .pipe(mocha());
});
