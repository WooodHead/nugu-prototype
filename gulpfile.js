'use strict';

// Moduel dependencies
const gulp         = require('gulp');
const gutil        = require('gulp-util');
const coffee       = require('gulp-coffee');
const sourcemaps   = require('gulp-sourcemaps');
const babel        = require('gulp-babel');
const sass         = require('gulp-sass');
const concat       = require('gulp-concat');
const nodemon      = require('gulp-nodemon');
const coffeeConcat = require('gulp-coffeescript-concat');
const uglify       = require('gulp-uglify');

// default
gulp.task('default', ['nodemon', 'watch']);


// nodemon
gulp.task('nodemon', ()=> {
    nodemon({
        script: 'bin/www'
    });
})


// watch
gulp.task('watch', ()=> {
    
    // watch:coffee
    // gulp.watch(['./src/coffee/*.coffee', './src/coffee/class/*.coffee'], ['coffee']);
    
    // watch:sass
    gulp.watch('./src/sass/*.sass', ['sass']);

    // watch:babel
    gulp.watch('./src/babel/*.js', ['babel']);
});


// coffee
// gulp.task('coffee', ()=> {
//     gulp.src(['./src/coffee/*.coffee', './src/coffee/class/*.coffee'])
//     .pipe(coffeeConcat('prototype.js'))
//     .pipe(sourcemaps.init())
//     .pipe(coffee())
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('./app/assets/javascripts/'))
//     .on('error', gutil.log);
// });


// sass
gulp.task('sass', ()=> {
    gulp.src('./src/sass/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed', indentedSyntax: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./app/assets/stylesheets/'));
});


// babel
gulp.task('babel', ()=> {
    gulp.src('./src/babel/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['es2015'] }).on('error', gutil.log))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./app/assets/javascripts/'));
});