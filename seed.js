'use strict';

const { default: mongoose} = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Book = require('./models/book.js');

async function seed() {

  await Book.create({
    title: 'Great Expectations',
    description: 'Great Expectations, novel by Charles Dickens, first published serially in All the Year Round in 1860 to 61 and issued in book form in 1861. The classic novel was one of its author\'s greatest critical and popular successes. It chronicles the coming of age of the orphan Pip while also addressing such issues as social class and human worth.',
    status: true,
  });
  console.log('Book was added');

  await Book.create({
    title: 'Where\'s Waldo',
    description: 'Where\'s Wally? (called Where\'s Waldo? in North America) is a British series of children\'s puzzle books created by English illustrator Martin Handford.',
    status: true,
  });
  console.log('Book was added');

  await Book.create({
    title: 'A tale of two Cities',
    description: 'A Tale of Two Cities is an 1859 historical novel by Charles Dickens, set in London and Paris before and during the French Revolution.',
    status: true,
  });
  console.log('Book was added');

  mongoose.disconnect();
}

seed();
