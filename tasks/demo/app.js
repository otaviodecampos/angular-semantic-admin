var gulp = require('gulp')
    , ngjson = require('gulp-ng-json')
    , concat = require('gulp-concat')
    , templateCache = require('gulp-angular-templatecache')
    , es = require('event-stream')
    , order = require("gulp-order")
    , del = require('del');

module.exports = function () {

    var _this = this;

    del.sync([this.demo.app]);

    var input = this.input(this.source.demo, ['**/*.json', '**/*.*.js'])
        , inputTpl = this.input(this.source.demo, ['**/*.tpl.html']);

    var options = {
        module: 'demo',
        transformUrl: function(url) {
            return 'demo/' + url.match(/[\w-]+.tpl.html$/g)[0];
        }
    }

    var tplStream = gulp.src(inputTpl)
        .pipe(templateCache(options));

    var jsStream = gulp.src(input)
        .pipe(ngjson.module())
        .pipe(ngjson.constant());

    return es.merge(jsStream, tplStream)
        .pipe(order([
            "**/*.module.json",
            "**/*.module.js",
            "**/*.constant.json",
            "**/*.provider.js",
            "**/*.config.js",
            "**/*.*.js",
            "**/*.tpl.html"
        ]))
        .pipe(concat('demo.js'))
        .pipe(gulp.dest(this.demo.app));

}
