var gulp = require('gulp')
    justfiles = require('./util/justfiles');

module.exports = function build() {

    var input = this.input(this.sourceDir, [
        '**/*.html',
        '!**/*.tpl.html'
    ]);

    return gulp.src(input)
        .pipe(justfiles())
        .pipe(gulp.dest(this.targetDir));
}