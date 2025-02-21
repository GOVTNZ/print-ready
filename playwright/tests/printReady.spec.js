// @ts-check
const { test, expect } = require('@playwright/test');
const config = require('../playwright.config');

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ media: 'print' });
  await page.goto(config.use.baseURL);
});

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/PrintReady/);
});

test('Empty link is ignored', async ({ page }) => {
  const oldSchoolAnchor = page.locator('#OldSchoolAnchor');
  await expect(oldSchoolAnchor).toHaveText('Empty link');
});

test('Check External \'http\' link is listed', async ({ page }) => {
  const link = page.getByRole('link', { name: 'Http External link' });
  await expect(link).toHaveClass('js-hasPrintLinkRef');
  await expect(page.locator('.js-printready-links-list')).toContainText('http://www.google.com/');
  await expect(link.locator('xpath=following-sibling::sup')).toHaveText('[Link: 1]'); // Check there was an adjacent <sup>
});

test('Check External \'https\' link is listed', async ({ page }) => {
  const link = page.getByRole('link', { name: 'Https External link' });
  await expect(link).toHaveClass('js-hasPrintLinkRef');
  await expect(page.locator('.js-printready-links-list')).toContainText('https://jobs.govt.nz/');
 });

test('Check Tel link is listed', async ({ page }) => {
  const link = page.getByRole('link', { name: 'Tel link' });
  await expect(link).toHaveClass('js-hasPrintLinkRef');
  await expect(page.locator('.js-printready-links-list')).toContainText('Phone number: +4733378901');
});

test('Check Mailto link is listed', async ({ page }) => {
  const link = page.getByRole('link', { name: 'Mailto link' });
  await expect(link).toHaveClass('js-hasPrintLinkRef');
  await expect(page.locator('.js-printready-links-list')).toContainText('Email: a@b.com - Subject: email subject');
});

test('Check printed page details', async ({ page }) => {
  const printedPageDetails = page.locator('.printready-page-info');

  await expect(printedPageDetails.locator('p.print-info-title')).toHaveText('Page title: Print ready test page');
  
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const currentDate = new Date().toLocaleDateString('en-GB', options);
  await expect(printedPageDetails.locator('p.print-info-date')).toHaveText(`Printed: ${currentDate}`);
  await expect(printedPageDetails.locator('p.print-info-url')).toHaveText(`Printed from: ${config.use.baseURL}`); // use 'baseurl' value set in playwright.config.js
});

 // Note: This test will fail if the generatePrintableLinkList externalOnly argument is set to true.
 test('Check Internal link is listed', async ({ page }) => {
  const link = page.getByRole('link', { name: 'Internal link' });
  await expect(link).toHaveClass('js-hasPrintLinkRef');
  await expect(page.locator('.js-printready-links-list')).toContainText('/fake-internal-link');
 });
