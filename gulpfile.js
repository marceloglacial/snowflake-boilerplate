var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pump = require('pump');
var smushit = require('gulp-smushit');
var autoprefixer = require('gulp-autoprefixer');
var gulpSequence = require('gulp-sequence')




//  Static Server 
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./src/"
        }
    });
});

// Clean dist and tmp
gulp.task('build-clean', function () {
    return del([
        'dist/**/*'
    ]);
});

// Copy files to dist
gulp.task('build-dist', function () {
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

// Minimize JS
gulp.task('build-js', function (cb) {
    pump([
        gulp.src('src/assets/js/*.js'),
        uglify(),
        gulp.dest('dist/assets/js')
    ],
        cb
    );
});


// Optimize images
gulp.task('build-img', function () {
    return gulp.src('src/assets/img/*')
        .pipe(smushit())
        .pipe(gulp.dest('dist/assets/img'))
});


// Build
gulp.task('build', gulpSequence(
    'build-clean',
    'build-dist',
    'build-css',
    'build-js',
    'build-img'
));
