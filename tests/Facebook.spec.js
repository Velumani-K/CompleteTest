// @ts-check
import { test, expect } from '@playwright/test';

test('Facebook', async ({ page }) => {

  await page.goto('https://www.facebook.com/');
  await page.getByRole('textbox', { name: /email address or mobile number/i }).fill("Velu12@gmail.com");
  await page.getByRole('textbox', { name: 'Password' }).fill("Velu@1233");
  await page.getByRole('button', { name: 'Log in' }).click();

});