#!/bin/bash
bower install && cp -v ./bower_components/bootstrap-sass/assets/stylesheets/_bootstrap.scss ./src/assets/css/_bootstrap.scss && cp -v ./bower_components/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss ./src/assets/css/_variables.scss && gulp build:pre && mkdir -v -p ./dest/assets/js
