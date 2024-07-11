const express = require('express');
const router = express.Router();





router.get('/', (req, res) => {
    res.send('hello bookshelves index route');
});

router.get('/new', async (req, res) => {
    res.render('bookshelves/new.ejs');
  });
  
module.exports = router;

const User = require('../models/user.js');

router.get('/', (req, res) => {
    res.send('hello bookshelves index route');
});

module.exports = router;