
const puppeteer = require('puppeteer');
const CREDS = require('./creds');

async function run() {
const userToSearch = 'john';
//const searchUrl = `https://github.com/search?q=${userToSearch}&type=Users&utf8=%E2%9C%93`;
const searchUrl = 'https://github.com/search?q=john&type=Users&utf8=%E2%9C%93';
const LIST_USERNAME_SELECTOR = '#user_search_results > div.user-list > div:nth-child(1) > div.d-flex > div > a';
const LIST_EMAIL_SELECTOR = '#user_search_results > div.user-list > div:nth-child(2) > div.d-flex > div > ul > li:nth-child(2) > a';

const LENGTH_SELECTOR_CLASS = 'user-list-item';

const browser = await puppeteer.launch({
  headless: false
});
const page = await browser.newPage()
await page.goto('https://github.com');
await page.screenshot({ path: 'screenshots/github.png' });

await page.goto('https://github.com/login');

const USERNAME_SELECTOR = '#login_field';
const PASSWORD_SELECTOR = '#password';
const BUTTON_SELECTOR = '#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block';

await page.click(USERNAME_SELECTOR);
await page.keyboard.type(CREDS.username);

await page.click(PASSWORD_SELECTOR);
await page.keyboard.type(CREDS.password);

await page.click(BUTTON_SELECTOR);

//await page.waitForNavigation();

await page.goto(searchUrl);
await page.waitFor(2*1000);

  browser.close();

}


run();
