var gulp = require('gulp')
    , ngjson = require('gulp-ng-json')
    , concat = require('gulp-concat')
    , templateCache = require('gulp-angular-templatecache')
    , es = require('event-stream')
    , order = require("gulp-order")
    , del = require('del');

module.exports = function () {

    var _this = this;

    del.sync([this.target.app]);

    var input = this.input(this.source.app, ['**/*.json', '**/*.js'])
        , inputTpl = this.input(this.source.app, ['**/*.tpl.html'])
        , inputVendor = require('./vendor_js.json');

    var options = {
        module: _this.moduleName,
        transformUrl: function(url) {
            return _this.moduleName + '/' + url.match(/[\w-]+.tpl.html$/g)[0];
        }
    }

    var tplStream = gulp.src(inputTpl)
        .pipe(templateCache(options));

    var jsStream = gulp.src(input)
        .pipe(ngjson.module())
        .pipe(ngjson.constant());

    var vendorStream = gulp.src(inputVendor);

    return es.merge(jsStream, tplStream, vendorStream)
        .pipe(order([
            "**/jquery.js",
            "**/angular.js",
            "**/semantic.js",
            "**/*.module.json",
            "**/*.module.js",
            "**/*.constant.json",
            "**/*.provider.js",
            "**/*.config.js",
            "**/*.js",
            "**/*.tpl.html"
        ]))
        .pipe(concat(_this.packageName + '.js'))
        .pipe(gulp.dest(this.target.app));

}