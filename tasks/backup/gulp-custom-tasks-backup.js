"use strict";
var gulp,custom,config,localConfig;
gulp = global.gulp;
custom = global.custom;
config = custom.config;

var vars,plugins,year,month,day,hour,minutes,second;



var root;


//--------------------------------------------------------------
//Init
//--------------------------------------------------------------
var init = function(){

	plugins = global.plugins;

	vars = custom.vars;
	year = vars.year;
	month = vars.month;
	day = vars.day;
	hour = vars.hour;
	minutes = vars.minutes;
	second = vars.second;
	
	localConfig = config.backup;

	root = global.root;
	



}

//--------------------------------------------------------------
//gulpfile.jsのバックアップ
//--------------------------------------------------------------
gulp.task('backupGulpfile', function(){
	var src = root + 'gulpfile.js';
	var dist = root + config.backupGulpfile.dist + year + '-' + month + '-' + day + '/' + hour + '-' + minutes + '-' + second;
	console.log('task:backupGulpfile')
	console.log('ソース:' + src);
	console.log('ターゲット:' + dist);
	gulp.src(src)
		.pipe(gulp.dest(dist));
})

//--------------------------------------------------------------
//ファイルのバックアップ
//--------------------------------------------------------------
gulp.task('backup', function(){
	if(Array.isArray(localConfig)){
		console.log('ファイルのバックアップ:' + localConfig.length);
		for (var i = 0; i < localConfig.length; i ++) {
			var src =  localConfig[i].src;
			var dist =  localConfig[i].dist;
			console.log('task:backup')
			console.log('ソース:' + src);
			console.log('ターゲット:' + dist);
			fileBackup(src, dist);
		}
	}else{
		if(localConfig){
			var src = root + localConfig.src;
			var dist = root + localConfig.dist;
			fileBackup(src ,dist);
			console.log('task:backup')
			console.log('ソース:' + src);
			console.log('ターゲット:' + dist);
		}
	}
})

var fileBackup = function(src,dist){
	var filename = custom.files.getFilePath(src);
	src = root + src;
	dist = root + dist + '/' + year + '-' + month + '-' + day + '/' + hour + '-' + minutes + '-' + second;
	console.log('task:fileBackup')
	console.log('src:' + src);
	console.log('dist:' + dist);

	gulp.src([src + '/**/*'])
		.pipe(plugins.zip( filename + '.zip'))
		.pipe(gulp.dest(dist));
}

module.exports = {
	fileBackup : fileBackup
}

module.fileBackup = fileBackup;

custom.backup = module;

init();




