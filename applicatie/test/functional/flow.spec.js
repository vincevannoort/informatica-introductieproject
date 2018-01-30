const { before, test, skip, failing } = use('Test/Suite')('Flow')
const puppeteer = require('puppeteer')
const screenshotsEnabled = false
const slow = true
const waitTime = (slow) ? 1400 : 500
const waitTimeBeforeSubmit = (slow) ? 700 : 100
const typeSpeed = (slow) ? 45 : 0
let count = 0
let browser
let tab

/**
 * Setup traits
 */
// trait('Test/Browser', { headless: false, slowMo: 2000 })
// trait('DatabaseTransactions')

/**
 * login
 */
skip('---- Login to application ----', async () => { })
test('login with test user', async () => {
  browser = await puppeteer.launch({ headless: false, slowMo: typeSpeed })
  tab = (await browser.pages())[0]
  await tab.setViewport({ width: 1920, height: 1060 })
  await tab.goto('localhost:4000/login')
  await tab.waitFor('div.authentication-box')
  await tab.waitFor(5000)
  await tab.type('[name="username"]', 'test@tester.nl')
  await tab.type('[name="password"]', 'test')
  if (screenshotsEnabled) await tab.screenshot({ path: `./screenshots/${count++}-before-login.png` })
  await tab.click('button.button.is-link')
  await tab.waitFor(waitTime)
  if (screenshotsEnabled) await tab.screenshot({ path: `./screenshots/${count++}-after-login.png` })
}).timeout(0)

// /**
//  * Adding relation
//  */
skip('---- Add a relation ----', async () => {})
test('add a relation (university utrecht)', async() => {
  await tab.click('[title="Add new relation"]')
  await tab.waitFor(waitTime)
  await tab.type('[name="Name"]', 'University Utrecht')
  await tab.waitFor(waitTimeBeforeSubmit)
  await tab.click('.modal.is-active [title="create"]')
  await tab.waitFor(waitTime)
}).timeout(0)

test('check if relation exists in view', async () => { }).timeout(0)
test('navigate to relation, see relation name on view', async() => {
  await tab.click('[data-name="University Utrecht"]')
  await tab.waitFor(waitTime)
}).timeout(0)
test('check if insight is zero', async () => { }).timeout(0)

// /**
//  * Adding contact
//  */
skip('---- Add a contact to previously created relation ----', async () => {})
test('add a contact (lennart herlaar)', async () => {
  // adding lennart
  await tab.click('[title="Add new contact"]')
  await tab.waitFor(waitTime)
  await tab.type('[name="Profession"]', 'Teacher')
  await tab.type('[name="First name"]', 'Lennart')
  await tab.type('[name="Last name"]', 'Herlaar')
  await tab.type('[name="Telephone"]', '0612345678')
  await tab.type('[name="Email"]', 'l.herlaar@uu.nl')
  await tab.select('[name="Need for change"]', 'high')
  await tab.type('[name="Clarification (n)"]', 'a clarification for need for change')
  await tab.select('[name="Influence"]', 'high')
  await tab.type('[name="Clarification (i)"]', 'a clarification for influence')
  await tab.waitFor(waitTimeBeforeSubmit)
  await tab.click('.modal.is-active [title="create"]')
  await tab.waitFor(waitTime)

  // adding george
  await tab.click('[title="Add new contact"]')
  await tab.waitFor(waitTime)
  await tab.type('[name="Profession"]', 'Advisor')
  await tab.type('[name="First name"]', 'Georg')
  await tab.type('[name="Last name"]', 'Krempl')
  await tab.type('[name="Telephone"]', '0612345678')
  await tab.type('[name="Email"]', 'g.m.krempl@uu.nl')
  await tab.select('[name="Need for change"]', 'medium')
  await tab.type('[name="Clarification (n)"]', 'a clarification for need for change')
  await tab.select('[name="Influence"]', 'high')
  await tab.type('[name="Clarification (i)"]', 'a clarification for influence')
  await tab.waitFor(waitTimeBeforeSubmit)
  await tab.click('.modal.is-active [title="create"]')
  await tab.waitFor(waitTime)
}).timeout(0)

