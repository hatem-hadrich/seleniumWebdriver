'use strict'

var argv = require('minimist')(process.argv.slice(2));

global.headless = argv.HEADLESS || false;
