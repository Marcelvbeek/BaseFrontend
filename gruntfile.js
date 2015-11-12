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
			            'build/js/base.min.js': ['src/js/base.js']
			        }
			    }
			},
			sass: {
			    build: {
			        files: {
			            'build/css/master.css': 'src/sass/master.scss'
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
              cwd: "src",
              src: ['**/*.jade','!bootstrap-jade/**'],
              dest: "build",
              expand: true,
              ext: ".html"
            } ]
        }
    	},
			browserSync: {
			    bsFiles: {
			        src : '**/*.html'
			    },
			    options: {
							watchTask: true,
			        server: {
			            baseDir: "build"
			        }
			    }
			},
			watch: {
					jade: {
						files: ['src/**/*.jade'],
						tasks: ['jade']
					},
					js: {
			        files: ['src/js/base.js'],
			        tasks: ['uglify']
			    },
					css: {
			        files: ['src/sass/**/*.scss'],
			        tasks: ['buildcss']
			    }
			}
  });

  grunt.registerTask('default', ['browserSync', 'watch']);
	grunt.registerTask('buildcss',  ['sass']);
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-browser-sync');

};
