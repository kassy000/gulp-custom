"use strict";
var gulp,custom,config,plugins;
gulp = global.gulp;
custom = global.custom;
config = custom.config;

var configPhp;

var gulpif = require('gulp-if');
var browserify = require('browserify');
var header = require( 'gulp-header' );

//--------------------------------------------------------------
//Init
//--------------------------------------------------------------
var init = function(){

	/*
	plugins = global.plugins;
	//JS
	configPhp = custom.config.php;

	if(configPhp.target.length > 0){
		config.default.tasks.push('php');
	}
	*/


}

var compile = function(ext){

	if(ext == 'php'){
		compilePhp();
	}
}





//--------------------------------------------------------------
//PHPのコンパイル
//--------------------------------------------------------------
var compilePhp = function(){
	/*
	if(configPhp && configPhp.target.length > 0){
		console.log('compilePhp');
		for(var i=0; i < configPhp.target.length; i++){
			var src = configPhp.target[i].src;
			var dist = configPhp.target[i].dist;

			console.log(src);
			console.log(dist);


			gulp.src(src)
			.pipe(header(banner))
			.pipe(gulp.dest('./public/js/'));
				.pipe(gulp.dest(dist));


		}
	}
	*/
}

gulp.task('php', gulp.series(function(){
	//compilePhp();
}));

module.compilePhp = compilePhp;
module.compile = compile;
custom.php = module;
init();

