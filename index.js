module.exports = function(gulp){
    
    var tasks = require('require-dir')(__dirname + '/tasks');
    var $ = require('gulp-load-plugins')();
    var config;
    
    $.deepExtend = require('deep-extend');
    
    try {
        config = require(process.cwd() + '/gulpconf.json');
    } catch(err) {
        config = {};
    }
    
    config = $.deepExtend(require(__dirname + '/config.json'), config);
    
    var Vulcano = {};
    
    (function(){
        
        for (var task in tasks) {
            gulp.task.apply(gulp, [task, tasks[task].bind(Vulcano)]);
        }
        
        gulp.task.call(gulp, 'default', ['watch']);
    })();
    
    Vulcano.config = config;
    Vulcano.plugins = $;
    Vulcano.env = $.util.env;
    Vulcano.gulp = gulp;
    Vulcano.production = $.util.env.p || $.util.env.production === true;
    
    return Vulcano;
};
