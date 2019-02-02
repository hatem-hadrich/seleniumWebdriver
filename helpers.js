'use strict';

const chai = require('chai');
chai.use(require('chai-string'));
require('./globals.webdriver.js');
global.expect = chai.expect;

global.test = (name, instructions) => it(name, () => {
  return instructions().catch();
});

global.scenario = (name, tests, clientName, close = false) =>
  describe(name, () => {
    const CommonClient = require("./clients/" + clientName);
    const client = new CommonClient();
    before(() => this.client = client);
    tests(client);
    if (close) {
      after(() => this.client.quit());
    }
  });
