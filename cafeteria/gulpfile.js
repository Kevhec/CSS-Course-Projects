// general
const plumber = require('gulp-plumber');
const gutil = require('gulp-util');

// styles
const {src, dest, watch, series, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// images
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function compileCSS(done) {
  // Compile SCSS
  // step1 - identify archive | step2 - compile | step3 - save CSS

  src('./src/styles/main.scss')
    .pipe(plumber(function (err) {
      gutil.log(gutil.colors.blue(err.message));
      this.emit('end');
    }))
    .pipe(sass(/* {outputStyle: 'compressed'} */))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('./build/css'));
  
  done();
}

function images(done) {
  src('./src/images/**/*')
    .pipe(imagemin({optimizationLevel: 3}))
    .pipe(dest('./build/images'));

  done();
}

function imageToWebp(done) {
  const options = {
    quality: 50
  }

  src('./src/images/**/*.{png,jpg}')
    .pipe(webp(options))
    .pipe(dest('./build/images'));

  done();
}

function imageToAvif(done) {
  const options = {
    quality: 50
  }

  src('./src/images/**/*.{png,jpg}')
    .pipe(avif(options))
    .pipe(dest('./build/images'));

  done();
}

function dev() {
  watch('./src/styles/**/*.scss', compileCSS);
  watch('./src/images/**/*', parallel(images, imageToWebp, imageToAvif));
}

exports.compileCSS = compileCSS;
exports.images = images;
exports.imageToWebp = imageToWebp;
exports.imageToAvif = imageToAvif;
exports.dev = dev;
exports.default = series(compileCSS, dev);

// Tareas por default se inician sólo cn gulp
// Series - inicia y termina las tareas en orden
// Parallel - inicia ambas tareas al tiempo