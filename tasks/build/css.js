var gulp = require('gulp')
    , less = require('gulp-less')
    , es = require('event-stream')
    , concat = require('gulp-concat');

module.exports = function () {

    var input = this.input(this.srcCss, [this.buildName + '.less']);

    var mainStream = gulp.src(input);

    return es.merge(mainStream)
        .pipe(less())
        .pipe(concat(this.buildName + '.css'))
        .pipe(gulp.dest(this.buildDir));

}
