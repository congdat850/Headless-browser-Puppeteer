// file 24h.js
const puppeteer = require("puppeteer");

module.exports = async () => {
  // mở trình duyệt
  const browser = await puppeteer.launch({ headless: false });
  // Mở 1 page mới
  const page = await browser.newPage();
  // đi đến trang 24h
  await page.goto("https://24h.com.vn");
  // chụp ảnh màn hình và lưu lại với tên 24h.png
  await page.screenshot({ path: "./img/24h.png" });
  // Lưu ảnh màn hình thành file pdf
  //   await page.pdf({path: 'hn.pdf', format: 'A4'});

  // tắt trình duyệt
  await browser.close();
};