test('add social media to contact (lennart herlaar)', async () => {
  await tab.click('[data-contact="Lennart Herlaar"]')
  await tab.waitFor(waitTime)
  // adding facebook
  await tab.click('[title="Add new"]')
  await tab.waitFor(waitTime)
  await tab.select('[name="Type"]', 'facebook')
  await tab.type('[name="Url"]', 'facebook.nl/lennart')
  await tab.waitFor(waitTimeBeforeSubmit)
  await tab.click('.modal.is-active [title="create"]')
  await tab.waitFor(waitTime)

  // adding linkedin
  await tab.click('[title="Add new"]')
  await tab.waitFor(waitTime)
  await tab.select('[name="Type"]', 'linkedin')
  await tab.type('[name="Url"]', 'linkedin.nl/lennart')
  await tab.waitFor(waitTimeBeforeSubmit)
  await tab.click('.modal.is-active [title="create"]')
  await tab.waitFor(waitTime)
  await tab.click('.main-back-link')
  await tab.waitFor(waitTime)
}).timeout(0)
test('check if contact exists in relation', async () => { }).timeout(0)
test('check if insight is still zero', async () => { }).timeout(0)

// /**
//  * Adding customer business window information
//  */
skip('---- Add customer business window information ----', async () => {})
test('add a customer business window information (keep 2 fields empty)', async () => {
  await tab.click('[title="Add new customer business window"]')
  await tab.waitFor(waitTime)
  await tab.type('[name="Objectives"]', 'the objective of University Utrecht')
  await tab.type('[name="Organisation"]', 'the organisation of University Utrecht')
  await tab.waitFor(waitTimeBeforeSubmit)
  await tab.waitFor(waitTimeBeforeSubmit)
  await tab.click('.modal.is-active [title="create"]')
  await tab.waitFor(waitTime)
}).timeout(0)
test('check if insight of relation and proposal is still zero', async () => { }).timeout(0)
test('edit customer business window information (add 2 remaining empty fields)', async () => {
  await tab.click('[title="Edit existing customer business window"]')
  await tab.waitFor(waitTime)
  await tab.type('[name="Philosophy"]', 'the philosophy of University Utrecht')
  await tab.type('[name="Products"]', 'the products of University Utrecht')
  await tab.waitFor(waitTimeBeforeSubmit)
  await tab.click('.modal.is-active [title="update"]')
  await tab.waitFor(waitTime)
}).timeout(0)
test('check if insight of relation is updated, due to the proposals having better insight from customer business window information', async () => {}).timeout(0)

// await tab.click('[data-proposal="Provide cameras with new AI technology"]')

// /**
//  * Addings strengths and weaknesses to a relation
//  */
skip('---- Add strength and weaknesses to relation ----', async () => { })
test('add a strength and weakness to the relation', async () => {
  // add strength
  await tab.click('[title="Add new strength or weakness"]')
  await tab.waitFor(waitTime)
  await tab.select('[name="Type"]', 'strength')
  await tab.type('[name="Description"]', 'a description of a strenth')
  await tab.waitFor(waitTimeBeforeSubmit)
  await tab.click('.modal.is-active [title="create"]')
  await tab.waitFor(waitTime)

  // add weakness
  await tab.click('[title="Add new strength or weakness"]')
  await tab.waitFor(waitTime)
  await tab.select('[name="Type"]', 'weakness')
  await tab.type('[name="Description"]', 'a description of a weakness')
  await tab.waitFor(waitTimeBeforeSubmit)
  await tab.click('.modal.is-active [title="create"]')
  await tab.waitFor(waitTime)
}).timeout(0)

/**
 * Adding proposal
 */
