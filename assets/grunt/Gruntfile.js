module.exports = function(grunt) {
	grunt.initConfig({
		watch: {
		  js: {
		    files: ['../js/*.js'],
		    tasks: ['concat'],
		  },
		  css: {
		  	files: ['../css/**/*.sass'],
		    tasks: ['sass'],
		  },
		},

		sass: {
			dist: {
				files: {
					'../css/main.css' : '../css/main.sass'
				}
			}
		},

		concat: {
			dist: {
			  src: ['../js/main.js'],
			  dest: 'build/scripts.js',
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.registerTask('default', ['concat', 'sass', 'watch']);
};