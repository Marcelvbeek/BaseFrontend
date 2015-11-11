module.exports = function(grunt){
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
			htmlhint: {
			    build: {
			        options: {
			            'tag-pair': true,
			            'tagname-lowercase': true,
			            'attr-lowercase': true,
			            'attr-value-double-quotes': true,
			            'doctype-first': true,
			            'spec-char-escape': true,
			            'id-unique': true,
			            'head-script-disabled': true,
			            'style-disabled': true
			        },
			        src: ['index.html']
			    }
			},
			uglify: {
			    build: {
			        files: {
			            'build/js/base.min.js': ['assets/js/base.js']
			        }
			    }
			},
			sass: {
			    build: {
			        files: {
			            'build/css/master.css': 'assets/sass/master.scss'
			        }
			    }
			},
			jade: {
        compile: {
            options: {
                client: false,
                pretty: true
            },
            files: [ {
              cwd: "assets/templates",
              src: "**/*.jade",
              dest: "build/templates",
              expand: true,
              ext: ".html"
            } ]
        }
    	},
			watch: {
					jade: {
						files: ['assets/templates/*.jade'],
						tasks: ['jade']
					},
			    html: {
			        files: ['index.html'],
			        tasks: ['htmlhint']
			    },
					js: {
			        files: ['assets/js/base.js'],
			        tasks: ['uglify']
			    },
					css: {
			        files: ['assets/sass/**/*.scss'],
			        tasks: ['buildcss']
			    }
			}
  });

  grunt.registerTask('default', []);
	grunt.registerTask('buildcss',  ['sass', 'cssc', 'cssmin']);
	grunt.loadNpmTasks('grunt-contrib-jade');

};
