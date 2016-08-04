var gulp = require('gulp')
    , ngjson = require('gulp-ng-json')
    , concat = require('gulp-concat')
    , templateCache = require('gulp-angular-templatecache')
    , es = require('event-stream')
    , order = require("gulp-order")
    , del = require('del');

module.exports = function () {

    var _this = this;

    var input = this.input(this.srcDir, ['**/*.json', '**/*.*.js'])
        , inputTpl = this.input(this.srcDir, ['**/*.tpl.html']);

    var options = {
        module: this.buildName,
        transformUrl: function (url) {
            return _this.buildName + '/' + url.match(/[\w-.]+.tpl.html$/g)[0];
        }
    }

    var tplStream = gulp.src(inputTpl)
        .pipe(templateCache(options));

    var jsStream = gulp.src(input)
        .pipe(ngjson.module())
        .pipe(ngjson.constant())
        .pipe(ngjson.state());

    return es.merge(jsStream, tplStream)
        .pipe(order([
            "**/*.module.json",
            "**/*.module.js",
            "**/*.constant.json",
            "**/*.provider.js",
            "**/*.config.js",
            "**/*.state.json",
            "**/*.state.js",
            "**/*.*.js",
            "**/*.tpl.html"
        ]))
        .pipe(concat(this.buildName + '.js'))
        .pipe(gulp.dest(this.buildApp));

}
