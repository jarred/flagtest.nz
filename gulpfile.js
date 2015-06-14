var gulp            = require('gulp');
var sass            = require('gulp-sass');
var concat          = require('gulp-concat');
var del             = require('del');
var gutil           = require('gulp-util');
var minifyCSS       = require('gulp-minify-css');
var browserify      = require('gulp-browserify');
var uglify          = require('gulp-uglify');

gulp.task('clean', function (done){
  del(['assets/css/style.min.css'], done);
});

gulp.task('css', [], function (){
  gulp.src('assets/_scss/style.scss')
    .pipe(sass())
    .pipe(concat('style.min.css'))
    .pipe(minifyCSS({keepBreaks:false}))
    .pipe(gulp.dest('assets/css'))
  return
});

gulp.task('js', [], function() {
  gulp.src('assets/js/main.js')
    .pipe(browserify())
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets'))
});

gulp.task('watch', ['clean'], function (){
  gulp.watch('assets/_scss/**/*.scss', ['css']);
  gulp.watch('assets/js/**/*.js', ['js']);
})

gulp.task('default', ['watch', 'css', 'js']);
