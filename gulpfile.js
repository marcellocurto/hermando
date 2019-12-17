let gulp = require('gulp');

let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');

let concat = require('gulp-concat');

let dist = './';
let styleSRC = './src/scss/style.scss';
let scriptPath = './src/js/';
let scriptSRC = [
  scriptPath + 'google_analytics.js'
];
let styleWatch = './src/scss/**/*.scss';
let scriptWatch = './src/js/**/*.js';

function css(cb) {
  gulp.src(styleSRC)
    .pipe(sass({
      errorLogToConsole: true,
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(gulp.dest('./'));
  cb();
};

function javascript(cb) {
  gulp.src(scriptSRC)
    .pipe(concat('roark.js'))
    .pipe(gulp.dest(dist));
  cb();
};

function watch(cb) {
  gulp.watch(styleWatch, css);
  gulp.watch(scriptWatch, javascript);
  cb();
};

exports.css = css;
exports.javascript = javascript;
exports.watch = watch;

let build = gulp.parallel([watch, css, javascript]);
gulp.task('default', build);
