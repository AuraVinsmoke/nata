#!/usr/bin/env node
import inquirer from 'inquirer';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import chalk from 'chalk';

console.log(chalk.blue.bold('\n📱 Nata - Setup\n'));

const questions = [
    {
        type: 'input',
        name: 'targetPhone',
        message: 'Enter target phone number (with country code, e.g., 1234567890):',
        validate: (input) => {
            if (!input || input.length < 10) {
                return 'Please enter a valid phone number';
            }
            return true;
        }
    },
    {
        type: 'input',
        name: 'ntfyTopic',
        message: 'Enter ntfy.sh topic for notifications (optional, press Enter to skip):',
        default: ''
    },
    {
        type: 'confirm',
        name: 'createContactMap',
        message: 'Do you want to create contact-map.json now?',
        default: true
    }
];

inquirer.prompt(questions).then(answers => {
    // Create .env file
    let envContent = '';
    if (answers.targetPhone) {
        envContent += `TARGET_PHONE=${answers.targetPhone}\n`;
    }
    if (answers.ntfyTopic) {
        envContent += `NTFY_TOPIC=${answers.ntfyTopic}\n`;
    }

    writeFileSync('.env', envContent);
    console.log(chalk.green('✅ Created .env file'));

    // Create contact-map.json placeholder
    if (answers.createContactMap) {
        const contactMap = {
            [answers.targetPhone]: {
                lid: "REPLACE_WITH_ACTUAL_LID_AFTER_FIRST_RUN"
            }
        };
        writeFileSync('contact-map.json', JSON.stringify(contactMap, null, 2));
        console.log(chalk.green('✅ Created contact-map.json'));
    }

    // Create auth directory
    if (!existsSync('auth')) {
        mkdirSync('auth');
        console.log(chalk.green('✅ Created auth/ directory'));
    }

    console.log(chalk.yellow('\n📋 Next steps:'));
    console.log(chalk.white('1. Run: npm start'));
    console.log(chalk.white('2. Scan QR code with WhatsApp'));
    console.log(chalk.white('3. Check console logs for the LID (Link ID)'));
    console.log(chalk.white('4. Update contact-map.json with the actual LID'));
    console.log(chalk.white('5. Restart: npm start\n'));

    if (answers.ntfyTopic) {
        console.log(chalk.cyan(`📲 Download ntfy app and subscribe to: ${answers.ntfyTopic}\n`));
    }
});
