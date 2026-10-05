import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

function Header() {
  const { theme } = useContext(ThemeContext)
  return <h1>Current Theme: {theme}</h1>
}

function ThemeToggleButton() {
  const { toggleTheme } = useContext(ThemeContext)
  return <button onClick={toggleTheme}>Toggle Theme</button>
}

function ThemedBox() {
  const { theme } = useContext(ThemeContext)
  const style = {
    backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
    color: theme === 'light' ? '#000000' : '#ffffff',
    padding: '20px',
    marginTop: '10px',
    border: '1px solid var(--border)',
  }
  return <div style={style}>This box reflects the {theme} theme.</div>
}

function Program7() {
  return (
    <ThemeProvider>
      <Header />
      <ThemeToggleButton />
      <ThemedBox />
    </ThemeProvider>
  )
}

export default Program7
