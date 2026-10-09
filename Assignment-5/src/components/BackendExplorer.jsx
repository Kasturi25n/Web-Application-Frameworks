import React, { useState } from 'react';

const backendQuestions = [
  {
    id: 1,
    title: 'Basic NodeJS HTTP Server',
    port: 3000,
    command: 'npm run q1',
    description: 'Runs on port 3000 using built-in http module. Root / displays "Welcome to NodeJS Lab", /time returns current date & time, any other URL returns 404.',
    endpoints: [
      { method: 'GET', path: '/', desc: 'Displays Welcome to NodeJS Lab' },
      { method: 'GET', path: '/time', desc: 'Returns current date and time' },
      { method: 'GET', path: '/invalid', desc: 'Returns 404 Page Not Found' }
    ],
    sampleCurl: 'curl http://localhost:3000/time'
  },
  {
    id: 2,
    title: 'NodeJS Modules and File Handling',
    port: 'CLI',
    command: 'npm run q2',
    description: 'Creates custom math module with add() & multiply(), imports via require(), accepts numbers, displays sum & product, and demonstrates fs file handling.',
    endpoints: [
      { method: 'CLI', path: 'node Question-02/index.js [num1] [num2]', desc: 'Accepts 2 numbers, logs sum and product, writes and reads log file' }
    ],
    sampleCurl: 'node Question-02/index.js 45 10'
  },
  {
    id: 3,
    title: 'Create a Basic ExpressJS Server',
    port: 5000,
    command: 'npm run q3',
    description: 'Runs on port 5000. Displays "Welcome to ExpressJS" for /, "NodeJS Laboratory" for /about, and 404 for invalid routes.',
    endpoints: [
      { method: 'GET', path: '/', desc: 'Welcome to ExpressJS' },
      { method: 'GET', path: '/about', desc: 'NodeJS Laboratory' },
      { method: 'GET', path: '/unknown', desc: '404 Page Not Found' }
    ],
    sampleCurl: 'curl http://localhost:5000/about'
  },
  {
    id: 4,
    title: 'ExpressJS Routing',
    port: 5001,
    command: 'npm run q4',
    description: 'Routes for students and faculty: GET /students, GET /students/:id, GET /faculty, and 404 error handler.',
    endpoints: [
      { method: 'GET', path: '/students', desc: 'Returns list of students' },
      { method: 'GET', path: '/students/1', desc: 'Returns details of student by ID' },
      { method: 'GET', path: '/faculty', desc: 'Returns faculty information' }
    ],
    sampleCurl: 'curl http://localhost:5001/students/1'
  },
  {
    id: 5,
    title: 'ExpressJS Middleware',
    port: 5002,
    command: 'npm run q5',
    description: 'Custom middleware logs HTTP request method, URL, and records timestamp for every request across all routes.',
    endpoints: [
      { method: 'GET', path: '/', desc: 'Home route logged by middleware' },
      { method: 'GET', path: '/status', desc: 'Health route logged by middleware' },
      { method: 'GET', path: '/users', desc: 'Users demo route logged by middleware' }
    ],
    sampleCurl: 'curl http://localhost:5002/status'
  },
  {
    id: 6,
    title: 'Route-Specific Middleware',
    port: 5003,
    command: 'npm run q6',
    description: 'Authentication middleware checking ?role=admin. Grants access to /dashboard if role=admin, else returns "Access Denied". /home is publicly accessible.',
    endpoints: [
      { method: 'GET', path: '/home', desc: 'Public home page (no auth required)' },
      { method: 'GET', path: '/dashboard', desc: 'Protected (Returns 403 Access Denied)' },
      { method: 'GET', path: '/dashboard?role=admin', desc: 'Authorized (Access Granted)' }
    ],
    sampleCurl: 'curl http://localhost:5003/dashboard?role=admin'
  },
  {
    id: 7,
    title: 'REST API for Student Management',
    port: 5004,
    command: 'npm run q7',
    description: 'RESTful API for students: GET /students, GET /students/:id, POST /students. In-memory storage with JSON responses.',
    endpoints: [
      { method: 'GET', path: '/students', desc: 'Return all students' },
      { method: 'GET', path: '/students/:id', desc: 'Return student by ID' },
      { method: 'POST', path: '/students', desc: 'Add new student (JSON body)' }
    ],
    sampleCurl: 'curl -X POST http://localhost:5004/students -H "Content-Type: application/json" -d \'{"name":"Maya Rao","rollNumber":"2024107721"}\''
  },
  {
    id: 8,
    title: 'REST API with PUT and DELETE (Books)',
    port: 5005,
    command: 'npm run q8',
    description: 'REST API for book collection: GET /books, POST /books, PUT /books/:id, DELETE /books/:id with proper HTTP status codes.',
    endpoints: [
      { method: 'GET', path: '/books', desc: 'Retrieve all books' },
      { method: 'POST', path: '/books', desc: 'Add new book' },
      { method: 'PUT', path: '/books/:id', desc: 'Update book details' },
      { method: 'DELETE', path: '/books/:id', desc: 'Delete book by ID' }
    ],
    sampleCurl: 'curl -X PUT http://localhost:5005/books/1 -H "Content-Type: application/json" -d \'{"price":39.99}\''
  },
  {
    id: 9,
    title: 'ExpressJS API with Multiple Routes and Middleware (Employees)',
    port: 5006,
    command: 'npm run q9',
    description: 'Employee management REST API featuring request logging middleware, GET /employees, GET /employees/:id, POST /employees, and 404 for invalid IDs.',
    endpoints: [
      { method: 'GET', path: '/employees', desc: 'List all employees' },
      { method: 'GET', path: '/employees/:id', desc: 'Employee by ID (404 if missing)' },
      { method: 'POST', path: '/employees', desc: 'Create new employee' }
    ],
    sampleCurl: 'curl http://localhost:5006/employees/2'
  },
  {
    id: 10,
    title: 'Mini REST API: Product Management',
    port: 5007,
    command: 'npm run q10',
    description: 'Complete Product Management API: GET, GET by ID, POST, PUT, DELETE with full validation and JSON handling.',
    endpoints: [
      { method: 'GET', path: '/products', desc: 'Retrieve all products' },
      { method: 'GET', path: '/products/:id', desc: 'Retrieve product by ID' },
      { method: 'POST', path: '/products', desc: 'Add a new product' },
      { method: 'PUT', path: '/products/:id', desc: 'Update a product' },
      { method: 'DELETE', path: '/products/:id', desc: 'Delete a product' }
    ],
    sampleCurl: 'curl http://localhost:5007/products'
  },
  {
    id: 14,
    title: 'Basic Web Server with Separate Routes',
    port: 5008,
    command: 'npm run q14',
    description: 'NodeJS Express server featuring separate styled web pages for Home (/), About (/about), and Contact (/contact) with active navigation.',
    endpoints: [
      { method: 'GET', path: '/', desc: 'Home page HTML' },
      { method: 'GET', path: '/about', desc: 'About us page HTML' },
      { method: 'GET', path: '/contact', desc: 'Contact page HTML' }
    ],
    sampleCurl: 'curl http://localhost:5008/about'
  },
  {
    id: 17,
    title: 'REST API for Student Management System (Full CRUD)',
    port: 5009,
    command: 'npm run q17',
    description: 'Comprehensive Student Management System API implementing GET (all & by id), POST, PUT, and DELETE operations with JSON middleware.',
    endpoints: [
      { method: 'GET', path: '/students', desc: 'Get all student records' },
      { method: 'GET', path: '/students/:id', desc: 'Get student record by ID' },
      { method: 'POST', path: '/students', desc: 'Insert student record' },
      { method: 'PUT', path: '/students/:id', desc: 'Update student record' },
      { method: 'DELETE', path: '/students/:id', desc: 'Delete student record' }
    ],
    sampleCurl: 'curl http://localhost:5009/students'
  },
  {
    id: 18,
    title: 'Online Event Management System REST API',
    port: 5010,
    command: 'npm run q18',
    description: 'Online Event Management API with POST, GET, GET by ID, PUT, and DELETE routes, custom middleware for logging and payload validation.',
    endpoints: [
      { method: 'GET', path: '/events', desc: 'Retrieve all upcoming events' },
      { method: 'GET', path: '/events/:id', desc: 'Retrieve event details by ID' },
      { method: 'POST', path: '/events', desc: 'Create a new event' },
      { method: 'PUT', path: '/events/:id', desc: 'Update event details' },
      { method: 'DELETE', path: '/events/:id', desc: 'Delete an event' }
    ],
    sampleCurl: 'curl http://localhost:5010/events'
  }
];

