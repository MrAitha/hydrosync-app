import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import assert from 'assert';

describe('Dashboard and Tab Navigation', function () {
  let driver;

  before(async function () {
    // Set up Chrome options (headless can be used, but standard is fine for local testing)
    const options = new chrome.Options();
    options.addArguments('--headless'); // Uncomment for headless execution

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('should load the Dashboard by default and display metrics', async function () {
    await driver.get('http://localhost:5173/hydrosync-app/');

    // Wait for the app to load
    await driver.wait(until.elementLocated(By.className('app-container')), 5000);

    // Verify Tab is active
    const dashboardTab = await driver.findElement(By.xpath("//button[contains(text(), 'Dashboard')]"));
    const classes = await dashboardTab.getAttribute('class');
    assert(classes.includes('active'), 'Dashboard tab should be active by default');

    // Verify Metric Cards exist
    const metricsGrid = await driver.findElement(By.className('metrics-grid'));
    assert(metricsGrid, 'Metrics grid should be visible on the dashboard');

    // Verify "Total Plants" metric
    const totalPlantsElement = await driver.findElement(By.xpath("//h3[contains(text(), 'Total Plants')]"));
    assert(totalPlantsElement, '"Total Plants" metric should be displayed');
  });

  it('should navigate to My Plants tab and show plant list', async function () {
    const myPlantsTab = await driver.findElement(By.xpath("//button[contains(text(), 'My Plants')]"));
    await myPlantsTab.click();

    // The Dashboard metrics grid should no longer be visible
    const dashboardMetrics = await driver.findElements(By.className('metrics-grid'));
    assert.strictEqual(dashboardMetrics.length, 0, 'Dashboard metrics should not be visible in My Plants tab');

    // The Plants section should be visible
    const plantsSection = await driver.wait(until.elementLocated(By.className('plants-section')), 2000);
    assert(plantsSection, 'Plants section should be visible after clicking My Plants tab');
  });

  it('should navigate back to the Dashboard tab', async function () {
    const dashboardTab = await driver.findElement(By.xpath("//button[contains(text(), 'Dashboard')]"));
    await dashboardTab.click();

    // The Dashboard metrics grid should be visible again
    const metricsGrid = await driver.wait(until.elementLocated(By.className('metrics-grid')), 2000);
    assert(metricsGrid, 'Metrics grid should be visible again after navigating back');
  });
});
