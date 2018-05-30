var init = function(root){
	var plugins = require("./node_modules/gulp-load-plugins")({config : root + 'package.json'});
	var browserSync = require('./node_modules/browser-sync');
	global.plugins = plugins;
	global.browserSync = browserSync;
}

module.exports = {
	init : init
}
