(function () {
    'use strict';

    /* global require: false */
    /* global process: false */

    var config = {
        cms: {
            styles: ['static/styles/site.less'],
            scripts: {
                lib: ['static/scripts/lib/*.js', 'static/scripts/lib/**/*.js'],
                site: [
                    'static/scripts/*.js',
                    'static/scripts/**/*.js',
                    '!static/scripts/lib/*.js',
                    '!static/scripts/lib/**/*.js',
                    '!static/scripts/vendor/*.js',
                    '!static/scripts/vendor/**/*.js'
                ]
            }
        },
        uglify: {
            lib: {
                mangle: false,
                compress: process.env.NODE_ENV ==='production' ? {} : false,
                preserveComments: 'some'
            },
            site: {
                mangle: process.env.NODE_ENV ==='production',
                compress: process.env.NODE_ENV ==='production' ? {} : false
            }
        }
    };

    var gulp = require('gulp'),
        less = require('gulp-less'),
        concat = require('gulp-concat'),
        minifyCSS = require('gulp-minify-css'),
        uglify = require('gulp-uglifyjs');

    gulp.task('styles-cms', function () {
        gulp.src(config.cms.styles)
            .pipe(less())
            .pipe(minifyCSS())
            .pipe(gulp.dest('static/'));
    });

    gulp.task('scripts-cms-lib', function () {
        gulp.src(config.cms.scripts.lib)
            .pipe(concat('lib.js'))
            .pipe(uglify(config.uglify.lib))
            .pipe(gulp.dest('static/'));
    });

    gulp.task('scripts-cms-site', function () {
        gulp.src(config.cms.scripts.site)
            .pipe(concat('site.js'))
            .pipe(uglify(config.uglify.site))
            .pipe(gulp.dest('static/'));
    });

    gulp.task('scripts-cms', ['scripts-cms-site', 'scripts-cms-lib']);

    gulp.task('styles', ['styles-cms']);
    gulp.task('scripts', ['scripts-cms']);

    gulp.task('build', ['styles', 'scripts']);
    gulp.task('default', ['build', 'watch']);

    gulp.task('watch', function () {
        gulp.watch('static/styles/**/*', ['styles-cms']);
        gulp.watch(config.cms.scripts.lib, ['scripts-cms-lib']);
        gulp.watch(config.cms.scripts.site, ['scripts-cms-site']);
    });

})();
