'use strict';

var gulp = require('gulp');
var cleanCSS = require('gulp-cleancss');
var autoprefixer = require('gulp-autoprefixer');
var combineMQ = require('gulp-combine-mq');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('sass', function () {
    return gulp.src(['./Assets/scss/**/*.scss'])
        .pipe(sourcemaps.init())
        // .pipe(autoprefixer())
        .pipe(sass())
        .pipe(combineMQ({
            beautify: true
        }))
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./Assets/css/'));
});

gulp.task('vendor-js', function () {
    return gulp.src('./Assets/js/vendor/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./Assets/js/'));
})

gulp.task('watch', function () {
    gulp.watch('./Assets/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'vendor-js']);