import { useState } from 'react'

function Program4() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted({ name, email })
  }

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div style={{ marginTop: '8px' }}>
          <label>Email: </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit" style={{ marginTop: '8px' }}>
          Submit
        </button>
      </form>

      {submitted && (
        <div style={{ marginTop: '16px' }}>
          <h3>Submitted Information</h3>
          <p>Name: {submitted.name}</p>
          <p>Email: {submitted.email}</p>
        </div>
      )}
    </div>
  )
}

export default Program4
