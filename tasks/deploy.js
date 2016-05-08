var gulp = require('gulp');

var ftp = require('vinyl-ftp');
var merge = require('merge-stream');

module.exports = function(production, debug){
    
    var production = this.production;
    var config = this.config;
    var $ = this.plugins;
    
    var log = function(command, status){
        if(/^100\%/.test(status)){
            var time = new Date();
            time = ("0" + time.getHours()).slice(-2)   + ":" + 
                   ("0" + time.getMinutes()).slice(-2) + ":" + 
                   ("0" + time.getSeconds()).slice(-2);
            console.log('['+ $.util.colors.gray(time) +'] Uploaded: ' + $.util.colors.cyan(status.slice(5)));
            // Send uploaded Confirmation to File Cache;
            // File Cache save only confirmaded on Error;
            // Necessary add
            //      FileCache.confirmFile(filepath);
            //      FileCache.checkAndSaveCache(); <- on error
            // 
        }
    };
    
    var conn = ftp.create( {
        host:     'ftp.site.com',
        user:     'user',
        password: 'pass',
        log: log
    });

    var conn2 = ftp.create( {
        host:     'ftp.site.com',
        user:     'user',
        password: 'pass',
        log: log
    });

    var filterCache1 = $.filterCache({
        cacheFile: '.ftp-cache-front',
        method: 'hash',
        onlyFiles: true,
        confirmToSave: true
    });

    var filterCache2 = $.filterCache({
        cacheFile: '.ftp-cache-app',
        method: 'hash',
        onlyFiles: true,
        confirmToSave: true
    });

    var pubFilter = $.filter(['**/*', '!public/index.php', '!public/.htaccess'], {restore: true});

    var pub = gulp.src('./public/**/*', { base: 'public' })
        .pipe(pubFilter)
        .pipe($.rename(function (path) {
            path.basename.replace('_production', '');
            path.extname.replace('_production', '');
        }))
        .pipe(filterCache1)
        //.pipe(require('gulp-filelist')('filelist.json'))
        //.pipe(gulp.dest('./'))
        .pipe($.count('## files selected'))
        .pipe(
            conn.dest('/public_html')
            .on('error', function(){
                //filterCache1.instance.save();
                //$.util.log(arguments);
                $.util.log($.util.colors.red('Erro no Upload. Restarting...'));
            })
        )
        .pipe(filterCache1.instance.saveCache())
        .pipe($.count('## files uploaded'));


    var filter = $.filter(['*', '!*/app.log']);

    var app = gulp.src('./{app,vendor}/**/*', { base: '.' })
        .pipe(filterCache2)
        .pipe($.count('## files selected'))
        .pipe(
            conn2.dest('/site')
            .on('error', function(){
                //filterCache1.instance.save();
                //$.util.log(arguments);
                $.util.log($.util.colors.red('Erro no Upload. Restarting...'));
            })
        )
        .pipe(filterCache2.instance.saveCache())
        .pipe($.count('## files uploaded'));

    return merge(app, pub);
};