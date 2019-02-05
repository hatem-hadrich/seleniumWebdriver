//let {CommonClient} = require('../clients/common_client.js');

// beforeAll(() => {
//   const client = new CommonClient();
// })
'use strict';

scenario('Check text in selenium site', () => {
  scenario('Open the browser then go to selenium site', client => {
    //test('should open the browser', async () => await client.open());
    test('should go to selenium site', () => client.linkAccess('https://www.google.com/'));
  }, 'common_client');
  scenario('Close the browser', client => {
    test('should put the title', () => client.waitAndSetValue('q', 'selenium'));
    test('should click on first result link', () => client.WaitAndClickButton('h3'));
    test('should check page title', () => client.checkPageTitle('Selenium - Web Browser Automation'));
    test('should check the existance of "What is Selenium?"', () => client.checkTextValue("//*[contains(text(), '%T')]", 'What is Selenium?'));
  }, 'common_client');
}, 'common_client', true);
