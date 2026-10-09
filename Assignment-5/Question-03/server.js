/**
 * Question 3: Create a Basic ExpressJS Server
 * 
 * Requirements:
 * - Runs on port 5000.
 * - Displays "Welcome to ExpressJS" for the / route.
 * - Displays "NodeJS Laboratory" for the /about route.
 * - Returns an appropriate message for an invalid route.
 * 
 * Student: Pushpam Raj Satyarthi
 */

const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

// Root route (/)
app.get('/', (req, res) => {
  res.send('Welcome to ExpressJS');
});

// About route (/about)
app.get('/about', (req, res) => {
  res.send('NodeJS Laboratory');
});

// 404 handler for invalid routes
app.use((req, res) => {
  res.status(404).send(`404 - Page Not Found: The route '${req.originalUrl}' does not exist.`);
});

// Start the server with fallback handling (for macOS AirPlay occupying port 5000)
const server = app.listen(PORT, () => {
  console.log(`[Q3] Basic ExpressJS Server is running on http://localhost:${PORT}`);
  console.log(`  - Home:  http://localhost:${PORT}/`);
  console.log(`  - About: http://localhost:${PORT}/about`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const fallbackPort = 5050;
    console.warn(`[Q3 Note] Port ${PORT} is in use (macOS AirPlay). Starting on fallback port ${fallbackPort}...`);
    app.listen(fallbackPort, () => {
      console.log(`[Q3] Basic ExpressJS Server is running on http://localhost:${fallbackPort}`);
      console.log(`  - Home:  http://localhost:${fallbackPort}/`);
      console.log(`  - About: http://localhost:${fallbackPort}/about`);
    });
  } else {
    throw err;
  }
});

module.exports = app;
