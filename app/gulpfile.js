var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require("babelify");

gulp.task('default', ['build-js', 'watch'], function() {});

gulp.task('watch', function() {
  gulp.watch('./components/**/*.js', ['build-js']);
});

gulp.task('build-js', function() {
  return browserify('./components/app.js')
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./public/js/'));
});
