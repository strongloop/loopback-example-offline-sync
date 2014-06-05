var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

// run the entire project
gulp.task('run', function(cb) {
  nodemon({
      script: 'web/app.js',
      ext: 'html js ejs json',
      ignore: [
        '**/node_modules/**',
        '*/build/**',
        '**/test/**',
        '**/*.bundle.*',
        '.*' // .git, .idea, etc.
      ],
      watch: __dirname,
      cwd: __dirname,
      env: {NODE_PATH: process.env.NODE_PATH},
      nodeArgs: ['--debug']
    })
    .on('change', function() {
      // TODO(ritch) restart the app...
    })
    .on('restart', function () {
      console.log('restarted!');
    });
});

// build the client project
gulp.task('build', function(cb) {
  require('./client/build').build(cb);
});

// default task (for dev)
gulp.task('default', ['build', 'run']);
