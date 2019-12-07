function isMobileResolution() {
    if (!browser.isMobile && browser.capabilities.browserName === 'chrome') {
      return browser.config.capabilities['goog:chromeOptions'].args[0].split('=')[1].split(',')[0] < 1023;
    } else if (!browser.isMobile && browser.capabilities.browserName === 'firefox') {
      return false;
    } else if (browser.isMobile) {
      return true;
    } else if (browser.capabilities.browserName === 'Safari') {
      browser.maximizeWindow();
      return false;
    }
  }
  
  module.exports = isMobileResolution();
  