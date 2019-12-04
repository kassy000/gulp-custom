var gulp,custom,config,plugins,vars;
gulp = global.gulp;
custom = global.custom;
config = custom.config;
plugins = global.plugins;
vars = custom.vars;
var root = global.root;

var localConf,configSass,outputStyle,sourcemaps,sourcemapsPath,sourceRoot,plefix;

//--------------------------------------------------------------
//Init
//--------------------------------------------------------------

var init = function(){
	localConf = config.css
	if(config.css['sass']){
		//config.default.tasks.push('sass');
	}
	outputStyle =  config.css['outputStyle'];
	sourcemaps =  config.css['sourcemaps'];
	sourcemapsPath =  config.css['sourcemapsPath'];
	sourceRoot =  config.css['sourceRoot'];
	plefix = config.css['plefix'];
}

//--------------------------------------------------------------
//Compile
//--------------------------------------------------------------


var compile = function(extension){
	if(extension == 'sass' || extension == 'scss'){
		fullCompileSass()
	}else if('compass'){
		compileCompass()
	}else if('stylus'){
		compileStylus()
	}
}

module.compile = compile;

var fullCompile = function(extension){
	var conf = localConf[extension];
	if(configSass.length > 0){
		for(var i=0; i < conf.length; i++){
			var src = root + conf[i].src;
			var dist = root + conf[i].dist;
			compile(extension, src, dist)
		}
	}
}



//--------------------------------------------------------------
//SASS
//--------------------------------------------------------------
global.gulp.task('sass', done => {
	fullCompileSass();
	done();
});

var fullCompileSass = function(){
	if('sass' in localConf){
		var conf = localConf.sass
		//console.log('コンフィグ:' + conf)
		if(conf.length > 0){
			for(var i=0; i < conf.length; i++){
				var src = root + conf[i].src;
				var dist = root + conf[i].dist;
				compileSass(src,dist);
			}
		}
	}

}

var compileSass = function(src,dist){

	return gulp.src(src)
		.pipe(plugins.plumber({errorHandler: plugins.notify.onError('<%= error.message %>')}))
		.pipe(plugins.if(sourcemaps, plugins.sourcemaps.init()))
		.pipe(plugins.sass({outputStyle:outputStyle}))
		.pipe(plugins.if(plefix, plugins.autoprefixer(plefix)))
        /*
        .pipe(plugins.if(plefix, 
            plugins.postcss([
                plugins.postcssGapProperties(),
                plugins.autoprefixer(plefix)
            ])
        ))
        */
		.pipe(plugins.if(sourcemaps, plugins.sourcemaps.write(sourcemapsPath,{includeContent: false, sourceRoot:sourceRoot})))
		.pipe(gulp.dest(dist));
		console.log('compileSass:src:' + src)
		console.log('compileSass:dest:' + dist)
		console.log('compileSass:sourcemaps:' + sourcemaps)
}

global.fullCompileSass = fullCompileSass;
module.fullCompileSass = fullCompileSass;
module.compileSass = compileSass;
module.sassChanged = sassChanged;



var sassChanged = function(src){
	console.log(src)
	var dest;
}




//--------------------------------------------------------------
//Compass
//--------------------------------------------------------------
gulp.task('compass', gulp.series(function(){
	fullCompile('compass');
}));


var compileCompass = function(src,dest){
	gulp.src(src)
		.pipe($.plumber({errorHandler: plugins.notify.onError('<%= error.message %>')}))
		.pipe($.compass({
			config_file: 'config.rb',
			comments: false,
			css: 'stylesheets/',
			sass: 'sass/'
		}))
		.pipe(gulp.dest(dest));
		console.log('compileStylus:src:' + src)
		console.log('compileStylus:dest:' + dest)
}


global.compileCompass = compileCompass;
module.compileCompass = compileCompass;




//--------------------------------------------------------------
//Stylus
//--------------------------------------------------------------

var fullCompileStylus = function(){
	if('stylus' in localConf){
		var conf = localConf.stylus
		if(conf.length > 0){
			for(var i=0; i < conf.length; i++){
				console.log('ルート:' + root)
				var src = root + '/' + conf[i].src;
				var dist = root + '/' + conf[i].dist;
				conf(src,dist)
			}
		}
	}
}

var compileStylus = function(src,dest){
	gulp.src(src)
		.pipe($.plumber({errorHandler: plugins.notify.onError('<%= error.message %>')}))
		.pipe($.stylus())
		.pipe($.cssnext())
		.pipe(gulp.dest(dest));
		console.log('compileStylus:src:' + src)
		console.log('compileStylus:dest:' + dest)
}

//--------------------------------------------------------------
//
//--------------------------------------------------------------


init();

custom.css = module;


