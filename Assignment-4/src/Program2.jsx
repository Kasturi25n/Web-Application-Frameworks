function StudentCard({ name, rollNumber, course }) {
  return (
    <div className="card">
      <h3>Student Information</h3>
      <p>Name: {name}</p>
      <p>Roll Number: {rollNumber}</p>
      <p>Course: {course}</p>
    </div>
  )
}

function Program2() {
  return (
    <StudentCard
      name="N V Kasturi"
      rollNumber="2024070518"
      course="B.Tech"
    />
  )
}

export default Program2
