import { searchOptionActivated, readExistingList } from "./display.js";

export const allOptionPaths = (userInput, username) => {
    switch(userInput) {
        case '1':
            searchOptionActivated();
            break;
        case '2':
            readExistingList(username);
            break;
        case '3':
            process.exit(0);

        default: 
            console.log("Sorry, please try again.");
            break;
    }
}