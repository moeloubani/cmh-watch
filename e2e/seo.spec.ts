import { test, expect } from '@playwright/test';

test.describe('SEO', () => {
  test('robots.txt returns valid content', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text.toLowerCase()).toContain('user-agent: *');
    expect(text.toLowerCase()).toContain('allow: /');
  });

  test('sitemap.xml returns valid XML', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toContain('<?xml');
    expect(text).toContain('<urlset');
  });

  test('sitemap.xml contains URLs for all main pages', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    const text = await response.text();

    const mainPages = [
      'cmhwatch.ca',
      '/facts',
      '/accountability',
      '/community-voices',
      '/take-action',
      '/timeline',
    ];

    for (const page of mainPages) {
      expect(text).toContain(page);
    }
  });

  test('sitemap.xml contains person profile URLs', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    const text = await response.text();

    expect(text).toContain('/accountability/patrick-gaskin');
    expect(text).toContain('/accountability/brian-riddell');
    expect(text).toContain('/accountability/craig-thompson');
  });

  test('home page has correct meta description', async ({ page }) => {
    await page.goto('/');
    const metaDescription = page.locator('meta[name="description"]');
    const content = await metaDescription.getAttribute('content');
    expect(content).toBeTruthy();
    expect(content!.toLowerCase()).toContain('racism');
    expect(content!.toLowerCase()).toContain('mistreatment');
  });
});
