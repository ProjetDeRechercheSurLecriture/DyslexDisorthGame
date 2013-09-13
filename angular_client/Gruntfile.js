module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      sails: {
        files: [{
          expand: true,
          cwd: 'app/modules/sails/',
          src: ['**'],
          dest: 'build/sails/'
        },{
          expand: true,
          cwd: 'app/css/',
          src: ['**'],
          dest: 'build/sails/css/'
        },{
          expand: true,
          cwd: 'app/fonts/',
          src: ['**'],
          dest: 'build/sails/fonts/'
        },{
          expand: true,
          cwd: 'app/libs/',
          src: ['**'],
          dest: 'build/sails/libs/'
        },{
          expand: true,
          cwd: 'app/modules/phophlo/js/',
          src: ['directives/PhoPhloDirectives.js', 'services/PhoPhloServices.js'],
          dest: 'build/sails/js/phophlo/'
        }]
      }
    }
  });

  grunt.registerTask('default', ['copy']);

  grunt.loadNpmTasks('grunt-contrib-copy');

};