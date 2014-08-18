gulp = require "gulp"
mocha = require "gulp-mocha"
coffee = require "gulp-coffee"
wrap = require "gulp-wrap"

gulp.task "compile", ->
  gulp.src("src/*")
    .pipe coffee(bare: true)
    .pipe wrap({src: "wrapper.js"}, {name: "eter"})
    .pipe gulp.dest("build/")

gulp.task "test", ->
  gulp.src("test/*", read: false)
    .pipe mocha()

gulp.task "watch", ->
  gulp.watch "src/*", ["test"]
  gulp.watch "test/*", ["test"]

gulp.task "default", ["test"]
