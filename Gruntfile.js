var config = {
	testDependencies: [
		'bower_components/jquery/dist/jquery.js',
		'bower_components/pintxos-inherit/index.js',
		'bower_components/pintxos-destroyable/index.js',
		'bower_components/pintxos-component/index.js',
		'index.js',
		'test/*.js'
	]
};

module.exports = require('grunt-pintxos')(config);
