const page = require('./page');
const user = require('../data/user');
const isMobileResolution = require('../helpers/resolution')

class login extends page {
open() {
    super.open();
    browser.pause(3000);
}

get userName() {
    return $('//div[@class="mat-form-field-infix"][contains(.,"Username")]');
  }

  get password() {
    return $('//input[@placeholder="Password"]');
  }

  get loginBtn() {
    return $('//span[@class="mat-button-wrapper"][contains(.,"Login")]');
  }

  loginWithValidCredentials() {
      this.userName.addValue(user.email);
      this.password.addValue(user.password);
      this.loginBtn.click();
      super.waitUntilPageLoads();
      return this.userName.getText();

  }
}

module.exports = new LoginPage();