'use strict';

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // Watch Config
        watch: {
            files: ['views/**/*'],
            options: {
                livereload: true
            },
            scripts: {
                files: [
                    'assets/scripts/**/*.js',
                ],
            },
            css: {
                files: [
                    'assets/styles/**/*.css',
                ],
            },
            sass: {
                files: ['assets/styles/**/*.scss'],
                tasks: ['sass:dev']
            },
            images: {
                files: [
                    'assets/images/**/*.{png,jpg,jpeg,webp}'
                ],
            },
            express: {
                files:  [ 'app.js', '!**/node_modules/**', '!Gruntfile.js' ],
                tasks:  [ 'express:dev' ],
                options: {
                    nospawn: true // Without this option specified express won't be reloaded
                }
            },
        },

        // Clean Config
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        'dist/*',
                        '!dist/.git*'
                    ]
                }]
            },
            server: ['.tmp'],
        },

        // Hint Config
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'assets/scripts/**/*.js',
                '!assets/scripts/vendor/*',
                'test/spec/**/*.js'
            ]
        },

        // Sass Config
        sass: {
            options: {
                cacheLocation: '.tmp/.sass-cache'
            },
            dev: {
                options: {
                    style: 'expanded',
                    lineComments: true
                },
                files: [{
                    expand: true,
                    cwd: 'assets/styles/sass',
                    dest: 'assets/styles',
                    src: ['screen.scss'],
                    ext: '.css'
                }]
            }
        },

        // Express Config
        express: {
            options: {
              // Override defaults here
            },
            dev: {
                options: {
                    script: 'app.js'
                }
            }
        },

        // Open Config
        open: {
            site: {
                path: 'http://localhost:3000',<% if (useGoogleChrome) { %>
                app: 'Google Chrome'<% } %><% if (useFirefox) { %>
                app: 'Firefox'<% } %><% if (useSafari) { %>
                app: 'Safari'<% } %><% if (useOpera) { %>
                app: 'Opera'<% } %>
            },
            editor: {
                path: './',<% if (useSublimeText) { %>
                app: 'Sublime Text'<% } %><% if (useWebStorm) { %>
                app: 'WebStorm'<% } %><% if (useCoda2) { %>
                app: 'Coda 2'<% } %><% if (useChocolat) { %>
                app: 'Chocolat'<% } %><% if (useTextMate) { %>
                app: 'TextMate'<% } %><% if (useNone) { %>
                app: ''<% } %>
            },
        },

        // Rev Config
        rev: {
            dist: {
                files: {
                    src: [
                        'dist/assets/scripts/**/*.js',
                        'dist/assets/styles/**/*.css',
                        'dist/assets/images/**/*.{png,jpg,jpeg,gif,webp}',
                        'dist/assets/styles/fonts/**/*.*'
                    ]
                }
            }
        },

        // Usemin Config
        useminPrepare: {
            options: {
                dest: 'dist/assets'
            },
            html: ['assets/{,*/}*.html', 'views/**/*.handlebars']
        },
        usemin: {
            options: {
                dirs: ['dist/assets'],
                basedir: 'dist/assets',
            },
            html: ['dist/assets/{,*/}*.html', 'dist/views/**/*.handlebars'],
            css: ['dist/assets/styles/{,*/}*.css']
        },

        // Imagemin Config
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/images',
                    src: '**/*.{png,jpg,jpeg}',
                    dest: 'dist/assets/images'
                }]
            }
        },

        // SVGmin Config
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/images',
                    src: '{,*/}*.svg',
                    dest: 'dist/assets/images'
                }]
            }
        },

        // CSSmin config
        cssmin: {
            // This task is pre-configured if you do not wish to use Usemin
            // blocks for your CSS. By default, the Usemin block from your
            // `index.html` will take care of minification, e.g.
            //
            //     <!-- build:css({.tmp,app}) styles/main.css -->
            //
            // dist: {
            //     files: {
            //         'dist/assets/styles/main.css': [
            //             '.tmp/styles/{,*/}*.css',
            //             'assets/styles/{,*/}*.css'
            //         ]
            //     }
            // }
        },

        // HTML Config
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: 'assets',
                    src: '*.html',
                    dest: 'dist/assets'
                }]
            }
        },

        // Copy Config
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'assets',
                    dest: 'dist/assets',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/**/*.{webp,gif}',
                        'styles/fonts/{,*/}*.*',
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'views',
                    dest: 'dist/views/',
                    src: '**/*.handlebars',
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: 'assets/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },
        },

        // Concurrent Config
        concurrent: {
            dist: [
                'copy:styles',
                'svgmin',
                'htmlmin'
            ]
        },
    });

    // Register Tasks
    // Workon
    grunt.registerTask('workon', 'Start working on this project.', [
        'jshint',
        'sass:dev',
        'express:dev',
        'open:site',
        'open:editor',
        'watch'
    ]);


    // Restart
    grunt.registerTask('restart', 'Restart the server.', [
        'express:dev',
        'watch'
    ]);
    

    // Build
    grunt.registerTask('build', 'Build production ready assets and views.', [
        'clean:dist',
        'concurrent:dist',
        'useminPrepare',
        'imagemin',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'rev',
        'usemin',
    ]);

};
