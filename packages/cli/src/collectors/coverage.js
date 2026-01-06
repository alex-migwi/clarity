const fs = require('fs');
const path = require('path');

/**
 * Collect code coverage from JSON file
 * 
 * Supports:
 * - Istanbul/NYC coverage-final.json format
 * - c8 coverage format
 * 
 * @param {string} coveragePath - Path to coverage JSON file
 * @returns {Array<Object>} Array of file coverage data
 */
function collectCoverage(coveragePath) {
  try {
    if (!fs.existsSync(coveragePath)) {
      throw new Error(`Coverage file not found: ${coveragePath}`);
    }
    
    const rawData = fs.readFileSync(coveragePath, 'utf8');
    const coverageData = JSON.parse(rawData);
    
    const coverage = [];
    const cwd = process.cwd();
    
    for (const [filePath, data] of Object.entries(coverageData)) {
      // Make path relative to project root
      const relativePath = path.relative(cwd, filePath).replace(/\\/g, '/');
      
      // Calculate line coverage
      const statements = data.s || {};
      const statementsCovered = Object.values(statements).filter(v => v > 0).length;
      const statementsTotal = Object.keys(statements).length;
      
      // Calculate branch coverage
      const branches = data.b || {};
      const branchesFlat = Object.values(branches).flat();
      const branchesCovered = branchesFlat.filter(v => v > 0).length;
      const branchesTotal = branchesFlat.length;
      
      // Calculate function coverage
      const functions = data.f || {};
      const functionsCovered = Object.values(functions).filter(v => v > 0).length;
      const functionsTotal = Object.keys(functions).length;
      
      // Calculate overall coverage percentage
      let coveragePercent = 0;
      if (statementsTotal > 0) {
        coveragePercent = (statementsCovered / statementsTotal) * 100;
      }
      
      // Find uncovered lines
      const statementMap = data.statementMap || {};
      const uncoveredLines = [];
      for (const [key, count] of Object.entries(statements)) {
        if (count === 0 && statementMap[key]) {
          uncoveredLines.push(statementMap[key].start.line);
        }
      }
      
      coverage.push({
        filePath: relativePath,
        linesCovered: statementsCovered,
        linesTotal: statementsTotal,
        branchesCovered,
        branchesTotal,
        functionsCovered,
        functionsTotal,
        coveragePercent: parseFloat(coveragePercent.toFixed(2)),
        uncoveredLines: uncoveredLines.sort((a, b) => a - b)
      });
    }
    
    return coverage;
  } catch (error) {
    throw new Error(`Failed to collect coverage: ${error.message}`);
  }
}

/**
 * Calculate average coverage across all files
 */
function calculateAverageCoverage(coverage) {
  if (coverage.length === 0) return 0;
  
  const totalLines = coverage.reduce((sum, c) => sum + c.linesTotal, 0);
  const coveredLines = coverage.reduce((sum, c) => sum + c.linesCovered, 0);
  
  if (totalLines === 0) return 0;
  
  return parseFloat(((coveredLines / totalLines) * 100).toFixed(2));
}

/**
 * Get coverage summary statistics
 */
function summarizeCoverage(coverage) {
  const avgCoverage = calculateAverageCoverage(coverage);
  
  return {
    fileCount: coverage.length,
    averageCoverage: avgCoverage,
    totalLines: coverage.reduce((sum, c) => sum + c.linesTotal, 0),
    coveredLines: coverage.reduce((sum, c) => sum + c.linesCovered, 0),
    totalBranches: coverage.reduce((sum, c) => sum + c.branchesTotal, 0),
    coveredBranches: coverage.reduce((sum, c) => sum + c.branchesCovered, 0),
    totalFunctions: coverage.reduce((sum, c) => sum + c.functionsTotal, 0),
    coveredFunctions: coverage.reduce((sum, c) => sum + c.functionsCovered, 0)
  };
}

module.exports = {
  collectCoverage,
  calculateAverageCoverage,
  summarizeCoverage
};
