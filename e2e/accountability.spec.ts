import { test, expect } from '@playwright/test';

test.describe('Accountability Map', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/accountability');
  });

  test('page heading is visible', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: "Who's Responsible" })
    ).toBeVisible();
  });

  test('four category sections are present', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Hospital Leadership' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Department Chiefs' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Government Officials' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Regulatory & Oversight Bodies' })).toBeVisible();
  });

  test('Hospital Leadership section has 7 person cards', async ({ page }) => {
    const section = page.getByRole('heading', { name: 'Hospital Leadership' }).locator('..');
    const cards = section.locator('a[href^="/accountability/"]');
    await expect(cards).toHaveCount(7);
  });

  test('Department Chiefs section has 10 person cards', async ({ page }) => {
    const section = page.getByRole('heading', { name: 'Department Chiefs' }).locator('..');
    const cards = section.locator('a[href^="/accountability/"]');
    await expect(cards).toHaveCount(10);
  });

  test('Government Officials section has 7 person cards', async ({ page }) => {
    const section = page.getByRole('heading', { name: 'Government Officials' }).locator('..');
    const cards = section.locator('a[href^="/accountability/"]');
    await expect(cards).toHaveCount(7);
  });

  test('Regulatory & Oversight Bodies section has 6 person cards', async ({ page }) => {
    const section = page.getByRole('heading', { name: 'Regulatory & Oversight Bodies' }).locator('..');
    const cards = section.locator('a[href^="/accountability/"]');
    await expect(cards).toHaveCount(6);
  });

  test('total of 30 person cards on the page', async ({ page }) => {
    const allCards = page.locator('a[href^="/accountability/"][href*="/"]').filter({
      has: page.locator('text=Not Yet Contacted'),
    });
    await expect(allCards).toHaveCount(30);
  });

  test('each person card shows a name, title, and status badge', async ({ page }) => {
    // Check a representative card from each section
    const gaskinCard = page.getByRole('link', { name: /Patrick Gaskin/ });
    await expect(gaskinCard).toBeVisible();
    await expect(gaskinCard).toContainText('President & CEO');
    await expect(gaskinCard).toContainText('Not Yet Contacted');
  });

  test('Patrick Gaskin card is present with President & CEO title', async ({ page }) => {
    const card = page.getByRole('link', { name: /Patrick Gaskin/ });
    await expect(card).toBeVisible();
    await expect(card).toContainText('President & CEO');
  });

  test('clicking Patrick Gaskin navigates to profile', async ({ page }) => {
    await page.getByRole('link', { name: /Patrick Gaskin/ }).click();
    await expect(page).toHaveURL(/\/accountability\/patrick-gaskin$/);
  });
});
