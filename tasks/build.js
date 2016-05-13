var runSequence = require('run-sequence');

module.exports = function() {

    var production = this.production;
    var config = this.config;
    var $ = this.plugins;
    var gulp = this.gulp;
    
    runSequence(
        ['copy', 'images', 'styles', 'scripts', 'bower'],
        'modernizr',
        'revisions',
        'clean'
    );
};