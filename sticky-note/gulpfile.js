var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

// 静态服务器 + 监听 less/html 文件
gulp.task('serve', ['less'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("*.less", ['less']).on('change', reload);
    gulp.watch("*.html").on('change', reload);
    gulp.watch("*.js").on('change', reload);
});

gulp.task('less', function () {
  return gulp.src('./*.less')
    .pipe(less())
    .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
    .pipe(gulp.dest('./static'))
    .pipe(reload({stream: true}));
});
