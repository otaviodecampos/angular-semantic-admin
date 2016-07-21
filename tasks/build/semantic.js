var gulp = require('gulp');

module.exports = function () {

    var that = this;
    
    return gulp.src(that.semantic)
        .pipe(gulp.dest(that.buildDir));

}
