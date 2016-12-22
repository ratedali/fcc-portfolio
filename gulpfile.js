'use strict';

var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var sourcemaps = require("gulp-sourcemaps");

gulp.task('sass', function() {
    return gulp.src('./sass/portfolio.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

gulp.task('copy', function() {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('vendor/bootstrap'))

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('vendor/jquery'))

    gulp.src([
            'node_modules/font-awesome/css/font-awesome.css',
            'node_modules/font-awesome/css/font-awesome.min.css'
        ])
        .pipe(gulp.dest('vendor/font-awesome'));
    gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('vendor/fonts/'));
});


gulp.task("default", ["sass", "copy"]);

gulp.task("initSync", function() {
    browserSync.init({
        server: {
            baseDir: '' 
        },
        online: false,
        notify: false,
        browser: "google-chrome-beta",
    });
});

gulp.task("dev", ["initSync", "sass", "copy"], function() {
    gulp.watch("sass/*.scss", ['sass']);
    gulp.watch("js/**/*.js", browserSync.reload);
    gulp.watch("index.html", browserSync.reload);
})
