module.exports = function(grunt) {

  var exec = require("child_process").exec;
  var path = require("path");
  var fs = require("fs");
  var glob = require('glob');
  var UglifyJS = require("uglify-js");
  var cheerio = require('cheerio');
  var html_minify = require('html-minifier').minify;

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-task-helper');
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.initConfig({
    taskHelper: {
      compile: {
        options: {
          handlerByTask: function(options) {
            //var done = this.async();
            var core_files = [];

            var cronos_files = (JSON.parse(fs.readFileSync('js/core/package.json', 'utf8'))).files;
            for (var i = 0; i < cronos_files.length; i++) {
              cronos_files[i] = 'js/core/' + cronos_files[i];
            }
            core_files = core_files.concat(cronos_files);

            var lib_files = (JSON.parse(fs.readFileSync('js/libs/package.json', 'utf8'))).files;
            for (var i = 0; i < lib_files.length; i++) {
              lib_files[i] = 'js/libs/' + lib_files[i];
            }
            core_files = core_files.concat(lib_files);

            //var app_files = glob.sync('app/*.js');
            var app_files = (JSON.parse(fs.readFileSync('js/app/package.json', 'utf8'))).files;
            for (var i = 0; i < app_files.length; i++) {
              app_files[i] = 'js/app/' + app_files[i];
            }
            core_files = core_files.concat(app_files);

            console.info(core_files);

            var result = UglifyJS.minify(core_files, {
              outSourceMap: "app.js.map"
            });

            fs.writeFileSync('build/js/app.js', '/*\n//@ sourceMappingURL=app.js.map\n*/\n' + result.code);
            fs.writeFileSync('build/js/app.js.map', result.map);
          }
        }
      },
      templates: {
        options: {
          handlerByTask: function(options) {
            var hf = fs.readFileSync('views/index.html', "utf8");
            var $ = cheerio.load(hf);

            $('script[type="text/ashe"]').each(function(i, elem) {
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

              $('body script').first().before('<script type="text/ashe" id="' + id + '">' + html + '</script>');
            }

            fs.writeFileSync('build/index.html', $.html());
          }
        }
      }
    },
    watch: {
      js: {
        files: ["js/app/*.js", "js/core/*.js", "js/libs/*.js"],
        tasks: ["taskHelper:compile"]
      },
      html: {
        files: ["views/*.html", "views/templates/*.html"],
        tasks: ["taskHelper:templates"]
      },
      less: {
        files: ['styles/*.less'],
        tasks: ['less']
      },
      options: {
        spawn: false
      }
    },
    less: {
      compile: {
        options: {
          paths: ["styles"],
          cleancss: true,
          compress: true
        },
        files: {
          "build/styles/styles.css": "styles/styles.less"
        }
      }
    }
  });

  grunt.registerTask("default", ["taskHelper:compile", 'taskHelper:templates', 'less', "watch"]);

  // Dev mode just add the script tags to index.html
  grunt.registerTask("dev", ["taskHelper:addTags", 'taskHelper:templates', 'less', "watch"]);

};