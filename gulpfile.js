'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const pump = require('pump');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');

const paths = {
    styles: {
        src: 'assets/pre/*.sass',
        dest: 'assets/post/'
    },
    scripts: {
        src: 'assets/pre/*.js',
        dest: 'assets/post/'
    }
};

function styles(cb) {
    pump([
            gulp.src(paths.styles.src),
            sass(),
            cleanCSS(),
            rename({
                basename: 'style',
                suffix: '.min'
            }),
            gulp.dest(paths.styles.dest)
        ],
        cb
    );
}

function scripts(cb) {
    pump([
            gulp.src(paths.scripts.src),
            uglify(),
            concat('main.min.js'),
            gulp.dest(paths.scripts.dest)
        ],
        cb
    );
}

const build = gulp.series(styles, scripts);
gulp.task('default', build);