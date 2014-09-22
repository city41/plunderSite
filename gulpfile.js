// var browserify = require('browserify');
// var es6ify = require('es6ify');
var gulp = require('gulp');
// var source = require('vinyl-source-stream');
// var traceur = require('gulp-traceur');
// var rimraf = require('rimraf');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var webserver = require('gulp-webserver');

gulp.task('copy:bootstrap', function() {
  gulp.src('node_modules/bootstrap/dist/css/bootstrap.css')
    .pipe(gulp.dest('dist/css'));
});

gulp.task('stylus:docs', function() {
  gulp.src('src/stylus/docs/main.styl')
    .pipe(stylus())
    .pipe(rename('docs.css'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('build', ['copy:bootstrap', 'stylus:docs'], function() {
  gulp.src('src/**/*')
    .pipe(gulp.dest('dist'));
});

gulp.task('server', ['build'], function() {
  gulp.src('dist').pipe(webserver());
});
