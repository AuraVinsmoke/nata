#!/usr/bin/env node
import { spawn } from 'child_process';
import { existsSync } from 'fs';
import chalk from 'chalk';

const args = process.argv.slice(2);
const command = args[0];

console.log(chalk.blue.bold('\n📱 Nata\n'));

if (command === 'init') {
    // Non-interactive setup for servers
    console.log(chalk.yellow('Running non-interactive setup...\n'));
    const init = spawn('node', ['init.js', ...args.slice(1)], { stdio: 'inherit' });
    init.on('exit', (code) => process.exit(code));
} else if (command === 'setup') {
    console.log(chalk.yellow('Running setup wizard...\n'));
    const setup = spawn('node', ['setup.js'], { stdio: 'inherit' });
    setup.on('exit', (code) => process.exit(code));
} else if (command === 'start' || !command) {
    // Check if setup is done
    if (!existsSync('.env')) {
        console.log(chalk.red('❌ Setup not completed!'));
        console.log(chalk.yellow('Run: nata setup\n'));
        process.exit(1);
    }

    console.log(chalk.green('Starting monitor...\n'));
    const monitor = spawn('node', ['index.js'], { stdio: 'inherit' });
    monitor.on('exit', (code) => process.exit(code));
} else if (command === 'help' || command === '-h' || command === '--help') {
    console.log(chalk.white('Usage:'));
    console.log(chalk.cyan('  nata init --phone NUMBER --topic TOPIC  ') + chalk.gray('- Non-interactive setup (for servers)'));
    console.log(chalk.cyan('  nata setup                              ') + chalk.gray('- Interactive setup wizard'));
    console.log(chalk.cyan('  nata start                              ') + chalk.gray('- Start monitoring'));
    console.log(chalk.cyan('  nata help                               ') + chalk.gray('- Show this help\n'));
    console.log(chalk.yellow('Examples:'));
    console.log(chalk.white('  nata init --phone 1234567890 --topic my_topic'));
    console.log(chalk.white('  nata init --phone 1234567890'));
    console.log(chalk.white('  nata setup\n'));
} else {
    console.log(chalk.red(`Unknown command: ${command}`));
    console.log(chalk.yellow('Run: nata help\n'));
    process.exit(1);
}
