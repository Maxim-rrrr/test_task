const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  author_id: String,
  name: String
});

const Book = mongoose.model('book', BookSchema);

module.exports = Book;