skip('---- Add a proposal to previously created relation ----', async () => { })
test('add a proposal (provide cameras with new AI technology)', async () => {
  await tab.click('[title="Add new proposal"]')
  await tab.waitFor(waitTime)
  await tab.type('[name="Name"]', 'Provide cameras with new AI technology')
  await tab.type('[name="Value"]', '120500')
  await tab.type('[name="Start"]', '24-01-2018')
  await tab.type('[name="Close"]', '28-05-2019')
  await tab.waitFor(waitTimeBeforeSubmit)
  await tab.click('.modal.is-active [title="create"]')
  await tab.waitFor(waitTime)
}).timeout(0)
// test('add another proposal (provide advanced lenses for security cameras)', async () => { })
test('check if insight of both proposals is zero', async () => { }).timeout(0)
test('check if insight of both proposals is zero', async () => { }).timeout(0)
test('check if insight of relation is still zero', async () => { }).timeout(0)

// /**
//  * Adding contacts to our proposal
//  */
skip('---- Attach contact to proposal (lennart herlaar & george kempler -> universiteit utrecht )  ----', async () => { })
test('attach contacts to proposal', async () => {
  await tab.click('[data-proposal="Provide cameras with new AI technology"]')

  // add lennart to proposal
  await tab.waitFor(waitTime)
  await tab.click('[title="Add new contact to proposal"]')
  await tab.waitFor(waitTime)
  await tab.select('[name="Value"]', 'Lennart Herlaar')
  await tab.waitFor(waitTimeBeforeSubmit)
  await tab.click('.modal.is-active [title="create"]')
  await tab.waitFor(waitTime)

  // add george to proposal
  await tab.waitFor(waitTime)
  await tab.click('[title="Add new contact to proposal"]')
  await tab.waitFor(waitTime)
  await tab.select('[name="Value"]', 'Georg Krempl')
  await tab.waitFor(waitTimeBeforeSubmit)
  await tab.click('.modal.is-active [title="create"]')
  await tab.waitFor(waitTime)
}).timeout(0)

test('add role ambassador to previously attached contact', async () => {
  // add ambasador to lennart
  await tab.hover('[data-proposal-contact-tr="Lennart Herlaar"]')
  await tab.waitFor(waitTime)
  await tab.click('[data-proposal-contact="Lennart Herlaar"]')
  await tab.waitFor(waitTime)
  await tab.select('[name="Role"]', 'ambassador')
  await tab.waitFor(waitTimeBeforeSubmit)
  await tab.click('.modal.is-active [title="create"]')
  await tab.waitFor(waitTime)

  // add chief to lennart
  await tab.hover('[data-proposal-contact-tr="Lennart Herlaar"]')
  await tab.waitFor(waitTime)
  await tab.click('[data-proposal-contact="Lennart Herlaar"]')
  await tab.waitFor(waitTime)
  await tab.select('[name="Role"]', 'chief')
  await tab.waitFor(waitTimeBeforeSubmit)
  await tab.click('.modal.is-active [title="create"]')
  await tab.waitFor(waitTime)

  // add user to georg
  await tab.hover('[data-proposal-contact-tr="Georg Krempl"]')
  await tab.waitFor(waitTime)
  await tab.click('[data-proposal-contact="Georg Krempl"]')
  await tab.waitFor(waitTime)
  await tab.select('[name="Role"]', 'user')
  await tab.waitFor(waitTimeBeforeSubmit)
  await tab.click('.modal.is-active [title="create"]')
  await tab.waitFor(waitTime)

  // add user to georg
  await tab.hover('[data-proposal-contact-tr="Georg Krempl"]')
  await tab.waitFor(waitTime)
  await tab.click('[data-proposal-contact="Georg Krempl"]')
  await tab.waitFor(waitTime)
  await tab.select('[name="Role"]', 'expert')
  await tab.waitFor(waitTimeBeforeSubmit)
  await tab.click('.modal.is-active [title="create"]')
  await tab.waitFor(waitTime)
}).timeout(0)
// test('check if insight has gone up for this proposal', async () => {}).timeout(0)

