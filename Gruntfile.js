/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // a simple browserify task
  grunt.registerTask('browser-js', 'Build the browserify JS bundle', function() {
    buildApp('app.browser.js', path.join(__dirname, 'public', 'bundle.js'));
  });

  // run the server
  grunt.registerTask('server', 'Run the server', function(port) {
    this.async();
    require('./app.server.js').listen(port || process.env.PORT || 3000);
  });

  // Default task.
  grunt.registerTask('default', ['browser-js', 'server']);
};

var path = require('path');
var browserify = path.join(__dirname, 'node_modules', '.bin', 'browserify');
var sh = require('shelljs');

function buildApp(entry, output) {
  var cmd = [browserify, entry, '-o', output].join(' ');
  var result = sh.exec(cmd);
}
