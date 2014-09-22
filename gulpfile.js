var browserify = require('browserify');
var es6ify = require('es6ify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
// var traceur = require('gulp-traceur');
var rimraf = require('rimraf');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var webserver = require('gulp-webserver');

gulp.task('clean:dist', function(callback) {
  rimraf('./dist', callback);
});

gulp.task('copy:bootstrap', function() {
  gulp.src('node_modules/bootstrap/dist/css/bootstrap.css')
    .pipe(gulp.dest('dist/css'));
});

gulp.task('copy:highlightjs', function() {
  gulp.src('node_modules/highlight.js/styles/tomorrow-night.css')
    .pipe(gulp.dest('dist/css'));
});

gulp.task('stylus:docs', function() {
  gulp.src('src/stylus/docs/main.styl')
    .pipe(stylus())
    .pipe(rename('docs.css'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('build:easing:js', function() {
  return browserify(es6ify.runtime)
    .transform(es6ify)
    .add('./src/js/easing/main.js')
    .bundle()
    .pipe(source('easing-bundle.js'))
    .pipe(gulp.dest('dist/docs/easing/js'));
});

gulp.task('build:main:js', function() {
  return browserify(es6ify.runtime)
    .transform(es6ify)
    .add('./src/js/main/main.js')
    .bundle()
    .pipe(source('main-bundle.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('build:html:main', function() {
  gulp.src('src/html/main/*')
    .pipe(gulp.dest('dist'));
});

gulp.task('build:html:docs', function() {
  gulp.src('src/html/docs/**/*')
    .pipe(gulp.dest('dist/docs'));
});

gulp.task('build', [
  // 'clean:dist',
  'copy:bootstrap',
  'copy:highlightjs',
  'stylus:docs',
  'build:easing:js',
  'build:main:js',
  'build:html:main',
  'build:html:docs'
]);

gulp.task('server', ['build'], function() {
  gulp.src('dist').pipe(webserver());
});

gulp.task('watch', ['server'], function() {
  gulp.watch([
    'src/**/*.html',
    'src/**/*.styl',
    'src/**/*.js',
  ], ['build']);
});
