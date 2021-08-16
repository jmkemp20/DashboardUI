import { v4 as uuid } from 'uuid';

export default [
  {
    id: uuid(),
    name: 'Joshua Kemp',
    classroom: 'A',
    email: 'jkemp@gmail.com',
    num_books: 1,
    book_list: [
      {
        title: 'The Millionaire Next Door',
        author: 'Stanley',
        ISBN: '9781589795471'
      }
    ]
  },
  {
    id: uuid(),
    name: 'Megan Agnes',
    classroom: 'A',
    email: 'megsuz@gmail.com',
    num_books: 1,
    book_list: [
      {
        title: 'Harold Snipperpot\u2019s Best Disaster Ever',
        author: '',
        ISBN: '9780500651872'
      }
    ]
  },
  {
    id: uuid(),
    name: 'Stanley Yelnats',
    classroom: 'A',
    email: 'syelnats@gmail.com',
    num_books: 1,
    book_list: [
      {
        title: "Secret Lake: A children's mystery adventure, The",
        author: 'Inglis',
        ISBN: '9789569323041'
      }
    ]
  },
  {
    id: uuid(),
    name: 'Jack Stan',
    classroom: 'A',
    email: 'jstan@gmail.com',
    num_books: 1,
    book_list: [
      {
        title: 'Ninja Red Riding Hood',
        author: 'Corey Rosen Schwartz',
        ISBN: '0545888786'
      }
    ]
  },
  {
    id: uuid(),
    name: 'Shanaya Mill',
    classroom: 'A',
    email: 'smill@gmail.com',
    num_books: 1,
    book_list: [
      {
        title: 'Last Stop on Market Street',
        author: 'Pe\u00c3\u00b1a',
        ISBN: '9783992577484'
      }
    ]
  }
];
