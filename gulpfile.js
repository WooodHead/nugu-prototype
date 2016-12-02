'use strict';

// Moduel dependencies
const gulp         = require('gulp');
const gutil        = require('gulp-util');
const sourcemaps   = require('gulp-sourcemaps');
const sass         = require('gulp-sass');
const nodemon      = require('gulp-nodemon');

// default
gulp.task('default', ['nodemon', 'watch']);

// nodemon
gulp.task('nodemon', ()=> {
    nodemon({
        script: 'bin/www'
    });
});


// watch
gulp.task('watch', ()=> {
    // watch:sass
    gulp.watch('./src/sass/*.sass', ['sass']);
});

// sass
gulp.task('sass', ()=> {
    gulp.src('./src/sass/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed', indentedSyntax: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./app/assets/stylesheets/'));
});