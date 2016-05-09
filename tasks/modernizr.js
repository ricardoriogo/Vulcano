var gulp = require('gulp');

module.exports = function(production, debug) {

    var production = this.production;
    var config = this.config;
    var $ = this.plugins;
    
    return gulp.src(config.publicPath + 'js/**/*.js')
        .pipe($.modernizr(config.modernizr))
        .pipe($.if(production, $.uglify()))
        .pipe(gulp.dest(config.publicPath + 'js'));
};
