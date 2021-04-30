var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    scss = require('gulp-scss'),
    imgmin = require('gulp-imagemin'),
    watch = require('gulp-watch'),
    bs = require('browser-sync'),
    del = require('del');


function clean() {
  return del(['dist']);
}


function html() {
  return gulp.src('src/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'));
}


function image() {
  return gulp.src('src/img/*.jpg')
    .pipe(imgmin())
    .pipe(gulp.dest('dist/assets/img/'));
}


function styles() {
  return gulp.src('src/styles/style.scss')
    .pipe(scss())
    .pipe(gulp.dest('dist/assets/css/'));
}


function serve() {
    bs.init({
        server: ['dist']
    });
}


function watch() {
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/styles/*.scss', ['styles']);
}


var build = gulp.series(clean, styles);

var hugo = gulp.series(clean, styles, serve, watch);


exports.clean = clean;
exports.html = html;
exports.image = image;
exports.styles = styles;
exports.serve = serve;
exports.watch = watch;
exports.default = hugo;
