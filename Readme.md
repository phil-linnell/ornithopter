# Choam

### Express

    $ npm install express --save
    $ express --hbs
    $ npm install
    $ DEBUG=myapp ./bin/www

### Setup gulp, stylus, watchers etc

    $ npm init
    $ npm install --save-dev gulp
    $ npm install gulp-jshint gulp-stylus gulp-concat gulp-uglify gulp-rename --save-dev
    $ npm install nib --save-dev
    $ touch gulpfile.js

### Start server in gulp

    $ npm i gulp-express --save-dev

Add Server task in gulpfile.

### Livereload

    $ npm i gulp-livereload --save-dev
    $ npm i connect-livereload --save
    $ npm i gulp-util // Needed?

Had to change the port in node_modules for some reason.

### Handlebars/partials

### Heroku

## Resources

Helpful resources:
* http://anotheruiguy.gitbooks.io/nodeexpreslibsass_from-scratch/content/index.html
* [travismaynard.com/writing/getting-started-with-gulp](http://travismaynard.com/writing/getting-started-with-gulp)
* https://github.com/gimm/gulp-express/issues/26
* https://medium.com/@_jh3y/adopting-gulp-js-20443e45105a
* http://rhumaric.com/2014/01/livereload-magic-gulp-style/
* http://www.smashingmagazine.com/2014/06/11/building-with-gulp/
* https://github.com/Dibbin/Express-Handlebars-Less-Jasmine-NodeUnit_Project-Template
