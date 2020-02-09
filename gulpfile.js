let gulp = require('gulp');

let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');

let concat = require('gulp-concat');

const imageResize = require('gulp-image-resize');
const imageminMozjpeg = require("imagemin-mozjpeg");
const imagemin = require("gulp-imagemin");

const rename = require("gulp-rename");

let dist = './';
let styleSRC = './src/scss/style.scss';
let scriptPath = './src/js/';
let scriptSRC = [
  scriptPath + 'google_analytics.js'
];
let styleWatch = './src/scss/**/*.scss';
let scriptWatch = './src/js/**/*.js';

let imageSource = './src/images/**/*.jpeg';

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

gulp.task("img", () => {
  const sizes = [
    { width: 320, quality: 84, suffix: "small" },
    { width: 480, quality: 84, suffix: "medium" },
    { width: 800, quality: 84, suffix: "large" },
    { width: 1200, quality: 84, suffix: "x-large" },
    { width: 1800, quality: 84, suffix: "xx-large" },
    { width: 2400, quality: 84, suffix: "xxx-large" }
  ]
  let stream
  sizes.forEach(size => {
    stream = gulp
      .src(imageSource)
      .pipe(imageResize({ width: size.width }))
      .pipe(
        rename(path => {
          path.basename += `-${size.width}`
        })
      )
      .pipe(
        imagemin(
          [
            imageminMozjpeg({
              quality: size.quality,
            }),
          ],
          {
            verbose: true,
          }
        )
      )
      .pipe(gulp.dest(dist + 'images/'))
  })
  return stream
})


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
