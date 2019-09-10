const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/books", (req, res, next) => {
  // get all the books
  // render a 'books' view with the books data
  res.render("books");
});

module.exports = router;
