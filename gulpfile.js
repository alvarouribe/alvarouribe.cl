const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
// const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const { src, series, parallel, dest, watch } = require('gulp');

const cssPath = 'styles-original.css';
const imgPath = 'images-originales/*';

function imagesTask() {
  return src('images-originales/*')
    .pipe(imagemin())
    .pipe(gulp.dest('images'));
}

function cssTask() {
  return src(cssPath)
    .pipe(sourcemaps.init())
    .pipe(concat('styles.css'))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('.'));
}

function watchTask() {
  watch([cssPath, imgPath], { interval: 1000 }, parallel(cssTask));
}

// exports.jsTask = jsTask;
// TODO: missing Uncomment image task and change image source
// exports.cssTask = cssTask;
// exports.imagesTask = imagesTask;

exports.default = series(
  parallel(imagesTask, cssTask),
  watchTask
);