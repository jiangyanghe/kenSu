/**
 * Created by stephen on 15/12/8.
 */
/* ---- import packages for gulp ---- */
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    minifycss = require('gulp-minify-css'),
    jsmin = require('gulp-jsmin'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    changed = require('gulp-changed'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    gzip = require('gulp-gzip'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    include = require('gulp-include'),//Enables functionality similar to that of snockets / sprockets or other file insertion compilation tools.
    plumber = require('gulp-plumber');//Fixing Node pipes
//var bs = require('browser-sync').create();

/* ---- file paths ----*/

//working folder
var bsk = {
    appDir : "app",
    distDir :"dist",
    cssDir : "css",
    scssDir : "stylesheets",
    minifiedJsDir : "js",
    jsDir : "javascripts",
    fontsDir : "fonts/bootstrap",
    bowerDir : 'bower_components',
    bootstrapDir : './bower_components/bootstrap/dist/css/bootstrap.css',
    nprogressDir : './bower_components/nprogress/nprogress.css',
    dialogDir : './node_modules/artDialog/css/ui-dialog.css'

};

/* ---- tasks ---- */

//clean the catch
gulp.task('clean', function() {
    console.log('=============clean=================');
    return gulp.src(['./dist/*/*.*'], {read: false})
        .pipe(clean({force: true})
    );
});

// convert scss to css, minify css
gulp.task('styles', function() {
    return gulp.src(bsk.appDir+'/'+bsk.scssDir+'/main.scss')
        .pipe(plumber())
        .pipe(autoprefixer())
        .pipe(sass().on('error', sass.logError))
        .pipe(changed(bsk.appDir+'/'+bsk.scssDir+'/main.css'))
        .pipe(gulp.dest(bsk.appDir+'/dist/'+bsk.cssDir))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(bsk.appDir+'/dist/'+bsk.cssDir))
        .pipe(reload({stream:true}));
});


//minify js
gulp.task('js', function () {
    return gulp.src(bsk.appDir+'/'+bsk.jsDir+'/**/*.js')
        .pipe(include())
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(changed(bsk.appDir+'/'+bsk.jsDir+'/*.js'))
        .pipe(gulp.dest(bsk.appDir+'/dist/'+bsk.minifiedJsDir))
        .pipe(reload({stream:true}));
});

//launch web server
gulp.task('connect', function () {
    return browserSync({
        notify: false,
        server: {
            baseDir: bsk.appDir
        }
    });
});

//move bootstrap3 assets from 'bower' to 'app'

gulp.task('common', function() {
    console.log('=============common has changed=================');
    gulp.src([bsk.bootstrapDir,bsk.nprogressDir,'./node_modules/artDialog/css/ui-dialog.css'])//?????????????,bsk.nprogressDir 多路径的时候遇到困难
        .pipe(concat('commom'))
        .pipe(rename('common.min.css'))
        .pipe(minifycss({compatibility: '',keepSpecialComments:0}))
        .pipe(gulp.dest(bsk.appDir+'/dist/'+bsk.cssDir))
        .pipe(reload({stream:true}));

    gulp.src(['./bower_components/jquery/dist/jquery.js','./bower_components/bootstrap/dist/js/bootstrap.js','./node_modules/artDialog/dist/dialog.js'])
        .pipe(uglify())
        .pipe(concat('jbScript'))
        .pipe(rename({
            basename: "framework",
            prefix: "sdk_",
            suffix: '.min',
            extname: ".js"
        }))
        .pipe(gulp.dest(bsk.appDir+'/dist/'+bsk.minifiedJsDir))
});


gulp.task('fonts',function() {
    console.log('=============font has changed=================');
    gulp.src('./bower_components/bootstrap/fonts/*')
        .pipe(gulp.dest(bsk.appDir+'/dist/fonts/'))
});

gulp.task('img', function () {
    return gulp.src([bsk.appDir+'/images/*'])
        .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
        .pipe(gulp.dest(bsk.appDir+'/dist/img'))
});

//run page reloading, sass & js minification services
gulp.task('serve', ['clean'], function(){
    gulp.start('connect','common','styles','js','img','fonts');
    gulp.watch([bsk.appDir+'/**/*.html', bsk.appDir+'/**/*.htm'])
        .on('change', function(file){
            gulp.src(file.path)
                .pipe(reload({stream:true}));
        });
    gulp.watch(bsk.appDir+'/'+bsk.scssDir+'/**/*.scss', ['styles'])
        .on('change', function(file){
            gulp.src(file.path)
                .pipe(reload({stream:true}));
        });
    gulp.watch(bsk.appDir+'/'+bsk.jsDir+'/**/*.js',['js']);
    gulp.watch(bsk.appDir+'/images/*',['img']);
});

/* ---- output folder ---- */

//// clean output directory
//gulp.task('clean', del.bind(null, [bsk.distDir]));
//gulp.task('clean:prodDir', del.bind(null, [bsk.distDir+'/'+bsk.jsDir, bsk.distDir+'/'+bsk.scssDir]));
//
////move files to output folder
//gulp.task('copy', ['clean'], function(){
//    return gulp.src([bsk.appDir+'/**'])
//        .pipe(gulp.dest(bsk.distDir));
//});
//
////generate output folder
//gulp.task('output', function() {
//    runSequence('clean', 'copy', 'clean:prodDir');
//});

/* ---- initialization ---- */

gulp.task('init', function() {
    runSequence(['init:js', 'init:fonts', 'init:scss'], 'init:renameSCSS', 'js', 'styles', 'serve');
});

gulp.task('default', function() {
    console.log('To start using the package, use "$ gulp init"');
    console.log('To resume Sass\'s "watch" tasks, use "$ gulp serve"');
    console.log('To create a clean output folder, use "$ gulp output"');
});