import { validateAuthor, validatePublisher } from "./dataValidation.js";

export const getAllBooksDetails = (data) => {
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

export const getFirstFiveBooks = (bookDetails) => {
    const firstFive = bookDetails.slice(0, 5);
    return firstFive;
}

export const addBookID = (arrayOfObj) => {
    arrayOfObj.map((obj, index) => {
        const newIndex = index + 1;
        obj['id'] = newIndex;
    })
    return arrayOfObj;
}
export const generateListFromFiveBooks = (arrayOfObj) => {
    return arrayOfObj.map(obj => {
        const bookID = obj.id;
        const title = obj.title;
        let author = obj.author;
        const publisher = obj.publisher;

        const updatedAuthor = validateAuthor(obj, author);
        const updatedPublisher = validatePublisher(obj, publisher);

        const formattedStr = `\n${bookID}. "${title}". ${updatedAuthor}. ${(updatedPublisher)}`;
        return formattedStr;
    });
}
