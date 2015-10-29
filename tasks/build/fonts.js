var gulp = require('gulp')
    , justfiles = require('./util/justfiles')
    , es = require('event-stream');

module.exports = function build() {

    var src = gulp.src(this.input(this.srcFonts, [
        '**/*'
    ]));

    var vendorSrc = gulp.src(this.vendorFonts);

    return es.merge(src, vendorSrc)
        .pipe(justfiles())
        .pipe(gulp.dest(this.buildFonts));
}