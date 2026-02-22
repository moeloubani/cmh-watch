import { test, expect } from '@playwright/test';

test.describe('Timeline Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/timeline');
  });

  test('heading Timeline is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Timeline' })).toBeVisible();
  });

  test('at least one timeline entry is present', async ({ page }) => {
    await expect(page.getByText('CMH Watch Launched')).toBeVisible();
  });

  test('CMH Watch Launched entry is visible', async ({ page }) => {
    await expect(page.getByText('CMH Watch Launched')).toBeVisible();
  });

  test('entry shows date February 21, 2026', async ({ page }) => {
    await expect(page.getByText('February 21, 2026')).toBeVisible();
  });

  test('entry shows community update category badge', async ({ page }) => {
    await expect(page.getByText(/community update/i)).toBeVisible();
  });

  test('timeline has visual dots or markers', async ({ page }) => {
    // Look for round timeline markers (typically circles or dots)
    const markers = page.locator('[class*="rounded-full"], [class*="dot"], [class*="marker"], [class*="circle"]');
    const count = await markers.count();
    expect(count).toBeGreaterThan(0);
  });
});
