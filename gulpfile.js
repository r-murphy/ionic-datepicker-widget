var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngHtml2Js = require('gulp-ng-html2js');
var minifyHtml = require('gulp-minify-html');
var merge = require('merge-stream');

gulp.task('default', ['build']);

gulp.task('copy-css', function () {
    return gulp.src('./src/*.css')
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['copy-css'], function () {
    var script = gulp.src('./src/ionic-datepicker.js');

    var template = gulp.src('./src/*.html')
        .pipe(minifyHtml())
        .pipe(ngHtml2Js({
            moduleName: 'ionic-datepicker.template'
        }));

    return merge(script, template)
        .pipe(concat('ionic-datepicker.min.js'))
        .pipe(uglify({ preserveComments: 'some' }))
        .pipe(gulp.dest('./dist'));
});
