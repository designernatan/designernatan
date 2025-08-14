
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.alura.com.br/planos-cursos-online');
  await page.screenshot({ path: 'meusite-screenshot.png', fullPage: true });
  await browser.close();
})();
