"use strict"
LIVERELOAD_PORT = 35729
lrSnippet = require("connect-livereload")(port: LIVERELOAD_PORT)
mountFolder = (connect, dir) ->
  connect.static require("path").resolve(dir)

module.exports = (grunt) ->
  
  # load all grunt tasks
  require("matchdep").filterDev("grunt-*").forEach grunt.loadNpmTasks
  
  # configurable paths
  yeomanConfig =
    app: "app"
    dist: "dist"

  grunt.initConfig
    yeoman: yeomanConfig
    watch:
      coffee:
        files: ["<%= yeoman.app %>/scripts/**/*.coffee"]
        tasks: ["coffee:dist"]

      compass:
        files: ["<%= yeoman.app %>/styles/{,*/}*.{scss,sass}"]
        tasks: ["compass:server"]

      livereload:
        options:
          livereload: LIVERELOAD_PORT

        files: [
          "<%= yeoman.app %>/*.html"
          "{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css"
          "{.tmp,<%= yeoman.app %>}/scripts/**/*.js"
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

      dist:
        options:
          middleware: (connect) ->
            [mountFolder(connect, yeomanConfig.dist)]

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
      ]

    coffee:
      dist:
        files: [
          expand: true
          cwd: "<%= yeoman.app %>/scripts"
          src: "**/*.coffee"
          dest: ".tmp/scripts"
          ext: ".js"
        ]

    compass:
      options:
        sassDir: "<%= yeoman.app %>/styles"
        cssDir: ".tmp/styles"
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

    
    requirejs:
      dist:
        # Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options:
          baseUrl: ".tmp/scripts/docs"
          optimize: "none"
          out: "<%= yeoman.dist %>/scripts/docs.min.js"
          paths:
            plunder: "../../../<%= yeoman.app %>/bower_components/plunder/dist/plunder.min"
          preserveLicenseComments: false
          useStrict: true
          wrap: true
          almond: true
          name: "main"
    
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

      html: [
        "<%= yeoman.app %>/index.html"
        "<%= yeoman.app %>/docs/index.html"
        "<%= yeoman.app %>/docs/easing/index.html"
      ]

    usemin:
      options:
        dirs: [
          "<%= yeoman.dist %>"
          "<%= yeoman.dist %>/docs"
          "<%= yeoman.dist %>/docs/easing"
        ]

      html: [
        "<%= yeoman.dist %>/index.html"
        "<%= yeoman.dist %>/docs/index.html"
        "<%= yeoman.dist %>/docs/easing/index.html"
      ]
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
          src: [
            "index.html"
          ]
          dest: "<%= yeoman.dist %>"
        ]

    
    # Put files not handled in other tasks here
    copy:
      dist:
        files: [
          expand: true
          dot: true
          cwd: "<%= yeoman.app %>"
          dest: "<%= yeoman.dist %>"
          src: [
            "*.{ico,png,txt}"
            "images/{,*/}*.{webp,gif}"
            "styles/fonts/*"
            "CNAME"
            "docs/index.html"
            "docs/easing/index.html"
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

  grunt.registerTask "build", ["clean:dist", "useminPrepare", "concurrent:dist", "requirejs:dist", "concat", "cssmin", "uglify", "copy:dist", "rev", "usemin"]
  grunt.registerTask "default", ["jshint", "test", "build"]
