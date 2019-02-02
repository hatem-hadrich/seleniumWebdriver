require('./globals.webdriver.js')
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

    const chai = require('chai');
    chai.use(require('chai-string'));
    global.expect = chai.expect;
    var assert = require('chai').assert;

    var chrome = require('selenium-webdriver/chrome');
    var path = require('chromedriver').path;

    // if(global.headless === 'true') {
    //   //path = _projectdir + '/node_modules/chromedriver/lib/chromedriver/chromedriver';
    //   //path = _projectdir + '\\node_modules\\chromedriver\\lib\\chromedriver\\chromedriver.exe';
    //   //path = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    // }

    // var service = new chrome.ServiceBuilder(path).build();
    // chrome.setDefaultService(service);

    (async () => {
      var chromeCapabilities = webdriver.Capabilities.chrome();
      //setting chrome options to start the browser fully maximized
      if(global.headless === 'true') {
        var chromeOptions = {
          'args': ['--headless', '--disable-gpu', '--no-sandbox'/*, '--disable-setuid-sandbox'*/],
          //'binary': path
        };
        chromeCapabilities.set('chromeOptions', chromeOptions);
      }

      var driver = new webdriver.Builder()
        .withCapabilities(chromeCapabilities)
        .build();


      await driver.get('https://www.google.com/');
      await driver.findElement(webdriver.By.name('q')).sendKeys('selenium', webdriver.Key.ENTER);

      await driver.findElement(webdriver.By.tagName('h3')).click();

      const title = await driver.getTitle();
      expect(title).to.equal('Selenium - Web Browser Automation');

      var list = await driver.findElements(webdriver.By.xpath("//*[contains(text(),'What is Selenium?')]"));
      expect(list.length > 0, "Text not found!").to.be.true;

      await driver.sleep(1000);
      await driver.quit();
    })
    ().catch((e) => console.log(e));
