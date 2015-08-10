var gulp        = require('gulp');
    stylus      = require('gulp-stylus');
    typographic = require('typographic');
    prefix      = require('gulp-autoprefixer');
    jade        = require('gulp-jade');
    imagemin    = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
	reload      = browserSync.reload,

// sources =
//   sass: 'assets/sass/**/*.sass'
//   jade: 'assets/*.jade'
//   js: 'assets/js/**/*.js'
//   img: 'assets/img/*'
//
// destinations =
//   css: 'build/css'
//   jade: 'build/'
//   js: 'build/js'
//   img: 'build/img'
//
// paths =
// 	bower: './bower_components'
// 	assets: './assets'


// Stylus > CSS
// With Typographic
gulp.task('styles', function(){
	gulp.src('assets/css/main.styl')
		.pipe(stylus({
            "incluse css": true,
			use: [typographic()]
		}))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulp.dest('assets/css/'))
        .pipe(reload({stream:true}));
});


// Jade -> HTML
// Compiles, uglifies, reloads
gulp.task('templates', function() {
	gulp.src('assets/templates/*.jade')
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('./'))
		.pipe(reload({stream:true}));
		});


// Image task
// Compress
gulp.task('image', function () {
	gulp.src('assets/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('assets/img/compressed'));
});



gulp.task('watch', function(){
	gulp.watch('**/*.styl', ['styles']);
    gulp.watch('**/*.jade', ['templates']);

});

// Static server
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('default', [
    'watch',
    'browser-sync'
    ]);
