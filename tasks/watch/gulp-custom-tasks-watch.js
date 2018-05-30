"use strict";

var gulp,custom,config,root,plugins,commander,watchTarget,watchMethod,localConfig;

gulp = global.gulp;
custom = global.custom;
config = custom.config;

console.log("Gulp:" + global.gulp);

var watch = require("gulp-watch");


//--------------------------------------------------------------
//Init
//--------------------------------------------------------------
var init = function(){
	root = global.root;
	commander= custom.commander;
	plugins = global.plugins;
	
	localConfig = config.watch;
	watchTarget = localConfig.target;
	watchMethod = localConfig.method;
}



//--------------------------------------------------------------
// 監視するファイルと、実行したいタスク名を指定
//--------------------------------------------------------------
gulp.task('watch', function(){
	if(Array.isArray(watchTarget)){
		for (var i = 0; i < watchTarget.length; i ++) {
			console.log('ウォッチターゲット:' + root + watchTarget[i]);
			attachWatch(root + watchTarget[i]);
		}
	}else{
		if(watchTarget){
			attachWatch(root + watchTarget);
		}
	}
})


function attachWatch(target){
	var watcher = watch(target, function(e){
		var type = e.event;
		var method;
		console.log('ウォッチイベント:' + type);
		console.log('ウォッチファイル:' + e.history);
		for (var method in watchMethod){
			eval(watchMethod[method])(e);
		}
	})
}

custom.watch = module;

init();


