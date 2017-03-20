var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');

var paths = {
  scssSource: './public/styles/**/*.scss',
  scssDest: './public/styles'
};

gulp.task('styles', function() {
  return gulp.src(paths.scssSource)
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('styles.css'))
  .pipe(gulp.dest(paths.scssDest));
});

gulp.task('watch', function()  {
  // gulp.watch(paths.jsSource, ['frontjs']);
  gulp.watch(paths.scssSource, ['styles']);
});

// gulp.task('default', ['watch', 'frontjs', 'styles']);
gulp.task('default', ['watch', 'styles']);
