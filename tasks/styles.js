var gulp = require('gulp');

module.exports = function(){

    var production = this.production;
    var config = this.config;
    var $ = this.plugins;

    return gulp.src(config.sourcePath + 'sass/*.scss')
        .pipe($.debug({ title: "Styles:" }))
        .pipe($.if(!production, $.sourcemaps.init()))
        .pipe($.cssGlobbing({
            extensions: ['.scss']
        }))
        .pipe($.sass({
            includePaths: ['bower_components/']
        }))
        .on('error', function(e) {
            $.util.log($.util.colors.red('Compilation Failed'));
            $.util.log(e.messageFormatted);
            var notifier = require('node-notifier');
            notifier.notify({
                title: 'Compilation Failed',
                message: e.message,
                sound: true,
                wait: false
            }, function(error, response) {
                console.log(response);
            });
            this.emit('end');
        })
        .pipe($.autoprefixer({
        	browsers: ['last 2 versions', '> 1% in BR']
        }))
        .pipe($.if(!production, $.sourcemaps.write()))
        .pipe($.if(production, $.cssnano()))
        .pipe(gulp.dest(config.publicPath + 'css'))
        .pipe($.debug({ title: "Styles Results:" }));
};
