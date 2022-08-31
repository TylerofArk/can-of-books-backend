'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Book = require('./models/book.js');

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongoose is connected');
});

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.status(200).send('Welcome to the server');
});

app.get('/books', getBooks);

async function getBooks(request, response, next) {
  try {
    let results = await Book.find();

    console.log(results);
    response.status(200).send(results);
  } catch(error) {
    next(error);
  }
}

app.post('/books', postBook);

async function postBook(request, response, next){
  console.log(request.body);
  try{
    const newBook = await Book.create(request.body);
    response.status(201).send(newBook);
  } catch (error) {
    next(error);
  }
}

app.delete('/books/:bookid', deleteBook);

async function deleteBook(request, response, next){
  const id = request.params.bookid;
  console.log(id);
  try {
    await Book.findByIdAndDelete(id);
    response.status(204).send('Success!');
  } catch (error) {
    next(error);
  }
}

app.put('/books/:bookid', putBooks);

async function putBooks(request, response, next){
  let id = request.params.bookid;
  try{
    let data = request.body;
    const updateBook = await Book.findByIdAndUpdate(id, data, {new: true, overwrite: true});
    response.status(201).send(updateBook);
  } catch (error) {
    next(error);
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not available');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
