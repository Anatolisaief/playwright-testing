import { test, expect } from '@playwright/test';

test('abre la pagina de Playwright', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.waitForTimeout(2000);

  //Buscar y hacer click en el enlace de "Get Started"
  const enlaceGetStarted = page.locator('a.getStarted_Sjon');
  await enlaceGetStarted.click();
  await page.waitForTimeout(2000);
});