const fs = require('fs');
const path = require('path');

/**
 * Collect test results from JSON file
 * 
 * Supports:
 * - Vitest JSON reporter output
 * - Jest JSON reporter output
 * 
 * @param {string} resultsPath - Path to test results JSON file
 * @returns {Array<Object>} Array of test results
 */
function collectTestResults(resultsPath) {
  try {
    if (!fs.existsSync(resultsPath)) {
      throw new Error(`Test results file not found: ${resultsPath}`);
    }
    
    const rawData = fs.readFileSync(resultsPath, 'utf8');
    const resultsData = JSON.parse(rawData);
    
    // Detect format and parse accordingly
    if (resultsData.testResults) {
      // Jest format
      return parseJestResults(resultsData);
    } else if (resultsData.numTotalTestSuites !== undefined) {
      // Vitest format (similar to Jest)
      return parseJestResults(resultsData);
    } else if (Array.isArray(resultsData)) {
      // Custom array format
      return resultsData;
    } else {
      throw new Error('Unknown test results format');
    }
  } catch (error) {
    throw new Error(`Failed to collect test results: ${error.message}`);
  }
}

/**
 * Parse Jest/Vitest JSON format
 */
function parseJestResults(data) {
  const results = [];
  
  for (const suite of data.testResults || []) {
    const suiteName = path.relative(process.cwd(), suite.name || suite.filePath || 'unknown');
    
    for (const test of suite.assertionResults || []) {
      results.push({
        testName: `${suiteName} > ${test.title || test.fullName}`,
        filePath: suiteName,
        status: mapStatus(test.status),
        duration: test.duration || 0,
        error: test.failureMessages?.length > 0 ? test.failureMessages[0] : null,
        stackTrace: test.failureMessages?.join('\n') || null
      });
    }
  }
  
  return results;
}

/**
 * Map various status strings to standard format
 */
function mapStatus(status) {
  const normalized = status?.toLowerCase() || 'unknown';
  
  if (['passed', 'pass', 'success'].includes(normalized)) {
    return 'passed';
  }
  if (['failed', 'fail', 'error'].includes(normalized)) {
    return 'failed';
  }
  if (['skipped', 'skip', 'pending', 'todo'].includes(normalized)) {
    return 'skipped';
  }
  
  return 'unknown';
}

/**
 * Generate summary statistics from test results
 */
function summarizeResults(results) {
  const summary = {
    total: results.length,
    passed: 0,
    failed: 0,
    skipped: 0,
    totalDuration: 0
  };
  
  for (const result of results) {
    summary[result.status] = (summary[result.status] || 0) + 1;
    summary.totalDuration += result.duration || 0;
  }
  
  return summary;
}

module.exports = {
  collectTestResults,
  summarizeResults
};
