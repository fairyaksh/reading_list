#! /usr/bin/env node

// removes warning: (https://github.com/netlify/cli/issues/4608#issuecomment-1223696635)
process.removeAllListeners("warning"); 

import * as dotenv from "dotenv";
import inquirer from "inquirer";
import clear from 'clear';
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

const getFirstFiveBooks = (book_details) => {
    const firstFive = book_details.slice(0, 5);
    return firstFive;
}

const formatBooksInfo = (property) => {
    return property.map(x => {
        let author = x.author;
        const title = x.title;
        const publisher = x.publisher;
        
        const authorEdgeCases = _ => {
            if (author !== undefined && author.length <= 1) {
                return author = author.join(", ");
            } else if (author !== undefined && author.length > 2) {
                const lastItem = author.pop();
                const newAuthor = author.join(", ");
                const newStr = `Written by ${newAuthor} and ${lastItem}`;
                return newStr
            } else {
                return "Author: Unknown";
}
}

        const checkPublisherExists = _ => {
            if (publisher == undefined) {
                return "Publishing company: Unknown";
            } else {
                return `Published by ${publisher}`;
            }
        }

        const formattedStr = `○ "${title}". ${authorEdgeCases()}. ${(checkPublisherExists())}.`;
        return formattedStr
    });
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
        userName = answers.name;
        inquirer
            .prompt([
            {
                type: "input",
                name: "search",
                message: `👋 Hi ${answers.name}! Please provide a word related to the book you are looking for:`
            }
          ])
          .then((answers) => {
            const searchTerm = answers.search
            const searchTermObject = searchBookFromUserInput(searchTerm)
            searchTermObject
                .then(bookObj => getAllBooksDetails(bookObj))
                .then(data => getFirstFiveBooks(data))
            .then((response) => {
                    console.log("res", response)
                const formattedStr = formatBooksInfo(response)
                    inquirer.prompt([
                        {
                            name: "selection",
                            type: "list",
                            message: `Here are the 5 books we found related to your search of "${searchTerm}". \n Please select one to save to your reading list:`,
                            choices: formattedStr
                        }
                    ])
                })
            })

          })
