var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var path = require('path');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var reload = browserSync.reload;
var build = false;

// scss -> css (libsass)
gulp.task('styles', function() {
  var AUTOPREFIXER_BROWSERS = [
    'last 2 version',
    'last 1 Chrome version',
    'last 3 iOS versions',
    'last 4 Android versions',
    'ie >= 9'
  ];
  var options = {
    style: 'expanded',
    precision: 10
  };
  var processors = [
    autoprefixer({
      browsers: AUTOPREFIXER_BROWSERS
    }),
    mqpacker({
      sort: true
    })
  ];
  return gulp.src('app/styles/**/*.scss')
    .pipe($.newer('.tmp/styles'))
    .pipe($.if(!build, $.sourcemaps.init()))
    .pipe($.plumber())
    .pipe($.sass(options)).on('error', $.sass.logError)
    .pipe($.postcss(processors))
    .pipe($.if(!build, $.sourcemaps.write('./')))
    .pipe($.if(!build, gulp.dest('.tmp/styles/')))
    .pipe($.if(build, $.cssnano()))
    .pipe($.if(build, gulp.dest('dist/styles/')));
});

// ejs -> html
gulp.task('ejs', ['clean:ejs'], function() {
  var options = {
    ext: '.html'
  };
  return gulp.src([
      'app/{,**/}*.ejs',
      '!app/{,**/}_*.ejs'
    ])
    .pipe($.newer('.tmp'))
    .pipe($.plumber())
    .pipe($.ejs(null, options))
    .pipe($.if(!build, gulp.dest('.tmp/')))
    .pipe($.if(build, gulp.dest('dist/')));
});

// clean error ejs files
gulp.task('clean:ejs', del.bind(null, [
  '.tmp/{,**/}*.{ect,ejs}',
  'dist/{,**/}*.{ect,ejs}',
], {
  dot: true
}));

// watch task
gulp.task('watch', function() {
  browserSync.init({
    notify: true,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  });
  gulp.watch(['app/styles/**/*'], ['styles', reload]);
  gulp.watch(['app/**/*.ejs'], ['ejs', reload]);
  gulp.watch(['app/fonts/**/*'], reload);
  gulp.watch(['app/images/**/*'], reload);
  gulp.watch(['app/scripts/**/*'], reload);
  gulp.watch(['app/**/*.html'], reload);
});

// clean directory
gulp.task('clean', function() {
  del(['.tmp', 'dist', '!dist/.git'], {
    dot: true
  });
});

// copy
gulp.task('copy', function() {
  gulp.src([
      'app/{,**/}*',
      '!app/styles/**/*',
      '!app/{,**/}*.+(ejs|ect|scss|sass)',
      '!app/{,**/}_*',
      '!app/{,**/}.gitkeep'
    ], {
      dot: true
    })
    .pipe(gulp.dest('dist/'));
});

// dist
gulp.task('dist', function() {
  build = true;
  runSequence('clean', ['styles', 'ejs', 'copy']);
});

// default
gulp.task('default', ['styles','ejs'], function() {
  gulp.start('watch');
});
