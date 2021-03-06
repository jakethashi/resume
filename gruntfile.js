module.exports = function(grunt) {
    grunt.verbose.ok();

    grunt.initConfig({
        config: {
            src: 'app',
            dest: 'build'
        },
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                    '../css/styles.css' : 'ms.styles.scss'
                }
            }
        },
        watch: {
            htmlhint: {
                files: ['<%= config.dest %>/*.html'],
                tasks: ['htmlhint']
            }
        },

        processhtml: {
            index: {
                files: {
                    '<%= config.dest %>/index.html': ['index.html']
                }
            }, 
            learn: {
                files: {
                    '<%= config.dest %>/learnmore.html': ['learnmore.html']
                }
            }
        },  

        clean: {
            empty: {
                src: ['<%= config.dest %>/**']
            }
        },

        copy: {
            html: {
                expand: true,
                src: [
                'index.html', 
                'learnmore.html'
                ],
                dest: '<%= config.dest %>/'
            },
            css: {
                expand: true,
                src: ['*.css'],
                cwd: '<%= config.src %>/css/',
                dest: '<%= config.dest %>/files/css/'
            },
            fonts: {
                expand: true,
                src: ['*.woff', '*.woff2'],
                cwd: 'bower_components/font-awesome/fonts/',
                dest: '<%= config.dest %>/files/fonts'
            },
            services: {
                expand: true,
                src: ['content.js'],
                cwd: '<%= config.src %>/scripts/',
                dest: '<%= config.dest %>/files/scripts/'
            },
            img: {
                expand: true,
                src: ['**'],
                cwd: '<%= config.src %>/img/',
                dest: '<%= config.dest %>/files/img/'
            },
            views: {
                expand: true,
                src: ['**'],
                cwd: '<%= config.src %>/views/',
                dest: '<%= config.dest %>/files/views/'
            },
            toLocal: {
                expand: true,
                src: ['<%= config.dest %>/**'],
                dest: '//192.168.1.11/web/'
            }
        },

        concat: {
            options: {
                separator: '',
            },
            scripts: {
                src: [
                    // my scripts
                    '<%= config.src %>/scripts/main.js',
                    '<%= config.src %>/scripts/srv-config.js',
                    '<%= config.src %>/scripts/controllers/*.js',
                    '<%= config.src %>/scripts/directives/*.js',
                    '<%= config.src %>/scripts/filters.js',
                    '<%= config.src %>/scripts/services/*.js'               
                ],
                dest: '<%= config.dest %>/files/js/main.dbg.js'
            },
            vendorScripts: {
                src: [
                    //bower components
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/jquery-easing/jquery.easing.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'bower_components/firebase/firebase.js',
                    // angular
                    'bower_components/angular/angular.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.js',
                    'bower_components/angular-resource/angular-resource.js',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                    'bower_components/angularfire/dist/angularfire.js',
                    'bower_components/wow/dist/wow.js',
                    'bower_components/underscore/underscore.js',
                    '<%= config.src %>/scripts/vendor/lazy-loading-google-maps/jquery.lazy-load-google-maps.js'                 
                ],
                dest: '<%= config.dest %>/files/js/vendor.dbg.js'
            },
            css: {
                src: [
                    '<%= config.src %>/css/normalize.css',
                    'bower_components/bootstrap/dist/css/bootstrap.css',
                    'bower_components/font-awesome/css/font-awesome.css',
                    '<%= config.src %>/css/animate.css',
                    '<%= config.src %>/css/ms.styles.css'
                ],
                dest: '<%= config.dest %>/files/css/styles.css'
            }
        },

        ngAnnotate: {
            angular: {
                files: {
                    '<%= config.dest %>/files/js/main.dbg.js': ['<%= config.dest %>/files/js/main.dbg.js']
                },
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1,
                keepSpecialComments: 0
            },
            target: {
                files: {
                    '<%= config.dest %>/files/css/styles.css': ['<%= config.dest %>/files/css/styles.css']
                }
            }
        },

        autoprefixer: {
            build: {
                src: '<%= config.dest %>/files/css/styles.css',
                dest: '<%= config.dest %>/files/css/styles.css'
            }
        },

        uglify: {
            options: {
                banner: 
                '<% var subtask = uglify[grunt.task.current.target]; %>' +
                '/* <%= subtask.name %> <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
                ' *\n' +
                ' * Copyright (C) <%= grunt.template.today("yyyy") %> Martin Surynek\n' +
                ' * UI / UX Maniac\n'+
                ' *\n' +
                ' * More info about this script and whole site could be provided by personal interview. \n'+
                ' *\n' +
                ' */\n\n',
                sourceMap: true
            },
            main: {
                name: 'main.min.js',
                files: [{
                    src: '<%= config.dest %>/files/js/main.dbg.js',
                    dest: '<%= config.dest %>/files/js/main.min.js'
                }]
            },
            vendor: {
                name: 'vendor.min.js',
                files: [{
                    src: '<%= config.dest %>/files/js/vendor.dbg.js',
                    dest: '<%= config.dest %>/files/js/vendor.min.js'
                }]
            }
        },
        // test section
        karma: {
            unitTest: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            },
            watch: {
                configFile: 'test/karma.conf.js'
            },
            smokeTest: {
                // TODO: create smoke tests after deploy prod package
            }
        },
        jshint: {
            all: [
                '<%= config.src %>/scripts/**/*.js',
                'gruntfile.js',
                '!<%= config.src %>/scripts/vendor/**/*.js'
            ],
            options: {
                undef: true,
                devel: true,
                browser: true,
                jquery: true,
                quotmark: false,
                trailing: true,
                globals: {
                    angular: false,
                    WOW: false,
                    module: true,
                    define: true,
                    require: true,
                    google: false,
                    Firebase: true
                }
            }
        },
        htmlhint: {
            options: {
                htmlhintrc: '.htmlhintrc'
            },
            html: {
                src: ['**.html']
            }
        },
        protractor: {
            options: {
                configFile: "node_modules/protractor/example/conf.js", // Default config file 
                keepAlive: true, // If false, the grunt process stops when the test fails. 
                noColor: false, // If true, protractor will not use colors in its output. 
                args: {
                    // Arguments passed to the command 
                }
            },
            main_target: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too. 
                options: {
                    configFile: "test/protractor-conf.js", // Target-specific config file 
                    args: {} // Target-specific arguments 
                }
            }
        }

    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('cleanBuild', ['clean:empty']);
    grunt.registerTask('deploy', [
        'cleanBuild',
        
        'concat:scripts',
        'ngAnnotate',
        'concat:vendorScripts',
        'concat:css',
        'autoprefixer',

        'copy:html', 
        'copy:fonts',
        'copy:services', 
        
        'processhtml:index',
        'processhtml:learn',
        'copy:img', 
        'copy:views'        
    ]);
    grunt.registerTask('test', [
        'jshint',
        'htmlhint',
        //'karma:unitTest',
        'protractor'
    ]);
    grunt.registerTask('server', [
        'test',
        'deploy', 
        'uglify', 
        'cssmin',
        'beep'
    ]);
};