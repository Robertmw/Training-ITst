module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
 
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
		eslint: {
			target: ['public/src/**/*.js'] 
		},
		ngAnnotate: {
			options: {
				remove: true,
				add: true,
				singleQuotes: true
			},
			app: {
				files: [
					{
						expand: true,
						src: ['public/src/**/*.js']
					}
				]
			}
		},
		uglify: {
			build: {
				files: {
					'public/dist/js/app.min.js': ['public/src/**/*.js', 'public/src/*.js']
				}
			}
		},
		less: {
			build: {
				files: {
					'public/dist/style/style.css': 'public/src/style/style.less'
				}
			}
		},
		cssmin: {
			build: {
				files: {
					'public/dist/style/style.min.css': 'public/dist/style/style.css'
				}
			}
		},
		watch: {
			css: {
				files: ['public/src/**/*.less'],
				tasks: ['less', 'cssmin']
			},
			js: {
				files: ['public/src/**/*.js'],
				tasks: ['eslint', 'ngAnnotate', 'uglify']
			}
		},
		nodemon: {
			dev: {
				script: 'index.js'
			}
		},
		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			tasks: ['nodemon', 'watch']
		} 

	});

	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-ng-annotate');
	grunt.loadNpmTasks('grunt-nodemon');

	grunt.registerTask('default', ['less', 'cssmin', 'ngAnnotate', 'uglify', 'concurrent']); 
	grunt.registerTask('deploy', ['less', 'cssmin', 'eslint', 'ngAnnotate', 'uglify']);
	grunt.registerTask('testing', ['karma']);

}