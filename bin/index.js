#! /usr/bin/env node

// removes warning: (https://github.com/netlify/cli/issues/4608#issuecomment-1223696635)
process.removeAllListeners("warning"); 

import * as dotenv from "dotenv";
import * as asyncReadline from 'node:readline/promises';


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

export const formatBooksInfo = (property) => {
    return property.map(x => {
        let author = x.author;
        let checkAuthor = x.hasOwnProperty("author");
        const title = x.title;
        const publisher = x.publisher;
        let checkPublisher = x.hasOwnProperty("publisher");

        const authorEdgeCases = _ => {
            if (checkAuthor == false || author == undefined) {
                return "Author: Unknown";
            } else if (author.length <= 1) {
                return author = author.join(", ");
            } else {
                const lastItem = author.pop();
                const newAuthor = author.join(", ");
                const newStr = `Written by ${newAuthor} and ${lastItem}`;
                return newStr;
            }
        }

        const checkPublisherExists = _ => {
            if (checkPublisher == false || publisher == null) {
                return "Publishing company: Unknown";
            } else {
                return `Published by ${publisher}`;
            }
        }

        const formattedStr = `○ "${title}". ${authorEdgeCases()}. ${(checkPublisherExists())}.`;
        return formattedStr;
    });
}

const createListFile = (usersName, usersChoice) => {
    const fileName = `${usersName}'s reading list.txt`;
    fs.appendFile(fileName, usersChoice + "\n", {flag: "a+"}, (err) => {
        if (err) {
            const beautified_error = boxen(chalk.bgRed("Something went wrong! 💥 Please try again."), {padding: 1, margin: 1, borderStyle: 'classic'});
            console.log(beautified_error);            
        }
        else {
            const beautified_success = boxen(chalk.green("Success!✨ You can now view all the saved books in your very own reading list."), {padding: 1, margin: 1, borderStyle: 'classic'});
            console.log(beautified_success);
        }
    })
}

inquirer
    .prompt([
    {
        type: "input",
        name: "name",
        message: "Please enter your name 👉"
    }
    ])
    .then((answers) => {
        clear();
        const userName = answers.name;
        inquirer
            .prompt([
            {
                type: "input",
                name: "search",
                message: `👋 Hi ${userName}! Please provide a word related to the book you are looking for:`
            }
            ])
        .then((answers) => {
            clear();
            const searchTerm = answers.search;
            const searchTermObject = searchBookFromUserInput(searchTerm);
            searchTermObject
                .then(bookObj => getAllBooksDetails(bookObj))
                .then(data => getFirstFiveBooks(data))
                .then((response) => {
                    clear();
                    const formattedStr = formatBooksInfo(response);
                    inquirer.prompt([
                        {
                            name: "selection",
                            type: "list",
                            message: `Here are the 5 books we found related to your search of "${searchTerm}". \n Please select one to save to your reading list:`,
                            choices: formattedStr
                        }
                    ])
                    .then(choices => {
                        clear();
                        const userChoice = choices.selection;
                        createListFile(userName, userChoice);
                    })
                })
            })
        })