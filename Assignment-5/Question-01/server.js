/**
 * Question 1: Basic NodeJS HTTP Server
 * 
 * Requirements:
 * - Write a NodeJS program using the built-in http module.
 * - Runs on port 3000.
 * - Displays "Welcome to NodeJS Lab" in the browser for root URL.
 * - Returns the current date and time when the user visits /time.
 * - Returns 404 Page Not Found for any other URL.
 * 
 * Student: Pushpam Raj Satyarthi
 */

const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === '/' || url === '') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>NodeJS Lab</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #0f172a; color: #f8fafc; }
          .card { background: #1e293b; padding: 2rem 3rem; border-radius: 12px; border: 1px solid #334155; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
          h1 { color: #38bdf8; margin-bottom: 0.5rem; }
          p { color: #94a3b8; }
          a { color: #38bdf8; text-decoration: none; font-weight: 600; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Welcome to NodeJS Lab</h1>
          <p>Assignment 5 - Question 1</p>
          <p>Visit <a href="/time">/time</a> to view the current date and time.</p>
        </div>
      </body>
      </html>
    `);
  } else if (url === '/time') {
    const currentDateTime = new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'medium'
    });
    const isoString = new Date().toISOString();

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Current Date & Time</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #0f172a; color: #f8fafc; }
          .card { background: #1e293b; padding: 2rem 3rem; border-radius: 12px; border: 1px solid #334155; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
          h1 { color: #4ade80; margin-bottom: 0.5rem; }
          .time-badge { background: #0f172a; border: 1px solid #38bdf8; color: #38bdf8; padding: 0.75rem 1.5rem; border-radius: 8px; font-size: 1.25rem; font-weight: 600; margin: 1.5rem 0; font-mono; }
          p { color: #94a3b8; }
          a { color: #38bdf8; text-decoration: none; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Current Date & Time</h1>
          <div class="time-badge">${currentDateTime}</div>
          <p>ISO Format: <code>${isoString}</code></p>
          <p><a href="/">← Back to Home</a></p>
        </div>
      </body>
      </html>
    `);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>404 Page Not Found</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #0f172a; color: #f8fafc; }
          .card { background: #1e293b; padding: 2rem 3rem; border-radius: 12px; border: 1px solid #ef4444; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
          h1 { color: #f87171; margin-bottom: 0.5rem; }
          p { color: #94a3b8; }
          a { color: #38bdf8; text-decoration: none; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>404 Page Not Found</h1>
          <p>The requested URL <code>${url}</code> was not found on this server.</p>
          <p><a href="/">← Go to Home</a></p>
        </div>
      </body>
      </html>
    `);
  }
});

server.listen(PORT, () => {
  console.log(`[Q1] Basic NodeJS HTTP Server is running on http://localhost:${PORT}`);
  console.log(`  - Root URL: http://localhost:${PORT}/`);
  console.log(`  - Time URL: http://localhost:${PORT}/time`);
});

module.exports = server;
