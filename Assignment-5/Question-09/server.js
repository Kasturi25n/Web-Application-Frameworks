/**
 * Question 9: ExpressJS API with Multiple Routes and Middleware
 * 
 * Requirements:
 * - Simple Employee Management REST API using ExpressJS.
 * - Use middleware to log every request.
 * - Implement GET /employees.
 * - Implement GET /employees/:id.
 * - Implement POST /employees.
 * - Return 404 when an employee ID does not exist.
 * - Return responses in JSON format.
 * 
 * Student: Pushpam Raj Satyarthi
 */

const express = require('express');
const app = express();

const PORT = process.env.PORT || 5006;

// Body parser middleware
app.use(express.json());

// Logging Middleware: logs every incoming request
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[EMPLOYEE API LOG] ${timestamp} | ${req.method} ${req.originalUrl}`);
  next();
});

// In-memory employee store
let employees = [
  { id: 1, name: 'Alice Johnson', department: 'Engineering', role: 'Full Stack Developer', salary: 85000 },
  { id: 2, name: 'Bob Smith', department: 'Product', role: 'Product Manager', salary: 92000 },
  { id: 3, name: 'Charlie Davis', department: 'Design', role: 'UI/UX Designer', salary: 78000 }
];

let nextId = 4;

// 1. GET /employees → List all employees
app.get('/employees', (req, res) => {
  res.status(200).json({
    success: true,
    total: employees.length,
    data: employees
  });
});

// 2. GET /employees/:id → Get employee by ID, or 404 if not found
app.get('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const employee = employees.find((e) => e.id === id);

  if (!employee) {
    return res.status(404).json({
      success: false,
      error: 'Not Found',
      message: `Employee with ID ${req.params.id} does not exist.`
    });
  }

  res.status(200).json({
    success: true,
    data: employee
  });
});

// 3. POST /employees → Add a new employee
app.post('/employees', (req, res) => {
  const { name, department, role, salary } = req.body;

  if (!name || !department) {
    return res.status(400).json({
      success: false,
      error: 'Bad Request',
      message: 'Name and Department are required fields.'
    });
  }

  const newEmployee = {
    id: nextId++,
    name,
    department,
    role: role || 'Associate',
    salary: salary ? parseFloat(salary) : 50000
  };

  employees.push(newEmployee);

  res.status(201).json({
    success: true,
    message: 'Employee successfully created.',
    data: newEmployee
  });
});

// 404 handler for non-existent routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route Not Found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

app.listen(PORT, () => {
  console.log(`[Q9] Employee Management API is running on http://localhost:${PORT}`);
  console.log(`  - GET  http://localhost:${PORT}/employees`);
  console.log(`  - GET  http://localhost:${PORT}/employees/1`);
  console.log(`  - POST http://localhost:${PORT}/employees`);
});

module.exports = app;
