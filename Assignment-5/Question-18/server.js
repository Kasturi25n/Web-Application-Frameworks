/**
 * Question 18: Online Event Management System REST API
 * 
 * Requirements:
 * - Develop an ExpressJS REST API for an Online Event Management System.
 * - Implement routes to:
 *   - Add an event (POST /events)
 *   - Retrieve all events (GET /events)
 *   - Retrieve an event by ID (GET /events/:id)
 *   - Update event details (PUT /events/:id)
 *   - Delete an event (DELETE /events/:id)
 * - Use suitable middleware (JSON parsing, custom logger, request validation) and route parameters.
 * 
 * Student: Pushpam Raj Satyarthi
 */

const express = require('express');
const app = express();

const PORT = process.env.PORT || 5010;

// Middleware 1: JSON body parsing
app.use(express.json());

// Middleware 2: Event System Request Logger
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[EVENT-SYSTEM] ${timestamp} | ${req.method} ${req.originalUrl}`);
  next();
});

// In-memory events database
let events = [
  {
    id: 1,
    title: 'HackNova 2026 - National Hackathon',
    description: '36-hour inter-college software hackathon focusing on AI and Web3.',
    date: '2026-11-15',
    time: '09:00 AM',
    location: 'Auditorium Hall A, Tech Campus',
    organizer: 'CSE Department & Coding Club',
    capacity: 250,
    registeredCount: 180
  },
  {
    id: 2,
    title: 'Web Frameworks & React Deep Dive',
    description: 'Hands-on workshop covering Node.js microservices and modern React design patterns.',
    date: '2026-10-25',
    time: '02:00 PM',
    location: 'Online (Zoom Meeting)',
    organizer: 'Prof. David Chen',
    capacity: 500,
    registeredCount: 420
  },
  {
    id: 3,
    title: 'AI in Cloud Computing Summit',
    description: 'Keynote sessions with industry architects on scalable cloud architectures.',
    date: '2026-12-05',
    time: '10:00 AM',
    location: 'Convention Center, New Delhi',
    organizer: 'Cloud Innovation Labs',
    capacity: 350,
    registeredCount: 310
  }
];

let nextEventId = 4;

// Middleware 3: Custom Validation Middleware for Event Creation
function validateEventPayload(req, res, next) {
  const { title, date, location } = req.body;
  if (!title || !date || !location) {
    return res.status(400).json({
      success: false,
      error: 'Validation Failed',
      message: 'Event title, date, and location are mandatory fields.'
    });
  }
  next();
}

// Route 1: GET /events → Retrieve all events
app.get('/events', (req, res) => {
  res.status(200).json({
    success: true,
    totalEvents: events.length,
    data: events
  });
});

// Route 2: GET /events/:id → Retrieve an event by ID (using route parameter)
app.get('/events/:id', (req, res) => {
  const eventId = parseInt(req.params.id, 10);
  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return res.status(404).json({
      success: false,
      error: 'Not Found',
      message: `Event with ID ${req.params.id} does not exist.`
    });
  }

  res.status(200).json({
    success: true,
    data: event
  });
});

// Route 3: POST /events → Add a new event (uses validateEventPayload middleware)
app.post('/events', validateEventPayload, (req, res) => {
  const { title, description, date, time, location, organizer, capacity } = req.body;

  const newEvent = {
    id: nextEventId++,
    title,
    description: description || 'No description provided.',
    date,
    time: time || '10:00 AM',
    location,
    organizer: organizer || 'Event Committee',
    capacity: capacity ? parseInt(capacity, 10) : 100,
    registeredCount: 0
  };

  events.push(newEvent);

  res.status(201).json({
    success: true,
    message: 'Event published successfully.',
    data: newEvent
  });
});

// Route 4: PUT /events/:id → Update event details
app.put('/events/:id', (req, res) => {
  const eventId = parseInt(req.params.id, 10);
  const eventIndex = events.findIndex((e) => e.id === eventId);

  if (eventIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Not Found',
      message: `Event with ID ${req.params.id} was not found.`
    });
  }

  const { title, description, date, time, location, organizer, capacity, registeredCount } = req.body;

  if (title !== undefined) events[eventIndex].title = title;
  if (description !== undefined) events[eventIndex].description = description;
  if (date !== undefined) events[eventIndex].date = date;
  if (time !== undefined) events[eventIndex].time = time;
  if (location !== undefined) events[eventIndex].location = location;
  if (organizer !== undefined) events[eventIndex].organizer = organizer;
  if (capacity !== undefined) events[eventIndex].capacity = parseInt(capacity, 10);
  if (registeredCount !== undefined) events[eventIndex].registeredCount = parseInt(registeredCount, 10);

  res.status(200).json({
    success: true,
    message: `Event ID ${eventId} details updated successfully.`,
    data: events[eventIndex]
  });
});

// Route 5: DELETE /events/:id → Delete an event
app.delete('/events/:id', (req, res) => {
  const eventId = parseInt(req.params.id, 10);
  const eventIndex = events.findIndex((e) => e.id === eventId);

  if (eventIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Not Found',
      message: `Event with ID ${req.params.id} was not found.`
    });
  }

  const deletedEvent = events.splice(eventIndex, 1)[0];

  res.status(200).json({
    success: true,
    message: `Event '${deletedEvent.title}' (ID: ${eventId}) deleted successfully.`,
    data: deletedEvent
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route '${req.originalUrl}' does not exist on Event Management API.`
  });
});

app.listen(PORT, () => {
  console.log(`[Q18] Online Event Management REST API is running on http://localhost:${PORT}`);
  console.log(`  - GET    http://localhost:${PORT}/events`);
  console.log(`  - GET    http://localhost:${PORT}/events/1`);
  console.log(`  - POST   http://localhost:${PORT}/events`);
  console.log(`  - PUT    http://localhost:${PORT}/events/1`);
  console.log(`  - DELETE http://localhost:${PORT}/events/1`);
});

module.exports = app;
