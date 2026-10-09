/**
 * Question 17: Student Management System REST API (CRUD)
 * 
 * Requirements:
 * - NodeJS and ExpressJS REST API for a Student Management System.
 * - Implement GET, POST, PUT, and DELETE operations for student records.
 * - Use appropriate routes and JSON middleware.
 * 
 * Student: Pushpam Raj Satyarthi
 */

const express = require('express');
const app = express();

const PORT = process.env.PORT || 5009;

// JSON Middleware for parsing JSON request bodies
app.use(express.json());

// In-memory data store for students
let students = [
  {
    id: 1,
    name: 'Pushpam Raj Satyarthi',
    rollNumber: '2024107717',
    email: 'pushpam.raj@university.edu',
    branch: 'Computer Science and Engineering',
    semester: '6th Semester',
    cgpa: 9.4
  },
  {
    id: 2,
    name: 'Aarav Sharma',
    rollNumber: '2024107718',
    email: 'aarav.sharma@university.edu',
    branch: 'AI & Data Science',
    semester: '6th Semester',
    cgpa: 8.9
  },
  {
    id: 3,
    name: 'Diya Patel',
    rollNumber: '2024107719',
    email: 'diya.patel@university.edu',
    branch: 'Information Technology',
    semester: '4th Semester',
    cgpa: 9.2
  }
];

let nextStudentId = 4;

// 1. GET /students → Retrieve all students
app.get('/students', (req, res) => {
  res.status(200).json({
    success: true,
    totalRecords: students.length,
    data: students
  });
});

// 2. GET /students/:id → Retrieve single student by ID
app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      error: 'Not Found',
      message: `Student with ID ${req.params.id} does not exist.`
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });
});

// 3. POST /students → Create a new student record
app.post('/students', (req, res) => {
  const { name, rollNumber, email, branch, semester, cgpa } = req.body;

  // Validation
  if (!name || !rollNumber) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Fields "name" and "rollNumber" are mandatory.'
    });
  }

  // Check for duplicate roll number
  const existing = students.find((s) => s.rollNumber === rollNumber);
  if (existing) {
    return res.status(400).json({
      success: false,
      error: 'Duplicate Entry',
      message: `A student with roll number ${rollNumber} already exists.`
    });
  }

  const newStudent = {
    id: nextStudentId++,
    name,
    rollNumber,
    email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@university.edu`,
    branch: branch || 'Computer Science',
    semester: semester || '1st Semester',
    cgpa: cgpa !== undefined ? parseFloat(cgpa) : 0.0
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: 'Student record created successfully.',
    data: newStudent
  });
});

// 4. PUT /students/:id → Update an existing student record
app.put('/students/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Not Found',
      message: `Student with ID ${req.params.id} was not found.`
    });
  }

  const { name, rollNumber, email, branch, semester, cgpa } = req.body;

  if (name !== undefined) students[index].name = name;
  if (rollNumber !== undefined) students[index].rollNumber = rollNumber;
  if (email !== undefined) students[index].email = email;
  if (branch !== undefined) students[index].branch = branch;
  if (semester !== undefined) students[index].semester = semester;
  if (cgpa !== undefined) students[index].cgpa = parseFloat(cgpa);

  res.status(200).json({
    success: true,
    message: `Student ID ${id} updated successfully.`,
    data: students[index]
  });
});

// 5. DELETE /students/:id → Delete a student record
app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Not Found',
      message: `Student with ID ${req.params.id} was not found.`
    });
  }

  const deletedStudent = students.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: `Student record for '${deletedStudent.name}' (ID: ${id}) has been removed.`,
    data: deletedStudent
  });
});

// 404 handler for invalid routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route '${req.originalUrl}' does not exist on Student Management API.`
  });
});

app.listen(PORT, () => {
  console.log(`[Q17] Student Management CRUD API is running on http://localhost:${PORT}`);
  console.log(`  - GET    http://localhost:${PORT}/students`);
  console.log(`  - GET    http://localhost:${PORT}/students/1`);
  console.log(`  - POST   http://localhost:${PORT}/students`);
  console.log(`  - PUT    http://localhost:${PORT}/students/1`);
  console.log(`  - DELETE http://localhost:${PORT}/students/1`);
});

module.exports = app;
