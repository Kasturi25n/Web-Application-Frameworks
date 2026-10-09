/**
 * Question 14: Basic Web Server with Separate Routes (ExpressJS)
 * 
 * Requirements:
 * - Develop a NodeJS program using ExpressJS to create a basic web server
 * - Separate routes for Home, About, and Contact pages.
 * - Handles invalid routes with a 404 response.
 * 
 * Student: Pushpam Raj Satyarthi
 */

const express = require('express');
const app = express();

const PORT = process.env.PORT || 5008;

// Shared layout helper for clean, consistent pages
function renderPage(title, activeNav, bodyContent) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title} | Assignment 5</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; min-height: 100vh; display: flex; flex-direction: column; }
        header { background: #1e293b; border-bottom: 1px solid #334155; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.25rem; font-weight: 700; color: #38bdf8; text-decoration: none; }
        nav { display: flex; gap: 1rem; }
        nav a { color: #94a3b8; text-decoration: none; font-weight: 500; padding: 0.5rem 1rem; border-radius: 6px; transition: all 0.2s; }
        nav a:hover { color: #f8fafc; background: #334155; }
        nav a.active { color: #38bdf8; background: rgba(56, 189, 248, 0.15); font-weight: 600; }
        main { flex: 1; max-width: 800px; margin: 3rem auto; padding: 0 1.5rem; width: 100%; }
        .card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 2.5rem; box-shadow: 0 10px 25px rgba(0,0,0,0.4); }
        h1 { color: #38bdf8; margin-bottom: 1rem; font-size: 2rem; }
        p { color: #cbd5e1; line-height: 1.6; margin-bottom: 1rem; font-size: 1.05rem; }
        .badge { display: inline-block; background: #0f172a; border: 1px solid #38bdf8; color: #38bdf8; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.85rem; font-weight: 600; margin-bottom: 1.5rem; }
        .info-box { background: #0f172a; border-left: 4px solid #38bdf8; padding: 1rem 1.25rem; border-radius: 0 8px 8px 0; margin-top: 1.5rem; }
        footer { text-align: center; padding: 1.5rem; color: #64748b; font-size: 0.875rem; border-top: 1px solid #1e293b; }
      </style>
    </head>
    <body>
      <header>
        <a href="/" class="logo">NodeJS & ExpressJS Web Server</a>
        <nav>
          <a href="/" class="${activeNav === 'home' ? 'active' : ''}">Home</a>
          <a href="/about" class="${activeNav === 'about' ? 'active' : ''}">About</a>
          <a href="/contact" class="${activeNav === 'contact' ? 'active' : ''}">Contact</a>
        </nav>
      </header>
      <main>
        <div class="card">
          ${bodyContent}
        </div>
      </main>
      <footer>
        Assignment 5 - Question 14 | Developed by Pushpam Raj Satyarthi
      </footer>
    </body>
    </html>
  `;
}

// 1. Home Page Route (/)
app.get('/', (req, res) => {
  const content = `
    <span class="badge">Route: /</span>
    <h1>Welcome to the Home Page</h1>
    <p>This is the main landing page of our ExpressJS multi-route web server application.</p>
    <p>Express provides a streamlined, minimalist routing mechanism that maps specific HTTP requests to handler functions.</p>
    <div class="info-box">
      <strong>Server Details:</strong> Running on port ${PORT} with separate controllers for Home, About, and Contact pages.
    </div>
  `;
  res.send(renderPage('Home', 'home', content));
});

// 2. About Page Route (/about)
app.get('/about', (req, res) => {
  const content = `
    <span class="badge">Route: /about</span>
    <h1>About Us</h1>
    <p>Welcome to the <strong>NodeJS Laboratory</strong>. This application demonstrates the fundamental principles of web routing and template rendering with ExpressJS.</p>
    <p>Express makes building robust APIs and server-side web applications effortless with its lightweight middleware pipeline.</p>
    <div class="info-box">
      <strong>Course:</strong> Web Application Framework<br/>
      <strong>Student:</strong> Pushpam Raj Satyarthi (Roll: 2024107717)<br/>
      <strong>Assignment:</strong> Assignment 5 (Question 14)
    </div>
  `;
  res.send(renderPage('About', 'about', content));
});

// 3. Contact Page Route (/contact)
app.get('/contact', (req, res) => {
  const content = `
    <span class="badge">Route: /contact</span>
    <h1>Contact Page</h1>
    <p>Feel free to reach out with any inquiries or feedback regarding our web application framework assignments.</p>
    <div class="info-box">
      <strong>Get In Touch:</strong><br/>
      📧 Email: pushpam@university.edu<br/>
      📍 Location: Department of Computer Science & Engineering<br/>
      🕒 Office Hours: Monday - Friday, 10:00 AM - 5:00 PM
    </div>
  `;
  res.send(renderPage('Contact', 'contact', content));
});

// 404 Handler for invalid routes
app.use((req, res) => {
  const content = `
    <span class="badge" style="border-color: #ef4444; color: #f87171;">404 Not Found</span>
    <h1 style="color: #f87171;">Page Not Found</h1>
    <p>The route <code>${req.originalUrl}</code> does not exist on this server.</p>
    <p><a href="/" style="color: #38bdf8; text-decoration: none; font-weight: 600;">← Return to Safety on Home Page</a></p>
  `;
  res.status(404).send(renderPage('404 Not Found', '', content));
});

app.listen(PORT, () => {
  console.log(`[Q14] ExpressJS Multi-Route Server is running on http://localhost:${PORT}`);
  console.log(`  - Home:    http://localhost:${PORT}/`);
  console.log(`  - About:   http://localhost:${PORT}/about`);
  console.log(`  - Contact: http://localhost:${PORT}/contact`);
});

module.exports = app;
