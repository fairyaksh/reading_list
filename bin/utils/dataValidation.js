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
