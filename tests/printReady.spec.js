// @ts-check
const { test, expect } = require('@playwright/test');

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
  await expect(link).toHaveClass(/js-hasPrintLinkRef/); // TODO make exact match not regex. 
  
  await expect(page.locator('.js-printready-links-list')).toContainText('http://www.google.com/') ;

  // TODO check this was an adjacent <sup>?
  // await expect(page.getByRole('link', { name: 'External link' })); 

});
// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
