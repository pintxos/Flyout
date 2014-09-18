module.exports = function (grunt) {

	'use strict';

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		karma: {
			options: {
				basePath: '',
				files: [
					'bower_components/jquery/dist/jquery.js',
					'bower_components/pintxos-inherit/index.js',
					'bower_components/pintxos-destroyable/index.js',
					'bower_components/pintxos-component/index.js',
					'index.js',
					'test/*.js'
				],
				frameworks: [
					'jasmine'
				]
			},
			dev: {
				browsers: ['Chrome']
			},
			ci: {
				browsers: ['PhantomJS'],
				singleRun: true
			}
		},

		jshint: {
			files: ['*.js'],
			options: {
				strict: true,
				es3: true,
				globals: {
					window: true,
					document: true,
					define: true
				}
			}
		}
	});

	grunt.registerTask('default', []);
	grunt.registerTask('test', ['jshint', 'karma:dev']);
	grunt.registerTask('testCI', ['jshint', 'karma:ci']);

};
