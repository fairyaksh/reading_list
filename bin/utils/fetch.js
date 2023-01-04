export const searchBookFromUserInput = async (userInput) => {
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