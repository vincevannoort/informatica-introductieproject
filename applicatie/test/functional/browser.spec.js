'use strict'

let count = 0
const hideBrowser = true

const { before, skip, test, trait } = use('Test/Suite')('Browser')
trait('Test/Browser', { headless: hideBrowser ? true : false })

test('Login fails when using invalid credentials', async ({ browser }) => {
  const page = await browser.visit('/')
  await page
  .assertFn(function () { return document.location.pathname }, '/login')
  .setViewport({ width: 1920, height: 1080 }) // wait for https://github.com/adonisjs/vow-browser/pull/3
  .waitForElement('div.authentication-box')
  .type('[name="username"]', 'wronguser@tester.nl')
  .type('[name="password"]', 'wrongpassword')
  .screenshot(`screenshots/${count++}-before-wrong-authentication.png`)
  .click('button.button.is-link').pause(100)
  .screenshot(`screenshots/${count++}-after-wrong-authentication.png`)
  .assertFn(function () { return document.location.pathname }, '/login')
}).timeout(5000)

test('Login successful when using valid credentials', async ({ browser }) => {
  const page = await browser.visit('/')
  await page
  .assertFn(function () { return document.location.pathname }, '/login')
  .setViewport({ width: 1920, height: 1080 }) // wait for https://github.com/adonisjs/vow-browser/pull/3
  .waitForElement('div.authentication-box')
  .type('[name="username"]', 'test@tester.nl')
  .type('[name="password"]', 'test')
  .screenshot(`screenshots/${count++}-before-successful-authentication.png`)
  .click('button.button.is-link').pause(100)
  .screenshot(`screenshots/${count++}-after-successful-authentication.png`)
  .assertFn(function () { return document.location.pathname }, '/')
}).timeout(5000)

test('Show credentials in profile component after logged in', async ({ browser }) => {
  const page = await browser.visit('/')
  await page
  .setViewport({ width: 1920, height: 1080 }) // wait for https://github.com/adonisjs/vow-browser/pull/3
  .assertHasIn('div.sidebar-profile-fullname', 'Test Tester')
  .assertHasIn('div.sidebar-profile-function', 'Tester')
  .screenshot(`screenshots/${count++}-profile-credentials.png`)
}).timeout(5000)

test('Show user that there are not relations added yet', async ({ browser }) => {
  const page = await browser.visit('/relations')
  await page
  .setViewport({ width: 1920, height: 1080 }) // wait for https://github.com/adonisjs/vow-browser/pull/3
  .assertHasIn('div.relations-table', 'No relations added yet.')
  .screenshot(`screenshots/${count++}-relations-overview.png`)
}).timeout(5000)