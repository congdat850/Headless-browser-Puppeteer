const puppeteer = require("puppeteer");
(async () => {
  let articles;

  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 720 });
    await page.goto("https://24h.com.vn");

    articles = await page.evaluate(() => {
      let titles = document.querySelectorAll("div.bxDoC header.nwsTit a");
      let ar_title = [];
      titles.forEach((item) => {
        ar_title.push({
          href: item.getAttribute("href").trim(),
          title: item.getAttribute("title").trim(),
        });
      });
      return ar_title;
    });

    console.log(articles);
    await browser.close();
  } catch (error) {
    console.log("Catch : " + error);
  }

  let i = 0;

  const browser = await puppeteer.launch({ headless: false });
  await Promise.all(
    articles.map((item) => {
      return browser.newPage().then(async (page) => {
        console.log("item ne", item);
        await page.goto(item.href);

        let title = await page.evaluate(() => {
          return document.querySelector("p.baiviet-sapo").innerText;
        });

        i++;
        console.log(i + ": ", title);
        await page.close();
      });
    })
  );
})();
