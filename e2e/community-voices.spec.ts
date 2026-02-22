import { test, expect } from '@playwright/test';

test.describe('Community Voices Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/community-voices');
  });

  test('heading Community Voices is visible', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Community Voices' })
    ).toBeVisible();
  });

  test('disclaimer banner is present', async ({ page }) => {
    await expect(
      page.getByText('Disclaimer: Community Voices are personal accounts')
    ).toBeVisible();
  });

  test('Share Your Experience heading is visible', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /Share Your Experience/i })
    ).toBeVisible();
  });

  test('form has story textarea', async ({ page }) => {
    const storyField = page.locator('textarea');
    await expect(storyField).toBeVisible();
  });

  test('form has incident date input', async ({ page }) => {
    const dateInput = page.locator('input[type="date"], input[type="text"]').filter({
      has: page.locator('..', { hasText: /date/i }),
    });
    // Try both approaches - look for date-related input
    const dateLabel = page.getByText(/Date.*incident/i);
    await expect(dateLabel).toBeVisible();
  });

  test('form has department dropdown with options', async ({ page }) => {
    const select = page.locator('select');
    await expect(select).toBeVisible();

    // Check some department options exist
    await expect(select.locator('option', { hasText: 'Emergency' })).toBeAttached();
    await expect(select.locator('option', { hasText: 'Internal Medicine' })).toBeAttached();
    await expect(select.locator('option', { hasText: 'Surgery' })).toBeAttached();
    await expect(select.locator('option', { hasText: 'Mental Health' })).toBeAttached();
    await expect(select.locator('option', { hasText: 'Obstetrics' })).toBeAttached();
    await expect(select.locator('option', { hasText: 'Pediatrics' })).toBeAttached();
  });

  test('form has staff involved input', async ({ page }) => {
    await expect(page.getByText(/staff involved/i)).toBeVisible();
  });

  test('form has 4 identity preference radio buttons', async ({ page }) => {
    const radios = page.locator('input[type="radio"]');
    await expect(radios).toHaveCount(4);

    await expect(page.getByText('Use my full name publicly')).toBeVisible();
    await expect(page.getByText('Use my first name only')).toBeVisible();
    await expect(page.getByText(/Anonymous publicly.*CMH Watch/i)).toBeVisible();
    await expect(page.getByText('Fully anonymous')).toBeVisible();
  });

  test('form has name input', async ({ page }) => {
    await expect(page.getByText(/Your name/i)).toBeVisible();
  });

  test('form has contact input', async ({ page }) => {
    await expect(page.getByText(/Email or phone/i)).toBeVisible();
  });

  test('form has consent checkbox', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]');
    await expect(checkbox).toBeVisible();
    await expect(
      page.getByText(/I understand my submission will be reviewed/i)
    ).toBeVisible();
  });

  test('submit button says Submit Your Story', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Submit Your Story' })
    ).toBeVisible();
  });
});
