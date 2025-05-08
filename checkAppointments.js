const puppeteer = require("puppeteer");
const config = require("./config");
const fs = require("fs");

async function checkAvailability() {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // Navigate the page to a URL.
    [
      "screenshots/first.png",
      "screenshots/second.png",
      "screenshots/third.png",
    ].forEach((file) => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    });
    await page.goto(config.URL).then(() => console.log("Opened page"));
    await page.screenshot({ path: "screenshots/first.png", fullPage: true });
    await page.waitForSelector("button.react-calendar__navigation__label", {
      visible: true,
    });
    const datesButton = await page.$(
      "button.react-calendar__navigation__label"
    );
    await page.evaluate((el) => el.click(), datesButton);
    await page.screenshot({ path: "screenshots/second.png", fullPage: true });
    await page.waitForSelector(`[aria-label="${config.MONTH} ${config.YEAR}"]`);
    const monthButton = await page.$(
      `[aria-label="${config.MONTH} ${config.YEAR}"]`
    );
    await page.evaluate((el) => el.click(), monthButton);
    await page.waitForSelector(".react-calendar__month-view__days", {
      visible: true,
    });
    await page.screenshot({ path: "screenshots/third.png", fullPage: true });
  } catch (error) {
    console.log(error);
  } finally {
    await browser.close().then(() => console.log("Closed page"));
  }
}

checkAvailability();
