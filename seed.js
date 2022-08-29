'use strict';

const { default: mongoose} = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Book = require('./models/book.js');

async function seed() {

  await Book.create({
    title: 'Great Expectations',
    description: 'description',
    status: 'have read',
  });
  console.log('Book was added');

  await Book.create({
    title: 'Where\'s Waldo',
    description: 'Super rad book!',
    status: 'have read',
  });
  console.log('Book was added');

  await Book.create({
    title: 'Where\'s Waldo',
    description: 'Super rad book!',
    status: 'have read',
  });
  console.log('Book was added');

  mongoose.disconnect();
}

seed();
