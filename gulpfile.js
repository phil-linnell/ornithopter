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
var livereload = require('gulp-livereload');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Stylus
gulp.task('css', function() {
    return gulp.src('src/stylesheets/style.styl')
        .pipe(stylus({ use: nib() }))
        .pipe(gulp.dest('public/stylesheets'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

// Start the server
gulp.task('server', function() {

  server.run(['./bin/www'], []);

  livereload.listen();

  gulp.watch(['./views/**/*.hbs'], function(event){
    console.log('hbs changed - do livereload');
    livereload.reload();
  });

  gulp.watch('src/stylesheets/*.styl', ['css']);

  gulp.watch(['./public/stylesheets/**/*.css'], function(event){
      console.log('css changed - do livereload');
      livereload.reload();
  });

  gulp.watch('src/js/*.js', ['lint', 'scripts']);

  gulp.watch(['./app.js', './routes/**/*.js'], function(event){
    server.run(['./bin/www'], []);
  });

});

// Default Task
gulp.task('default', ['server', 'lint', 'css', 'scripts']);
