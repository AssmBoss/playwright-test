const { test, expect } = require("@playwright/test");
const creds = require('./user.js');
const fakeCreds = { mail: "aaaa@bbbb.cc", pass: "12345"};

test("should correct enter to my account", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in", { timeout: 60000 });
  await expect(page.getByPlaceholder('Email')).toBeEnabled();

  const mailField = page.getByPlaceholder('Email');
  await mailField.fill(creds.mail);
  await mailField.press('Tab');
  const passField = page.getByPlaceholder('Пароль');
  await passField.fill(creds.pass);
  await passField.press('Enter');

  await expect(page.getByRole('heading', { name: 'Мои курсы и профессии' })).toBeVisible();
});

test("should incorrect data enter and access denied", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in", { timeout: 60000 });
  await expect(page.getByPlaceholder('Email')).toBeEnabled();

  const mailField = page.getByPlaceholder('Email');
  await mailField.fill(fakeCreds.mail);
  await mailField.press('Tab');
  const passField = page.getByPlaceholder('Пароль');
  await passField.fill(fakeCreds.pass);
  await passField.press('Enter');
  
  await expect(page.getByTestId('login-error-hint')).toBeVisible();
});
