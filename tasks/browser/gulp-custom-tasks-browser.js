var gulp,custom,config,
gulp = global.gulp;
custom = global.custom;
config = custom.config;

var browserSync = global.browserSync;

//--------------------------------------------------------------
// ブラウザ同期サーバ起動
//--------------------------------------------------------------
//ブラウザ同期サーバ起動

global.gulp.task('browser-sync', function() {
	console.log('ブラウザ:' + config.browserSync.proxy)

	var initConf = {};
	if(config.browserSync.proxy){
		initConf['proxy'] = config.browserSync.proxy;
		/*
		if(config.browserSync.open){
			initConf['open'] = config.browserSync.open;
		}
		if(config.browserSync.host){
			initConf['host'] = config.browserSync.host;
		}
		if(config.browserSync.port){
			initConf['port'] = config.browserSync.port;
		}
		*/


	}else if(config.browserSync.baseDir){
		initConf['server'] = {
			baseDir : config.browserSync.baseDir
		}
	}
	if(config.browserSync.https){
		initConf['https'] = config.browserSync.https;
	}

	browserSync.init(initConf);



});

// ブラウザリロード
var browserReload = function(){
	global.browserSync.reload({stream: false});
}
global.browserReload = browserReload;
