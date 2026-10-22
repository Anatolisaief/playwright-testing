import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test.describe('Pruebas de la aplicación ToDoMVC', () => {
  const items = ['Comprar leche', 'Comprar pan'];
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('prueba', async () => {
    // práctica #1
    //primera tarea
    await todoPage.addTodo(items[0]);
    await todoPage.page.waitForTimeout(2000);

    //comprobar que hay 1 tarea en la lista
    await expect(todoPage.todoItems).toHaveCount(1);

    //segunda tarea
    await todoPage.addTodo(items[1]);
    await todoPage.page.waitForTimeout(2000);

    //comprobar que hay 2 tareas en la lista
    await expect(todoPage.todoItems).toHaveCount(2);
  });

  test('prueba2', async () => {
    // práctica #2
    await todoPage.addTodo(items[0]);

    //comprobar que el campo de entrada está vacío
    await expect(todoPage.inputField).toHaveValue('');
  });

  test('prueba4', async () => {
    // práctica #4
    const items = ['manzanas', 'cerezas', 'peras'];

    // Agregar varias tareas a la lista
    await todoPage.addTodos(items);

    //contar los elementos de la lista
    await expect(todoPage.todoItems).toHaveCount(items.length);

    //comprobar que el contador de tareas pendientes muestra el número correcto
    await expect(todoPage.todoCount).toContainText('3 items left');

    //verificar que el contador de tareas pendientes muestra el número correcto usando un selector más específico
    await expect(todoPage.todoCountStrong).toHaveText('3');
  });

  test('prueba6', async () => {
    const items = ['manzanas', 'cerezas', 'peras'];

    // Agregar varias tareas a la lista
    await todoPage.addTodos(items);

    //marcar todas como completadas
    await todoPage.markAllAsComplete();

    //comprobar que todas están completadas
    await expect(todoPage.completedItems).toHaveCount(items.length);
  });
});

test.describe('Practica 8', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addTodos(['manzanas', 'cerezas', 'peras']);
  });

  test('prueba8', async () => {
    //marcar todas como completadas
    await todoPage.markAllAsComplete();

    //comprobar que todas están completadas
    await expect(todoPage.completedItems).toHaveCount(3);
  });

  test('prueba9', async () => {
    //marcar todas las tareas
    await todoPage.markAllAsComplete();
    //desmarcarlas
    await todoPage.unmarkAllAsComplete();

    //comprobar
    await expect(todoPage.completedItems).toHaveCount(0);
  });

  
  
});
