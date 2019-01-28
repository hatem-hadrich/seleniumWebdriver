var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

    const chai = require('chai');
    chai.use(require('chai-string'));
    global.expect = chai.expect;
    var assert = require('chai').assert;

    var chrome = require('selenium-webdriver/chrome');
    var path = require('chromedriver').path;

    var service = new chrome.ServiceBuilder(path).build();
    chrome.setDefaultService(service);

    (async () => {
      var driver = await new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
      await driver.get('https://www.google.com/');
      await driver.findElement(webdriver.By.name('q')).sendKeys('selenium', webdriver.Key.ENTER);

      //await driver.wait(webdriver.until.elementLocated(webdriver.By.linkText('Selenium - Web Browser Automation')));
      await driver.findElement(webdriver.By.tagName('h3')).click();

      const title = await driver.getTitle();
      expect(title).to.equal('Selenium - Web Browser Automation');

      var list = await driver.findElements(webdriver.By.xpath("//*[contains(text(),'What is Selenium?')]"));
      expect(list.length > 0, "Text not found!").to.be.true;

      await driver.sleep(1000);
      await driver.quit();
    })
    ().catch((e) => console.log(e));
