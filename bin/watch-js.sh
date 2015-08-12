#!/bin/bash
parallelshell "watchify ./src/assets/js/main.js -t babelify -o 'exorcist ./dest/assets/js/bundle.js.map > ./dest/assets/js/bundle.js' -v -d" "watch 'npm run lint:js' ./src/assets/js/"
