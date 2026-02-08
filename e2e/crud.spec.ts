import { test, expect } from "@playwright/test";

test.describe("Task CRUD Operations", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto("/");
    // Wait for tasks to load
    await page.waitForLoadState("networkidle");
  });

  test("CREATE: should add a new task", async ({ page }) => {
    // Click the "Add Task" button
    await page.click('button:has-text("Add Task")');

    // Wait for dialog to appear
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    // Fill in the task form
    await page.fill('input[id="title"]', "Test E2E Task");
    await page.fill("textarea", "This is an E2E test task");

    // Set priority
    await page.click('button:has-text("Medium")');

    // Click Save button
    await page.click('button:has-text("Save")');

    // Verify task appears in the list
    await expect(page.locator("text=Test E2E Task")).toBeVisible({
      timeout: 5000,
    });
  });

  test("READ: should display all tasks", async ({ page }) => {
    // Verify tasks are visible
    const tasks = await page.locator('[class*="cursor-pointer"]').count();
    expect(tasks).toBeGreaterThan(0);

    // Check for task elements
    const taskElements = page.locator("h3"); // TaskCard component uses h3 for title
    expect(await taskElements.count()).toBeGreaterThan(0);
  });

  test("UPDATE: should edit an existing task", async ({ page }) => {
    // Click on first task
    await page.click('[class*="cursor-pointer"]');

    // Wait for dialog
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    // Update the title
    const titleInput = page.locator('input[id="title"]');
    await titleInput.clear();
    await titleInput.fill("Updated E2E Task");

    // Save changes
    await page.click('button:has-text("Save")');

    // Verify update
    await expect(page.locator("text=Updated E2E Task")).toBeVisible({
      timeout: 5000,
    });
  });

  test("DELETE: should remove a task", async ({ page }) => {
    // Get initial task count
    const initialtaskCount = await page
      .locator('[class*="cursor-pointer"]')
      .count();

    // Click on a task to open dialog
    await page.click('[class*="cursor-pointer"]');

    // Wait for dialog
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    // Click delete button
    await page.click('button:has-text("Delete")');

    // Confirm deletion if there's a confirmation dialog
    const confirmButton = page.locator('button:has-text("Delete")').nth(1);
    if (await confirmButton.isVisible()) {
      await confirmButton.click();
    }

    // Verify task count decreased
    await page.waitForTimeout(1000);
    const finalTaskCount = await page
      .locator('[class*="cursor-pointer"]')
      .count();
    expect(finalTaskCount).toBeLessThan(initialtaskCount);
  });

  test("should toggle task completion status", async ({ page }) => {
    // Find a task with a checkbox
    const checkbox = page.locator('input[role="checkbox"]').first();

    // Click the checkbox
    await checkbox.click();

    // Verify the checkbox state changed
    const isChecked = await checkbox.isChecked();
    expect(isChecked).toBe(true);
  });

  test("should switch between views (board, list, timeline)", async ({
    page,
  }) => {
    // Switch to List view
    await page.click('button:has-text("List")');
    await expect(page.locator("table")).toBeVisible({ timeout: 5000 });

    // Switch to Timeline view
    await page.click('button:has-text("Timeline")');
    await expect(page.locator('[class*="timeline"]')).toBeVisible({
      timeout: 5000,
    });

    // Switch back to Board view
    await page.click('button:has-text("Board")');
    await expect(page.locator('[class*="Kanban"]')).toBeVisible({
      timeout: 5000,
    });
  });
});
