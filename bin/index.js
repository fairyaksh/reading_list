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
}
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
        inquirer.prompt([
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
                .then(data => {
                    const firstFiveBooks = getFirstFiveBooks(data)
                    return firstFiveBooks;
                })
          })
    })