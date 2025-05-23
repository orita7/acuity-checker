import puppeteer from "puppeteer";

// Launch the browser and open a new blank page
const browser = await puppeteer.launch();
const page = await browser.newPage();

try {
  // Navigate the page to a URL.
  await page
    .goto(
      "https://app.acuityscheduling.com/schedule/7f921de7/appointment/10781659/calendar/3106967?calendarIds=3106967"
    )
    .then(() => console.log("Opened page"));
} catch (error) {
  console.log(error);
} finally {
  await browser.close().then(() => console.log("C page"));
}
