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
		gulp.watch('public/scss/**/*.scss', gulp.series('sass'));
		gulp.watch('views/').on('change', browserSync.reload);
		gulp.watch('public/scss/').on('change', browserSync.reload);
	})
);

gulp.task('default', gulp.series('serve'));
