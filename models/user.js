const mongoose = require('mongoose');
const bookshelfSchema = new mongoose.Schema({
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    booklength: {
      type: Number,
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
    rating: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ['read', 'reading', 'future read'],
    },
    genre: {
      type: String,
      enum: ['fiction', 'non-fiction'],
    },
});


const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bookshelves: [bookshelfSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
