/*global $: true*/

var gulp         = require('gulp');
var $            = require('gulp-load-plugins')();
var del          = require('del');
var path         = require('path');
var fs           = require('fs');
var autoprefixer = require('autoprefixer');
var browserSync  = require('browser-sync');
var mqpacker     = require('css-mqpacker');
var merge        = require('merge-stream');
var runSequence  = require('run-sequence');
var babelify     = require('babelify');
var browserify   = require('browserify');
var watchify     = require('watchify');
var source       = require('vinyl-source-stream');
var buffer       = require('vinyl-buffer');
var yaml         = require('js-yaml');

var reload = browserSync.reload;

// build mode flag
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
    autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }),
    mqpacker({ sort: true })
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
  var config = yaml.safeLoad(fs.readFileSync('./ejs-config.yml', 'utf8'));
  var options = {
    ejs: {
      ext: '.html'
    },
    beautifier: {
      indentSize: 2
    }
  };
  return gulp.src([
      'app/**/*.+(ejs|html)',
      '!app/**/_*.+(ejs|html)'
    ])
    .pipe($.newer('.tmp'))
    .pipe($.plumber())
    .pipe($.ejs(config, options.ejs))
    .pipe($.jsbeautifier(options.beautifier))
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


/**
 * scripts （Browserify）
 * reference
 * http://qiita.com/DJ_Middle/items/3e533922078914285268
 */

gulp.task('scripts', function() {
  var src = ['main.js'];
  src.forEach((entryPoint) => {
    var browserifyOptions = {
      entries: ['app/scripts/' + entryPoint],
      debug: true,
      cache: {},
      packageCache: {},
      transform: babelify.configure({ presets: ["es2015", "react", "stage-2"] }),
    };
    var watchifyStream = (build) ?
      browserify(browserifyOptions) :
      watchify(browserify(browserifyOptions));
    var execBundle = () => {
      $.util.log(`building ${entryPoint}...`);
      return watchifyStream
        .bundle()
        .on('error', $.util.log.bind($.util, 'Browserify Error'))
        .pipe($.plumber())
        .pipe(source(entryPoint))
        .pipe(buffer())
        .pipe($.if(build, $.uglify({ preserveComments: 'some' })))
        .pipe($.if(build, gulp.dest('dist/scripts/')))
        .pipe($.if(!build, gulp.dest('.tmp/scripts/')))
        .pipe($.if(!build, browserSync.stream({ once: true })));

    };
    watchifyStream.on('update', execBundle);
    watchifyStream.on('log', $.util.log);

    return execBundle();
  });
});

// imagemin
gulp.task('images', function() {
  var option = {
    progressive: true,
    interlaced: true
  };
  return gulp.src('app/images/**/*')
    .pipe($.if(build, $.cache($.imagemin(option))))
    .pipe($.if(build, gulp.dest('dist/images')));
});

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
  gulp.watch(['app/**/*.ejs', 'app/**/*.html', 'ejs-config.yml'], ['ejs', reload]);
  gulp.watch(['app/images/**/*'], reload);
  gulp.watch(['vendor.yml'], ['vendor', reload]);
});

// clean directory
gulp.task('clean', function() {
  del(['.tmp', 'dist', '!dist/.git'], {
    dot: true
  });
});

// copy vendor files
gulp.task('vendor', function() {
  var vendor = yaml.safeLoad(fs.readFileSync('./vendor.yml', 'utf8'));
  var target = (build) ? 'dist' : '.tmp';
  var stream = {
    scripts: gulp.src(vendor.scripts, { dot: true })
      .pipe($.concat('lib.min.js'))
      .pipe($.uglify({ preserveComments: 'some' }))
      .pipe(gulp.dest(path.join(target, 'scripts/vendor'))),
    styles: gulp.src(vendor.styles, { dot: true })
      .pipe(gulp.dest(path.join(target, 'styles/vendor'))),
    fonts: gulp.src(vendor.fonts, { dot: true })
      .pipe(gulp.dest(path.join(target, 'fonts')))
  };

  return merge(stream.scripts, stream.styles, stream.fonts);
});


// copy
gulp.task('copy', function() {
  // return gulp.src([
  //     '!app/**/.gitkeep'
  //   ], {
  //     dot: true
  //   })
  //   .pipe($.if(build, gulp.dest('dist/')));
  return;
});


// buid site
gulp.task('dist', function() {
  build = true;
  gulp.start('default');
});


//noop
gulp.task('noop', function() {});


// default
gulp.task('default', function() {
  runSequence(
    'clean',
    'copy', ['ejs', 'images', 'scripts', 'styles', 'vendor'],
    build ? 'noop' : 'watch'
  );
});

gulp.task('deploy',function () {
  var options = {
    remoteUrl:'git@github.com:braveworks/portfolio.git'
  };
  return gulp.src('./dist/**/**')
    .pipe($.ghPages(options));
});
