var gulp,custom,config,commander;
gulp = global.gulp;
custom = global.custom;
config = custom.config;
commander= custom.commander;

var vars,plugins,target


//--------------------------------------------------------------
//Init
//--------------------------------------------------------------
var init = function(){
	vars = custom.vars;
	gulp = global.gulp;
	custom = global.custom;
	plugins = global.plugins;
	config = custom.config;

	target = config.files;


}



//--------------------------------------------------------------
//ファイル名の取得
//--------------------------------------------------------------
var getFileName = function(path){
	//return path.match(".+/(.+?)([\?#;].*)?$")[1];
	var arr = path.match(".+/(.+?)\.[a-z]+([\?#;].*)?$");
	console.log('getFileName:' + arr)
	var fileName = arr[1];
	return fileName;
}

//--------------------------------------------------------------
//ファイルパスの取得
//--------------------------------------------------------------
var getFilePath = function(path){
	var filePath;
	var arr = path.match(".+/(.+?)([\?#;].*)?$");
	
	if(arr){
		filePath = arr[1].replace(/\//g,'');
	}else{
		filePath = path.replace(/\//g,'');
	}
	console.log('filePath:' + filePath);
	
	return filePath;
	//return path.match(".+/(.+?)([\?#;].*)?$")[1].replace(/\//g,'');
}

//--------------------------------------------------------------
//拡張子の取得
//--------------------------------------------------------------
var getFileExtension = function(path){
	//console.log('パス' + path)
	//console.log(path.match(/(.*)(?:\.([^.]+$))/))
	if(path && path.match(/(.*)(?:\.([^.]+$))/) && path.match(/(.*)(?:\.([^.]+$))/).length > 1){
		return path.match(/(.*)(?:\.([^.]+$))/)[2];
	}else{
		console.log('拡張子が取得できませんでした。');
		return null;
	}
	
}

//--------------------------------------------------------------
//ファイルコピー
//--------------------------------------------------------------

var fileCopy = function(src, dest,exclude){
	var fileName = getFileName(src);
	gulp.src(src)
		.pipe($.plumber({errorHandler: $.notify.onError('<%= error.message %>')}))
		.pipe(gulp.dest(dest));
	console.log('fileCopy :src: ' + src + ',dest:' + dest);
}


//--------------------------------------------------------------
//ファイルの削除
//--------------------------------------------------------------

var fileDelete = function(src){
	var delay = 5000;
	gulp.src(src)
		.pipe($.plumber({errorHandler: $.notify.onError('<%= error.message %>')}))
		.pipe($.wait( delay ))
		.pipe($.vinylPaths( $.del ));
		console.log('fileCopy :src: ' + src);
}



//--------------------------------------------------------------
//ファイルの変更
//--------------------------------------------------------------
function fileChanged(e){
	commander.report('fileChanged', e);
}
global.fileChanged = fileChanged;

//--------------------------------------------------------------
//distribution
//--------------------------------------------------------------

var distribution = function(src, dest){
	
	
}

var exclude




module.exports = {
	getFileName : getFileName,
	getFilePath : getFilePath,
	getFileExtension : getFileExtension,
	fileCopy : fileCopy,
	distribution : distribution
}

module.getFileName = getFileName;
module.getFilePath = getFilePath;
module.getFileExtension = getFileExtension;
module.fileCopy = fileCopy;
module.distribution = distribution;

global.custom.files = module;


init();






