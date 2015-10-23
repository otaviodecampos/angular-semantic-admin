var gulp = require('gulp')
    , less = require('gulp-less')
    , es = require('event-stream')
    , concat = require('gulp-concat');

module.exports = function () {

    var _this = this;

    var input = this.input(this.paths.source.style, [this.packageName + '.less'])
        , inputVendor = require('./vendor_css.json');

    var mainStream = gulp.src(input)
        , vendorStream = gulp.src(inputVendor);

    return es.merge(mainStream, vendorStream)
        .pipe(less())
        .pipe(concat(_this.packageName + '.css'))
        .pipe(gulp.dest(this.paths.target.style));

}
