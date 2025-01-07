// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ media: 'print' });
});

test('has title', async ({ page }) => {
  await page.goto('/'); 

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/PrintReady/);
});

test('Empty link is ignored', async ({ page }) => {
  await page.goto('/'); 
  
  // Locate the element by its ID
  const oldSchoolAnchor = page.locator('#OldSchoolAnchor');

  await expect(oldSchoolAnchor).toHaveText('Empty link');
});

test('Check External link is listed', async ({ page }) => {
  await page.goto('/'); 

  const link = page.getByRole('link', { name: 'External link' });
  await expect(link).toHaveClass('js-hasPrintLinkRef');
  
  await expect(page.locator('.js-printready-links-list')).toContainText('http://www.google.com/');

  // Check there was an adjacent <sup>
  await expect(link.locator('xpath=following-sibling::sup')).toHaveText('[Link: 1]');
});

test('Check Tel link is listed', async ({ page }) => {
  await page.goto('/');

  const link = page.getByRole('link', { name: 'Tel link' });
  await expect(link).toHaveClass('js-hasPrintLinkRef'); // Exact match

  await expect(page.locator('.js-printready-links-list')).toContainText('Phone number: +4733378901');

  // Check this was an adjacent <sup>
  // await expect(link.locator('xpath=following-sibling::sup')).toHaveText('[Link: 2]');
});

test('Check Mailto link is listed', async ({ page }) => {
  await page.goto('/');

  const link = page.getByRole('link', { name: 'Mailto link' });
  await expect(link).toHaveClass('js-hasPrintLinkRef'); // Exact match

  await expect(page.locator('.js-printready-links-list')).toContainText('Email: a@b.com - Subject: email subject');

  // Check there was an adjacent <sup>
  // await expect(link.locator('xpath=following-sibling::sup')).toHaveText('[Link: 3]');
});

test('Check printed page details', async ({ page }) => {
  await page.goto('/');

  const printedPageDetails = page.locator('.printed-page-details');

  await expect(printedPageDetails.locator('p.print-info-title')).toHaveText('Page title: Print ready test page');
  
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const currentDate = new Date().toLocaleDateString('en-GB', options);
  await expect(printedPageDetails.locator('p.print-info-date')).toHaveText(`Printed: ${currentDate}`);
  await expect(printedPageDetails.locator('p.print-info-url')).toHaveText(/Printed from: (http:\/\/localhost:3000\/|http:\/\/printready\.test\/)/); 
});
