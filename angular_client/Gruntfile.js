module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      sails: {
        // Uglify all relevant files
        src: 'app/modules/sails/js/controllers/SAILSController.js',
        dest: 'build-min/sails/sails.min.js'
      }
    },
    copy: {
      sails: {
        files: [{
          expand: true,
          cwd: 'app/modules/sails/',
          src: ['**'],
          dest: 'build/sails/'
        }, {
          expand: true,
          cwd: 'app/css/',
          src: ['**'],
          dest: 'build/sails/css/'
        }, {
          expand: true,
          cwd: 'app/fonts/',
          src: ['**'],
          dest: 'build/sails/fonts/'
        }, {
          expand: true,
          cwd: 'app/libs/',
          src: ['**'],
          dest: 'build/sails/libs/'
        }, {
          expand: true,
          cwd: 'app/modules/phophlo/js/',
          src: ['directives/PhoPhloDirectives.js', 'services/PhoPhloServices.js'],
          dest: 'build/sails/js/phophlo/'
        }]
      }
    }
  });

  grunt.registerTask('default', 'Log some stuff.', function() {
    grunt.log.write('You must specify a module: phophlo, sails, tcpp, tdfm, tdfp; for a quick build with no minification or testing, prefix the module name with build-').ok();
  });


  grunt.registerTask('sails', ['copy:sails', 'uglify:sails']);
  grunt.registerTask('build-sails', ['copy:sails']);

  // Replace the following tasks when modules are ready

  grunt.registerTask('phophlo', 'Log some stuff.', function() {
    grunt.log.write('phophlo module not yet ready.').ok();
  });

  grunt.registerTask('build-phophlo', 'Log some stuff.', function() {
    grunt.log.write('phophlo module not yet ready.').ok();
  });

  grunt.registerTask('tcpp', 'Log some stuff.', function() {
    grunt.log.write('tcpp module not yet ready.').ok();
  });

  grunt.registerTask('build-tcpp', 'Log some stuff.', function() {
    grunt.log.write('tcpp module not yet ready.').ok();
  });

  grunt.registerTask('tdfm', 'Log some stuff.', function() {
    grunt.log.write('tdfm module not yet ready.').ok();
  });

  grunt.registerTask('build-tdfm', 'Log some stuff.', function() {
    grunt.log.write('tdfm module not yet ready.').ok();
  });

  grunt.registerTask('tdfp', 'Log some stuff.', function() {
    grunt.log.write('tdfp module not yet ready.').ok();
  });

  grunt.registerTask('build-tdfp', 'Log some stuff.', function() {
    grunt.log.write('tdfp module not yet ready.').ok();
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
};