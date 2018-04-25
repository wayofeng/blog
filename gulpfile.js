var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;
var config = require('./gulp.config.json')


// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['sass'], function () {

  browserSync.init({
    server: config.server
  });

  gulp.watch(config.scssSrc + '/*scss', ['sass']); // 监听scss文件，触发sass任务
  gulp.watch(config.htmlSrc + '/*html').on('change', reload); // 监听html文件，触发刷新页面
  gulp.watch(config.jsSrc + '/*js').on('change', reload); // 监听html文件，触发刷新页面
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', function () {
  return gulp.src(config.scssSrc + '/*scss') // 待处理文件
    .pipe(autoprefixer()) // css添加前缀
    .pipe(sass({ outputStyle: 'expanded' }))  // 调用sass方法
    .pipe(gulp.dest(config.cssSrc)) // 输出文件夹，自动创建
    .pipe(reload({ stream: true })); // 网页自动刷新
});

/* 
此任务实现的功能：
1.编译scss文件；
2.html/css/js文件发生变化时页面自动刷新；
3.启动静态服务，可在移动端实时查看修改；
tips: 习惯原因，可以使用npm run dev启动，在package.json中已配置。
*/
gulp.task('default', ['serve']);  