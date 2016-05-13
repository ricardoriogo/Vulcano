module.exports = function() {

    var production = this.production;
    var config = this.config;
    var $ = this.plugins;
    var gulp = this.gulp;

    return gulp.src(config.sourcePath + 'js/**/*.js')
        .pipe($.count('## files selected'))
        .pipe($.if(!production, $.sourcemaps.init()))
        .pipe($.concat('app.js'))
        .pipe($.if(production, $.uglify()))
        .pipe($.if(!production, $.sourcemaps.write()))
        .pipe(gulp.dest(config.publicPath + 'js'))
        .pipe($.count('## files processed', {logFiles: true}));

};