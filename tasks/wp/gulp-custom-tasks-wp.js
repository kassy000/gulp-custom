//--------------------------------------------------------------
//WordPress
//--------------------------------------------------------------

var gulp,custom,config,commander,root;
var vars,plugins,year,month,day,hour,minutes,configWP
gulp = global.gulp;
custom = global.custom;
config = custom.config;
commander= custom.commander;

vars = custom.vars;
year = vars.year;
month = vars.month;
day = vars.day;
hour = vars.hour;
minutes = vars.minutes;

root = config.common.root;


//--------------------------------------------------------------
//WordPress
//--------------------------------------------------------------
var init = function(){

    gulp = global.gulp;
    custom = global.custom;
    plugins = global.plugins;
    config = custom.config;

    vars = custom.vars;
    configWP = config.wp;
}


//--------------------------------------------------------------
//Themeのバックアップ
//--------------------------------------------------------------
gulp.task('backup-theme', function(){
	console.log('function:backup-theme')
	if(Array.isArray(configWP.theme.name)){
		for (var i = 0; i < configWP.theme.name.length; i ++) {
			var src =  configWP.path + '/wp-content/themes/' + configWP.theme.name[i];
			var dist =  configWP.theme.backup + configWP.theme.name[i]
			console.log('src:' + src);
			console.log('dist:' + dist);
			custom.backup.fileBackup(src,dist);
			
		}
	}else{
		if(configWP.theme.name){
			var src = configWP.path  + '/wp-content/themes/' + configWP.theme.name;
			var dist =  configWP.theme.backup + configWP.theme.name;
			console.log('src:' + src);
			console.log('dist:' + dist);
			custom.backup.fileBackup(src, dist);
		}
	}
})

//--------------------------------------------------------------
//Themeのデプロイ
//--------------------------------------------------------------
gulp.task('dist-theme', function(){

	if(Array.isArray(configWP.theme.name)){
		for (var i = 0; i < configWP.theme.name.length; i ++) {

			console.log('ソース:' + configWP.path + 'wp-content/themes/' + configWP.theme.name[i])
			custom.backup.fileCopy(configWP.path + 'wp-content/themes/' + configWP.theme.name[i], configWP.theme.dist + '/' + configWP.theme.name[i]);
		}
	}else{
		if(configWP.theme.name){
			custom.backup.fileCopy(configWP.path + '/wp-content/themes/' + configWP.theme.name, configWP.theme.dist);
		}
	}

})



init();
