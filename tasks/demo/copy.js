var gulp = require('gulp')
justfiles = require('./util/justfiles');

module.exports = function build() {

    var input = this.input(this.srcDir, [
        '**/*',
        '!app/**/*',
        '!assets/css/**/*',
        '!**/*.tpl.html'
    ]);

    return gulp.src(input)
        .pipe(justfiles())
        .pipe(gulp.dest(this.buildDir));
}