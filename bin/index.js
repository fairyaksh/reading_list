#! /usr/bin/env node

// removes warning: (https://github.com/netlify/cli/issues/4608#issuecomment-1223696635)
process.removeAllListeners("warning"); 

import * as dotenv from "dotenv";
import inquirer from "inquirer";
import clear from "clear";
import fs from "fs";
import chalk from 'chalk';
import boxen from 'boxen';

dotenv.config()

const searchBookFromUserInput = async (userInput) => {
    const getUrl = `https://www.googleapis.com/books/v1/volumes?q=${userInput}&key=${process.env.API_KEY}`;
    try {
        const res = await fetch(getUrl);
        if (res.status === 200) {
            const data = await res.json();
            return data;
        } else {
            console.log(res.status);
        }
    } catch (error) {
        return console.log(error);
    }
}

const getAllBooksDetails = (data) => {
    const dataItems = data["items"];
    const bookDetails = dataItems.map(items => {
        const itemObject = items["volumeInfo"];
        const itemTitle = itemObject["title"];
        const itemAuthor = itemObject["authors"];
        const itemPublisher = itemObject["publisher"];
        return {"title": itemTitle, "author": itemAuthor, "publisher": itemPublisher};
    })
    return bookDetails;
}

export const getFirstFiveBooks = (book_details) => {
    const firstFive = book_details.slice(0, 5);
    return firstFive;
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

        const formattedStr = `??? "${title}". ${authorEdgeCases()}. ${(checkPublisherExists())}.`;
        return formattedStr;
    });
}

const createListFile = (usersName, usersChoice) => {
    const fileName = `${usersName}'s reading list.txt`;
    fs.appendFile(fileName, usersChoice + "\n", {flag: "a+"}, (err) => {
        if (err) {
            const beautified_error = boxen(chalk.bgRed("Something went wrong! ???? Please try again."), {padding: 1, margin: 1, borderStyle: 'classic'});
            console.log(beautified_error);            
        }
        else {
            const beautified_success = boxen(chalk.green("Success!??? You can now view all the saved books in your very own reading list."), {padding: 1, margin: 1, borderStyle: 'classic'});
            console.log(beautified_success);
        }
    })
}

inquirer
    .prompt([
    {
        type: "input",
        name: "name",
        message: "Please enter your name ????"
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
                message: `???? Hi ${userName}! Please provide a word related to the book you are looking for:`
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