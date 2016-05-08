var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');

// grab libraries files from bower_components, minify and push in /public
module.exports = function() {
        var production = this.production;
        var config = this.config;
        var $ = this.plugins;

        var jsFilter = $.filter('**/*.js', {restore: true});
        var cssFilter = $.filter('**/*.css', {restore: true});
        var fontFilter = $.filter(['**/*.eot', '**/*.woff', '**/*.svg', '**/*.ttf']);

        var files = $.mainBowerFiles();

        return gulp.src(files)
        .pipe($.debug({title: 'All:'}))

        // grab vendor js files from bower_components, minify and push in /public
        .pipe(jsFilter)
        .pipe($.debug({title: 'Scripts:'}))
        .pipe($.concat('plugins.js', { newLine: ';' }))
        .pipe(gulp.dest(config.publicPath + 'js'))
        .pipe($.uglify())
        .pipe($.rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(config.publicPath + 'js'))
        .pipe($.debug({title: 'Scripts Result:'}))
        .pipe(jsFilter.restore)

        // grab vendor css files from bower_components, minify and push in /public
        .pipe(cssFilter)
        .pipe($.debug({title: 'Styles:'}))
        .pipe($.concat('plugins.css'))
        .pipe(gulp.dest(config.publicPath + 'css'))
        .pipe($.cssnano())
        .pipe($.rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(config.publicPath + 'css'))
        .pipe($.debug({title: 'Styles Result:'}))
        .pipe(cssFilter.restore)

        // grab vendor font files from bower_components and push in /public
        .pipe(fontFilter)
        .pipe($.debug({title: 'Fonts:'}))
        .pipe($.flatten())
        .pipe(gulp.dest(config.publicPath + 'fonts'))
        .pipe($.debug({title: 'Fonts Result:'}));
};

//require gulp-rename gulp-flatten gulp-filter main-bower-files