skip('---- Add competitors to proposal ----', async () => { })
test('add a competitor that is much worse and one that is worse', async () => {
  await tab.click('[title="Add new counter proposal"]')
  await tab.waitFor(waitTime)
  await tab.type('[name="Company name"]', 'Nikon')
  await tab.select('[name="Grading"]', 'much worse')
  await tab.type('[name="Counter proposal"]', 'their counter proposal described')
  await tab.type('[name="Position"]', 'our position compared to their proposal')
  await tab.waitFor(waitTimeBeforeSubmit)
  await tab.click('.modal.is-active [title="create"]')
  await tab.waitFor(waitTime)

  await tab.click('[title="Add new counter proposal"]')
  await tab.waitFor(waitTime)
  await tab.type('[name="Company name"]', 'Panasonic')
  await tab.select('[name="Grading"]', 'worse')
  await tab.type('[name="Counter proposal"]', 'their counter proposal described')
  await tab.type('[name="Position"]', 'our position compared to their proposal')
  await tab.waitFor(waitTimeBeforeSubmit)
  await tab.click('.modal.is-active [title="create"]')
  await tab.waitFor(waitTime)
}).timeout(0)

skip('---- Add smart actions to proposal ----', async () => {})
test('add a couple smart actions to the proposal', async () => {
  // add action
  await tab.click('[title="Add new smart action"]')
  await tab.waitFor(waitTime)
  await tab.type('[name="Action"]', 'a action defined in smart terms (first)')
  await tab.waitFor(waitTimeBeforeSubmit)
  await tab.click('.modal.is-active [title="create"]')
  await tab.waitFor(waitTime)

  // add action
  await tab.click('[title="Add new smart action"]')
  await tab.waitFor(waitTime)
  await tab.type('[name="Action"]', 'a action defined in smart terms (second)')
  await tab.waitFor(waitTimeBeforeSubmit)
  await tab.click('.modal.is-active [title="create"]')
  await tab.waitFor(waitTime)

  // add action
  await tab.click('[title="Add new smart action"]')
  await tab.waitFor(waitTime)
  await tab.type('[name="Action"]', 'a action defined in smart terms (third)')
  await tab.waitFor(waitTimeBeforeSubmit)
  await tab.click('.modal.is-active [title="create"]')
  await tab.waitFor(waitTime)
}).timeout(0)

skip('---- Add strength and weaknesses to proposal ----', async () => {})
test('add a strength and weakness to the proposal', async () => {
  // add strength
  await tab.click('[title="Add new strength or weakness"]')
  await tab.waitFor(waitTime)
  await tab.select('[name="Type"]', 'strength')
  await tab.type('[name="Description"]', 'a description of a strenth')
  await tab.waitFor(waitTimeBeforeSubmit)
  await tab.click('.modal.is-active [title="create"]')
  await tab.waitFor(waitTime)

  // add weakness
  await tab.click('[title="Add new strength or weakness"]')
  await tab.waitFor(waitTime)
  await tab.select('[name="Type"]', 'weakness')
  await tab.type('[name="Description"]', 'a description of a weakness')
  await tab.waitFor(waitTimeBeforeSubmit)
  await tab.click('.modal.is-active [title="create"]')
  await tab.waitFor(waitTime)
}).timeout(0)

skip('---- Add grow to proposal ----', async () => { })
test('add grow information to the proposal', async () => {
  await tab.click('[title="Add new grow"]')
  await tab.waitFor(waitTime)
  await tab.type('[name="Goal"]', 'a goal for the proposal')
  await tab.type('[name="Reality"]', 'a reality for the proposal')
  await tab.type('[name="Opportunity"]', 'a opportunity for the proposal')
  await tab.type('[name="Will"]', 'a will for the proposal')
  await tab.waitFor(waitTimeBeforeSubmit)
  await tab.click('.modal.is-active [title="create"]')
  await tab.waitFor(waitTime)
}).timeout(0)

test('timeout for presentation', async () => {
  await tab.waitFor(waitTime * 80)
}).timeout(0)
