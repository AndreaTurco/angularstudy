var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    notify      = require('gulp-notify'),
    del         = require('del'),
    sourcemaps  = require('gulp-sourcemaps');


gulp.task('sass_min', function () {
   return gulp.src('app/sass/**/*.scss')
       .pipe(sourcemaps.init())
       .pipe(sass().on('error', sass.logError))
       .pipe(concat('all.css'))
       .pipe(sourcemaps.write())
       .pipe(gulp.dest('./app/css/'))
       .pipe(notify({
          message : "sassyfied!"
       }));
});

gulp.task('clean_css', function () {
    return del([
        './app/css/all.css'
    ]);
});

gulp.task('clean_js', function () {
    return del([
        './app/js/all.js'
    ]);
});

gulp.task('js_min', function () {
    return gulp.src(['./app/**/*.js','!./app/bower_components/**/*.js','!./app/components/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/js/'))
        .pipe(notify({
            message : "uglifyied js"
        }))
});

gulp.task('watch_sass', function () {
   gulp.watch('app/sass/**/*.scss', function () {
      gulp.run('sass_min');
   });
});
gulp.task('watch_js', function () {
   gulp.watch(['./app/**/*.js','!./app/bower_components/**/*.js','!./app/components/**/*.js'], function () {
      gulp.run('js_min');
   });
});

gulp.task('default', ['sass']);
gulp.task('sass', ['clean_css','sass_min']);
gulp.task('sass_all', ['clean_css','sass_min','watch_sass']);
gulp.task('js', ['clean_js','js_min']);
gulp.task('js_all', ['clean_js','js_min','watch_js']);
