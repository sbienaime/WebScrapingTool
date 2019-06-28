
const puppeteer = require('puppeteer');
var csv = require('csv');
var obj = csv();
const CREDS = require('./creds');
const fs = require('fs');



function MyCSV(Fone, Ftwo, Fthree) {
    this.FieldOne = Fone;
};
var MyData = [];




async function run(current_item) {
  itemID=current_item;
const title_selector=  '#page-container > div > div.row-fluid.row2 > div.span17.col1 > div.productheadermodule-page > header > div > h1';
const userToSearch = 'john';
const searchUrl = `https://github.com/search?q=${userToSearch}&type=Users&utf8=%E2%9C%93`;
//const searchUrl = 'https://github.com/search?q=john&type=Users&utf8=%E2%9C%93';
const LIST_USERNAME_SELECTOR = '#user_search_results > div.user-list > div:nth-child(1) > div.d-flex > div > a';
const LIST_EMAIL_SELECTOR = '#user_search_results > div.user-list > div:nth-child(2) > div.d-flex > div > ul > li:nth-child(2) > a';
//const itemID ='032W002768444001P';
const LENGTH_SELECTOR_CLASS = 'user-list-item';

const browser = await puppeteer.launch({
  headless: false
});
const page = await browser.newPage()
//await page.goto('https://sears.com');
await page.screenshot({ path: 'screenshots/sears.png' });

await page.goto('https://sears.com/search='+itemID);

const USERNAME_SELECTOR = '#login_field';
const PASSWORD_SELECTOR = '#password';
const BUTTON_SELECTOR = '#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block';
await page.waitFor(3*1000);

let description = await page.evaluate((sel) => {
        let element = document.querySelector(sel);
        return element? element.innerHTML: null;
      }, title_selector);

console.log(description);
//await page.click(USERNAME_SELECTOR);
//await page.keyboard.type(CREDS.username);

//await page.click(PASSWORD_SELECTOR);

//await page.keyboard.type(CREDS.password);

//await page.click(BUTTON_SELECTOR);

//await page.waitForNavigation();

//await page.goto(searchUrl);
fs.appendFile("descriptions/descriptions.txt", description+" \n ", function(err) {
    if(err) {
       return console.log(err);
    }

    console.log("The file was saved!");
});

  browser.close();

}

obj.from.path('ssid.csv').to.array(function (data) {
    for (var index = 0; index < data.length; index++) {
     MyData.push(new MyCSV(data[index]));
       run(data[index].toString());
      // console.log(data[index].toString());
    }

    console.log(MyData);
});
