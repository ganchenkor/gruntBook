module.exports = {
	build_dir: 'build', 

	app_files: {
		js: ['src/**/*.js', '!src/**/*.spec.js'],

		atpl: ['src/app/**/*.tpl.html'],

		html: ['src/index.html']
	},

	vendor_files: {
		js: [
			'vendor/angular/angular.js',
			'vendor/angular-ui-router/release/angular-ui-router.js'
		]
	}
};