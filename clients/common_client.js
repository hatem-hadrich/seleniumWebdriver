const {getClient, webdriver, By, until} = require('../clientDriver.js')

let path = require('path');
let fs = require('fs');

global.tab = [];
global.isOpen = false;
global.param = [];

class CommonClient {
  constructor() {
    this.client = getClient();
  }

  linkAccess(link) {
    return this.client.get(link);
  }

  // open() {
  //   if (headless !== 'undefined' && headless) {
  //     return this.client.init().windowHandleSize({width: 1280, height: 899});
  //   } else {
  //     return this.client.manage().window().maximize();
  //   }
  // }

  quit() {
    return this.client.quit();
  }

  waitAndSetValue(selector, value) {
    return this.client.findElement(webdriver.By.name(selector)).sendKeys(value, webdriver.Key.ENTER);
  }

  WaitAndClickButton(selector) {
    return this.client.findElement(webdriver.By.tagName(selector)).click();
  }

  checkPageTitle() {
    return this.client.getTitle().then((title) => {
      expect(title).to.equal('Selenium - Web Browser Automation');
    });
  }

  checkTextValue(selector, value) {
    return this.client.findElements(webdriver.By.xpath(selector.replace('%T', value))).then((list) => {
      expect(list.length > 0, "Text not found!").to.be.true;
    })
  }
}

module.exports = CommonClient;
