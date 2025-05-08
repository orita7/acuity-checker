const puppeteer = require("puppeteer");
const fs = require("fs");
const URL =
  "https://app.acuityscheduling.com/schedule/7f921de7/appointment/10781659/calendar/3106967?calendarIds=3106967";

async function checkAvailability() {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // Navigate the page to a URL.
    await page.goto(URL).then(() => console.log("Opened page"));
    ["first.png", "second.png", "third.png"].forEach((file) => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    });
    await page.screenshot({ path: "first.png", fullPage: true });
    await page.waitForSelector("button.react-calendar__navigation__label", {
      visible: true,
    });
    const datesButton = await page.$(
      "button.react-calendar__navigation__label"
    );
    await page.evaluate((el) => el.click(), datesButton);
    await page.screenshot({ path: "second.png", fullPage: true });
    await page.waitForSelector('[aria-label="May 2025"]');
    const monthButton = await page.$('[aria-label="May 2025"]');
    await page.evaluate((el) => el.click(), monthButton);
    await page.waitForSelector(".react-calendar__month-view__days", {
      visible: true,
    });
    await page.screenshot({ path: "third.png", fullPage: true });
  } catch (error) {
    console.log(error);
  } finally {
    await browser.close().then(() => console.log("Closed page"));
  }
}

checkAvailability();
