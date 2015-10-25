var gulp = require('gulp')
    , justfiles = require('./util/justfiles');

module.exports = function build() {

    var input = this.input(this.source.assets, [
        '**/*',
        '!css/**/*',
        '!css'
    ]);

    return gulp.src(input)
        .pipe(justfiles())
        .pipe(gulp.dest(this.target.assets));
}