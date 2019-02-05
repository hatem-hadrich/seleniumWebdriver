'use strict';

//require('./globals.webdriver.js')
var webdriver = require('selenium-webdriver'),
    chromeCapabilities = webdriver.Capabilities.chrome(),
    path = require('chromedriver').path,
    chrome = require('selenium-webdriver/chrome');
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


        var service = new chrome.ServiceBuilder(path).build();
        chrome.setDefaultService(service);
        service.HideCommandPromptWindow = true;

        var chromeOptions = {
          //'browserName': 'chrome',
          'args': ['--headless', '--no-sandbox', '--disable-dev-shm-usage', 'disable-infobars'/*, '--disable-setuid-sandbox'*/]
          //'binary': path
        };
        chromeCapabilities.set('chromeOptions', chromeOptions);

        client = new webdriver.Builder()
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
