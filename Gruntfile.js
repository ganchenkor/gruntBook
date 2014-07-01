module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	var userConfig = require('./build.config.js');

	var taskConfig = {
		pkg: grunt.file.readJSON('package.json'),

		clean: [
			'<%= build_dir %>'
		],
		copy: {
			appjs: {
				files: [
					{
						src:[ '<%= app_files.js %>'],
						dest: '<%= build_dir %>',
						cwd: '.',
						expand: true
					}
				]
			}
		},

		index: {
			build: {
				dir: '<%= build_dir %>',
				src: [
					'<%= vendor_files.js %>',
					'<%= build_dir %>/src/**/*.js'
				]
			}
		},

		watch: {
			jssrc: {
			files: [
			'<%= app_files.js %>'
			],
			tasks: []
			},
			html: {
				files: 
					['<%= app_files.html %>']
				,
				tasks: [ 'index:build']
			},
			gruntfile: {
				files: 'Gruntfile.js',
				tasks: [],
				options: {
					livereload: false
				}
			}

		},
		nodemon: {
			dev: {
				script: 'server/server.js',
				options: {
					watch: ['server']
				}
			}
		},
		concurrent: {
			dev: {
				tasks: ['nodemon', 'default'],
				options: {
					logConcurrentOutput: true
				}
			}
		}
	};
	grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));
	grunt.registerTask('default', ['build', 'concurrent']);
	grunt.registerTask('build', ['clean', 'copy', 'index'])

		function filterForJS(files) {
			return files.filter(function (file) {
				return file.match(/\.js$/);
			});
		}

	grunt.registerMultiTask('index', 'Process index.html template', function() {	

		var dirRE = new RegExp('^(' + grunt.config('build_dir') + ')\/', 'g');
		var jsFiles = filterForJS(this.filesSrc).map(function (file) {
			return file.replace(dirRE, '');
		});
		grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
			process: function (contents, path) {
				return grunt.template.process(contents, {
					data: {
						scripts: jsFiles
					}
				});
			}
		});
	});
};
