# OranegHRM-
QA Engineer — Take-Home Assignment

Web Application Name: OrangeHRM

URL:https://opensource-demo.orangehrmlive.com/web/index.php/auth/login


# Project Structure
# OrangeHRM Login Automation

## Framework
Playwright with JavaScript

## Automated Test Cases

1. TC_001 - Login with valid credentials
2. TC_004 - Login with invalid password
3. TC_005 - Login with blank username and password

## Setup
npm install
npx playwright install
## Execute
npx playwright test
## Report
npx playwright show-report



# API Automation Test Scenarios using Playwright (JavaScript)

## Project Structure

```
project
│
├── playwright.config.js
├── config
│   └── env.js
└── tests
    └── api.spec.js
```

## config/env.js

```javascript
export const BASE_URL = 'https://reqres.in/api';
```

---

## tests/api.spec.js

```javascript
import { test, expect } from '@playwright/test';
import { BASE_URL } from '../config/env.js';

test.describe('Reqres API Tests', () => {

  // Positive Scenario
  test('Get User - Successful Request', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/2`);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.data.id).toBe(2);
    expect(body.data.email).toContain('@reqres.in');
    expect(typeof body.data.first_name).toBe('string');
  });

  // Positive Scenario
  test('Create User Successfully', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/users`, {
      data: {
        name: 'Kruthika',
        job: 'QA Engineer'
      }
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.name).toBe('Kruthika');
    expect(body.job).toBe('QA Engineer');
    expect(body.id).toBeTruthy();
  });

  // Negative Scenario
  test('Login Failure - Missing Password', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/login`, {
      data: {
        email: 'eve.holt@reqres.in'
      }
    });

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.error).toBe('Missing password');
  });

});
```

---

## Run Command

```bash
npx playwright test tests/api.spec.js
```

## Scenarios Covered

### TC_API_001 – Get User Details

* Verify GET /users/2 returns 200
* Validate user ID
* Validate email format
* Validate data types

### TC_API_002 – Create User

* Verify POST /users returns 201
* Validate created user details
* Validate generated ID exists

### TC_API_003 – Login Failure

* Send login request without password
* Verify status code 400
* Validate error message "Missing password"



