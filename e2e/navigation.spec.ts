import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('header shows CMH Watch brand link', async ({ page }) => {
    const brand = page.getByRole('link', { name: 'CMH Watch' }).first();
    await expect(brand).toBeVisible();
  });

  test('all 5 navigation links are present', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav.getByRole('link', { name: 'The Facts' })).toBeVisible();
    await expect(nav.getByRole('link', { name: "Who's Responsible" })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Community Voices' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Take Action' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Timeline' })).toBeVisible();
  });

  test('The Facts link navigates correctly', async ({ page }) => {
    await page.locator('nav').getByRole('link', { name: 'The Facts' }).click();
    await expect(page).toHaveURL(/\/facts$/);
    await expect(page.getByRole('heading', { name: 'The Facts' })).toBeVisible();
  });

  test('Who\'s Responsible link navigates correctly', async ({ page }) => {
    await page.locator('nav').getByRole('link', { name: "Who's Responsible" }).click();
    await expect(page).toHaveURL(/\/accountability$/);
    await expect(page.getByRole('heading', { name: "Who's Responsible" })).toBeVisible();
  });

  test('Community Voices link navigates correctly', async ({ page }) => {
    await page.locator('nav').getByRole('link', { name: 'Community Voices' }).click();
    await expect(page).toHaveURL(/\/community-voices$/);
    await expect(page.getByRole('heading', { name: 'Community Voices' })).toBeVisible();
  });

  test('Take Action link navigates correctly', async ({ page }) => {
    await page.locator('nav').getByRole('link', { name: 'Take Action' }).click();
    await expect(page).toHaveURL(/\/take-action$/);
    await expect(page.getByRole('heading', { name: 'Take Action' })).toBeVisible();
  });

  test('Timeline link navigates correctly', async ({ page }) => {
    await page.locator('nav').getByRole('link', { name: 'Timeline' }).click();
    await expect(page).toHaveURL(/\/timeline$/);
    await expect(page.getByRole('heading', { name: 'Timeline' })).toBeVisible();
  });

  test('footer is present on home page with disclaimer', async ({ page }) => {
    await expect(
      page.getByText('The Facts section contains documented, verifiable information')
    ).toBeVisible();
  });

  test('footer is present on facts page', async ({ page }) => {
    await page.goto('/facts');
    await expect(
      page.getByText('The Facts section contains documented, verifiable information')
    ).toBeVisible();
  });

  test('brand link navigates back to home', async ({ page }) => {
    await page.goto('/facts');
    await page.getByRole('link', { name: 'CMH Watch' }).first().click();
    await expect(page).toHaveURL(/\/$/);
  });
});
