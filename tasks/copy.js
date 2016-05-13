module.exports = function(){

    var production = this.production;
    var config = this.config;
    var $ = this.plugins;
    var gulp = this.gulp;
    
    return gulp.src(config.sourcePath + 'assets/**/*.*')
        .pipe($.copy(config.publicPath, { prefix: config.sourcePath.replace(/^[\/\\]+|[\/\\]+$/gm,'').split(/[\/\\]/).length + 1 }))
        .pipe($.count("## files were copied.", { logFiles: true }));
};
