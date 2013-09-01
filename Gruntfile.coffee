# Generated on 2013-07-19 using generator-webapp 0.2.6
"use strict"
LIVERELOAD_PORT = 35729
lrSnippet = require("connect-livereload")(port: LIVERELOAD_PORT)
mountFolder = (connect, dir) ->
  connect.static require("path").resolve(dir)


# # Globbing
# for performance reasons we're only matching one level down:
# 'test/spec/{,*/}*.js'
# use this if you want to recursively match all subfolders:
# 'test/spec/**/*.js'
module.exports = (grunt) ->
  
  # load all grunt tasks
  require("matchdep").filterDev("grunt-*").forEach grunt.loadNpmTasks
  
  # configurable paths
  yeomanConfig =
    app: "app"
    dist: "dist"
    easing: "easing"
    docs: "docs"

  grunt.initConfig
    yeoman: yeomanConfig
    watch:
      coffee:
        files: ["<%= yeoman.app %>/scripts/{,*/}*.coffee"]
        tasks: ["coffee:dist"]

      coffeeTest:
        files: ["test/spec/{,*/}*.coffee"]
        tasks: ["coffee:test"]

      compass:
        files: ["<%= yeoman.app %>/sass/{,*/}*.{scss,sass}"]
        tasks: ["compass:server"]

      easing:
        files: ["<%= yeoman.easing %>/src/**/*.coffee"]
        tasks: ["coffee:easing"]

      docs:
        files: [
          "<%= yeoman.docs %>/src/**/*.{coffee,html}"
          "<%= yeoman.easing %>/src/**/*.{coffee,html}"
        ]
        tasks: ["coffee:docs", "copy:docs", "coffee:easing", "copy:easing"]

      livereload:
        options:
          livereload: LIVERELOAD_PORT

        files: [
          "<%= yeoman.app %>/*.html"
          "{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css"
          "{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js"
          "<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}"
        ]

    connect:
      options:
        port: 9000
        hostname: "0.0.0.0"

      livereload:
        options:
          middleware: (connect) ->
            [lrSnippet, mountFolder(connect, ".tmp"), mountFolder(connect, yeomanConfig.app)]

      test:
        options:
          middleware: (connect) ->
            [mountFolder(connect, ".tmp"), mountFolder(connect, "test")]

      dist:
        options:
          middleware: (connect) ->
            [mountFolder(connect, yeomanConfig.dist)]

      easing:
        options:
          port: 9001
          middleware: (connect) ->
            [
              mountFolder(connect, "#{yeomanConfig.easing}/dist")
              mountFolder(connect, "#{yeomanConfig.app}/bower_components")
            ]

      docs:
        options:
          port: 9002
          middleware: (connect) ->
            [
              mountFolder(connect, "#{yeomanConfig.docs}/dist")
              mountFolder(connect, "")
              mountFolder(connect, "#{yeomanConfig.app}/bower_components")
            ]

    open:
      server:
        path: "http://localhost:<%= connect.options.port %>"

    clean:
      dist:
        files: [
          dot: true
          src: [
            ".tmp"
            "<%= yeoman.dist %>/*"
            "!<%= yeoman.dist %>/.git*"
          ]
        ]

      server: ".tmp"

    jshint:
      options:
        jshintrc: ".jshintrc"

      all: [
        "<%= yeoman.app %>/scripts/{,*/}*.js"
        "!<%= yeoman.app %>/scripts/vendor/*"
        "test/spec/{,*/}*.js"
      ]

    mocha:
      all:
        options:
          run: true
          urls: ["http://localhost:<%= connect.options.port %>/index.html"]

    coffee:
      easing:
        files: [
          expand: true
          cwd: "<%= yeoman.easing %>/src/coffee"
          src: "{,*/}*.coffee"
          dest: "<%= yeoman.easing %>/dist/scripts"
          ext: ".js"
        ]
      docs:
        files: [
          expand: true
          cwd: "<%= yeoman.docs %>/src/coffee"
          src: "{,*/}*.coffee"
          dest: "<%= yeoman.docs %>/dist/scripts"
          ext: ".js"
        ]
      dist:
        files: [
          expand: true
          cwd: "<%= yeoman.app %>/scripts"
          src: "{,*/}*.coffee"
          dest: ".tmp/scripts"
          ext: ".js"
        ]

      test:
        files: [
          expand: true
          cwd: "test/spec"
          src: "{,*/}*.coffee"
          dest: ".tmp/spec"
          ext: ".js"
        ]

    compass:
      options:
        sassDir: "<%= yeoman.app %>/sass"
        cssDir: "<%= yeoman.app %>/styles"
        generatedImagesDir: ".tmp/images/generated"
        imagesDir: "<%= yeoman.app %>/images"
        javascriptsDir: "<%= yeoman.app %>/scripts"
        fontsDir: "<%= yeoman.app %>/styles/fonts"
        importPath: "<%= yeoman.app %>/bower_components"
        httpImagesPath: "/images"
        httpGeneratedImagesPath: "/images/generated"
        httpFontsPath: "/styles/fonts"
        relativeAssets: false

      server:
        options:
          debugInfo: true

    
    # not used since Uglify task does concat,
    # but still available if needed
    #concat: {
    #            dist: {}
    #        },
    requirejs:
      dist:
        
        # Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options:
          
          # `name` and `out` is set by grunt-usemin
          baseUrl: yeomanConfig.app + "/scripts"
          optimize: "none"
          
          # TODO: Figure out how to make sourcemaps work with grunt-usemin
          # https://github.com/yeoman/grunt-usemin/issues/30
          #generateSourceMaps: true,
          # required to support SourceMaps
          # http://requirejs.org/docs/errors.html#sourcemapcomments
          preserveLicenseComments: false
          useStrict: true
          wrap: true

    
    #uglify2: {} // https://github.com/mishoo/UglifyJS2
    rev:
      dist:
        files:
          src: [
            "<%= yeoman.dist %>/scripts/{,*/}*.js"
            "<%= yeoman.dist %>/styles/{,*/}*.css"
            "<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}"
            "<%= yeoman.dist %>/styles/fonts/*"
          ]

    useminPrepare:
      options:
        dest: "<%= yeoman.dist %>"

      html: "<%= yeoman.app %>/index.html"

    usemin:
      options:
        dirs: ["<%= yeoman.dist %>"]

      html: ["<%= yeoman.dist %>/{,*/}*.html"]
      css: ["<%= yeoman.dist %>/styles/{,*/}*.css"]

    imagemin:
      dist:
        files: [
          expand: true
          cwd: "<%= yeoman.app %>/images"
          src: "{,*/}*.{png,jpg,jpeg}"
          dest: "<%= yeoman.dist %>/images"
        ]

    svgmin:
      dist:
        files: [
          expand: true
          cwd: "<%= yeoman.app %>/images"
          src: "{,*/}*.svg"
          dest: "<%= yeoman.dist %>/images"
        ]

    cssmin: {}
    
    # This task is pre-configured if you do not wish to use Usemin
    # blocks for your CSS. By default, the Usemin block from your
    # `index.html` will take care of minification, e.g.
    #
    #     <!-- build:css({.tmp,app}) styles/main.css -->
    #
    # dist: {
    #     files: {
    #         '<%= yeoman.dist %>/styles/main.css': [
    #             '.tmp/styles/{,*/}*.css',
    #             '<%= yeoman.app %>/styles/{,*/}*.css'
    #         ]
    #     }
    # }
    htmlmin:
      dist:
        options: {}
        
        #removeCommentsFromCDATA: true,
        #                    // https://github.com/yeoman/grunt-usemin/issues/44
        #                    //collapseWhitespace: true,
        #                    collapseBooleanAttributes: true,
        #                    removeAttributeQuotes: true,
        #                    removeRedundantAttributes: true,
        #                    useShortDoctype: true,
        #                    removeEmptyAttributes: true,
        #                    removeOptionalTags: true
        files: [
          expand: true
          cwd: "<%= yeoman.app %>"
          src: "*.html"
          dest: "<%= yeoman.dist %>"
        ]

    
    # Put files not handled in other tasks here
    copy:
      docs:
        files: [
          expand: true
          cwd: "<%= yeoman.docs %>/src"
          dest: "<%= yeoman.docs %>/dist"
          src: [
            "**/*.html"
            "require.js"
            "styles/**/*.css"
          ]
        ]
      easing:
        files: [
          expand: true
          cwd: "<%= yeoman.easing %>/src"
          dest: "<%= yeoman.easing %>/dist"
          src: [
            "index.html"
            "require.js"
          ]
        ]
      dist:
        files: [
          expand: true
          dot: true
          cwd: "<%= yeoman.app %>"
          dest: "<%= yeoman.dist %>"
          src: [
            "*.{ico,png,txt}"
            ".htaccess"
            "images/{,*/}*.{webp,gif}"
            "styles/fonts/*"
            "docs/*"
            "CNAME"
          ]
        ,
          expand: true
          cwd: ".tmp/images"
          dest: "<%= yeoman.dist %>/images"
          src: ["generated/*"]
        ]

    concurrent:
      server: ["compass", "coffee:dist"]
      test: ["coffee"]
      dist: [
        "coffee"
        "compass"
        "imagemin"
        "svgmin"
        "htmlmin"
      ]

    bower:
      options:
        exclude: ["modernizr"]

      all:
        rjsConfig: "<%= yeoman.app %>/scripts/main.js"

  grunt.registerTask "server", (target) ->
    return grunt.task.run(["build", "open", "connect:dist:keepalive"])  if target is "dist"
    grunt.task.run ["clean:server", "concurrent:server", "connect:livereload", "open", "watch"]

  grunt.registerTask "test", ["clean:server", "concurrent:test", "connect:test", "mocha"]
  grunt.registerTask "build", ["clean:dist", "useminPrepare", "concurrent:dist", "concat", "cssmin", "uglify", "copy:dist", "rev", "usemin"]
  grunt.registerTask "build:easing", ["coffee:easing", "copy:easing"]
  grunt.registerTask "build:docs", ["coffee:docs", "copy:docs"]
  grunt.registerTask "server:easing", ["build:easing", "connect:easing", "watch:easing"]
  grunt.registerTask "server:docs", ["build:docs", "connect:docs", "watch:docs"]
  grunt.registerTask "default", ["jshint", "test", "build"]
