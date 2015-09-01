exports.config = {
  //allScriptsTimeout: 11000,

  specs: [
    'e2e/*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
    /*'browserName': 'firefox',*/
  },

  //chromeOnly: true,

  baseUrl: 'http://localhost:85/',

  framework: 'jasmine',

  //jasmineNodeOpts: {
  //  defaultTimeoutInterval: 30000
  //},
  onPrepare: function() {
    browser.driver.manage().window().setPosition(0, 0);
    browser.driver.manage().window().setSize(1360, 768);
  }
};
