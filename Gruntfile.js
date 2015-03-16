var path = require('path');

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest,
    requireDeps = require('./app/scripts/configs/require-config-paths')();

    grunt.initConfig({

        dest: {
            path: 'dist',
            images: '<%= dest.path %>/images',
            templates: '<%= dest.path %>/templates',
            styles: '<%= dest.path %>/styles',
            fonts: '<%= dest.path %>/fonts',
            js: '<%= dest.path %>/scripts'
        },

        // The actual grunt server settings
        connect: {

            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },

            proxies: [
                {
                    context: '/api',
                    host: 'localhost',
                    port: 9009,
                    https: false
                }
            ],

            livereload: {
                options: {
                  open: true,
                  middleware: function (connect) {
                    return [
                        proxySnippet,
                        connect().use(
                            '/main/*', 
                            connect.static('./app')
                        ),
                         connect().use(
                            '/signup', 
                            connect.static('./app')
                        ),
                        connect().use(
                            '/bower_components', 
                            connect.static('./bower_components')
                        ),
                        connect.static('./.tmp'),
                        connect.static('./app')
                       
                    ];
                  }
                }
            },

            dist: {
                options: {
                    open: true,
                    base: 'dist',
                    middleware: function (connect, options) {
                        return [
                            proxySnippet,
                            connect.static('dist')
                        ];
                    }
                }
            }
        },    

        requirejs: {

            options: {
                mainConfigFile: 'app/scripts/configs/require-config-prod.js',
                uglify2: {
                    mangle: false
                },
                optimize: 'uglify2',
                baseUrl : 'app/scripts',
                paths : requireDeps.paths, 
                shim : requireDeps.shim,
                include: ['configs/require-config-prod'],
                out: 'dist/scripts/main.min.js'
            },

            prod: {
                optimize: 'uglify2'
            }

        },

        copy: {

            fonts: {
                expand:true, cwd: 'app/fonts', src: '**', dest: '<%= dest.fonts %>', filter: 'isFile'
            },

            images: {
                expand:true, cwd: 'app/images', src: '**', dest: '<%= dest.images %>', filter: 'isFile'
            },

            index: {
                src: 'app/index.html', dest: 'dist/index.html'
            },

            requirejs : {
                src: 'bower_components/requirejs/require.js', dest: 'dist/scripts/vendor/require.js'
            }


        },

        cssmin: {

            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/css',
                    src: ['*.css'],
                    dest: 'dist/styles'
                }]
            }
        },

        less: {
            dev : {
                src: ['app/scripts/**/*.less'],
                dest: '.tmp/styles/main.css'
            },

            dist : {
                src: ['app/scripts/**/*.less'],
                dest: '.tmp/styles/css/main.css'
            }
        },

        clean: {
            dest: ['<%= dest.path %>'],
            tmp: ['.tmp']
        },

        html2js: {

            templates: {
                options : {
                   base: 'app',
                   module: 'main.templates'
                },
                src: ['app/scripts/**/*.html'],
                dest: 'app/scripts/templates/templates.js'
            }

        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app/images',
                    src: '{,*/}*.svg',
                    dest: 'dist/images'
                }]
            }
        },

        jshint: {
            options: {
                jshintrc : true,
                reporter: require('jshint-stylish')
            },

            files: ['app/scripts/**/*.js', '!**/tests/**', '!**/templates/**']
        },

        jscs: {
            src: "app/scripts/**/*.js",
            options: {
                config: ".jscsrc",
                requireCurlyBraces: [ "if" ]
            }
        },

        watch: {

            js: {
                files: ['app/scripts/**/*.js', '!**/tests/**', '!**/templates/**'],
                tasks: ['jshint'],
                options: {
                  livereload: '<%= connect.options.livereload %>'
                }
            },

            img: {
                files: ['app/images/**/*.*'],
                options: {
                  livereload: '<%= connect.options.livereload %>'
                }
            },

            html: {
                files: ['app/scripts/**/*.html'],
                tasks: ['html2js'],
                options: {
                  livereload: '<%= connect.options.livereload %>'
                }
            },

            index: {
                files: ['app/index.html'],
                options: {
                  livereload: '<%= connect.options.livereload %>'
                }
            },

            less: {
                files: ['app/**/*.less'],
                tasks: ['clean', 'less:dev'],
                options: {
                  livereload: '<%= connect.options.livereload %>'
                }
            }
        },

        concurrent: {
            dev: [
                'less:dev'
            ]
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }

    });

    grunt.registerTask('dev', 'Compile html 2 js then start a connect web server', function (target) {
        grunt.task.run([
            'clean',
            'jshint',
            'html2js', 
            'less:dev',
            'configureProxies',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('prod', 'Compile all sources then start a connect web server', function (target) {
        grunt.task.run([
            'clean',
            'jshint',
            'html2js',
            'svgmin', 
            'requirejs:prod', 
            'copy', 
            'less:dist',
            'cssmin:dist',
            'clean:tmp',
            'configureProxies',
            'connect:dist:keepalive'
        ]);
    });


    grunt.registerTask('test', 'Runs jasmine tests in karma', function (target) {
        grunt.task.run([
            'karma'
        ]);
    });
};