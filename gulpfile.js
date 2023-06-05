'use strict';

import gulp from 'gulp';
import { deleteAsync } from 'del';
import pug from 'gulp-pug';
import typescript from 'gulp-typescript';
import { create } from 'browser-sync';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import changed from 'gulp-changed';
// import prettier from 'gulp-prettier';
import autoprefixer from 'autoprefixer';


const sass = gulpSass(dartSass);
const browserSync = create();

function browserSyncInit(done) {
	browserSync.init({
		server: {
			baseDir: './dist',
			index: 'index.html',
		},
		tunnel: true,
		host: 'localhost',
		port: 9000,
		notify: false,
	});
	done();
}

function browserSyncReload(done) {
	browserSync.reload();
	done();
}

function clean() {
	return deleteAsync(['./dist/']);
}


// Compile Pug to HTML
gulp.task('pug', function () {
	return gulp.src('src/pages/*.pug')
		.pipe(pug({ pretty: true }))
		.pipe(gulp.dest('./dist/'));
});

// Compile SCSS to CSS
gulp.task('scss', function () {
	const plugins = [autoprefixer({ grid: true })];
	
	return gulp
		.src('src/**/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(postcss(plugins))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream());
});

// Compile TypeScript to JavaScript
gulp.task('typescript', function () {
	return gulp.src('src/**/.ts')
		.pipe(typescript())
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('img', function () {
	return gulp
			.src('src/images/**/*.*')
			// .pipe(changed('./dist/images'))
			.pipe(gulp.dest('./dist/images'));
});

// Watch for file changes
gulp.task('watch', function () {
	gulp.watch('src/**/**/*.pug', gulp.series('pug', browserSyncReload));
	gulp.watch('src/**/*.scss', gulp.series('scss', browserSyncReload));
	gulp.watch('src/**/*.ts', gulp.series('typescript', browserSyncReload));
	gulp.watch('src/images/**/*.*', gulp.series('img', browserSyncReload));
});

// Default task
gulp.task(
	'default',
	gulp.series(clean, 'pug', 'scss', 'typescript', 'img', gulp.parallel('watch', browserSyncInit))
);