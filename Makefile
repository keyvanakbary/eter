NPM_EXECUTABLE_HOME := node_modules/.bin

PATH := ${NPM_EXECUTABLE_HOME}:${PATH}

test: build
	@mocha build/test/

dist: build
	@browserify build/src/bundle.js -o dist/eter.js && uglifyjs dist/eter.js -o dist/eter.min.js

lib: build
	@cp -R build/src lib && rm lib/bundle.*

build:
	@tsc

clean:
	@rm -rf build lib

deps:

.PHONY: all
