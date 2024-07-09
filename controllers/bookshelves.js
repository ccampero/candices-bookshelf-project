const express = require('express');
const router = express.Router();
const bookshelvesController = require('../controllers/bookshelves.js');

const User = require('../models/user.js');

router.get('/', (req, res) => {
    res.send('hello bookshelves index route');
});

module.exports = router;