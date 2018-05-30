var gulp = require('gulp');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var jsSrc = 'src/**/*.js';
var jsDist = 'dist/';
var htmlSrc = 'src/**/*.html';
var htmlDist = 'dist/';
var cssSrc = 'src/**/*.css';
var cssDist = 'dist/';
gulp.task("default", ["clean_dist","copy_lib"], function () {
    gulp.start( 'js', 'html','css','watch','webserver');
    console.log("默认任务执行完成")

});
gulp.task('clean_lib', function () {
    console.log("开始清理文件")
    return gulp.src('./src/js/lib', {
        read: false
    }).pipe(clean({
        force: true
    }));


});
gulp.task('clean_dist', function () {
    console.log("开始清理文件")
    return
    gulp.src('./dist', {
        read: false
    }).pipe(clean({
        force: true
    }));


});
gulp.task("copy_lib", function () {
    console.log("开始拷贝js库文件")
    //不加return，则会异步执行
    return gulp.src('./bower_components/vue/dist/vue.js')
        .pipe(gulp.dest('./src/js/lib/'));
});
gulp.task('webserver', function () {
    console.log("启动本地服务")

    connect.server({
        root:__dirname+"/dist/" ,
        livereload: true,
        port: 9999
    });
});
//定义名为js的任务
gulp.task('js', function () {
    console.log("js文件处理" + jsSrc)

    gulp.src(jsSrc)
        .pipe(gulp.dest(jsDist))
        .pipe(connect.reload());


});
//定义html任务
gulp.task('html', function () {
    console.log("html文件处理")

    gulp.src(htmlSrc)
        .pipe(gulp.dest(htmlDist))
        .pipe(connect.reload());

});
//定义css任务
gulp.task('css', function () {
    console.log("css文件处理")

    gulp.src(cssSrc)
        .pipe(gulp.dest(cssDist))
        .pipe(connect.reload());

});
//定义看守任务
gulp.task('watch', function () {
    console.log("启动文件观察")

    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/**/*.css', ['css']);
    gulp.watch('src/**/*.js', ['js']);

});