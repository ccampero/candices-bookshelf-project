const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/new', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('bookshelves/new.ejs', { user: currentUser });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const newBook = {
            author: req.body.author,
            title: req.body.title,
            booklength: req.body.booklength,
            notes: req.body.notes,
            rating: req.body.rating,
            status: req.body.status,
            genre: req.body.genre
        };
        currentUser.bookshelves.push(newBook);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/bookshelves`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id).populate('bookshelves');
        res.render('bookshelves/index.ejs', { user: currentUser });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/:bookId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const book = currentUser.bookshelves.id(req.params.bookId);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.render('bookshelves/show.ejs', { user: currentUser, book });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.delete('/:bookshelfId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const indexToRemove = currentUser.bookshelves.findIndex(bookshelf =>
            bookshelf._id.equals(req.params.bookshelfId)
        );
        if (indexToRemove === -1) {
            return res.status(404).send('Bookshelf not found');
        }
        currentUser.bookshelves.splice(indexToRemove, 1); 
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/bookshelves`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/:bookshelfId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const book = currentUser.bookshelves.id(req.params.bookshelfId);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.render('bookshelves/edit.ejs', { user: currentUser, book: book });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.put('/:bookshelfId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const book = currentUser.bookshelves.id(req.params.bookshelfId); 
        if (!book) {
            return res.status(404).send('Bookshelf not found');
        }

        // Log the received data
        console.log('Received Data:', req.body);

        // Update the book object with new values
        book.author = req.body.author;
        book.title = req.body.title;
        book.notes = req.body.notes;
        book.rating = req.body.rating;
        book.status = req.body.status;
        book.genre = req.body.genre;

        await currentUser.save();

        // Fetch the updated user to verify the change
        const updatedUser = await User.findById(req.session.user._id);
        console.log('Updated User:', updatedUser.bookshelves.id(req.params.bookshelfId));

        res.redirect(`/users/${currentUser._id}/bookshelves/${req.params.bookshelfId}`); 
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;
