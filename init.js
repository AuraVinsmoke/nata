#!/usr/bin/env node
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import chalk from 'chalk';

const args = process.argv.slice(2);

// Check if non-interactive mode (all args provided)
const phoneIndex = args.indexOf('--phone');
const topicIndex = args.indexOf('--topic');

if (phoneIndex === -1) {
    console.log(chalk.red('❌ Missing required argument: --phone'));
    console.log(chalk.yellow('\nUsage for servers (non-interactive):'));
    console.log(chalk.cyan('  nata init --phone 1234567890 --topic my_topic'));
    console.log(chalk.cyan('  nata init --phone 1234567890\n'));
    process.exit(1);
}

const targetPhone = args[phoneIndex + 1];
const ntfyTopic = topicIndex !== -1 ? args[topicIndex + 1] : '';

if (!targetPhone || targetPhone.length < 10) {
    console.log(chalk.red('❌ Invalid phone number'));
    process.exit(1);
}

console.log(chalk.blue.bold('\n📱 Nata - Non-Interactive Setup\n'));

// Create .env file
let envContent = `TARGET_PHONE=${targetPhone}\n`;
if (ntfyTopic) {
    envContent += `NTFY_TOPIC=${ntfyTopic}\n`;
}

writeFileSync('.env', envContent);
console.log(chalk.green('✅ Created .env file'));

// Create contact-map.json placeholder
const contactMap = {
    [targetPhone]: {
        lid: "REPLACE_WITH_ACTUAL_LID_AFTER_FIRST_RUN"
    }
};
writeFileSync('contact-map.json', JSON.stringify(contactMap, null, 2));
console.log(chalk.green('✅ Created contact-map.json'));

// Create auth directory
if (!existsSync('auth')) {
    mkdirSync('auth');
    console.log(chalk.green('✅ Created auth/ directory'));
}

console.log(chalk.yellow('\n📋 Next steps:'));
console.log(chalk.white('1. Run: nata start (or npm start)'));
console.log(chalk.white('2. Scan QR code with WhatsApp'));
console.log(chalk.white('3. Check console logs for the LID (Link ID)'));
console.log(chalk.white('4. Update contact-map.json with the actual LID'));
console.log(chalk.white('5. Restart: nata start\n'));

if (ntfyTopic) {
    console.log(chalk.cyan(`📲 Subscribe to ntfy: ${ntfyTopic}\n`));
}

console.log(chalk.green('✅ Setup complete!\n'));
