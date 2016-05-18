var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    notify      = require('gulp-notify'),
    sourcemaps  = require('gulp-sourcemaps');


gulp.task('sass', function () {
   return gulp.src('app/sass/**/*.scss')
       .pipe(sass().on('error', sass.logError))
       .pipe(concat('app.css'))
       .pipe(gulp.dest('./app/css/'))
       .pipe(notify({
          message : "sassyfied!"
       }));
});

gulp.task('watch', function () {
   gulp.watch('app/sass/**/*.scss', function () {
      gulp.run('sass');
   });
});

gulp.task('default', ['sass', 'watch']);