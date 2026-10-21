import { test, expect, Page } from '@playwright/test';

/*
test('abre la pagina de Playwright', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.waitForTimeout(2000);

  //Buscar y hacer click en el enlace de "Get Started"
  const enlaceGetStarted = page.locator('a.getStarted_Sjon');
  await enlaceGetStarted.click();
  await page.waitForTimeout(2000);
  
});*/

//práctica 8
async function crearTareas(page: Page){
  const inputField = page.getByPlaceholder('What needs to be done?');
    const items = ['manzanas', 'cerezas', 'peras'];

    // Agregar varias tareas a la lista
    for (const item of items) {
      await inputField.fill(item);
      await inputField.press('Enter');
    }
}

test.describe('Pruebas de la aplicación ToDoMVC', () => {
  const items = ['Comprar leche', 'Comprar pan'];

  test.beforeEach(async ({ page }) => {
    await page.goto('./');
  });




  
  test('prueba', async ({ page }) => {
    // práctica #1
    const inputField = page.getByPlaceholder('What needs to be done?');
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

  test('prueba2', async ({ page }) => {
    // práctica #2

    const inputField = page.getByPlaceholder('What needs to be done?');

    await inputField.fill(items[0]);
    await inputField.press('Enter');

    //comprobar que el campo de entrada está vacío
    await expect(inputField).toHaveValue('');

  });

  test('prueba4', async ({ page }) => {

    // práctica #4
    const inputField = page.getByPlaceholder('What needs to be done?');
    const items = ['manzanas', 'cerezas', 'peras'];

    // Agregar varias tareas a la lista
    for (const item of items) {
      await inputField.fill(item);
      await inputField.press('Enter');
    }

    //contar los elementos de la lista
    await expect(page.locator('ul.todo-list li')).toHaveCount(items.length);

    //comprobar que el contador de tareas pendientes muestra el número correcto
    await expect(page.locator('.todo-count')).toContainText("3 items left");

    //verificar que el contador de tareas pendientes muestra el número correcto usando un selector más específico
    await expect(page.locator('.todo-count strong')).toHaveText('3');
    

  });

  test('prueba6', async ({ page }) => {

    const inputField = page.getByPlaceholder('What needs to be done?');
    const items = ['manzanas', 'cerezas', 'peras'];

    // Agregar varias tareas a la lista
    for (const item of items) {
      await inputField.fill(item);
      await inputField.press('Enter');
    }

    //marcar todas como completadas
    await page.getByRole('checkbox', { name: 'Mark all as complete' }).check();

    //comprobar que todas están completadas
    await expect(page.locator('ul.todo-list li.completed')).toHaveCount(items.length);


  });


});

test.describe('Practica 8', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('./');
    await crearTareas(page);
  });

  test('prueba8', async ({ page }) => {
    //marcar todas como completadas
    await page.getByRole('checkbox', { name: 'Mark all as complete' }).check();

    //comprobar que todas están completadas
    await expect(page.locator('ul.todo-list li.completed')).toHaveCount(3);

  });

  test('prueba9', async ({ page }) => {
    const checkbox = page.getByRole('checkbox', {name: 'Mark all as complete'});

    //marcar todas las tareas
    await checkbox.check();
    //desmarcarlas
    await checkbox.uncheck();

    //comprobar
    await expect(page.locator('ul.todo-list li.completed')).toHaveCount(0);


  });
});