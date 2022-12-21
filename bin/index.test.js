// import index from './index';
// jest.mock('inquirer');

// describe('Module test', () => {
//     test('Confirm name input', async () => {
//       expect.assertions(1);
//       inquirer.prompt = jest.fn().mockResolvedValue({ name: 'Shaya'});
//       await expect(index()).resolves.toEqual({ name: 'Shaya' });
//     });
//   });

import getFirstFiveBooks from "./index";

const sampleArrOfObj = [
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
const expectedArrOfObj = [
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
describe('getFirstFiveBooks', () => {
    test('Function should return only first five objects', () => {
        expect(getFirstFiveBooks(sampleArrOfObj)).toStrictEqual(expectedArrOfObj);
    })
    // done();
    // afterAll(async () =>{
    //     await inquirer.prompt.complete();
    // })
})
