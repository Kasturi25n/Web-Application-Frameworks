import { useEffect, useState } from 'react'

function Program5() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="card">
      <h1>{time.toLocaleTimeString()}</h1>
    </div>
  )
}

export default Program5
