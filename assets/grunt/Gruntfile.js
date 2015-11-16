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
			  dest: 'build/scripts.js',
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
};