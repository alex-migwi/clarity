const simpleGit = require('simple-git');

/**
 * Collect Git metadata for the current repository
 * 
 * @param {Object} options - Options
 * @param {string} [options.commitSha] - Specific commit SHA (defaults to HEAD)
 * @param {string} [options.branch] - Specific branch (defaults to current branch)
 * @returns {Promise<Object>} Git metadata
 */
async function collectGitMetadata(options = {}) {
  const git = simpleGit();
  
  try {
    // Get commit SHA
    const commitSha = options.commitSha || await git.revparse(['HEAD']);
    
    // Get branch name
    let branch = options.branch;
    if (!branch) {
      try {
        branch = await git.revparse(['--abbrev-ref', 'HEAD']);
      } catch (error) {
        // Fallback for detached HEAD (CI environments)
        branch = process.env.CI_COMMIT_BRANCH || 
                 process.env.GITHUB_REF_NAME || 
                 process.env.BRANCH_NAME || 
                 'unknown';
      }
    }
    
    // Get latest commit details
    const log = await git.log({ maxCount: 1 });
    const latest = log.latest;
    
    // Get repository remote URL
    let remoteUrl = null;
    try {
      const remotes = await git.getRemotes(true);
      if (remotes.length > 0) {
        remoteUrl = remotes[0].refs.fetch;
      }
    } catch (error) {
      // Remote not available
    }
    
    return {
      commitSha: commitSha.trim(),
      branch: branch.trim(),
      author: latest.author_name,
      email: latest.author_email,
      message: latest.message,
      timestamp: latest.date,
      remoteUrl
    };
  } catch (error) {
    throw new Error(`Failed to collect Git metadata: ${error.message}`);
  }
}

/**
 * Get list of changed files between two commits
 * 
 * @param {string} base - Base commit/branch
 * @param {string} head - Head commit
 * @returns {Promise<string[]>} Array of changed file paths
 */
async function getChangedFiles(base = 'main', head = 'HEAD') {
  const git = simpleGit();
  
  try {
    const diff = await git.diff([`${base}...${head}`, '--name-only']);
    return diff.split('\n').filter(Boolean);
  } catch (error) {
    throw new Error(`Failed to get changed files: ${error.message}`);
  }
}

module.exports = {
  collectGitMetadata,
  getChangedFiles
};
