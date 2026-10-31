// @ts-check
import { test, expect } from '@playwright/test';

test('logs in to Facebook and reports any login error', async ({ page }) => {
  const email = process.env.FACEBOOK_EMAIL;
  const password = process.env.FACEBOOK_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'Set FACEBOOK_EMAIL and FACEBOOK_PASSWORD environment variables before running this test.',
    );
  }

  await page.goto('https://www.facebook.com/');
  await page.getByRole('textbox', { name: /email address or mobile number/i }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();

  await page.waitForTimeout(3_000);
  const errorAlert = page.getByRole('alert').first();

  if ((await errorAlert.count()) > 0 && (await errorAlert.isVisible())) {
    console.error((await errorAlert.innerText()).trim());
    return;
  }

  await expect(page).not.toHaveURL('https://www.facebook.com/');
});