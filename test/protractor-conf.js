exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'e2e/*.js'
  ],

  capabilities: {
    'browserName': 'chrome',
    //'browserName.binary.path': 'd:/'
  },

  //chromeOnly: true,

  baseUrl: 'http://localhost:85/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },
  onPrepare: function() {
    //browser.driver.manage().window().setPosition(0, 0);
    //browser.driver.manage().window().setSize(1920, 1080);
  }
};
