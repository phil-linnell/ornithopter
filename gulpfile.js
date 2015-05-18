var gulp = require('gulp');

var stylus      = require('gulp-stylus');
var nib         = require('nib');

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
    .pipe(gulp.dest('build/stylesheets'))
    .pipe(reload({stream: true}));
});



// Initial/production build
gulp.task('build', ['css']);

// Watch
gulp.task('watch', function() {
	gulp.watch('src/stylesheets/**/*.styl', ['css']);
});

// Development
gulp.task('default', ['build', 'browser-sync', 'watch']);
