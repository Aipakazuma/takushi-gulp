var gulp = require('gulp');
var changed = require('gulp-changed');
var sass = require('gulp-sass');
var browser = require('browser-sync');
var plumber = require('gulp-plumber');
var prettify = require('gulp-prettify');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var frontnote = require('gulp-frontnote');
var csscomb = require('gulp-csscomb');
var mergeMediaQueries = require('gulp-merge-media-queries');
var uncss = require('gulp-uncss');

var paths = {
    base   : '/Users/kazumatamaki/git/tmp/takushi-gulp/',
    scss   : 'app/scss/**/*.scss',
    js     : 'app/js/*.js',
    jade   : 'app/jade/**/*.jade',
    image  : 'app/**/img/*',
    dist   : './dist',
    distCss: './dist/css',
    distJs:  './dist/js',
};

gulp.task('server', function() {
    browser({
        server: {
            baseDir: paths.dist
        }
    });
});

gulp.task('sass', function() {
    return gulp.src(paths.scss)
        .pipe(plumber())
        .pipe(changed(paths.dist))
        .pipe(sass({
            errLogToConsole: true,
            sourceComments: 'normal'
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest(paths.distCss))
        .pipe(browser.reload({stream:true}));
});

gulp.task('js', function(cb) {
    return gulp.src(paths.js)
        .pipe(plumber())
        .pipe(changed(paths.dist))
        .pipe(uglify({preserveComments: 'some'}))
        .pipe(gulp.dest(paths.distJs))
        .pipe(browser.reload({stream:true}));
});
 
gulp.task('jade', function() {
    return gulp.src(paths.jade)
        .pipe(plumber())
        .pipe(changed(paths.dist))
        .pipe(jade({
            pretty: false
        }))
        .pipe(gulp.dest(paths.dist))
        .pipe(browser.reload({stream:true}));
});

gulp.task('watch', function() {
    gulp.watch(paths.scss,['sass']);
    gulp.watch(paths.jade,['jade']);
    gulp.watch(paths.js,['js']);
});

gulp.task('default', ['watch','server']);