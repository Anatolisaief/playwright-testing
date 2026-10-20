import { test, expect } from '@playwright/test';

/*
test('abre la pagina de Playwright', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.waitForTimeout(2000);

  //Buscar y hacer click en el enlace de "Get Started"
  const enlaceGetStarted = page.locator('a.getStarted_Sjon');
  await enlaceGetStarted.click();
  await page.waitForTimeout(2000);
  
});*/

test('prueba', async ({ page }) => {
  // práctica #1
  
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.waitForTimeout(2000);

  const inputField = page.getByPlaceholder('What needs to be done?');
  const items = ['Comprar leche', 'Comprar pan'];

  //primera tarea
  await inputField.fill(items[0]);
  await inputField.press('Enter');
  await page.waitForTimeout(2000);

  //comprobar que hay 1 tarea en la lista
  await expect(page.locator('ul.todo-list li')).toHaveCount(1);

  //segunda tarea
  await inputField.fill(items[1]);
  await inputField.press('Enter');
  await page.waitForTimeout(2000);

  //comprobar que hay 2 tareas en la lista
  await expect(page.locator('ul.todo-list li')).toHaveCount(2);

  });