'use strict';

var gulp = require('gulp'),
    insert = require('gulp-insert'),
    concat = require('gulp-concat'),
    minify = require('gulp-minifier'),
    replace = require('gulp-replace'),
    rename = require("gulp-rename");

function blockly() {
    return gulp.src('blockly/blockly_compressed.js')
        .pipe(replace(/goog\.global\s*=\s*this;/, 'goog.global=window;'))
        .pipe(replace('this.navigator&&this.navigator.', 'window.navigator&&window.navigator.'))
        .pipe(insert.wrap(
            `module.exports = (function(){`,
            `Blockly.goog=goog;return Blockly;})()`))
        .pipe(gulp.dest('dist'))
}

function custom_blocks() {
    return gulp.src('build/blocks_custom_compressed.js')
        .pipe(insert.wrap(
            `module.exports = function(Blockly){
            var goog = Blockly.goog;
            Blockly.Blocks={};`,
            `return Blockly.Blocks;}`))
        .pipe(gulp.dest('dist'))
}

function sql() {
    return gulp.src('build/sql_compressed.js')
        .pipe(insert.wrap(
            'module.exports = function(Blockly){' +
            'var goog = Blockly.goog;',
            'return Blockly.SQL;}'))
        .pipe(gulp.dest('dist'))
}

function merge_custom_blocks() {
    return gulp.src('./custom/blocks/*.js')
        .pipe(concat('blocks_custom.js'))
        .pipe(gulp.dest('./build/'));
}

function merge_sql_generators() {
    return gulp.src(['./custom/generators/sql.js', './custom/generators/sql/*.js'])
        .pipe(concat('sql.js'))
        .pipe(gulp.dest('./build/'));
}

function compress_custom_blocks() {
    return gulp.src('./build/blocks_custom.js')
        .pipe(minify({
            minify: true,
            minifyJS: {
                sourceMap: false
            }
        }))
        .pipe(rename("blocks_custom_compressed.js"))
        .pipe(gulp.dest('./build/'));
}

function compress_sql_generators() {
    return gulp.src('./build/sql.js')
        .pipe(minify({
            minify: true,
            minifyJS: {
                sourceMap: false
            }
        }))
        .pipe(rename("sql_compressed.js"))
        .pipe(gulp.dest('./build/'));
}

function language_files() {
    return gulp.src('blockly/msg/js/*.js')
        .pipe(replace(/goog\.[^\n]+/g, ''))
        .pipe(insert.wrap('var Blockly = {}; Blockly.Msg={};  module.exports = function(){ ', 'return Blockly.Msg;}'))
        .pipe(gulp.dest('dist/i18n/blockly/'))
}

function language_files_custom() {
    return gulp.src('custom/msg/js/*.js')
        .pipe(replace(/goog\.[^\n]+/g, ''))
        .pipe(insert.wrap('var Blockly = {}; Blockly.Msg={}; Blockly.Msg.Custom={}; module.exports = function(){ ', 'return Blockly.Msg.Custom;}'))
        .pipe(gulp.dest('dist/i18n/custom/'))
}

exports.compress = gulp.series(
    merge_custom_blocks,
    merge_sql_generators,
    compress_custom_blocks,
    compress_sql_generators
);

exports.generate = gulp.series(
    blockly,
    custom_blocks,
    sql,
    language_files,
    language_files_custom
);
