module.exports = function(grunt) {
	require('dotenv').config();
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	const fonts = parseInt(process.env.fonts) || false;
	var fs = require('fs'),
		chalk = require('chalk'),
		PACK = grunt.file.readJSON('package.json'),
		uniqid = function (file) {
			if(fs.existsSync(file)) {
				console.log(file);
			}else{
				console.log('NOT FILE:', file);
			}
			var md5 = require('md5');
			result = md5((new Date()).getTime()).toString();
			grunt.verbose.writeln("Generate hash: " + chalk.cyan(result) + " >>> OK");
			return result;
		};
	
	String.prototype.hashCode = function() {
		var hash = 0, i, chr;
		if (this.length === 0) return hash;
		for (i = 0; i < this.length; i++) {
			chr   = this.charCodeAt(i);
			hash  = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	};
	
	var gc = {
		default: [
			"uglify",
			"less",
			"autoprefixer",
			"cssmin",
			"copy",
			"pug"
		],
	};
	fonts && (
		gc.default.push("ttf2eot"),
		gc.default.push("ttf2woff"),
		gc.default.push("ttf2woff2")
	);
	grunt.initConfig({
		globalConfig : gc,
		pkg : PACK,
		uglify: {
			options: {
				sourceMap: false,
				compress: {
					drop_console: false
	  			}
			},
			app: {
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							'src/js/editor.js'
						],
						dest: 'assets/modules/renderogimage/js',
						filter: 'isFile',
						rename: function (dst, src) {
							return dst + '/' + src.replace('.js', '.min.js');
						}
					}
				]
			}
		},
		less: {
			css: {
				options : {
					compress: false,
					ieCompat: false,
					plugins: [],
					modifyVars: {

					}
				},
				files : {
					'test/css/main.css' : [
						'src/less/main.less'
					],
				}
			},
		},
		autoprefixer:{
			options: {
				browsers: [
					"last 4 version"
				],
				cascade: true
			},
			css: {
				files: {
					'test/css/main.css' : [
						'test/css/main.css'
					],
				}
			},
		},
		cssmin: {
			options: {
				mergeIntoShorthands: false,
				roundingPrecision: -1
			},
			minify: {
				files: {
					'assets/modules/renderogimage/css/main.min.css' : ['test/css/main.css'],
				}
			},
		},
		ttf2eot: {
			default: {
				src: 'src/fonts/*.ttf',
				dest: 'assets/modules/renderogimage/fonts/'
			}
		},
		ttf2woff: {
			default: {
				src: 'src/fonts/*.ttf',
				dest: 'assets/modules/renderogimage/fonts/'
			}
		},
		ttf2woff2: {
			default: {
				src: 'src/fonts/*.ttf',
				dest: 'assets/modules/renderogimage/fonts/'
			}
		},
		copy: {
			fonts: {
				expand: true,
				cwd: 'src/fonts',
				src: [
					'**'
				],
				dest: 'assets/modules/renderogimage/fonts/',
			},
		},
		pug: {
			serv: {
				options: {
					doctype: 'html',
					client: false,
					//pretty: '\t',
					//separator:  '\n',
					pretty: '',
					separator:  '',
					data: function(dest, src) {
						return {
							"base": "[(site_url)]",
							"site_name": "[(site_name)]",
							"hash": uniqid(),
							"hash_css": uniqid(),
							"hash_js": uniqid(),
						}
					}
				},
				files: [
					{
						expand: true,
						cwd: __dirname + '/src/pug/',
						src: [ '*.pug' ],
						dest: __dirname + '/assets/modules/renderogimage/',
						ext: '.tpl'
					}
				]
			},
		}
	});
	grunt.registerTask('default',	gc.default);
};
