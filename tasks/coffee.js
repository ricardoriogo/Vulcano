module.exports = function() {

    var production = this.production;
    var config = this.config;
    var $ = this.plugins;
    var gulp = this.gulp;

    return gulp.src(config.sourcePath + 'coffee/*.coffee')
    .pipe($.count('## files will be processed'))
    .pipe($.if(!production, $.sourcemaps.init()))
    .pipe($.concat('main.coffee'))
    .pipe($.coffee({ bare:true }))
    .on('error', function(e) {
        $.util.log(e);
        $.util.log($.util.colors.red('Compilation Failed'));
        var notifier = require('node-notifier');
        notifier.notify({
            title: 'Compilation Failed',
            message: 'Compilation Failed'
        });
        $.util.beep();
        this.emit('end');
    })
    .pipe(gulp.dest(config.sourcePath + 'js'))
    .pipe($.if(production, $.uglify()))
    .pipe($.if(!production, $.sourcemaps.write()))
    .pipe(gulp.dest(config.publicPath + 'js'));
};
