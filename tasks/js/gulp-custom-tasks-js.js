"use strict";
var gulp,custom,config,plugins;
gulp = global.gulp;
custom = global.custom;
plugins = global.plugins;
config = custom.config;


var configJs,configTs;

var gulpif = require('gulp-if');
var typescript = require('gulp-typescript');
var browserify = require('browserify');
var tsify = require('tsify');
//var source = require('vinyl-source-stream');
var through2 = require('through2');
var include = require('gulp-include');

var notifier = require('node-notifier');
var babelify = require('babelify');

var black   = '\u001b[30m';
var red     = '\u001b[31m';
var green   = '\u001b[32m';
var yellow  = '\u001b[33m';
var blue    = '\u001b[34m';
var magenta = '\u001b[35m';
var cyan    = '\u001b[36m';
var white   = '\u001b[37m';

var reset   = '\u001b[0m';



//--------------------------------------------------------------
//Init
//--------------------------------------------------------------
var init = function(){
	plugins = global.plugins;
	//JS
	configJs = custom.config.js;
	if(configJs.target.length > 0){
		config.default.tasks.push('js');
	}


	//console.log('TypeScript初期化');
	configTs = custom.config.ts;
	if(configTs.target.length > 0){
		config.default.tasks.push('ts');
	}
}

var compile = function(ext){

	if(ext == 'ts'){
		compileTs();
	}else if(ext == 'js'){
		compileJs();
	}
}





//--------------------------------------------------------------
//JSのコンパイル
//--------------------------------------------------------------
var compileJs = function(){
	if(configJs && configJs.target.length > 0){
		console.log('compileJs');
		for(var i=0; i < configJs.target.length; i++){
			var src = configJs.target[i].src;
			var dist = configJs.target[i].dist;

			console.log(src);
			console.log(dist);

			gulp.src(src)
				.pipe(plugins.plumber({errorHandler: plugins.notify.onError('<%= error.message %>')}))
				.pipe(include({
					extensions: "js"
				}))
				.pipe(plugins.beautify({indentSize: 1}))
				.pipe(gulpif(configJs.addMin, plugins.rename({extname: '.min.js'})))
				.pipe(gulpif(configJs.minifiy, plugins.uglify()))
			 	.pipe(through2.obj(function(file, encode, callback){
					// fileにはsrcで読み込んだファイルの情報が引き渡される
					// file.pathを利用してbrowserifyインスタンスを生成する
					if(configJs.babel){
                        browserify(file.path, {})
                            .transform(babelify, {presets: configJs.babelConfig}) //babelのコンパイル
                            .bundle(function(err, res){
                                // bundleを実行し，処理結果でcontentsを上書きする
                                if(res && res != undefined){
                                    file.contents = res;
                                    // callbackを実行し，次の処理にfileを引き渡す
                                    // nullになっている部分はエラー情報
                                    callback(null, file)
                                }
                            }).on('error', function (error) {
                            console.log(red + error.message + reset);
                            notifier.notify({
                                title: 'JavaScript Compile Error',
                                message: error.message
                            });
                        })
					}else{
                        browserify(file.path, {})
                            .bundle(function(err, res){
                                // bundleを実行し，処理結果でcontentsを上書きする
                                if(res && res != undefined){
                                    file.contents = res;
                                    // callbackを実行し，次の処理にfileを引き渡す
                                    // nullになっている部分はエラー情報
                                    callback(null, file)
                                }
                            }).on('error', function (error) {
                            console.log(red + error.message + reset);
                            notifier.notify({
                                title: 'JavaScript Compile Error',
                                message: error.message
                            });
                        })
					}

				}))
				.pipe(gulp.dest(dist));

		}
	}
}

gulp.task('js', gulp.series(function(){
	compileJs();
}));


//--------------------------------------------------------------
//Babelのコンパイル
//--------------------------------------------------------------


//--------------------------------------------------------------
//Type Scriptのコンパイル
//--------------------------------------------------------------


var compileTs = function(){

	//出力オプション
	var options =  {
		//out: 'main.js'
	};
	var target = configTs.target;
	var options = configTs.options;
	if(target.length > 0){
		for(var i=0; i < target.length; i++){
			var src = target[i].src;
			var dist = target[i].dist;
			//console.log('ソース:' + src);
			//console.log('Dist:' + dist);

			/*
			browserify({entries: [src]})
				.bundle()
				.pipe(plugins.plumber({errorHandler: plugins.notify.onError('<%= error.message %>')}))
				.pipe(plugins.beautify({indentSize: 1}))
				.pipe(plugins.typescript(options))
    			.pipe(plugins.babel())
				.pipe(gulpif(configTs.addMin, plugins.rename({extname: '.min.js'})))
				.pipe(gulpif(configTs.minifiy, plugins.uglify()))
				.pipe(gulp.dest(dist));
			*/


			gulp.src(src)
				.pipe(plugins.plumber({errorHandler: plugins.notify.onError('<%= error.message %>')}))
				.pipe(plugins.fileInclude({
					prefix: '@@',
					basepath: '@file'
				}))
				.pipe(plugins.beautify({indentSize: 1}))
				.pipe(plugins.typescript(options))
    			.pipe(plugins.babel())
				.pipe(gulpif(configTs.addMin, plugins.rename({extname: '.min.js'})))
				.pipe(gulpif(configTs.minifiy, plugins.uglify()))
				.pipe(gulp.dest(dist));
			console.log('compileTypeScript')
			console.log(src)
			console.log(dist)

			/*
			browserify()
				.add(src)
				.plugin(tsify, { noImplicitAny: true })
				.bundle()
        		.pipe(source('app.js'))
        		.pipe(gulp.dest(dist));

        	*/
		}
	}
}

gulp.task('ts', gulp.series(function(){
	compileTs();
}));




module.compileJs = compileJs;
module.compileTs = compileTs;
module.compile = compile;

custom.js = module;
init();

