var gulp,custom,config,
gulp = global.gulp;
custom = global.custom;
config = custom.config;
var files;

var report = function(content,params){
	eval(content)(params);
}

//command
var command = function(content){

}

var init = function(){
	files = custom.files;
	//console.log('カスタム : ' + custom);
	//console.log('カスタム : ' + custom.files);
}

function fileChanged(e){
	console.log('fileChanged:e:' + e)
	var type = e.event;
	var src = e.path;


	var fileExtension = files.getFileExtension(src);
	var fileName = files.getFileName(src);
	var filePath = files.getFilePath(src);

	var situation = {
		type : type,
		src : src,
		fileExtension : fileExtension,
		fileName : fileName,
		filePath : filePath
	}

	for(var key in situation){
		console.log('key + \' : \' + situation[key]' + key + ' : ' + situation[key]);
	}


	var fileType = {
		scss : 'css',
		sass : 'css',
		less : 'css',
		stylus : 'css',
		js : 'js',
		ts : 'js',
		jade : 'html',
		pug : 'html',
		pug : 'html',
		php : 'php'
	}

	console.log('fileExtension' + fileExtension)
	if (fileExtension in fileType) {
		console.log('ファイルタイプ' + fileExtension);
		//console.log(fileType[fileExtension]);
        console.log(fileType[fileExtension])
		custom[fileType[fileExtension]].compile(fileExtension);
	}

	//FTP
	global.ftpUpload();

	//Reload
	setTimeout(function(){
		global.browserReload();
	},500);

	/*
	if(type == 'change' || type == 'add'){

		if(fileExtension == 'scss' || fileExtension == 'sass' || fileExtension == 'less'){ //SASS
			custom.css.compile(fileExtension);
			//custom.css.sassChanged(src)
		}else if(fileExtension == 'js' || fileExtension == 'ts'){ //js
			custom.js.compile(fileExtension);
		}
	}

	setTimeout(function(){
		global.browserReload();
	},1000)
	*/

}


module.exports = {
	init : init,
	report : report,
	command : command,
}

module.report = report;
module.command = command;

//init();



