const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://drive.google.com/drive/folders/1BfNWcBSNDD7Qixgd0X5qw_iiwA5fbnPn?usp=sharing', { waitUntil: 'networkidle2' });
  
  // wait 5 seconds to be sure
  await new Promise(r => setTimeout(r, 5000));

  const files = await page.evaluate(() => {
    const results = [];
    // This is the common aria-label format for Google Drive files in grid/list view
    const items = document.querySelectorAll('div[data-id]');
    for (let item of items) {
      const id = item.getAttribute('data-id');
      const name = item.getAttribute('aria-label');
      if (id && name) {
        results.push({ id, name, link: `https://drive.google.com/file/d/${id}/view?usp=sharing` });
      }
    }
    return results;
  });

  console.log(JSON.stringify(files, null, 2));

  await browser.close();
})();
