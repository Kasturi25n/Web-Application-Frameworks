/**
 * Question 8: REST API with PUT and DELETE
 * 
 * Requirements:
 * - ExpressJS REST API for a collection of books.
 * - GET /books → Display all books.
 * - POST /books → Add a new book.
 * - PUT /books/:id → Update book details.
 * - DELETE /books/:id → Delete a book.
 * - Return suitable HTTP status codes (200, 201, 400, 404) and JSON responses.
 * 
 * Student: Pushpam Raj Satyarthi
 */

const express = require('express');
const app = express();

const PORT = process.env.PORT || 5005;

// Middleware to parse JSON
app.use(express.json());

// In-memory collection of books
let books = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin', year: 2008, price: 45.99 },
  { id: 2, title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', year: 2008, price: 29.99 },
  { id: 3, title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', year: 2017, price: 49.99 }
];

let nextId = 4;

// 1. GET /books - Display all books
app.get('/books', (req, res) => {
  res.status(200).json({
    success: true,
    count: books.length,
    data: books
  });
});

// GET /books/:id - Display book by id
app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: `Book with ID ${req.params.id} not found.`
    });
  }

  res.status(200).json({
    success: true,
    data: book
  });
});

// 2. POST /books - Add a new book
app.post('/books', (req, res) => {
  const { title, author, year, price } = req.body;

  if (!title || !author) {
    return res.status(400).json({
      success: false,
      message: 'Title and Author are required.'
    });
  }

  const newBook = {
    id: nextId++,
    title,
    author,
    year: year ? parseInt(year, 10) : new Date().getFullYear(),
    price: price !== undefined ? parseFloat(price) : 0
  };

  books.push(newBook);

  res.status(201).json({
    success: true,
    message: 'Book added successfully.',
    data: newBook
  });
});

// 3. PUT /books/:id - Update book details
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const bookIndex = books.findIndex((b) => b.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Book with ID ${req.params.id} not found for updating.`
    });
  }

  const { title, author, year, price } = req.body;

  // Update existing book fields if provided
  if (title !== undefined) books[bookIndex].title = title;
  if (author !== undefined) books[bookIndex].author = author;
  if (year !== undefined) books[bookIndex].year = parseInt(year, 10);
  if (price !== undefined) books[bookIndex].price = parseFloat(price);

  res.status(200).json({
    success: true,
    message: `Book ID ${id} updated successfully.`,
    data: books[bookIndex]
  });
});

// 4. DELETE /books/:id - Delete a book
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const bookIndex = books.findIndex((b) => b.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Book with ID ${req.params.id} not found for deletion.`
    });
  }

  const deletedBook = books.splice(bookIndex, 1)[0];

  res.status(200).json({
    success: true,
    message: `Book '${deletedBook.title}' (ID: ${id}) deleted successfully.`,
    data: deletedBook
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route '${req.originalUrl}' not found.`
  });
});

app.listen(PORT, () => {
  console.log(`[Q8] Books REST API (PUT & DELETE) is running on http://localhost:${PORT}`);
  console.log(`  - GET    http://localhost:${PORT}/books`);
  console.log(`  - POST   http://localhost:${PORT}/books`);
  console.log(`  - PUT    http://localhost:${PORT}/books/1`);
  console.log(`  - DELETE http://localhost:${PORT}/books/1`);
});

module.exports = app;
