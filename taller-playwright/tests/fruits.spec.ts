import { test, expect } from '@playwright/test';

test('prueba13', async ({page}) => {
    await page.route('**/api/v1/fruits', async (route) => {
        route.fulfill({
            json: [{ name: 'Manzana', id: 100 }]
        });
    });

    await page.goto('https://demo.playwright.dev/api-mocking');
    await expect(page.getByText('Manzana')).toBeVisible();

    
});

test('prueba13_1', async ({page}) => {
    await page.route('**/api/v1/fruits', async (route) => {
        const response = await route.fetch();
        const json = await response.json();
        json.push({ name: 'Pera', id: 101 })
        await route.fulfill({ response, json });
    });

    await page.goto('https://demo.playwright.dev/api-mocking');
    await expect(page.getByText('Pera', { exact: true })).toBeVisible();
    
});