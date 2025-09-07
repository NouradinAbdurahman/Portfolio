const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function runLighthouse() {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance', 'accessibility', 'seo', 'best-practices'],
    port: chrome.port,
  };
  
  const runnerResult = await lighthouse('http://localhost:3000', options);
  
  // Print scores
  console.log('Lighthouse Scores:');
  console.log('Performance:', runnerResult.lhr.categories.performance.score * 100);
  console.log('Accessibility:', runnerResult.lhr.categories.accessibility.score * 100);
  console.log('SEO:', runnerResult.lhr.categories.seo.score * 100);
  console.log('Best Practices:', runnerResult.lhr.categories['best-practices'].score * 100);
  
  await chrome.kill();
}

runLighthouse().catch(console.error);
