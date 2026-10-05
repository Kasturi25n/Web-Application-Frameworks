# Web Application Frameworks - Assignment 4 (ReactJS)

## Student Information

| Field | Details |
|---|---|
| **Student Name** | N V Kasturi |
| **Roll Number** | 2024070518 |
| **Department** | CSE-Core |
| **Course** | B.Tech |
| **Email** | nvkasturi25@gmail.com |

---

## Overview

This repository contains the complete implementation of **Assignment 4** for the Web Application Frameworks course. It features **10 ReactJS lab exercises** integrated into a single, interactive dashboard built with **React 19** and **Vite**. Users can easily navigate between exercises using the sidebar.

---

## Lab Programs Included

1. **Program 1 - Welcome Message & Student Details**
   - Implemented using functional components and JSX.
   - Displays a welcome message alongside student name and department.
   - *File:* `src/Program1.jsx`

2. **Program 2 - Student Information with Props**
   - Demonstrates component reusability and prop passing.
   - Passes `name`, `rollNumber`, and `course` from parent to child component (`StudentCard`).
   - *File:* `src/Program2.jsx`

3. **Program 3 - Interactive Counter (`useState`)**
   - Implements state management using the `useState` hook.
   - Includes **Increment**, **Decrement**, and **Reset** functionalities.
   - *File:* `src/Program3.jsx`

4. **Program 4 - Controlled Form Handling**
   - A controlled React form that captures student name and email.
   - Manages input state and displays submitted information dynamically upon form submission.
   - *File:* `src/Program4.jsx`

5. **Program 5 - Real-time Digital Clock (`useEffect`)**
   - Utilizes `useEffect` to create a live digital clock updating every second.
   - Implements proper cleanup (`clearInterval`) on component unmount to prevent memory leaks.
   - *File:* `src/Program5.jsx`

6. **Program 6 - API Data Fetching with Async Handling**
   - Fetches user records from a public REST API (`JSONPlaceholder`) using `useEffect`.
   - Handles **Loading** and **Error** states gracefully.
   - *File:* `src/Program6.jsx`

7. **Program 7 - Light / Dark Theme Switcher (Context API)**
   - Utilizes React's `createContext` and `useContext` to provide global theme state.
   - Demonstrates sharing state across sibling/child components without prop drilling.
   - *File:* `src/Program7.jsx`

8. **Program 8 - Shopping Cart Application**
   - Demonstrates state lifting and array state manipulations (`useState` and props).
   - Allows users to add items to a cart, remove items, and view real-time total price calculation.
   - *File:* `src/Program8.jsx`

9. **Program 9 - Student Attendance Management (`useReducer` + Context API)**
   - Manages complex state transitions with `useReducer` and shares state globally via `Context API`.
   - Allows marking students as **Present** or **Absent**.
   - *File:* `src/Program9.jsx`

10. **Program 10 - Task Manager Application**
    - Combines reusable components, `useState`, `useEffect`, and `Context API`.
    - Supports adding, viewing, and deleting tasks with state change notifications.
    - *File:* `src/Program10.jsx`

---

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 8
- **Language:** JavaScript (ES6+ / JSX)
- **Styling:** CSS3 (Modern, Responsive Dashboard Layout)
- **Linter:** Oxlint

---

## Project Structure

```text
Assignment-4/
├── Assignment 4-WAF.pdf      # Lab assignment problem statements
├── index.html                # HTML entry point
├── package.json              # Project dependencies and scripts
├── vite.config.js            # Vite configuration
├── public/
│   └── favicon.svg           # Application favicon
└── src/
    ├── main.jsx              # React DOM render root
    ├── App.jsx               # Main container with navigation sidebar
    ├── App.css               # Application layout styling
    ├── index.css             # Base and theme styling
    ├── Program1.jsx          # Welcome message
    ├── Program2.jsx          # Student info (Props)
    ├── Program3.jsx          # Counter (useState)
    ├── Program4.jsx          # Student form (Controlled inputs)
    ├── Program5.jsx          # Digital clock (useEffect & cleanup)
    ├── Program6.jsx          # User fetch (API & async state)
    ├── Program7.jsx          # Theme switcher (Context API)
    ├── Program8.jsx          # Shopping cart (useState & props)
    ├── Program9.jsx          # Attendance management (Context & useReducer)
    └── Program10.jsx         # Task manager (Context, useState, useEffect)
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` (bundled with Node.js)

### Installation

1. Navigate to the project directory:
   ```bash
   cd Assignment-4
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the application in your browser at the local URL provided (typically `http://localhost:5173/`).

### Production Build

To build the project for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

### Linting

To run the linter:

```bash
npm run lint
```
