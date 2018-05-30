var gulp,root,vars,config,commander,modules,requireDir,tasks

root = global.root;
gulp = global.gulp;
global.custom = module;
module.exports.modules = modules;

//plugins
modules = require('./gulp-custom-modules.js');
modules.init(root);

//vars
vars = require('./gulp-custom-vars.js');
global.custom.vars = vars;

//config
config = require('./gulp-custom-config.js');
config.init();

module.exports = {
	config : config,
	vars : vars,
	commander : commander
}


var init = function(root) {
	commander = require('./gulp-custom-commander.js');

	global.custom.commander = commander;
	global.custom.config = config;
	requireDir = require('./node_modules/require-dir');
	tasks = requireDir( './tasks', { recurse: true } );

	commander.init();
	global.custom.commander = commander;
}

module.exports.init = init;
