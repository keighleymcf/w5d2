const express = require("express");
const Book = require("../models/Book");

const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/books", (req, res) => {
  // get all the books
  // render a 'books' view with the books data

  Book.find().then(books => {
    res.render("books", { booksList: books });
  });
});

router.get("/books/add", (req, res) => {
  res.render("bookForm");
});

router.get("/books/:bookId", (req, res) => {
  const bookId = req.params.bookId;

  Book.findById(bookId).then(book => {
    res.render("bookDetails", { book: book });
  });
});

router.post("/books", (req, res, next) => {
  // const title = req.body.title;
  // const author = req.body.author;
  // const description = req.body.description;
  // const rating = req.body.rating;
  const { title, author, description, rating } = req.body;

  Book.create({
    title,
    author,
    description,
    rating
  })
    .then(book => {
      console.log(`Success! ${title} was added to the database.`);
      // res.redirect('/books');
      res.redirect(`/books/${book._id}`);
    })
    .catch(err => {
      console.log("Error while adding a book to the DB");
      next(err);
    });
});

router.get("/books/edit/:bookId", (req, res, next) => {
  Book.findById(req.params.bookId)
    .then(book => {
      // render the edit form with the data from the book
      res.render("bookEdit", { book: book });
    })
    .catch(err => {
      next(err);
    });
});

router.post("/books/edit/:bookId", (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const author = req.body.author;
  const rating = req.body.rating;

  Book.findByIdAndUpdate(req.params.bookId, {
    title,
    description,
    author,
    rating
  })
    .then(book => {
      //   res.redirect('/books')
      res.redirect(`/books/${book._id}`); // book._id === req.params.bookId
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
