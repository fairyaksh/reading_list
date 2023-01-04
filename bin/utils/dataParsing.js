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
