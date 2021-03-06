/* jshint node: true */

module.exports = function (grunt) {
    "use strict";
    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
            ' * Pretotype template v<%= pkg.version %> by Paweł Cesar Sanjuan Szklarz @PSanjuanSzklarz \n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
            ' */\n\n',
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            src: {
                src: ['src/main/app/scripts/*.js', 'src/main/app/scripts/**/*.js']
            },
            test: {
                src: ['src/test/unit/*.js','src/test/unit/**/*.js']
            }
        },

        less: {
            bootstrap_dev: {
                files: {
                    'src/main/app/styles/app.css': 'src/main/less/bootstrap.less'
                }
            },
            theme_dev: {
                files: {
                    'src/main/app/styles/app-theme.css': 'src/main/less/theme.less'
                }
            },
            bootstrap: {
                options: {
                    cleancss: true,
                    compress: true
                },
                files: {
                    'dist/styles/app.min.css': 'src/main/less/bootstrap.less'
                }
            },
            theme: {
                options: {
                    cleancss: true,
                    compress: true
                },
                files: {
                    'dist/styles/app-theme.min.css': 'src/main/less/theme.less'
                }
            }
        },
        clean: {
            dist: ['dist']
        },

        copy: {
            fonts: {
                expand: true,
                flatten: true,
                src: ["bower_dependencies/vendor/bootstrap/fonts/*"],
                dest: 'dist/fonts/'
            },
            assets: {
                expand: true,
                flatten: true,
                src: ["src/main/app/assets/*"],
                dest: 'dist/assets/'
            },
            images: {
                expand: true,
                flatten: true,
                src: ["src/main/app/images/*"],
                dest: 'dist/images/'
            },
            fonts_dev: {
                expand: true,
                flatten: true,
                src: ["bower_dependencies/vendor/bootstrap/fonts/*"],
                dest: 'src/main/app/fonts/'
            },
            html: {
                src: ["src/main/app/appBin.html"],
                dest: 'dist/index.html'
            }
        },
        watch: {
            src: {
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test']
            },
            less: {
                files: ['src/main/less/*.less'],
                tasks: ['less:bootstrap_dev', 'less:theme_dev'],
                options: {
                    livereload: true
                }
            },
            templates: {
                files: ['src/main/app/scripts/**/*.html'],
                options: {
                    livereload: true
                }
            },
            karma: {
                files: ['<%= jshint.src.src %>', '<%= jshint.test.src %>', 'src/main/app/scripts/**/*.html', 'src/main/test/**/*.js'],
                tasks: ['karma:unit_watch:run']
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: "src/main/app/scripts",
                    name: "main",
                    out: 'dist/app_bin.js',
                    include: ["requireLib"],
                    paths: {
                        requireLib: '../../../../bower_dependencies/vendor/requirejs/require',
                        underscore : '../../../../bower_dependencies/vendor/underscore/underscore',
                        'bootstrap': '../../../../bower_dependencies/vendor/bootstrap/dist/js/bootstrap',
                        'angularRoute': '../../../../bower_dependencies/vendor/angular-route/angular-route',
                        'jquery': '../../../../bower_dependencies/vendor/jquery/jquery',
                        'eelnss': '../../../../bower_dependencies/vendor/eelnss/eelnss',
                        'angular': '../../../../bower_dependencies/vendor/angular/angular',
                        'angular-mocks': '../../../../bower_dependencies/vendor/angular-mocks/angular-mocks',
                        'angular-ui-router': '../../../../bower_dependencies/vendor/angular-ui-router/release/angular-ui-router',
                        'angular-breadcrumb': '../../../../bower_dependencies/vendor/angular-breadcrumb/dist/angular-breadcrumb',
                        'angular-resource': '../../../../bower_dependencies/vendor/angular-resource/angular-resource',
                        'angular-cookies': '../../../../bower_dependencies/vendor/angular-cookies/angular-cookies',
                        'angular-promise-tracker': '../../../../bower_dependencies/vendor/angular-promise-tracker/promise-tracker',
                        'text': '../../../../bower_dependencies/vendor/requirejs-text/text',
                        'moment': '../../../../bower_dependencies/vendor/moment/moment',
                        'has': '../../../../bower_dependencies/vendor/has/has',
                        'holderjs': '../../../../bower_dependencies/vendor/holderjs/holder',
                        'marked': '../../../../bower_dependencies/vendor/marked/lib/marked'
                    },
                    mainConfigFile: 'src/main/app/scripts/main.js',
                    optimize: "uglify2",
                    throwWhen: {
                        optimize: true
                    },
                    has: {
                        consoleDebug: true,
                        fakeBackend: true
                    },
                    fakeBackendDelay: 6000,
                    shim: {
                        angular: {
                            exports: "angular"
                        }
                    },
                    uglify2: {
                        output: {
                            beautify: false
                        },
                        compress: {
                            sequences: false,
                            dead_code: true,
                            unused: true,
                            global_defs: {
                                DEBUG: false
                            }
                        },
                        warnings: true,
                        mangle: true
                    },
                    optimizeAllPluginResources: false,
                    generateSourceMaps: false,
                    preserveLicenseComments: true
                }
            }
        },
        sed: {
            version: {
                path: ['dist/index.html'],
                pattern: '{{ version_data }}',
                replacement: '<%= pkg.version %>',
                recursive: false
            }
        },
        connect: {
            debugserver: {
                options: {
                    port: 8001,
                    base: ['bower_dependencies','src/main/app'],
                    directory: 'src/main/app',
                    debug:true,
                    keepalive:true
                }
            },
            devserver: {
                options: {
                    port: 8001,
                    base: ['bower_dependencies','src/main/app'],
                    directory: 'src/main/app',
                    livereload: true
                }
            },
            binserver: {
                options: {
                    port: 8001,
                    base: 'dist'
                }
            }
        },
        bower: {
            install: {
                cleanTargetDir: true
            }
        },
        karma: {
            unit: {
                configFile: 'src/test/karma-unit.conf.js',
                autoWatch: false,
                singleRun: true,
                logLevel: 'INFO'
            },
            unit_watch: {
                configFile: 'src/test/karma-unit.conf.js',
                background: true
            }
        },
        "jsbeautifier" : {
            files : ["src/main/app/**/*.js","src/main/app/**/*.html"],
            options : {
            }
        }
    });


    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-sed');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks("grunt-jsbeautifier");

    // CSS distribution task.
    grunt.registerTask('dist-css', ['less']);
    grunt.registerTask('dist-js', ['requirejs']);
    grunt.registerTask('test', ['jshint', 'karma:unit']);

    // content distribution task.
    grunt.registerTask('dist-content', ['copy']);
    grunt.registerTask('dist-sed', ['sed']);

    // Full distribution task.
    grunt.registerTask('dist', ['clean', 'dist-css', 'dist-content', 'dist-js', 'dist-sed']);

    // Default task.
    grunt.registerTask('default', [ 'clean', 'dist']);
    grunt.registerTask('dev_watch_mode', [ 'karma:unit_watch','watch']);


    grunt.registerTask('dev', [ 'copy:fonts_dev', 'connect:devserver', 'less:theme_dev', 'less:bootstrap_dev', 'dev_watch_mode']);
    grunt.registerTask('bin', [ 'dist', 'connect:binserver', 'watch']);


};
