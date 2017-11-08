module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ''
      },
      dist_screen: {
        src: [
          'js/libs/**/*.js',
          'js/shared.js',
          'js/screen/app/app.js',
          'js/shared/**/*.js',
          'js/screen/app/**/*.js',
          '!js/controller'
        ],
        dest: 'build/js/screen_<%= pkg.version %>.js'
      },
      dist_ctrl: {
        src: [
          'js/libs/**/*.js',
          'js/shared.js',
          'js/controller/app/app.js',
          'js/shared/**/*.js',
          'js/controller/app/**/*.js',
          '!js/screen'
        ],
        dest: 'build/js/controller_<%= pkg.version %>.js'
      },
      css_ctrl: {
        src: [
          'styles/shared.css',
          'styles/controller.css'
        ],
        dest: 'build/styles/controller.min.css'
      },
      css_screen: {
        src: [
          'styles/shared.css',
          'styles/screen.css'
        ],
        dest: 'build/styles/screen.min.css'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.header %> \n VERSION <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: [
          {
            src: 'build/js/screen_<%= pkg.version %>.js',
            dest: 'build/js/screen_<%= pkg.version %>.min.js'
          },
          {
            src: 'build/js/controller_<%= pkg.version %>.js',
            dest: 'build/js/controller_<%= pkg.version %>.min.js'
          }
        ]
        // src: 'js/build/screen_<%= pkg.version %>.js',
        // dest: 'js/build/screen_<%= pkg.version %>.min.js'
      }
    },
    watch: {
      scripts: {
        files: ['js/**/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        }
      }
    }
  });

grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.registerTask('default', ['concat', 'uglify', 'watch']);
};
