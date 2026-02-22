import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle('CMH Watch - Holding Cambridge Memorial Hospital Accountable');
  });

  test('hero heading is visible', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Holding Cambridge Memorial Hospital Accountable' })
    ).toBeVisible();
  });

  test('mission statement paragraph is visible', async ({ page }) => {
    await expect(
      page.getByText('CMH Watch documents concerns about racism and mistreatment')
    ).toBeVisible();
  });

  test('stats bar shows 30 for Officials Tracked', async ({ page }) => {
    const statsSection = page.locator('text=Officials Tracked').locator('..');
    await expect(statsSection).toContainText('30');
  });

  test('stats bar shows Officials Contacted and Responses Received labels', async ({ page }) => {
    await expect(page.getByText('Officials Contacted')).toBeVisible();
    await expect(page.getByText('Responses Received')).toBeVisible();
  });

  test('latest update section shows CMH Watch Launched', async ({ page }) => {
    await expect(page.getByText('CMH Watch Launched')).toBeVisible();
    await expect(page.getByText('February 21, 2026')).toBeVisible();
  });

  test('three CTA cards are visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Read the Facts' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Share Your Story' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Take Action' })).toBeVisible();
  });

  test('CTA cards link to correct routes', async ({ page }) => {
    const factsLink = page.getByRole('link', { name: /View documented evidence/i });
    await expect(factsLink).toHaveAttribute('href', '/facts');

    const communityLink = page.getByRole('link', { name: /Submit your experience/i });
    await expect(communityLink).toHaveAttribute('href', '/community-voices');

    const actionLink = page.getByRole('link', { name: /Get started/i });
    await expect(actionLink).toHaveAttribute('href', '/take-action');
  });
});
