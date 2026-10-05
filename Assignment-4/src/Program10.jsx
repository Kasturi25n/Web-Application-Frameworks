import { createContext, useContext, useEffect, useState } from 'react'

const TaskContext = createContext()

function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    console.log('Task list updated. Total tasks:', tasks.length)
  }, [tasks])

  function addTask(text) {
    setTasks([...tasks, { id: Date.now(), text }])
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}

function TaskForm() {
  const { addTask } = useContext(TaskContext)
  const [text, setText] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (text.trim() === '') return
    addTask(text)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        placeholder="New task"
        onChange={(e) => setText(e.target.value)}
      />{' '}
      <button type="submit">Add Task</button>
    </form>
  )
}

function TaskList() {
  const { tasks, deleteTask } = useContext(TaskContext)

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.text} <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}

function Program10() {
  return (
    <TaskProvider>
      <h1>Task Manager</h1>
      <TaskForm />
      <TaskList />
    </TaskProvider>
  )
}

export default Program10
