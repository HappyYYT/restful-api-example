const Book = require("../models/bookModel");
const { getPostData } = require("../utils/utils");

// @desc Gets All Books
// @route GET /api/books
async function getBooks(req, res) {
  try {
    const books = await Book.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(books));
  } catch (error) {
    console.log(error);
  }
}

// @desc Gets Single Book
// @route GET /api/book/:id
async function getBook(req, res, id) {
  try {
    const book = await Book.findById(id);
    if (!book) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Book Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(book));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc Create a Book
// @route POST /api/books
async function createBook(req, res) {
  try {
    debugger;
    const body = await getPostData(req);
    const { name, author } = JSON.parse(body);
    const book = { name, author };
    const newBook = await Book.create(book);
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newBook));
  } catch (error) {
    console.log(error);
    res.writeHead(201, { "Content-Type": "application/json" });
  }
}

// @desc Update a Book
// @route PUT /api/books/:id
async function updateBook(req, res, id) {
  try {
    const book = await Book.findById(id);
    if (!book) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Book Not Found" }));
    } else {
      const body = await getPostData(req);
      const { name, author } = JSON.parse(body);
      const bookData = {
        name: name || book.name,
        author: author || book.author,
      };
      const updBook = await Book.update(id, bookData);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updBook));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc Delete Single Book
// @route Delete /api/book/:id
async function deleteBook(req, res, id) {
  try {
    const book = await Book.findById(id);
    if (!book) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Book Not Found" }));
    } else {
      await Book.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Book ${id} removed` }));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
