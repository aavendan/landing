const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const url = 'http://localhost:5173'; // URL local del proyecto Vite
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  const report = await page.evaluate(() => {
    const result = {
      hasResponsiveClasses: /(?:sm:|md:|lg:|xl:|2xl:)/.test(document.documentElement.innerHTML),
      usesFlexColToRow: /flex-col.*(?:md|@md):flex-row/.test(document.documentElement.innerHTML),
      usesMaxWidth: /max-w-(?:sm|md|lg|xl|2xl|screen-[a-z]+)/.test(document.documentElement.innerHTML),
      usesContainer: /container.*mx-auto/.test(document.documentElement.innerHTML),
      usesVisibilityControl: /(sm:)?hidden|block|sm:block|md:hidden/.test(document.documentElement.innerHTML),
    };
    return result;
  });

  console.log('📊 Reporte de evaluación automática (Vite local):');
  console.table(report);
  
  await browser.close();
  fs.writeFileSync('reporte.json', JSON.stringify(report, null, 2));
})();
