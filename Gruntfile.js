module.exports = function (grunt) {
    
    require('load-grunt-tasks')(grunt);

    var config = {
        src: 'src',
        dist: 'dist'
    };

    grunt.initConfig({

        config: config,

        pkg: grunt.file.readJSON('package.json'),

        less: {
            dynamic_mappings: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/less',
                    src: 'index.less',
                    dest: '<%= config.src %>/css',
                    ext: '.css'
                }]
            }
        },        

        watch: {
            less: {
                files: ['<%= config.src %>/less/*.less'],
                tasks: ['less']
            }
        },

        copy: {
            dist: {
                expand: true,
                cwd: '<%= config.src %>',
                src: [
                    '*.{ico,png,txt}',
                    '*.html',
                    'font/*.*'
                ],
                dest: '<%= config.dist %>',
                dot: true
            },
            css: {
                expand: true,
                dot: true,
                cwd: '<%= config.src %>/css',
                dest: '.tmp/css',
                src: '*.css'
            }
        },


        autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/css',
                    src: '*.css',
                    dest: '.tmp/css'
                }]
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*', 
                        '!<%= config.dist %>/.git'
                    ]
                }]
            }
        },

        // jshint: {
        //     options: {
        //         jshintrc: '.jshintrc',
        //         reporter: require('jshint-stylish')
        //     },
        //     all: [
        //         'Gruntfile.js',
        //         '<%= config.src %>/scripts/{,*/}*.js',
        //         '!<%= config.src %>/scripts/vendor/*',
        //         'test/spec/{,*/}*.js'
        //     ]
        // },
        
        concurrent: {
            dist: ['copy: css', 'imagemin', 'svgmin']
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<$= config.src %>/img',
                    src: '*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>/img'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/img',
                    src: '*.svg',
                    dest: '<%= config.dist %>/img'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>',
                    src: '{,*/}*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },

        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/css/',
                    src: '*.css',
                    dest: '<%= config.dist %>/css',
                    ext: '.min.css',   
                    extDot: 'first'
                }]
            }
        },

        uglify: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>',
                    src: 'js/*.js',
                    dest: '<%= config.dist %>'
                    // ext: '.min.js',   
                    // extDot: 'first'
                }]
            }
        },

        concurrent: {
            dist: [
                'copy:css',
                'imagemin',
                'svgmin'
            ]
        },

        requirejs : {
            compile: {
                options: {
                    name : "main",
                    optimize: "uglify",
                    mainConfigFile: "./<%= config.src %>/js/main.js",
                    out: "./<%= config.dist %>/js/main.js",
                    findNestedDependencies: true,
                    include: ['require.js']
                }
            }
        }        
    });

    // grunt.registerTask('test', )

    grunt.registerTask('build', [
        'clean:dist',
        'less',
        'concurrent:dist',
        'autoprefixer',
        'cssmin',
        'uglify',
        // 'requirejs',
        'copy:dist',
        'htmlmin'
    ])
    grunt.registerTask('default', [ 
        'build'
    ]);

};