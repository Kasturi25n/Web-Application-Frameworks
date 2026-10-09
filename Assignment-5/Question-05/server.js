/**
 * Question 5: ExpressJS Middleware
 * 
 * Requirements:
 * - Implement custom middleware to:
 *   - Display the request method and URL in the console.
 *   - Record the date and time of each request.
 * - Apply the middleware to all routes.
 * - Create at least two routes to demonstrate its execution.
 * 
 * Student: Pushpam Raj Satyarthi
 */

const express = require('express');
const app = express();

const PORT = process.env.PORT || 5002;

// Custom Middleware: Logs method, URL, and records timestamp
const requestLoggerMiddleware = (req, res, next) => {
  const requestTime = new Date().toISOString();
  // Attach timestamp to the request object so downstream routes can use it
  req.requestTime = requestTime;

  console.log(`[LOGGER MIDDLEWARE] ${requestTime} | Method: ${req.method} | URL: ${req.originalUrl || req.url}`);
  next(); // Pass control to the next handler
};

// Apply custom middleware to ALL routes
app.use(requestLoggerMiddleware);

// Route 1: Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Question 5 Middleware Demo!',
    recordedTime: req.requestTime,
    method: req.method,
    route: '/'
  });
});

// Route 2: Status / Health route
app.get('/status', (req, res) => {
  res.json({
    status: 'Server is healthy and running smoothly',
    timestamp: req.requestTime,
    uptimeSeconds: Math.floor(process.uptime())
  });
});

// Route 3: Users demo route
app.get('/users', (req, res) => {
  res.json({
    message: 'User list retrieved',
    requestedAt: req.requestTime,
    users: ['Pushpam', 'Aarav', 'Diya']
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: '404 Not Found',
    path: req.originalUrl,
    recordedAt: req.requestTime
  });
});

app.listen(PORT, () => {
  console.log(`[Q5] ExpressJS Middleware Server is running on http://localhost:${PORT}`);
  console.log(`  - Test Route 1: http://localhost:${PORT}/`);
  console.log(`  - Test Route 2: http://localhost:${PORT}/status`);
  console.log(`  - Test Route 3: http://localhost:${PORT}/users`);
});

module.exports = app;
