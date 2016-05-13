var mainBowerFiles = require('main-bower-files');

// grab libraries files from bower_components, minify and push in /public
module.exports = function() {

    var production = this.production;
    var config = this.config;
    var $ = this.plugins;
    var gulp = this.gulp;

    var jsFilter = $.filter('**/*.js', {restore: true});
    var cssFilter = $.filter('**/*.css', {restore: true});
    var fontFilter = $.filter(['**/*.eot', '**/*.woff', '**/*.svg', '**/*.ttf']);

    return gulp.src(mainBowerFiles())
        .pipe($.count('## Bower components files', {logFiles: true}))

        // grab vendor js files from bower_components, minify and push in /public
        .pipe(jsFilter)
        .pipe($.count('## Script files'))
        .pipe($.concat('plugins.js', { newLine: ';' }))
        .pipe(gulp.dest(config.publicPath + 'js'))
        .pipe($.uglify())
        .pipe($.rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(config.publicPath + 'js'))
        .pipe(jsFilter.restore)

        // grab vendor css files from bower_components, minify and push in /public
        .pipe(cssFilter)
        .pipe($.count('## Style files'))
        .pipe($.concat('plugins.css'))
        .pipe(gulp.dest(config.publicPath + 'css'))
        .pipe($.cssnano())
        .pipe($.rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(config.publicPath + 'css'))
        .pipe(cssFilter.restore)

        // grab vendor font files from bower_components and push in /public
        .pipe(fontFilter)
        .pipe($.count('## Font files'))
        .pipe($.flatten())
        .pipe(gulp.dest(config.publicPath + 'fonts'));
};

//require gulp-rename gulp-flatten gulp-filter main-bower-files
