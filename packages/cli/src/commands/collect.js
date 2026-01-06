const { collectGitMetadata } = require('../collectors/git');
const { collectTestResults, summarizeResults } = require('../collectors/tests');
const { collectCoverage, summarizeCoverage } = require('../collectors/coverage');
const ClarityClient = require('../api/client');

/**
 * Collect and upload metadata to Clarity backend
 * 
 * This command collects:
 * - Git metadata (commit, branch, author)
 * - Test results (from JSON file)
 * - Code coverage (from JSON file)
 * - Build metadata (status, times, bundle size)
 * 
 * @param {Object} options - Command options
 */
async function collect(options) {
  try {
    console.log('🔍 Clarity Metadata Collection');
    console.log('━'.repeat(50));
    
    // Validate required options
    if (!options.license) {
      throw new Error('License key is required. Use --license flag or set CLARITY_LICENSE_KEY environment variable.');
    }
    
    // Initialize API client
    const client = new ClarityClient({
      url: options.url,
      licenseKey: options.license
    });
    
    console.log(`📡 Backend: ${options.url}`);
    console.log('');
    
    // ===== 1. Collect Git Metadata =====
    console.log('📝 Collecting Git metadata...');
    const gitData = await collectGitMetadata({
      commitSha: options.commit,
      branch: options.branch
    });
    
    console.log(`   Commit: ${gitData.commitSha.substring(0, 7)}`);
    console.log(`   Branch: ${gitData.branch}`);
    console.log(`   Author: ${gitData.author} <${gitData.email}>`);
    console.log('');
    
    // ===== 2. Upload Test Results =====
    let testSummary = null;
    if (options.testResults) {
      console.log('🧪 Collecting test results...');
      
      try {
        const testResults = collectTestResults(options.testResults);
        const summary = summarizeResults(testResults);
        
        console.log(`   Total: ${summary.total} tests`);
        console.log(`   ✅ Passed: ${summary.passed}`);
        console.log(`   ❌ Failed: ${summary.failed}`);
        console.log(`   ⏭️  Skipped: ${summary.skipped}`);
        console.log(`   ⏱️  Duration: ${(summary.totalDuration / 1000).toFixed(2)}s`);
        
        // Upload to backend
        const uploadData = {
          commitSha: gitData.commitSha,
          branch: gitData.branch,
          results: testResults
        };
        
        testSummary = await client.uploadTestResults(uploadData);
        console.log(`   📤 Uploaded ${testSummary.count} test results`);
      } catch (error) {
        console.error(`   ⚠️  Warning: ${error.message}`);
      }
      
      console.log('');
    }
    
    // ===== 3. Upload Code Coverage =====
    let coverageSummary = null;
    if (options.coverage) {
      console.log('📊 Collecting code coverage...');
      
      try {
        const coverage = collectCoverage(options.coverage);
        const summary = summarizeCoverage(coverage);
        
        console.log(`   Files: ${summary.fileCount}`);
        console.log(`   Lines: ${summary.coveredLines}/${summary.totalLines} (${summary.averageCoverage}%)`);
        console.log(`   Branches: ${summary.coveredBranches}/${summary.totalBranches}`);
        console.log(`   Functions: ${summary.coveredFunctions}/${summary.totalFunctions}`);
        
        // Upload to backend
        const uploadData = {
          commitSha: gitData.commitSha,
          coverage: coverage
        };
        
        coverageSummary = await client.uploadCoverage(uploadData);
        console.log(`   📤 Uploaded coverage for ${coverageSummary.count} files`);
        console.log(`   📈 Average coverage: ${coverageSummary.averageCoverage}%`);
      } catch (error) {
        console.error(`   ⚠️  Warning: ${error.message}`);
      }
      
      console.log('');
    }
    
    // ===== 4. Record Build Metadata =====
    if (options.buildStatus || options.startTime || options.bundleSize) {
      console.log('🏗️  Recording build metadata...');
      
      try {
        const buildData = {
          commitSha: gitData.commitSha,
          branch: gitData.branch,
          status: options.buildStatus || 'success',
          environment: options.environment || 'development'
        };
        
        // Parse times if provided
        if (options.startTime) {
          buildData.startTime = new Date(options.startTime).toISOString();
        }
        if (options.endTime) {
          buildData.endTime = new Date(options.endTime).toISOString();
        } else if (options.startTime) {
          // Default to now if start time provided
          buildData.endTime = new Date().toISOString();
        }
        
        if (options.bundleSize) {
          buildData.bundleSize = parseInt(options.bundleSize);
        }
        
        const buildResult = await client.recordBuild(buildData);
        
        console.log(`   Status: ${buildResult.build.status}`);
        console.log(`   Environment: ${buildResult.build.environment}`);
        if (buildResult.build.duration) {
          console.log(`   Duration: ${buildResult.build.duration}s`);
        }
        if (buildResult.build.bundleSize) {
          console.log(`   Bundle size: ${formatBytes(buildResult.build.bundleSize)}`);
        }
        console.log(`   📤 Build metadata recorded`);
      } catch (error) {
        console.error(`   ⚠️  Warning: ${error.message}`);
      }
      
      console.log('');
    }
    
    // ===== Summary =====
    console.log('━'.repeat(50));
    console.log('✅ Metadata collection complete!');
    console.log('');
    console.log('📊 Summary:');
    console.log(`   Commit: ${gitData.commitSha.substring(0, 7)} (${gitData.branch})`);
    
    if (testSummary) {
      console.log(`   Tests: ${testSummary.summary.passed} passed, ${testSummary.summary.failed} failed`);
    }
    
    if (coverageSummary) {
      console.log(`   Coverage: ${coverageSummary.averageCoverage}% average`);
    }
    
    console.log('');
    console.log('🎉 Data available in Clarity dashboard!');
    
  } catch (error) {
    console.error('');
    console.error('❌ Error:', error.message);
    console.error('');
    
    // Exit with error code
    process.exit(1);
  }
}

/**
 * Format bytes to human-readable string
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

module.exports = { collect };
