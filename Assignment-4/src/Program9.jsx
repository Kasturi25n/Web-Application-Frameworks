import { createContext, useContext, useReducer } from 'react'

const AttendanceContext = createContext()

const initialStudents = [
  { id: 1, name: 'N V Kasturi', present: false },
  { id: 2, name: 'Aditi Sharma', present: false },
  { id: 3, name: 'Rohan Mehta', present: false },
]

function attendanceReducer(state, action) {
  switch (action.type) {
    case 'MARK_PRESENT':
      return state.map((student) =>
        student.id === action.id ? { ...student, present: true } : student,
      )
    case 'MARK_ABSENT':
      return state.map((student) =>
        student.id === action.id ? { ...student, present: false } : student,
      )
    default:
      return state
  }
}

function AttendanceProvider({ children }) {
  const [students, dispatch] = useReducer(attendanceReducer, initialStudents)
  return (
    <AttendanceContext.Provider value={{ students, dispatch }}>
      {children}
    </AttendanceContext.Provider>
  )
}

function AttendanceList() {
  const { students, dispatch } = useContext(AttendanceContext)

  return (
    <ul>
      {students.map((student) => (
        <li key={student.id}>
          {student.name} - {student.present ? 'Present' : 'Absent'}{' '}
          <button onClick={() => dispatch({ type: 'MARK_PRESENT', id: student.id })}>
            Mark Present
          </button>{' '}
          <button onClick={() => dispatch({ type: 'MARK_ABSENT', id: student.id })}>
            Mark Absent
          </button>
        </li>
      ))}
    </ul>
  )
}

function Program9() {
  return (
    <AttendanceProvider>
      <h1>Student Attendance</h1>
      <AttendanceList />
    </AttendanceProvider>
  )
}

export default Program9
