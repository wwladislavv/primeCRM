'use strict';

import gulp from 'gulp';
import { deleteAsync } from 'del';
import pug from 'gulp-pug';
import typescript from 'gulp-typescript';
import { create } from 'browser-sync';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';

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
gulp.task('pug', function() {
  return gulp.src('src/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist'));
});

// Compile SCSS to CSS
gulp.task('scss', function() {
  return gulp.src('src/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist'));
});

// Compile TypeScript to JavaScript
gulp.task('typescript', function() {
  return gulp.src('src/**/.ts')
    .pipe(typescript())
    .pipe(gulp.dest('dist'));
});

// Watch for file changes
gulp.task('watch', function() {
  gulp.watch('src/**/*.pug', gulp.series('pug'));
  gulp.watch('src/**/*.scss', gulp.series('scss'));
  gulp.watch('src/**/*.ts', gulp.series('typescript'));
});

// Default task
gulp.task(
    'default',
    gulp.series(clean, 'pug', 'scss', 'typescript', gulp.parallel('watch', browserSyncInit))
);