# OranegHRM-
QA Engineer — Take-Home Assignment
Web Application Name: OrangeHRM
URL:https://opensource-demo.orangehrmlive.com/web/index.php/auth/login


# Project Structure

orangehrm-playwright/
│
├── pages/
│   ├── LoginPage.js
│   └── DashboardPage.js
│
├── tests/
│   └── login.spec.js
│
├── playwright.config.js
├── package.json
└── README.md

---

## pages/LoginPage.js

const { expect } = require('@playwright/test');

class LoginPage {
constructor(page) {
this.page = page;
this.username = page.locator('input[name="username"]');
this.password = page.locator('input[name="password"]');
this.loginBtn = page.locator('button[type="submit"]');
this.errorMessage = page.locator('.oxd-alert-content-text');
}

```
async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
}

async login(user, pass) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
}

async getErrorMessage() {
    await this.errorMessage.waitFor();
    return await this.errorMessage.textContent();
}
```

}

module.exports = { LoginPage };

---

## pages/DashboardPage.js

class DashboardPage {
constructor(page) {
this.page = page;
this.dashboardHeader = page.locator('h6');
}

```
async getHeaderText() {
    await this.dashboardHeader.waitFor();
    return await this.dashboardHeader.textContent();
}
```

}

module.exports = { DashboardPage };

---

## tests/login.spec.js

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');

test.describe('OrangeHRM Login Tests', () => {

```
test('Positive Login Test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();

    await loginPage.login('Admin', 'admin123');

    await expect(page).toHaveURL(/dashboard/);

    const header = await dashboardPage.getHeaderText();
    expect(header).toContain('Dashboard');
});

test('Negative Login Test', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login('Admin', 'wrongpassword');

    const errorText = await loginPage.getErrorMessage();

    expect(errorText).toContain('Invalid credentials');
});
```

});

---

## package.json

{
"name": "orangehrm-playwright",
"version": "1.0.0",
"scripts": {
"test": "playwright test"
},
"devDependencies": {
"@playwright/test": "^1.54.0"
}
}

---
## README.md
# OrangeHRM Playwright Automation
## Framework
* Playwright with JavaScript
* Page Object Model (POM)
## Automated Test Cases
### Positive Test
* Login with valid credentials
* Verify Dashboard page is displayed
* Verify URL contains dashboard
### Negative Test
* Login with invalid password
* Verify "Invalid credentials" error message

### Requirement Mapping
✅ **POM structure** – Separate page classes and test files
✅ **Positive automated test** – Valid login
✅ **Negative automated test** – Invalid login
✅ **Meaningful assertions** – URL, Dashboard text, Error message
✅ **No Thread.sleep()** – Uses Playwright explicit waits (`waitFor()`, `toHaveURL()`)


