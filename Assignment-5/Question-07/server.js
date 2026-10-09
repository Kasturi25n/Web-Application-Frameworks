/**
 * Question 7: REST API for Student Management
 * 
 * Requirements:
 * - GET /students → Return all students.
 * - GET /students/:id → Return a student by ID.
 * - POST /students → Add a new student.
 * - Store student information temporarily using an in-memory array.
 * - Use JSON format for all responses.
 * 
 * Student: Pushpam Raj Satyarthi
 */

const express = require('express');
const app = express();

const PORT = process.env.PORT || 5004;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory student array
let students = [
  { id: 1, name: 'Pushpam Raj Satyarthi', rollNumber: '2024107717', branch: 'CSE-Core', semester: '6th Semester' },
  { id: 2, name: 'Aarav Sharma', rollNumber: '2024107718', branch: 'Computer Science', semester: '6th Semester' },
  { id: 3, name: 'Diya Patel', rollNumber: '2024107719', branch: 'Information Technology', semester: '4th Semester' }
];

// Next auto-incrementing ID
let nextId = 4;

// 1. GET /students → Return all students
app.get('/students', (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
});

// 2. GET /students/:id → Return a student by ID
app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${req.params.id} not found.`
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });
});

// 3. POST /students → Add a new student
app.post('/students', (req, res) => {
  const { name, rollNumber, branch, semester } = req.body;

  // Validation
  if (!name || !rollNumber) {
    return res.status(400).json({
      success: false,
      message: 'Name and Roll Number are required fields.'
    });
  }

  const newStudent = {
    id: nextId++,
    name,
    rollNumber,
    branch: branch || 'Computer Science',
    semester: semester || '1st Semester'
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: 'Student added successfully.',
    data: newStudent
  });
});

// 404 handler for invalid routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route '${req.originalUrl}' not found.`
  });
});

app.listen(PORT, () => {
  console.log(`[Q7] Student Management REST API is running on http://localhost:${PORT}`);
  console.log(`  - GET  http://localhost:${PORT}/students`);
  console.log(`  - GET  http://localhost:${PORT}/students/1`);
  console.log(`  - POST http://localhost:${PORT}/students`);
});

module.exports = app;
