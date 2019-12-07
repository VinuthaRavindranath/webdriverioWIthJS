const urls = require('../data/environment');

class Page{
    open(url) {
        const actualUrl = url ? urls[process.env.env] + url : urls[process.env.env];
    browser.url(actualUrl);

    }
    get loaderAnimation() {
        return $('.lds-ring');
      }
    
      waitUntilPageLoads() {
        browser.waitUntil(() => {
          return !this.loaderAnimation.isDisplayed();
        }, 15000, 'Page is still loading');
      }
    }
    
    module.exports = Page;