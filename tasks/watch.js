var path = require('path');

module.exports = function(){

    var production = this.production;
    var config = this.config;
    var $ = this.plugins;
    var gulp = this.gulp;
    
    if(config.watchers == undefined || config.watchers.length == 0) return;

    var cb = function(event) {
        $.util.log('The file ' + $.util.colors.bgCyan(event.path.replace(process.cwd() + path.sep, '')) + ' has been ' + event.type + '!');
    };

    for (var glob in config.watchers) {
        
        gulp.watch(config.sourcePath + glob, config.watchers[glob])
        .on('change', cb)
        .on('add', cb);
    }
};