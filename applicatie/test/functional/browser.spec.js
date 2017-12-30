'use strict'

let count = 0
const hideBrowser = true

const { before, skip, failing, test, trait } = use('Test/Suite')('Browser')
trait('Test/Browser', { 
  headless: hideBrowser ? true : false, 
  args: ['--no-sandbox', '--disable-setuid-sandbox'] // for continious integration, has some security issues but should not matter due to running own application
})
trait('DatabaseTransactions')

// wait for https://github.com/adonisjs/vow-browser/pull/3
failing('Login fails when using invalid credentials', async ({ browser }) => {
  // try navigating to dashboard which should redirect to login
  const page = await browser.visit('/')
  await page
  .setViewport({ width: 1920, height: 1080 }) // wait for https://github.com/adonisjs/vow-browser/pull/3
  .assertFn(function () { return document.location.pathname }, '/login')

  // fill in wrong user credentials
  .waitForElement('div.authentication-box')
  .type('[name="username"]', 'wronguser@tester.nl')
  .type('[name="password"]', 'wrongpassword')
  .screenshot(`screenshots/${count++}-before-wrong-authentication.png`)

  // click the login button
  .click('button.button.is-link')
  .screenshot(`screenshots/${count++}-after-wrong-authentication.png`)

  // check if still on the login page due to not valid credentials
  .assertFn(function () { return document.location.pathname }, '/login')
}).timeout(5000)

// wait for https://github.com/adonisjs/vow-browser/pull/3
failing('Login successful when using valid credentials', async ({ browser }) => {
  // try navigating to dashboard which should redirect to login
  const page = await browser.visit('/')
  await page
  .setViewport({ width: 1920, height: 1080 }) // wait for https://github.com/adonisjs/vow-browser/pull/3
  .assertFn(function () { return document.location.pathname }, '/login')

  // fill in successful user credentials
  .waitForElement('div.authentication-box')
  .type('[name="username"]', 'test@tester.nl')
  .type('[name="password"]', 'test')
  .screenshot(`screenshots/${count++}-before-successful-authentication.png`)

  // click the login button
  .click('button.button.is-link')
  .screenshot(`screenshots/${count++}-after-successful-authentication.png`)

  // check if redirected to dashboard
  .assertFn(function () { return document.location.pathname }, '/')
}).timeout(5000)

// wait for https://github.com/adonisjs/vow-browser/pull/3
failing('Show credentials in profile component after logged in', async ({ browser }) => {
  // navigate to dashboard
  const page = await browser.visit('/')
  await page
  .setViewport({ width: 1920, height: 1080 }) // wait for https://github.com/adonisjs/vow-browser/pull/3

  // check user credentials
  .assertHasIn('div.sidebar-profile-fullname', 'Test Tester')
  .assertHasIn('div.sidebar-profile-function', 'Tester')
  .screenshot(`screenshots/${count++}-profile-credentials.png`)
}).timeout(5000)

// wait for https://github.com/adonisjs/vow-browser/pull/3
failing('Show user that there are not relations added yet', async ({ browser }) => {
  // navigate to relations overview
  const page = await browser.visit('/relations')
  await page
  .setViewport({ width: 1920, height: 1080 }) // wait for https://github.com/adonisjs/vow-browser/pull/3

  // check if relations table is empty
  .assertHasIn('div.relations-table', 'No relations added yet.')
  .screenshot(`screenshots/${count++}-relations-overview.png`)
}).timeout(5000)

// wait for https://github.com/adonisjs/vow-browser/pull/3
failing('Add a new relation', async ({ browser }) => {
  // navigate to relations overview
  const page = await browser.visit('/relations')
  await page
  .setViewport({ width: 1920, height: 1080 }) // wait for https://github.com/adonisjs/vow-browser/pull/3

  // navigate to create view with button
  .click('[title="Add new relation"]')
  .waitForElement('div.form-relation-create-edit')

  // fill in relation data
  .type('[name="name"]', 'Apple')
  .screenshot(`screenshots/${count++}-relation-before-create.png`)

  // try creating relation
  .click('button.button.is-link')
  .waitForElement('div.relations-table').pause(10)

  // check if new relation exists in relations overview
  .assertHasIn('div.relations-table', 'Apple')
  .screenshot(`screenshots/${count++}-relation-after-create.png`)
}).timeout(5000)
