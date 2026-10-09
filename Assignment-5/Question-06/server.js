/**
 * Question 6: Route-Specific Middleware
 * 
 * Requirements:
 * - Create an ExpressJS application with authentication middleware.
 * - The middleware checks whether the request contains a query parameter: ?role=admin
 * - If the role is admin, allow access to /dashboard. Otherwise, return: "Access Denied"
 * - Also create a /home route that is accessible without authentication.
 * 
 * Student: Pushpam Raj Satyarthi
 */

const express = require('express');
const app = express();

const PORT = process.env.PORT || 5003;

// Route-Specific Authentication Middleware
const authMiddleware = (req, res, next) => {
  const { role } = req.query;

  if (role === 'admin') {
    // Authorized: proceed to route handler
    next();
  } else {
    // Unauthorized: block access
    res.status(403).send('Access Denied');
  }
};

// Public Route: Accessible WITHOUT authentication
app.get('/home', (req, res) => {
  res.send('Welcome to the Home Page! (Publicly accessible to everyone without authentication)');
});

// Root redirects to /home or gives a helper message
app.get('/', (req, res) => {
  res.send(`
    <h2>Question 6: Route-Specific Middleware Demo</h2>
    <p>Try visiting:</p>
    <ul>
      <li><a href="/home">/home</a> - Public route (No auth needed)</li>
      <li><a href="/dashboard">/dashboard</a> - Protected (Will show "Access Denied")</li>
      <li><a href="/dashboard?role=admin">/dashboard?role=admin</a> - Authorized access!</li>
    </ul>
  `);
});

// Protected Route: Uses route-specific authMiddleware
app.get('/dashboard', authMiddleware, (req, res) => {
  res.send('Welcome to the Admin Dashboard! (Access granted: role=admin verified)');
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
  console.log(`[Q6] Route-Specific Middleware Server is running on http://localhost:${PORT}`);
  console.log(`  - Public Home:       http://localhost:${PORT}/home`);
  console.log(`  - Protected Denied:  http://localhost:${PORT}/dashboard`);
  console.log(`  - Protected Allowed: http://localhost:${PORT}/dashboard?role=admin`);
});

module.exports = app;
