module.exports = function() {

    var production = this.production;
    var config = this.config;
    var $ = this.plugins;
    var gulp = this.gulp;
    
    return gulp.src(config.publicPath + 'js/**/*.js')
        .pipe($.modernizr(config.modernizr))
        .pipe($.if(production, $.uglify()))
        .pipe(gulp.dest(config.publicPath + 'js'));
};
