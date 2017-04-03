
var gulp 			= require('gulp');
var less 			= require('gulp-less');
var cleanCSS 		= require('gulp-clean-css');
var nodemon 		= require('gulp-nodemon');
var rename			= require('gulp-rename');
var browserSync 	= require('browser-sync').create();
var reload 			= browserSync.reload;

// run development 
gulp.task('dev', ['browser-sync'], function () {
	gulp.watch(['*.html', 'public/css/pre-less/*.css']).on('change', reload);
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init({
		proxy: "http://localhost:8080",  // local node app address
		port: 3000, // port app is being hosted
		notify: true
	});
});

gulp.task('nodemon', function (cb) {
	var called = false;
	return nodemon({
		script: 'server.js',
		ext: 'js html less',
		tasks: ['less'], 
		ignore: [
		'gulpfile.js',
		'node_modules/'
		]
	}).on('start', function () {
		if (!called) {
			called = true;
			cb();
		}
	}).on('restart', function () {
		setTimeout(function () {
			reload({ stream: false });
		}, 1000);
	});
});

// runs LESS compiler then minifies file
gulp.task('less', function () {
	gulp.src('public/css/pre-less/*')
		.pipe(less())
		.pipe(gulp.dest('public/css/less'))
		.pipe(cleanCSS())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('public/css/less'));
})


