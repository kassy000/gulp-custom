var common = {
	root: '/Volumes/Data/Works/',
	nodeModules: 'node_modules',
	sourceDir: 'src/',
	publishDir: 'publish/'
};


var init = function () {
	module.exports.common = common;

	module.exports.default = {
		tasks: [
			//'uglify',
			//'sass',
			//'js',
			//'jade',
			'watch',
			'browser-sync'
		]
	};

    module.exports.site = {
        local: {
			url:'localhost:3000',
    		path:'/'
        },
		test: {
            url:'http://url.com/test',
			path:'/test'
		},
		production:{
            url:'http://url.com',
            path:'/'
		}
    }

	module.exports.browserSync = {
		browserSync:'true',
		open: 'null',
        host: 'null',
		proxy: null, //"http://server.dev:8888/",
		baseDir: null, // ./public_html/
		port:null,
		logLevel: "debug",
		https: false,
	}



	module.exports.watch = {
		target: ['./folder'],
		//method : ['changed','browserReload']
		//method : ['fileChanged','browserReload']
		method: ['fileChanged']
	}

	module.exports.files = {
		copy: {
			exclude: [
				'.DS_Store'
			]
		},
		delele: {
			exclude: [
				"!./dist/**",
				"!./node_modules/**/*.*",
				".git",
				"travis.yml"
			]
		}
	}

	module.exports.backup = [
		{
			src: 'src/target/',
			dist: 'src/backups/'
		}
	]

	module.exports.backupGulpfile = {
		dist: 'src/backups/gulpfile/'
	}

	module.exports.distribution = {
		src: 'src/',
		dist: 'src/dist/',
		exclude: [".DS_Store"]

	}

	module.exports.css = {
		outputStyle: 'expanded',
		minify:false,
		addMin:false,
		sourcemaps: true,
		sourcemapsPath: 'maps/',
		sourceRoot: 'src/scss',
		plefix: {
            browsers: ['last 2 version', 'iOS >= 8.1', 'Android >= 4.4'],
            cascade: false
        },
		sass: [
			/*
//			{
//				src : './src/sass/**/
			/*.sass',
			//				dist : 'css'
			//			},
						{
			//				src : './src/scss/**/
			/*.scss',
			//				dist : 'css'
			//			}
			//			*/
		],

		compass: {
			config_file: 'config.rb',
			comments: false,
			path: [
				{
					src: './src/scss/**/*.scss',
					dist: 'css'
				},
			]
		},

		stylus: [
			/*
//			{
//				src : './src/stylus/**/
			/*.styl',
			//				dist : 'css'
			//			},
						{
			//				src : './src/stylus/**/
			/*.stylus',
			//				dist : 'css'
			//			}
			//			*/
		]
	}


	module.exports.js = {
		addMin : false,
		minify : false,
        babel : false,
		//babelConfig : ["react", ["es2015", { "modules": false }]],
        //babelConfig : ['es2015','stage-0'],
		babelConfig : ["@babel/preset-env"],
		babelPlugins : ["@babel/plugin-proposal-class-properties"],
	 	target : {
			//{
			//	src : './src/js/**/*.js',
			//	dest : './js/'
			//}
		}
	}

	module.exports.ts = {
		addMin : false,
		minify : false,
		options : {
			target: 'ES6',
			module: 'commonjs'
		},
	 	target : {
			//{
			//	src : './src/js/**/*.js',
			//	dest : './js/'
			//}
		}
	}

	module.exports.html = {
		jade : {
			//[
			//	src : './src/jade/**/*.jade',
			//	dist : './',
			//ext :'php'
			//]
		},
		pug : {
			//[
			//	src : './src/js/**/*.js',
			//	dist : './js/',
				//ext :'php'
			//]
		}
	}

	module.exports.server = {
		//ftp : {
			/*
			server: {
				// FTP情報を入力
				host: "---.com",
				user: "---",
				pass: "---",
				remotePath: "/" // リモート側のパス　（デフォルトは "/"）
			},
			files: [

			]
			*/
		//}
	}


	//wordpress
	module.exports.wp = {}

	module.exports.wp.path = 'www/wordpress/'
	module.exports.wp.theme = {
		backup: 'src/backups/themes/',
		dist: 'src/dist/github/'
	};
	module.exports.wp.theme.name = [];

	//Utility
	module.exports.utility = {}


	//Header
	module.exports.header = {
		php : [
		  '/*',
		  ' Library Name',
		  ' Library Description',
		  '',
		  ' Version: 1.0.0',
		  '  Author: xxx',
		  ' License: MIT',
		  ' Website: http://example.github.io/example',
		  '  Issues: http://example.github.io/example/issues',
		  '*/',
		  ''
		],
		js : [
		  '/*',
		  ' Library Name',
		  ' Library Description',
		  '',
		  ' Version: 1.0.0',
		  '  Author: xxx',
		  ' License: MIT',
		  ' Website: http://example.github.io/example',
		  '  Issues: http://example.github.io/example/issues',
		  '*/',
		],
		css : [
		  '/*',
		  ' Library Name',
		  ' Library Description',
		  '',
		  ' Version: 1.0.0',
		  '  Author: xxx',
		  ' License: MIT',
		  ' Website: http://example.github.io/example',
		  '  Issues: http://example.github.io/example/issues',
		  '*/',
		],
	}

}

module.exports = {
	init: init
}
