import { browser, by, element, Key } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  async selectEnterKey() {
    await browser.actions().sendKeys(Key.ENTER).perform();
  }

  async selectNextKey() {
    await browser.actions().sendKeys(Key.ARROW_RIGHT).perform();
  }

  async selectPrevKey() {
    await browser.actions().sendKeys(Key.ARROW_LEFT).perform();
  }
}
