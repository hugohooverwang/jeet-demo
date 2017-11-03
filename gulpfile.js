var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    scss = require('gulp-scss'),
    imgmin = require('gulp-imagemin'),
    watch = require('gulp-watch'),
    bs = require('browser-sync'),
    del = require('del');

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('html', function() {
  return gulp.src('src/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'));
});

gulp.task('image', function() {
  return gulp.src('src/img/*.jpg')
    .pipe(imgmin())
    .pipe(gulp.dest('dist/assets/img/'));
});

gulp.task('styles', function () {
  return gulp.src('src/styles/style.scss')
    .pipe(scss())
    .pipe(gulp.dest('dist/assets/css/'));
});

gulp.task('serve', function() {
    bs.init({
        server: ['dist']
    });
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/styles/*.scss', ['styles']);
});

gulp.task('build', ['image', 'html', 'styles']);

gulp.task('default', ['build', 'serve', 'watch']);
