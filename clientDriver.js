'use strict';

//require('./globals.webdriver.js')
var webdriver = require('selenium-webdriver'),
    chromeCapabilities = webdriver.Capabilities.chrome();
let client;
module.exports = {
  webdriver: webdriver,
  By: webdriver.By,
  until: webdriver.until,
  BrowserPath: require('chromedriver').path,
  chromeCapabilities: chromeCapabilities,
  getClient: function () {
    if (client) {
      return client;
    } else {
      //setting chrome options to start the browser fully maximized
      if(global.headless === 'true') {
        var chromeOptions = {
          'args': ['--headless', '--disable-gpu', '--no-sandbox'/*, '--disable-setuid-sandbox'*/],
          //'binary': path
        };
        chromeCapabilities.set('chromeOptions', chromeOptions);
      }

      client = new webdriver.Builder()
        .withCapabilities(chromeCapabilities)
        .build();
      return client;
    }
  }
}
