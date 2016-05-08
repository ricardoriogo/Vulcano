var gulp = require('gulp');

module.exports = function() {

    var production = this.production;
    var config = this.config;
    var $ = this.plugins;

    return gulp.src(config.sourcePath + 'js/**/*.js')
        .pipe($.debug({ title: "Scripts:" }))
        .pipe($.if(!production, $.sourcemaps.init()))
        .pipe($.concat('app.js'))
        .pipe($.if(production, $.uglify()))
        .pipe($.if(!production, $.sourcemaps.write()))
        .pipe(gulp.dest(config.publicPath + 'js'))
        .pipe($.debug({ title: "Scripts Results:" }));

};