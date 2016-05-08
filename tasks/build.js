var gulp = require('gulp');
var runSequence = require('run-sequence');

module.exports = function() {
    runSequence(
        ['copy', 'images', 'styles', 'scripts'],
        'revisions',
        'clean'
    );
};