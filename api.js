const express = require('express');

const Author = require('./schemes/author');
const Book = require('./schemes/book');

const router = express.Router();


router.get('/books', async (req, res) => {
  let authors = await Author.find({}).then()
  let books = await Book.find({}).then()

  let result = []

  books.forEach(book => {
    let author_name

    authors.forEach((author) => {
      if (book.author_id == author._id) {
        author_name = author.name
      }
    })


    result.push({
      "book" : book.name,
      "author": author_name
    })
  })
  
  res.send(result)
})

router.get('/books/:id', async (req, res) => {
  let books = await Book.find({}).then()

  let result = []

  books.forEach(book => {
    if (book.author_id == req.params.id) {
      result.push(book.name)
    }
    
  })
  
  res.send(result)
})

router.get('/author', async (req, res) => {
  let authors = await Author.find({}).then()
  let books = await Book.find({}).then()

  let result = {}

  authors.forEach(author => {
    result[author.name] = []
    let border = 0

    books.forEach((book) => {
      if (book.author_id == author._id) {
        result[author.name].push(book.name)
        border += 1
      }
    })
  })
  
  res.send(result)
})

/*  Добавление книги
 *  author_id
 *  name 
 */
router.post('/books', (req, res) => {
  Book.create(req.body)
    .then(book => {
      res.send(book);
    })
})

/*  Добавление автора
 *  name 
 */
router.post('/author', (req, res) => {
  Author.create(req.body)
    .then(author => {
      res.send(author);
    })
})

module.exports = router