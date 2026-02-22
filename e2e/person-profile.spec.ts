import { test, expect } from '@playwright/test';

test.describe('Person Profile - Patrick Gaskin', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/accountability/patrick-gaskin');
  });

  test('name is displayed', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Patrick Gaskin' })).toBeVisible();
  });

  test('title President & CEO is displayed', async ({ page }) => {
    await expect(page.getByText('President & CEO')).toBeVisible();
  });

  test('organization Cambridge Memorial Hospital is displayed', async ({ page }) => {
    await expect(page.getByText('Cambridge Memorial Hospital').first()).toBeVisible();
  });

  test('Why They\'re Accountable section exists with content', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /Why They.*Accountable/i })
    ).toBeVisible();
    await expect(
      page.getByText('Ultimate executive authority over hospital operations')
    ).toBeVisible();
  });

  test('Contact Information section exists', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /Contact Information/i })
    ).toBeVisible();
  });

  test('phone number 519-621-2333 is displayed', async ({ page }) => {
    await expect(page.getByText('519-621-2333')).toBeVisible();
  });

  test('Communication Record section exists', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /Communication Record/i })
    ).toBeVisible();
  });

  test('shows no communications recorded message', async ({ page }) => {
    await expect(
      page.getByText(/No communications recorded yet/i)
    ).toBeVisible();
  });

  test('page title includes Patrick Gaskin', async ({ page }) => {
    await expect(page).toHaveTitle(/Patrick Gaskin.*CMH Watch/);
  });
});

test.describe('Person Profile - Brian Riddell', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/accountability/brian-riddell');
  });

  test('name is displayed', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Brian Riddell' })).toBeVisible();
  });

  test('title MPP for Cambridge is displayed', async ({ page }) => {
    await expect(page.getByText('MPP')).toBeVisible();
  });

  test('email contact info is displayed', async ({ page }) => {
    await expect(page.getByText('brian.riddell@pc.ola.org')).toBeVisible();
  });

  test('phone contact info is displayed', async ({ page }) => {
    await expect(page.getByText('519-623-3232')).toBeVisible();
  });

  test('address is displayed', async ({ page }) => {
    await expect(page.getByText(/73 Water Street North/)).toBeVisible();
  });
});
