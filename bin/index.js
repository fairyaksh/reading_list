#! /usr/bin/env node

// removes warning: (https://github.com/netlify/cli/issues/4608#issuecomment-1223696635)
process.removeAllListeners("warning"); 
import inquirer from "inquirer";
import clear from 'clear';
dotenv.config()

const searchBookFromUserInput = (userInput) => {
    const getUrl = `https://www.googleapis.com/books/v1/volumes?q=${userInput}&key=${process.env.API_KEY}`;
}
