module.exports = function(){

    var production = this.production;
    var config = this.config;
    var $ = this.plugins;
    var gulp = this.gulp;

    var imgDest = config.publicPath + 'img';

    return gulp.src(config.sourcePath + 'img/**/*')
        .pipe($.newer(imgDest))
        .pipe($.count('## images to be processed', { logFiles: true }))
        .pipe($.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .on('error', function(e) {
            $.util.log(e);
            $.util.log($.util.colors.red('Compression Failed'));
            var notifier = require('node-notifier');
            notifier.notify({
                title: 'Compression Failed',
                message: 'Compression Failed'
            });
            $.util.beep();
            this.emit('end');
        })
        .pipe(gulp.dest(imgDest));
};
