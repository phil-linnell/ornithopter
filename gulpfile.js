// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var server = require('gulp-express');
var jshint = require('gulp-jshint');
var stylus = require('gulp-stylus');
var nib    = require('nib');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Start the server
gulp.task('server', function() {
  server.run(['./bin/www'], []);
});


// Lint Task
gulp.task('lint', function() {
    return gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Stylus
gulp.task('css', function() {
    return gulp.src('src/stylesheets/*.styl')
        .pipe(stylus({ use: nib() }))
        .pipe(gulp.dest('public/stylesheets'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['lint', 'scripts']);
    gulp.watch('src/stylesheets/*.styl', ['css']);
});

// Default Task
gulp.task('default', ['server', 'lint', 'css', 'scripts', 'watch']);
