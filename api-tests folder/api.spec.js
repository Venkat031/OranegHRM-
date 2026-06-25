import { test, expect } from '@playwright/test';
import { BASE_URL } from '../config/env.js';

test.describe('Reqres API Tests', () => {

  test('TC_API_001 - Get User Details', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/2`);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.data.id).toBe(2);
    expect(responseBody.data.email).toContain('@reqres.in');
    expect(typeof responseBody.data.first_name).toBe('string');
  });

  test('TC_API_002 - Create User Successfully', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/users`, {
      data: {
        name: 'Venkat',
        job: 'QA Engineer'
      }
    });

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody.name).toBe('Venkat');
    expect(responseBody.job).toBe('QA Engineer');
    expect(responseBody.id).toBeTruthy();
  });

  test('TC_API_003 - Login Failure - Missing Password', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/login`, {
      data: {
        email: 'eve.holt@reqres.in'
      }
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody.error).toBe('Missing password');
  });

});