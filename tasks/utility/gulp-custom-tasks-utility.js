var gulp,custom,config,commander;
gulp = global.gulp;
custom = global.custom;
config = custom.config;
commander= custom.commander;


var vars,plugins,target,utility


//--------------------------------------------------------------
//Init
//--------------------------------------------------------------
var init = function(){
	vars = custom.vars;
	gulp = global.gulp;
	custom = global.custom;
	plugins = global.plugins;
	config = custom.config;

	target = config.utility;
}


var output = function(message){
	console.log(message)
}

module.exports = {
	output : output,
}

module.output = output;

custom.utility = module;

init();



