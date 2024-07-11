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
      currentUser.bookshelves.push(req.body);
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/bookshelves`);
    } catch (error) {
      console.log(error);
      res.redirect('/')
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

router.get('/:applicationId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const bookshelf = currentUser.bookshelves.id(req.params.bookshelfId);
      res.render('bookshelves/show.ejs', {
        bookshelf: bookshelf,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });


module.exports = router;