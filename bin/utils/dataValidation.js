import fs from "fs";
export const validateAuthor = (bookObject, author) => {
    let checkAuthorExists = bookObject.hasOwnProperty("author");
    let updatedAuthor;

    if (checkAuthorExists == false || author == undefined) {
        return "Author: Unknown";
    } else if (author.length === 1) {
        updatedAuthor = `Written by ${author}`;
    } else {
        const lastItem = author.pop();
        const newAuthor = author.join(", ");
        updatedAuthor = `Written by ${newAuthor} and ${lastItem}`;
    }
    return updatedAuthor;
}
export const validatePublisher = (bookObject, publisher) => {
    let checkPublisher = bookObject.hasOwnProperty("publisher");
    let updatedPublisher;

    if (checkPublisher == false || publisher == null) {
        updatedPublisher = "Publishing company: Unknown";
    } else {
        updatedPublisher = `Published by ${publisher}`;
    }
    return updatedPublisher;
}

export const checkForExistingUsername = (username, bookObj) => {
    fs.readFile('users.json', 'utf8', async (err, data) => {
        if(err){
            console.log(err);
            return;
        }
        let jsonData = JSON.parse(data);
        let jsonDataUser = jsonData.users;

        if (jsonDataUser.hasOwnProperty(username)) {
            jsonDataUser[username]["readinglist"].push(bookObj);
            writeToDatabase(JSON.stringify(jsonData));
            asyncPrompt(`Here's your current reading list, ${username}: ${JSON.stringify(jsonDataUser[username])}`);
 
        } else if (jsonDataUser.hasOwnProperty(username) === false){
            jsonData.users[username] = {"readinglist": [bookObj]};
            writeToDatabase(JSON.stringify(jsonData));
            console.log(`Sorry, seems like this username (${username}) has not been used before.\n Don't worry, we have now automatically created a reading list for this new username.`);
        }
    })
}
