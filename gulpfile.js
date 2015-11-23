var gulp = require('gulp');
var stylus      = require('gulp-stylus');
var handlebars 	= require('gulp-compile-handlebars');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

gulp.task('browser-sync', function() {
  browserSync.init( {
		server: {
			baseDir: "./build"
		},
    port: "10191", // The year of Muad'dib
    open: false
  });
});

// CSS
gulp.task('css', function() {
  return gulp.src('src/stylesheets/style.styl')
    .pipe(stylus({}))
    .pipe(gulp.dest('build/stylesheets'))
    .pipe(reload({stream: true}));
});

// Templates
gulp.task('templates', function() {
	var templateData = {
	  title: 'Ornithopter'
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

// Initial/production build
gulp.task('build', ['css', 'templates']);

// Watch
gulp.task('watch', function() {
	gulp.watch('src/stylesheets/**/*.styl', ['css']);
});

// Development
gulp.task('default', ['build', 'browser-sync', 'watch']);
