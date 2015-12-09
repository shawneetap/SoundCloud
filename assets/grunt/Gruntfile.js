module.exports = function(grunt) {
	grunt.initConfig({
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
			  dest: '../js/build/scripts.js',
			}
		},

		watch: {
		  js: {
		    files: ['../js/*.js'],
		    tasks: ['concat'],
		  },
		  css: {
		    files: ['../css/*/*.sass'],
		    tasks: ['sass'],
		  },
		},
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
};