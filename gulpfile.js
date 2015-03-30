var gulp = require('gulp');

var stylus      = require('gulp-stylus');
var nib         = require('nib');

var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');

var handlebars 	= require('gulp-compile-handlebars');

var browserSync = require('browser-sync');
var reload      = browserSync.reload;


gulp.task('browser-sync', function() {
  browserSync.init( {
		server: {
			baseDir: "./build"
		},
    port: "3000",
    open: false
  });
});


// CSS
gulp.task('css', function() {
  return gulp.src('src/stylesheets/style.styl')
    .pipe(stylus({ use: nib() }))
    .pipe(gulp.dest('build/stylesheets'))
    .pipe(reload({stream: true}));
});

// JS
gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(reload({stream:true}));
});

gulp.task('vendor', function() {
	return gulp.src('src/js/vendor/*.js')
		.pipe(gulp.dest('build/js/vendor'));
});


// Templates
gulp.task('templates', function() {
	var templateData = {
	  title: 'Fremen'
	};
	var options = {
	  ignorePartials: true,
	  batch: ['./src/views'],
	  helpers: {
	    capitals: function(str){
	      return str.toUpperCase();
	    }
	  }
	};
	return gulp.src('src/views/*.html')
		.pipe(handlebars(templateData, options))
		.pipe(gulp.dest('build/'))
		.pipe(reload({stream:true}));
});



// Initial build
gulp.task('build', ['css', 'scripts', 'vendor', 'templates']);

// Watch
gulp.task('watch', function() {
	gulp.watch('src/stylesheets/**/*.styl', ['css']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/views/**/*.html', ['templates']);
});

// Development
gulp.task('default', ['build', 'browser-sync', 'watch']);
