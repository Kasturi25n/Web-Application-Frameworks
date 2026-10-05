import { useState } from 'react'
import './App.css'
import Program1 from './Program1.jsx'
import Program2 from './Program2.jsx'
import Program3 from './Program3.jsx'
import Program4 from './Program4.jsx'
import Program5 from './Program5.jsx'
import Program6 from './Program6.jsx'
import Program7 from './Program7.jsx'
import Program8 from './Program8.jsx'
import Program9 from './Program9.jsx'
import Program10 from './Program10.jsx'

const programs = [
  { id: 1, label: 'Program 1: Welcome Message', Component: Program1 },
  { id: 2, label: 'Program 2: Student Info (Props)', Component: Program2 },
  { id: 3, label: 'Program 3: Counter', Component: Program3 },
  { id: 4, label: 'Program 4: Student Form', Component: Program4 },
  { id: 5, label: 'Program 5: Digital Clock', Component: Program5 },
  { id: 6, label: 'Program 6: Fetch Users', Component: Program6 },
  { id: 7, label: 'Program 7: Theme Context', Component: Program7 },
  { id: 8, label: 'Program 8: Shopping Cart', Component: Program8 },
  { id: 9, label: 'Program 9: Attendance', Component: Program9 },
  { id: 10, label: 'Program 10: Task Manager', Component: Program10 },
]

function App() {
  const [activeId, setActiveId] = useState(1)
  const active = programs.find((p) => p.id === activeId)
  const ActiveComponent = active.Component

  return (
    <div className="app-layout">
      <nav className="sidebar">
        <h2>Assignment 4 - ReactJS</h2>
        <ul>
          {programs.map((program) => (
            <li key={program.id}>
              <button
                className={program.id === activeId ? 'active' : ''}
                onClick={() => setActiveId(program.id)}
              >
                {program.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <main className="content">
        <ActiveComponent />
      </main>
    </div>
  )
}

export default App
