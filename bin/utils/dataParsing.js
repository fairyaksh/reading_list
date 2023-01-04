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

export const getUserChoiceOfBook = (arrOfFiveObj, userSelection) => {
    const chosenBookObj = arrOfFiveObj.find(item => item['id'] === userSelection);
    return chosenBookObj;
}

export const removeID = (bookObj) => {
    const { id, ...newBookObject } = bookObj;
    return newBookObject;
}

export const writeToDatabase = (finalBookObj) => {
    fs.writeFile('users.json', finalBookObj, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("\nSuccess!✨ You can now view all the saved books in your very own reading list.");
        }
    })
}