export default function BackendExplorer() {
  const [selectedId, setSelectedId] = useState(1);
  const [copiedId, setCopiedId] = useState(null);

  const selectedQ = backendQuestions.find((q) => q.id === selectedId) || backendQuestions[0];

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="program-container">
      <div className="program-header">
        <h2>NodeJS & ExpressJS Backend Explorer</h2>
        <p className="subtitle">
          Assignment 5 includes 13 backend programs (Questions 1–10, 14, 17, 18).
          Each program can be run independently using its dedicated command below.
        </p>
      </div>

      <div className="backend-explorer-grid">
        <div className="backend-sidebar">
          <h4>Backend Questions</h4>
          <ul className="backend-question-list">
            {backendQuestions.map((q) => (
              <li key={q.id}>
                <button
                  className={`backend-tab-btn ${selectedId === q.id ? 'active' : ''}`}
                  onClick={() => setSelectedId(q.id)}
                >
                  <span className="q-badge">Q{q.id}</span>
                  <span className="q-title-truncate">{q.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="backend-detail-card">
          <div className="detail-top-row">
            <div>
              <span className="badge badge-accent">Question {selectedQ.id}</span>
              <h3>{selectedQ.title}</h3>
            </div>
            {selectedQ.port !== 'CLI' && (
              <div className="port-pill">
                <span>PORT</span>
                <strong>{selectedQ.port}</strong>
              </div>
            )}
          </div>

          <p className="description-text">{selectedQ.description}</p>

          <div className="command-box">
            <span className="command-label">Run in Terminal:</span>
            <div className="command-snippet">
              <code>{selectedQ.command}</code>
              <button
                className="copy-btn"
                onClick={() => copyToClipboard(selectedQ.command, 'cmd')}
              >
                {copiedId === 'cmd' ? '✓ Copied' : '📋 Copy'}
              </button>
            </div>
          </div>

          <div className="endpoints-section">
            <h4>Available Endpoints / Actions</h4>
            <div className="endpoints-table-wrapper">
              <table className="endpoints-table">
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>Route / Target</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedQ.endpoints.map((ep, i) => (
                    <tr key={i}>
                      <td>
                        <span className={`method-badge method-${ep.method.toLowerCase()}`}>
                          {ep.method}
                        </span>
                      </td>
                      <td><code>{ep.path}</code></td>
                      <td>{ep.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="command-box">
            <span className="command-label">Sample Test Command (cURL / Node):</span>
            <div className="command-snippet">
              <code>{selectedQ.sampleCurl}</code>
              <button
                className="copy-btn"
                onClick={() => copyToClipboard(selectedQ.sampleCurl, 'curl')}
              >
                {copiedId === 'curl' ? '✓ Copied' : '📋 Copy'}
              </button>
            </div>
          </div>

          <div className="file-location-box">
            📁 Source Code: <code>Question-{selectedQ.id < 10 ? `0${selectedQ.id}` : selectedQ.id}/{selectedQ.id === 2 ? 'index.js' : 'server.js'}</code>
          </div>
        </div>
      </div>
    </div>
  );
}
