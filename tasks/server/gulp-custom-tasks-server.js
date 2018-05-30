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
	localConf = config.server;
	console.log('サーバー');
	console.log(localConf);
	if('ftp' in localConf){
		config.default.tasks.push('upload');
		console.log("FTPアップロード");
	}


}


//FTP
//--------------------------------------------------------------

var ftpUpload = function(){
	if(localConf['ftp']){
		
		for(var i=0; i < localConf.ftp.files.length; i++){
			var obj = localConf.ftp.files[i];
			console.log(obj.local)
			console.log(obj.remote)
			gulp.src(obj.local)
				.pipe(plugins.ftp({
						// FTP情報を入力
						host: localConf.ftp.server.host,
						user: localConf.ftp.server.user,
						pass: localConf.ftp.server.pass,
						remotePath: obj.remote
					})
				);
		}

	}

}

gulp.task('upload', function(){
	ftpUpload();
});

global.ftpUpload = ftpUpload;
module.ftpUpload = ftpUpload;

init();

custom.server = module;


