var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var pump = require('pump');
var smushit = require('gulp-smushit');
var autoprefixer = require('gulp-autoprefixer');
var gulpSequence = require('gulp-sequence')

// Static Server
gulp.task('serve', function () {
    browserSync.init({
        server: "./src"
    });

    gulp.watch("src/**/*.*").on('change', browserSync.reload);
});

// Minimize JS
gulp.task('build-js', function (cb) {
    pump([
            gulp.src('src/assets/js/*'),
            uglify(),
            gulp.dest('dist/assets/js/')
        ],
        cb
    );
});

// Copy files to dist
gulp.task('build-copy', function () {
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist/'));
});

// Minify CSS and ADD vendor prefix
gulp.task('build-css', function () {
    return gulp.src('src/assets/css/*.*')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({
            debug: true
        }, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(gulp.dest('dist/assets/css'));
});

// Optimize images
gulp.task('build-img', function () {
    return gulp.src('src/assets/img/*')
        .pipe(smushit())
        .pipe(gulp.dest('dist/assets/img'))
});

// Serve dist files
gulp.task('build-serve', function () {
    browserSync.init({
        server: "./dist"
    })
});

// Clean dist and tmp
gulp.task('build-clean', function () {
    return del([
        'dist/**/*',
        'tmp/**/*'
    ]);
});

// Minify XHTML
gulp.task('build-html', function () {
    var opts = {
        comments: false,
        spare: true
    };

    gulp.src('./src/**/*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('./dist/'))
});

// Build
gulp.task('build', gulpSequence(
    'build-clean',
    'build-copy',
    'build-css',
    'build-js',
    'build-html',
    'build-img',
    'build-serve'
));

// Run Default
gulp.task('default', ['serve']);