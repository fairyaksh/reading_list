#! /usr/bin/env node

// removes warning: (https://github.com/netlify/cli/issues/4608#issuecomment-1223696635)
process.removeAllListeners("warning"); 

import * as dotenv from "dotenv";
import * as asyncReadline from 'node:readline/promises';

import { allOptionPaths } from "./utils/menu.js";

dotenv.config()

export const cli = asyncReadline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export const asyncPrompt = async (query) => await cli.question(query);

const exitGreeting = (name) => {
    cli.on("close", () => {
        try {
            if (name === "" || name === null) {
                name = 'fellow bookworm';
                console.log(`\nGoodbye, ${name}!`);
            } else {
                console.log(`\nGoodbye, ${name}!`);
            }
        } catch (error) {
            console.log(`Oops! Something has gone wrong: (${error}). Please try again.`);
        }
        process.exit(0);
    });
}

console.clear();

// 1. First prompt: user's name
export const userName = await asyncPrompt('Please enter your name 👉 ');
exitGreeting(userName);
console.clear();

export const mainMenu = async () => {
    // 2a. Second prompt: greeting & options for user
    const optionInputAnswer = await asyncPrompt(`👋 Hi ${userName}! What would you like to do today?\n1. Search for a book to save\n2. View a reading list\n3. I changed my mind, I would like to exit..\n`);
    allOptionPaths(optionInputAnswer, userName) // pass input chosen; triggers pathway in its resp. function
}
mainMenu()

// Started attempting to create a function that allows user to go back to the main options menu so that they don't have to restart the app
// However, this is where I started getting blocked and struggled to figure out why when this function was called in searchOptionActivated or readExistingList,
// That function's prompt will be skipped and sent straight to the restartPrompt instead
export const restartOption = async () => {
    const restartPrompt = asyncPrompt(`If you would like to go back and search for a book, please enter 0:\n`);
    if (restartPrompt === '0'){
        mainMenu()
    }
}