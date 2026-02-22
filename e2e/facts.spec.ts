import { test, expect } from '@playwright/test';

test.describe('The Facts Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/facts');
  });

  test('heading The Facts is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'The Facts' })).toBeVisible();
  });

  test('introductory text about documented evidence is visible', async ({ page }) => {
    await expect(
      page.getByText('Documented, verifiable evidence only')
    ).toBeVisible();
  });

  test('FOI request entry is present with correct title', async ({ page }) => {
    await expect(
      page.getByText('Freedom of Information Request: Discrimination Complaint Records')
    ).toBeVisible();
  });

  test('FOI entry date is displayed', async ({ page }) => {
    await expect(page.getByText('February 20, 2026')).toBeVisible();
  });

  test('status badge shows PENDING', async ({ page }) => {
    await expect(page.getByText('PENDING')).toBeVisible();
  });

  test('View full document expandable section exists', async ({ page }) => {
    await expect(page.getByText('View full document')).toBeVisible();
  });

  test('clicking View full document reveals the full FOI letter', async ({ page }) => {
    await page.getByText('View full document').click();
    await expect(
      page.getByText('Freedom of Information and Protection of Privacy Act')
    ).toBeVisible();
  });

  test('full letter contains all 4 record categories requested', async ({ page }) => {
    await page.getByText('View full document').click();

    const letterContent = page.locator('pre');
    await expect(letterContent).toBeVisible();

    const letterText = await letterContent.textContent();
    expect(letterText).toContain('records of patient complaints');
    expect(letterText).toContain('internal policies');
    expect(letterText).toContain('Statistical data or summaries');
    expect(letterText).toContain('internal reviews');
  });
});
