# CHOAM
Controlling economical affairs across the cosmos... also a lesser known small **node/express** app for no fuss UI developers and fast prototyping.

- Node.js with Express.js
- Gulp
  - stylus using nib,
  - js that concatenates and minifies
- Livereload
- Handlebars and partials

## Steps to create

### Express

    $ npm install express --save
    $ express --hbs
    $ DEBUG=myapp ./bin/www

### Setup gulp, stylus, watchers etc

    $ npm init
    $ npm install gulp gulp-jshint gulp-stylus nib gulp-concat gulp-uglify gulp-rename gulp-express --save-dev
    $ touch gulpfile.js

See gulpfile.js

### Livereload

    $ npm install gulp-livereload connect-livereload --save-dev

See gulpfile.js for 'server' task addition. Had to change the port in node_modules for some reason.

#### Heroku

Simply add to git repository and deploy via Github on heroku.com

#### Handlebars/partials

Use [this code](https://gist.github.com/benw/3824204) to utilise the hbs that express installed already with the --hbs flag


## TODO:

-[ ] fix watcher for subfolders (stylesheets/components, views/partials)
-[ ] appropriate place for vendors
-[ ] move /views into /src ?

## Resources

Helpful resources:
* http://anotheruiguy.gitbooks.io/nodeexpreslibsass_from-scratch/content/index.html
* http://travismaynard.com/writing/getting-started-with-gulp
* https://github.com/gimm/gulp-express/issues/26
* https://medium.com/@_jh3y/adopting-gulp-js-20443e45105a
* http://rhumaric.com/2014/01/livereload-magic-gulp-style/
* http://www.smashingmagazine.com/2014/06/11/building-with-gulp/
* https://github.com/Dibbin/Express-Handlebars-Less-Jasmine-NodeUnit_Project-Template
* https://gist.github.com/benw/3824204
