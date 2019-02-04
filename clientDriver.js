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
          //'browserName': 'chrome',
          'args': ['--headless', '--disable-gpu', '--no-sandbox', '--disable-http2'/*, '--disable-setuid-sandbox'*/]
          //'binary': path
        };
        chromeCapabilities.set('chromeOptions', chromeOptions);

        client = new webdriver.Builder()
          .forBrowser('chrome')
          .usingServer("http://192.168.99.100:4444/wd/hub")
          .withCapabilities(chromeCapabilities)
          .build();
        return client;
      } else {
        client = new webdriver.Builder()
          .withCapabilities(chromeCapabilities)
          .build();
        return client;
      }
    }
  }
}
