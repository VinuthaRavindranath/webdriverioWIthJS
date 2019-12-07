const { addEnvironment, addAttachment, addArgument } = require('@wdio/allure-reporter').default;
const { ensureDirSync } = require('fs-extra');


exports.config = {
    runner: 'local',
    specs: [
        './test/specs/**/loginSpecs.js'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 10,
    capabilities: [  {
        browserName: 'chrome',
        //'goog:chromeOptions': {
        //  args: ['--window-size=1280,1366'],
        //},
      },
      /* {
        browserName: 'chrome',
        'goog:chromeOptions': {
          args: ['--window-size=1024,1366'],
        },
      },
      {
        browserName: 'chrome',
        'goog:chromeOptions': {
          args: ['--window-size=768,1024'],
        },
      },
      {
        browserName: 'chrome',
        'goog:chromeOptions': {
          args: ['--window-size=320,568'],
        },
      },
      {
        browserName: 'firefox',
        'moz:firefoxOptions': {
        },
        excludeDriverLogs: ['bugreport', 'server'],
      },
      {
        browserName: 'safari',
      }, */
    ],
   
    logLevel: 'trace',
   bail: 0,
   logLevels: {
    webdriverio: 'info',
  },
  baseUrl: 'http://localhost',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: ['selenium-standalone', 'devtools'],
  framework: 'jasmine',
  reporters: ['spec', ['allure', {
    outputDir: 'allure-results',
  }]],
  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000,
  },
  beforeSuite() {
    browser.addCommand('scrollToTop', () => {
      browser.execute(() => window.scrollTo(0, 0));
    });
  },
  beforeTest() {
    addEnvironment('Environment: ', process.env.env);
    if (browser.capabilities.browserName === 'chrome') {
      addArgument('Res: ', browser.config.capabilities['goog:chromeOptions'].args[0].split('=')[1]);
    }
  },
  afterTest(test) {
    browser.deleteAllCookies();
    if (test.error !== undefined) {
      ensureDirSync(`${__dirname}/allure-results/screenshot`);
      const imagePath = `${__dirname}/allure-results/screenshot/${new Date().toUTCString()}_${browser.capabilities.browserName}.png`;
      browser.saveScreenshot(imagePath);
      addAttachment(imagePath);
    }
  },
    
    }
