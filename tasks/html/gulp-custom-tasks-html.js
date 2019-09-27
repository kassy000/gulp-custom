"use strict";
var gulp,custom,config,plugins,vars;
gulp = global.gulp;
custom = global.custom;
config = custom.config;
plugins = global.plugins;
vars = custom.vars;
var root = global.root;

var localConf;


//--------------------------------------------------------------
//Init
//--------------------------------------------------------------

var init = function(){
	localConf = config.html
	console.log('ローカル:' + localConf)
	if(config.html.jade.length){
		config.default.tasks.push('jade');
	}

	if(config.html.pug.length){
		config.default.tasks.push('pug');
	}
}

var compile = function(extension,php){
	if(extension == 'jade'){
		fullCompileJade();
		/*
		if(php){
			fullCompileJadePHP();
		}else{
			fullCompileJade();
		}
		*/

	}else if(extension == 'pug'){
		fullCompilePug();
		/*
		if(php){
			fullCompilePugPHP();
		}else{
			fullCompilePug();
		}
		*/
	}
}

module.compile = compile;

//Jade
//--------------------------------------------------------------
var fullCompileJade = function(){
	if('jade' in localConf){
		var conf = config.html.jade

		if(conf.length > 0){
			for(var i=0; i < conf.length; i++){
				var src = root  + conf[i].src;
				var dist = root  + conf[i].dist;
				var ext = conf[i].ext;
				compileJade(src,dist,ext);
			}
		}
	}
}


var compileJade = function(src,dist,ext){
	var jade = require('gulp-jade');
	if(ext == 'php' ){
		jade = require('gulp-jade-php');
	}
	gulp.src(src)
		.pipe(plugins.plumber({errorHandler: plugins.notify.onError('<%= error.message %>')}))
		.pipe(jade({pretty: true}))
		.pipe(gulp.dest(dist));
		console.log('compileJade:src:' + src)
		console.log('compileJade:dest:' + dist)
    	console.log('compileJade:ext:' + ext)
}

global.fullCompileJade = fullCompileJade;
module.fullCompileJade = fullCompileJade;
module.compileJade = compileJade;


gulp.task('jade', gulp.series(function(){
	fullCompileJade();
}));




//Pug
//--------------------------------------------------------------

var fullCompilePug = function(){
	if('pug' in localConf){
		var conf = localConf.pug
		if(conf.length > 0){
			for(var i=0; i < conf.length; i++){
				var src = root + conf[i].src;
				var dist = root + conf[i].dist;
				compilePug(src,dist);
			}
		}
	}
}

var compilePug = function(src,dist){
	gulp.src(src)
		.pipe(plugins.plumber({errorHandler: plugins.notify.onError('<%= error.message %>')}))
		.pipe(plugins.pug({pretty: true}))
		.pipe(gulp.dest(dist));
		console.log('compilePug:src:' + src)
		console.log('compilePug:dest:' + dist)
}


global.fullCompilePug = fullCompilePug;
module.fullCompilePug = fullCompilePug;
module.compilePug = compilePug;


gulp.task('pug', gulp.series(function(){
	fullCompilePug();
	done();
}));

init();

custom.html = module;


