'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

// Sass compilation
gulp.task('sass', function () {
	return gulp
		.src('public/scss/*.scss')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(gulp.dest('public/css'));
});

// Watching
gulp.task('sass:watch', function () {
	gulp.watch('public/scss/*.scss', gulp.series('sass'));
});

gulp.task(
	'serve',
	gulp.series('sass', function () {
		browserSync.init({
			port: 4000,
			proxy: {
				target: 'localhost:3000', // original port
			},
		});

		gulp.watch('public/scss/*.scss', gulp.series('sass'));
		gulp.watch('views/*.ejs').on('change', browserSync.reload);
		gulp.watch('public/scss/*.scss').on('change', browserSync.reload);
	})
);

gulp.task('default', gulp.series('serve'));
