import { useState } from 'react'

function Program3() {
  const [count, setCount] = useState(0)

  return (
    <div className="card">
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>{' '}
      <button onClick={() => setCount(count - 1)}>Decrement</button>{' '}
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}

export default Program3
