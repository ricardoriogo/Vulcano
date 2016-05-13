var fs      = require('fs');
var rimraf  = require('rimraf');
var path    = require('path');
var through = require('through2');

module.exports = function() {

    var production = this.production;
    var config = this.config;
    var $ = this.plugins;
    var gulp = this.gulp;
    
    function cleaner() {
        return through.obj(function(file, enc, cb){
            rimraf( path.resolve( (file.cwd || process.cwd()), file.path), function (err) {
                if (err) {
                    this.emit('error', new $.util.PluginError('Cleanup old files', err));
                }
                this.push(file);
                cb();
            }.bind(this));
        });
    };


    var src = [config.publicPath + 'css/*.css', config.publicPath + 'js/*.js'];
    
    return gulp.src(src, {read: false})
        .pipe( $.revOutdated() ) // leave 2 recent assets (default value)
        .pipe( cleaner() );
};
