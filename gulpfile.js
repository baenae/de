const gulp = require('gulp');
const del = require('del');
const path = require('path');
const concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var vendorJSFiles = [
	'node_modules/jquery/dist/jquery.js'
];

gulp.task('clean', function() {
	return del(['dist/**/*']);
});

gulp.task('vendorjs', ['clean'], function(cb) {
	return gulp.src(vendorJSFiles)
	.pipe(concat('vendor.js'))
	.pipe(uglify())
	.pipe(gulp.dest('src/'));
});

gulp.task('copyfiles', ['vendorjs'], function() {
	return gulp.src(['src/**/*'])
	.pipe(gulp.dest('dist'));
});

gulp.task('build', [
	'clean',
	'copyfiles',
	'vendorjs'
]);
gulp.task('default', ['build']);