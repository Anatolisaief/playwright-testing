import { Page, Locator } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly inputField: Locator;
  readonly todoItems: Locator;
  readonly completedItems: Locator;
  readonly todoCount: Locator;
  readonly todoCountStrong: Locator;
  readonly markAllCompleteCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputField = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.locator('ul.todo-list li');
    this.completedItems = page.locator('ul.todo-list li.completed');
    this.todoCount = page.locator('.todo-count');
    this.todoCountStrong = page.locator('.todo-count strong');
    this.markAllCompleteCheckbox = page.getByRole('checkbox', { name: 'Mark all as complete' });
  }

  async goto() {
    await this.page.goto('./');
  }

  async addTodo(text: string) {
    await this.inputField.fill(text);
    await this.inputField.press('Enter');
  }

  async addTodos(items: string[]) {
    for (const item of items) {
      await this.addTodo(item);
    }
  }

  async markAllAsComplete() {
    await this.markAllCompleteCheckbox.check();
  }

  async unmarkAllAsComplete() {
    await this.markAllCompleteCheckbox.uncheck();
  }
}
