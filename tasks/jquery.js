var gulp = require('gulp');

module.exports = function(production, debug){

    var production = this.production;
    var config = this.config;
    var $ = this.plugins;
    
    return $.jquery.src({
            release: 2, //jQuery 2 
            flags: ['-deprecated'] //, '-event/alias', '-ajax/script', '-ajax/jsonp', '-exports/global'
        })
        .pipe($.uglify())
        .pipe(gulp.dest(config.publicPath + 'js/vendor'));
};
