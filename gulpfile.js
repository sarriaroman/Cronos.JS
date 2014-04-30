/* Libraries and imports */
var gulp = require('gulp'),
	connect = require('gulp-connect'),
	plumber = require('gulp-plumber'),
	watch = require('gulp-watch'),
	less = require('gulp-less'),

	path = require("path"),
	fs = require("fs"),
	glob = require('glob'),
	UglifyJS = require("uglify-js"),
	cheerio = require('cheerio'),
	html_minify = require('html-minifier').minify,

	sources = {
		js: ["core/**/*.js", "js/**/*.js"],
		cronos: {
			core: "core",
			libs: "js/libs",
			app: "js/app"
		},
		templates: ["views/**/*.html"],
		less: "styles/**/*.less",
		style: "styles/style.less",
		overwatch: "build/**/*.*" /* Build folder */
	},

	destinations = {
		js: "build/js/",
		build: "build/",
		css: "build/styles/"
	};

/******************************* ****** ********************************/
/******************************* SERVER ********************************/
/*******************************  1234  ********************************/
/******************************* ****** ********************************/

/*SERVER TASK*/
gulp.task('serve', function(event) {
	connect.server({
		root: destinations.build,
		port: 1234,
		livereload: true
	});
	// sets up a livereload that watches for any changes in the root
	watch({
		glob: sources.overwatch
	})
		.pipe(connect.reload());
});

/******************************* ****** ********************************/

var processJSFiles = function(event) {
	var core_files = [];

	var cronos_files = (JSON.parse(fs.readFileSync( path.join(sources.cronos.core, 'package.json'), 'utf8'))).files;
	for (var i = 0; i < cronos_files.length; i++) {
		cronos_files[i] = path.join(sources.cronos.core, cronos_files[i]);
	}
	core_files = core_files.concat(cronos_files);

	var lib_files = (JSON.parse(fs.readFileSync( path.join(sources.cronos.libs, 'package.json'), 'utf8'))).files;
	for (var i = 0; i < lib_files.length; i++) {
		lib_files[i] = path.join(sources.cronos.libs, lib_files[i]);
	}
	core_files = core_files.concat(lib_files);

	//var app_files = glob.sync('app/*.js');
	var app_files = (JSON.parse(fs.readFileSync( path.join(sources.cronos.app, 'package.json'), 'utf8'))).files;
	for (var i = 0; i < app_files.length; i++) {
		app_files[i] = path.join(sources.cronos.app, app_files[i]);
	}
	core_files = core_files.concat(app_files);

	console.info('[JS] ' + core_files.join(', '));

	var result = UglifyJS.minify(core_files, {
		outSourceMap: "app.js.map"
	});

	fs.writeFileSync(path.join( destinations.js, 'app.js' ), '/*\n//@ sourceMappingURL=app.js.map\n*/\n' + result.code);
	fs.writeFileSync(path.join( destinations.js, 'app.js.map' ), result.map);

	if(event) event();
}

/*COFFEE TASK*/
gulp.task('js', function(event) {
	return processJSFiles(event);
});
/*COFFEE WATCH TASK FOR DEVELOPMENT*/
gulp.task('js:watch', function(event) {
	watch({
		glob: sources.js
	}, function(files) {
		processJSFiles();
	});
});

/******************************* STYLES ********************************/
/*LESS TASK*/
gulp.task('less', function(event) {
	return gulp.src(sources.style)
		.pipe(plumber())
		.pipe(less({
			compress: true
		}))
		.pipe(gulp.dest(destinations.css));
});
/*LESS WATCH TASK FOR DEVELOPMENT*/
gulp.task('less:watch', function(event) {
	watch({
		glob: sources.less
	}, function(files) {
		gulp.src(sources.style)
			.pipe(plumber())
			.pipe(less({
				compress: true
			}))
			.pipe(gulp.dest(destinations.css));
	});
});

/******************************* ****** ********************************/

var processTemplatesFiles = function(event) {
	var hf = fs.readFileSync('views/index.html', "utf8");
	var $ = cheerio.load(hf);

	$('script[type="text/cronos"]').each(function(i, elem) {
		$(elem).remove();
	});

	var templates = glob.sync('views/templates/*.html');
	for (var i = 0; i < templates.length; i++) {
		var cf = cheerio.load(fs.readFileSync(templates[i], "utf8"));

		var html = html_minify(cf.html(), {
			collapseWhitespace: true,
			removeComments: true
		});

		var id = 'template_' + path.basename(templates[i], '.html');

		$('body script').first().before('<script type="text/cronos" id="' + id + '">' + html + '</script>');
	}

	fs.writeFileSync('build/index.html', $.html());

	if(event) event();
}

/*TEMPLATES TASK*/
gulp.task('templates', function(event) {
	return processTemplatesFiles(event);
});
/*TEMPLATES WATCH TASK FOR DEVELOPMENT*/
gulp.task('templates:watch', function(event) {
	watch({
		glob: sources.templates
	}, function(files) {
		processTemplatesFiles();
	});
});

/******************************* ****** ********************************/

/*DEFAULT TASK*/
gulp.task('default', ["serve", "templates:watch", "less:watch", "js:watch"]);