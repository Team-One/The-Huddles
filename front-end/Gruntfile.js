module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    serve: {
      options: {
        port: 9000,
        'index.html': {
          output: 'index.html'

        }
      }
    },

    compass: {
      dev: {
        options: {
          // config: 'config/config.rb'
          basePath: '_/',
          sassDir: 'sass/',
          cssDir: 'css/',
          importPath: '_/sass/lib/vendor/',
          environment: 'development',
          outputStyle: 'compact',
          specify: '_/sass/<%= pkg.name %>.scss',
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        }
      },
      prod: {
        options: {
          // config: 'config/config.rb'
          basePath: '_/',
          sassDir: 'sass/',
          cssDir: 'css/',
          importPath: '_/sass/lib/vendor/',
          environment: 'production',
          outputStyle: 'compressed',
          specify: '_/sass/<%= pkg.name %>.scss',
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        }
      }
    },

    autoprefixer: {
      options: {
        // Task-specific options go here.
      },
      no_dest: {
        // Target-specific file lists and/or options go here.
        src: '_/css/<%= pkg.name %>.css'
      },
      single_file: {
        options: {
          // Target-specific options go here.
        },
        src: '_/css/<%= pkg.name %>.css',
        dest: '_/css/<%= pkg.name %>.min.css'
      }
    },

    cmq: {
      prod: {
        // Target-specific file lists and/or options go here.
        files: {
          '_/css': ['_/css/<%= pkg.name %>.min.css']
        }
      }
    },

    htmlmin: {                                     // Task
      prod: {                                      // Target
        options: {                                 // Target options
          // https://github.com/kangax/html-minifier#options-quick-reference
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeRedundantAttributes: true,
          //removeOptionalTags: true
          //lint: true
          minifyJS: true,
          minifyCSS: true
        },
        files: {                                   // Dictionary of files
          'index.min.html': 'index.html'     // 'destination': 'source'

        }
      },
      dev: {                                       // Another target
        options: {
          conservativeCollapse: true,
          collapseBooleanAttributes: true
        },
        files: {
          'index.html': 'index.html'
        }
      }
    },

    replace: {
      example: {
        src: ['humans.txt'],             // source files array (supports minimatch)
        overwrite: true,
        replacements: [{
          from: /[0-9]{2,4}\/[0-9]{1,2}\/[0-9]{1,2}/g,                   // regex replacement
          to: '<%= grunt.template.today("yyyy/mm/dd") %>'
        }]
      }
    },

    uglify: {
      options: {
        compress: {
          drop_console: true
        }
      },
      dev: {
        files: {
          '_/js/vendor/paulirish/matchMedia.min.js': ['_/js/vendor/paulirish/matchMedia.js']
        }
      }
    },

    watch: {
      // configFiles: {
      //   files: [ 'Gruntfile.js', 'config/*.js' ], // changes will trigger task to restart
      //   options: {
      //     reload: true
      //   }
      // },
      sass: {
        files: [
          '_/sass/*.scss',
          '_/sass/lib/*.scss',
          '_/sass/lib/global/*.scss',
          '_/sass/lib/mixins/*.scss',
          '_/sass/module/*.scss',
          '_/sass/partial/*.scss'
        ],
        tasks: ['compass:dev', 'autoprefixer:no_dest'], //, 'replace'
        // options: {
        //   livereload: true, //reloads entire page
        // }
      }, css: {
        files: ['_/css/*.css']
      }, livereload: { // http://draftingcode.com/2013/06/subtle-live-reloading-with-grunt-and-compass/
        files: ['_/css/*.css'],
        options: { livereload: true }
      }, html: {
        options: {
          spawn: false,
          livereload: true, //reloads entire page
        },
        files: ['*.html'],
        tasks: ['htmlmin:dev']
      }, js: {
        files: [
          '_/js/vendor/paulirish/matchMedia.js'
          // '_/js/*.js',
          // '_/js/vendor/*.js',
          // '_/js/vendor/*/*.js'
        ],
        tasks: ['uglify:dev']
      }
    },

    modernizr: {
      dev: {
        // [REQUIRED] Path to the build you're using for development.
        "devFile" : "_/js/vendor/modernizr-latest.js",
        // [REQUIRED] Path to save out the built file.
        "outputFile" : "_/js/modernizr-custom.js",

        "extra": {
          "shiv": false,
          "load": false
        },

        "files": {
          "src": ['_/css/<%= pkg.name %>.css']
        }
      // },
      // prod: {
      //   // [REQUIRED] Path to the build you're using for development.
      //   "devFile" : "_/js/vendor/modernizr-latest.js",
      //   // [REQUIRED] Path to save out the built file.
      //   "outputFile" : "_/js/modernizr-custom.js",

      //   "extra": {
      //     "shiv": false
      //   },

      //   "excludeFiles": ["node_modules/*"]
      }
    }


  });

  // Load the plugins that provides the tasks.
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-combine-media-queries');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-serve');
  grunt.loadNpmTasks('grunt-concurrent');

  // Default task(s).
  grunt.registerTask('default', ['watch']);


  // Production
  grunt.registerTask('build', ['compass:prod', 'autoprefixer:single_file', 'cmq', 'htmlmin:prod', 'replace']);


};
