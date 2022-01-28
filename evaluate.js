const puppeteer = require("puppeteer");

module.exports = async () => {
  const browser = await puppeteer.launch(); // default headless: true
  const page = await browser.newPage();
  await page.goto("https://24h.com.vn");

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
    };
  });
  console.log("Dimensions:", dimensions);
  await browser.close();
};
