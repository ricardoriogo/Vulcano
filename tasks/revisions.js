var gulp = require('gulp');

var fs = require('fs');
var path    = require('path');
var through = require('through2');

module.exports = function() {

    var production = this.production;
    var config = this.config;
    var $ = this.plugins;
    
    var manifestFileName = config.revisionFileName || "rev-manifest.json";
    var manifest = config.publicPath + manifestFileName;
    
    function filter() {
        return through.obj(function(file, enc, cb){
            var regex = new RegExp('^(.*)-[0-9a-f]{8,10}(?:\\.min)?\\' + path.extname(file.path) + '$');
            if (regex.test(file.path)) {
                cb(null, null);
                return;
            }
            cb(null, file);
        });
    };
    
    var src = [config.publicPath + 'css/*.css', config.publicPath + 'js/*.js'];
    
    return gulp.src(src, {base: config.publicPath.replace(/^[\/\\]+|[\/\\]+$/gm,'')})
        .pipe(filter())
        .pipe($.debug({ title: "Revisions:" }))
        .pipe(gulp.dest(config.publicPath + '/build'))  // copy original assets to build dir
        .pipe($.rev())
        .pipe(gulp.dest(config.publicPath))  // write rev'd assets to build dir
        .pipe($.rev.manifest(manifestFileName))
        .pipe(gulp.dest(config.publicPath));
};