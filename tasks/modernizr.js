var gulp = require('gulp');

module.exports = function(production, debug) {

    var production = this.production;
    var config = this.config;
    var $ = this.plugins;

    var conf = config.modernizr || {
        options: [
            "setClasses",
            "mq",
            "classes"
        ]
    };
    
    return gulp.src(config.publicPath + 'js/**/*.js')
        .pipe($.modernizr(conf))
        .pipe($.if(production, $.uglify()))
        .pipe(gulp.dest(config.publicPath + 'js'));
};
