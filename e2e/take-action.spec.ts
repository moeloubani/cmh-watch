import { test, expect } from '@playwright/test';

test.describe('Take Action Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/take-action');
  });

  test('heading Take Action is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Take Action' })).toBeVisible();
  });

  test('tip box about CC\'ing CMH Watch is present', async ({ page }) => {
    await expect(
      page.getByText('Tip: CC info@cmhwatch.ca on')
    ).toBeVisible();
  });

  test('all 7 letter templates are present', async ({ page }) => {
    await expect(
      page.getByText('FOI Request for Discrimination Complaint Records')
    ).toBeVisible();

    await expect(
      page.getByText('Complaint to the Ontario Patient Ombudsman')
    ).toBeVisible();

    await expect(
      page.getByText('Complaint to the Ontario Human Rights Commission')
    ).toBeVisible();

    await expect(
      page.getByText('Letter to MPP Brian Riddell')
    ).toBeVisible();

    await expect(
      page.getByText('Letter to MP Connie Cody')
    ).toBeVisible();

    await expect(
      page.getByText('Letter to Mayor Jan Liggett')
    ).toBeVisible();

    await expect(
      page.getByText('Letter to Regional Chair Karen Redman')
    ).toBeVisible();
  });

  test('each template shows recipient info', async ({ page }) => {
    // Check FOI template recipient
    await expect(page.getByText('FOI Coordinator').first()).toBeVisible();
    await expect(page.getByText('700 Coronation Boulevard').first()).toBeVisible();

    // Check Patient Ombudsman recipient
    await expect(page.getByText('Craig Thompson').first()).toBeVisible();

    // Check Human Rights Commission recipient
    await expect(page.getByText('Patricia DeGuire').first()).toBeVisible();

    // Check MPP template
    await expect(page.getByText('73 Water Street North').first()).toBeVisible();
  });

  test('each template has View and copy letter template expandable', async ({ page }) => {
    const expandButtons = page.getByText(/View and copy letter template/i);
    await expect(expandButtons).toHaveCount(7);
  });

  test('expanding a template shows letter body text', async ({ page }) => {
    const expandButtons = page.getByText(/View and copy letter template/i);
    await expandButtons.first().click();
    // After expanding, should see letter content
    await expect(
      page.getByText(/Freedom of Information and Protection of Privacy Act/i)
    ).toBeVisible();
  });

  test('Copy to Clipboard button is present in expanded template', async ({ page }) => {
    const expandButtons = page.getByText(/View and copy letter template/i);
    await expandButtons.first().click();
    await expect(
      page.getByRole('button', { name: /Copy to Clipboard/i })
    ).toBeVisible();
  });

  test('recipient names link to accountability profiles where applicable', async ({ page }) => {
    // Brian Riddell should link to his profile
    const riddellLink = page.getByRole('link', { name: /Brian Riddell/i });
    await expect(riddellLink.first()).toBeVisible();

    // Craig Thompson should link to his profile
    const thompsonLink = page.getByRole('link', { name: /Craig Thompson/i });
    await expect(thompsonLink.first()).toBeVisible();
  });
});
