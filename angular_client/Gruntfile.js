module.exports = function(grunt) {
  // Project configuration.

  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      sails: {
        options: {
          findNestedDependencies: true,
          mainConfigFile: 'app/modules/sails/sails.js',
          baseUrl: './',
          name: 'app/modules/sails/sails',
          out: 'build/sails_build_dev/sails.js',
          optimize: 'none'
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        mangle: false
      },
      sails: {
        files: {
          'release/sails_release/sails.js': ['build/sails_build_dev/sails.js']
        }
      }
    },
    copy: {
      sails: {
        files: [{
          expand: true,
          cwd: 'app/fonts/',
          src: ['**'],
          dest: 'release/sails_release/fonts/'
        }, {
          expand: true,
          cwd: 'app/modules/sails/audio_stimuli/',
          src: ['**'],
          dest: 'release/sails_release/audio_stimuli/'
        }, {
          expand: true,
          cwd: 'app/modules/sails/image_reinforcement/',
          src: ['**'],
          dest: 'release/sails_release/image_reinforcement/'
        }, {
          expand: true,
          cwd: 'app/modules/sails/img/',
          src: ['**'],
          dest: 'release/sails_release/img/'
        }, {
          expand: true,
          cwd: 'app/libs/font-awesome/',
          src: ['**'],
          dest: 'release/sails_release/libs/font-awesome/'
        }, {
          src: ['app/libs/require.js'],
          dest: 'release/sails_release/require.js'
        }, {
          src: ['app/modules/sails/manifest-build.json'],
          dest: 'release/sails_release/manifest.json'
        }]
      },
      sails_build_only: {
        files: [{
          src: ['sails_build_dev/sails.js'],
          dest: 'release/sails_release/sails.js'
        }]
      }
    },
    cssmin: {
      sails: {
        options: {
          report: 'min'
        },
        files: {
          'release/sails_release/css/app.css': [
            'app/modules/sails/css/SAILS.css', 'app/css/app.css'
          ]
        }
      }
    },
    htmlmin: {
      sails: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'app/modules/sails/',
          src: ['*.html', 'partials/**/*.html'],
          dest: 'release/sails_release/'
        }]
      }
    },
    jshint: {
      files: ['Gruntfile.js'],
      sails: {
        src: ['app/modules/sails/js/**/*.js', 'app/modules/sails/test/**/*.js'],
        options: {
          // options here to override JSHint defaults
          globals: {
            jQuery: true,
            console: true,
            module: true,
            document: true
          },
          // Ignore functions inside of loops (to allow for closures)
          loopfunc: true
        }
      }
    },
    jasmine: {
      sails: {
        src: [
          'app/modules/sails/js/**/*.js'
        ],
        options: {
          specs: 'app/modules/sails/sails_test/*.test.js',
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfigFile: 'app/modules/sails/sails.js'
          },
          junit: {
            path: 'test/sails_test/output/testresults'
          }
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default', 'Log some stuff.', function() {
    grunt.log.write('You must specify a module: phophlo, sails, tcpp, tdfm, tdfp; for a quick build with no minification or testing, prefix the module name with build-').ok();
  });


  grunt.registerTask('sails', ['jshint:sails', 'jasmine:sails', 'requirejs:sails', 'uglify:sails', 'copy:sails', 'htmlmin:sails', 'cssmin:sails']);
  grunt.registerTask('build-sails', ['requirejs:sails', 'copy:sails', 'copy:sails_build_only', 'htmlmin:sails', 'cssmin:sails']);

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