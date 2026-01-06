const { program } = require('commander');
const { collect } = require('./commands/collect');

program
  .name('clarity')
  .description('Clarity CLI for metadata collection and affected test detection')
  .version('0.1.0');

// clarity collect - Collect and upload metadata
program
  .command('collect')
  .description('Collect and upload metadata to Clarity backend')
  .option('-l, --license <key>', 'License key (Team or Enterprise)', process.env.CLARITY_LICENSE_KEY)
  .option('-u, --url <url>', 'Backend API URL', process.env.CLARITY_API_URL || 'http://localhost:3000')
  .option('-c, --commit <sha>', 'Commit SHA (auto-detected if not provided)')
  .option('-b, --branch <name>', 'Branch name (auto-detected if not provided)')
  .option('-t, --test-results <path>', 'Path to test results JSON file')
  .option('--coverage <path>', 'Path to coverage JSON file')
  .option('-e, --environment <env>', 'Environment (development, staging, production)', 'development')
  .option('--bundle-size <bytes>', 'Bundle size in bytes', parseInt)
  .option('--build-status <status>', 'Build status (success, failed, pending)', 'success')
  .option('--start-time <iso>', 'Build start time (ISO 8601)')
  .option('--end-time <iso>', 'Build end time (ISO 8601)')
  .action(collect);

// clarity test - Run affected tests only
program
  .command('test')
  .description('Run only affected tests based on changed files')
  .option('--base <ref>', 'Base commit/branch to compare against', 'main')
  .option('--head <ref>', 'Head commit to compare', 'HEAD')
  .option('--test-command <cmd>', 'Test command to run', 'npm test')
  .action(async (options) => {
    console.log('🚧 Affected test detection coming in next sprint...');
    console.log('Options:', options);
  });

// clarity changelog - Generate changelog
program
  .command('changelog')
  .description('Generate changelog from conventional commits')
  .option('--from <tag>', 'Start from this tag')
  .option('--to <tag>', 'Generate up to this tag', 'HEAD')
  .option('--output <path>', 'Output file path', 'CHANGELOG.md')
  .action(async (options) => {
    console.log('🚧 Changelog generation coming in next sprint...');
    console.log('Options:', options);
  });

// clarity init - Initialize Clarity in a project
program
  .command('init')
  .description('Initialize Clarity configuration in current project')
  .option('--license <key>', 'License key')
  .option('--url <url>', 'Backend API URL')
  .action(async (options) => {
    console.log('🚧 Project initialization coming soon...');
    console.log('Options:', options);
  });

program.parse(process.argv);
