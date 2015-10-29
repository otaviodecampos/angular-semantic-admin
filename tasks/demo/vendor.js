var gulp = require('gulp')
    , es = require('event-stream');

module.exports = function build() {

    var srcs = [];

    for(var vendor in this.vendorCopy) {
        var input = [].concat(this.vendorCopy[vendor]);
        srcs.push(gulp.src(input, { base: process.cwd() }));
    }

    return es.merge(srcs)
        .pipe(justfiles())
        .pipe(gulp.dest(this.buildVendor));
}