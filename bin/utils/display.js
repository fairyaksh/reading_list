import { asyncPrompt, userName } from "../index.js"
import { searchBookFromUserInput } from "./fetch.js";
export const searchOptionActivated = async () => {
    // 1. Third prompt: ask for search term to fetch book
    console.clear();
    const searchTerm = await asyncPrompt('Great! Please enter a search term for the book you are looking for: ')

    // 2. Run fetch request 
    const allBooks = await searchBookFromUserInput(searchTerm);
    console.clear();

    // 3. Extract all books' details
    const allBooksInfo = await getAllBooksDetails(allBooks);
    console.clear();

    // 4. Extract the first 5 books' details
    const fiveBooksInfo = await getFirstFiveBooks(allBooksInfo); // currently returns array of 5 objs
    
    // 5. Assigning an ID for each book object
    const fiveBooksWithID = addBookID(fiveBooksInfo); // obj w/ title, author, pub, id

    // 6. Running validation check for properties  in the book object before returning str
    const listOfChoices = generateListFromFiveBooks(fiveBooksWithID); // array of strings
    
    // 7. Fourth prompt: Display 5 & ask user to choose ONE to save
    const choicePrompt = await asyncPrompt(`Here are the 5 books we found related to your search of "${searchTerm}".\nPlease select one book to save to your reading list by entering its number (1 - 5): \n ${listOfChoices.join('.')}\n`)
    const choiceAnswer = parseInt(choicePrompt); // converts string input 1 - 5 to number 1 - 5


}

}
