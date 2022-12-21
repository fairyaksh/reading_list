import { getFirstFiveBooks, formatBooksInfo } from "./index";

const multipleArrOfObj = [
    {
        title: 'Bass Xmas Christmas Songs',
        author: [ 'Bernd Kofler' ],
        publisher: 'BoD – Books on Demand'
    },
    {
        title: 'The Simpsons Xmas Book',
        author: undefined,
        publisher: 'Harper Perennial'
    },
    {
        title: 'Xmas',
        author: [ 'E. V. Greenelsh' ],
        publisher: undefined
    },
    {
        title: 'Fright Xmas',
        author: [ 'Alan-Bertaneisson Jones' ],
        publisher: 'AuthorHouse'
    },
    {
        title: 'Xmas in Las Vegas',
        author: [ 'Jack Richardson' ],
        publisher: 'Dramatists Play Service Inc'
    },
    {
        title: 'The Xmas Files',
        author: [ 'Stephen Law' ],
        publisher: 'Hachette UK'
    },
    {
        title: 'Xmas Cake Toppers! Cute & Easy Christmas Cake Toppers! Fondant Fun for Any Festive Celebration!',
        author: [ 'The Cake &. Bake Academy' ],
        publisher: undefined
    }
]
const fiveArrayOfObj = [
    {
      title: 'Bass Xmas Christmas Songs',
      author: [ 'Bernd Kofler' ],
      publisher: 'BoD – Books on Demand'
    },
    {
      title: 'The Simpsons Xmas Book',
      author: undefined,
      publisher: 'Harper Perennial'
    },
    {
      title: 'Xmas',
      author: [ 'E. V. Greenelsh' ],
      publisher: undefined
    },
    {
      title: 'Fright Xmas',
      author: [ 'Alan-Bertaneisson Jones' ],
      publisher: 'AuthorHouse'
    },
    {
      title: 'Xmas in Las Vegas',
      author: [ 'Jack Richardson' ],
      publisher: 'Dramatists Play Service Inc'
    }
]
const formattedBooksStr = [
    '○ "Bass Xmas Christmas Songs". Bernd Kofler. Published by BoD – Books on Demand.',
    '○ "The Simpsons Xmas Book". Author: Unknown. Published by Harper Perennial.',
    '○ "Xmas". E. V. Greenelsh. Publishing company: Unknown.',
    '○ "Fright Xmas". Alan-Bertaneisson Jones. Published by AuthorHouse.',
    '○ "Xmas in Las Vegas". Jack Richardson. Published by Dramatists Play Service Inc.'
]

describe('getFirstFiveBooks', () => {
    test('Function should return only first five objects', () => {
        expect(getFirstFiveBooks(multipleArrOfObj)).toStrictEqual(fiveArrayOfObj);
    })
})

describe('formatBooksInfo', () => {
    test('Check for edge cases and return a list of 5 str with properties passed as params', () => {
        expect(formatBooksInfo(fiveArrayOfObj)).toStrictEqual(formattedBooksStr);
    })
})