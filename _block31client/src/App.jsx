import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [employees, setEmployees] = useState([]); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      const response = await fetch('http://localhost:3000/employees');
      const data = await response.json();
      setEmployees(data);
      setLoading(false);
    }
    fetchEmployees();
  }
  , []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Acme HR Portal</h1>
      <h2>Headcount: {employees.length ?? 0} Employees</h2>
      <div>
        {employees.map((employee) => (
          <div key={employee.id}>
            <h3>Name: {employee.name}</h3>
            <p>Contact: {employee.phone}</p>
            {employee.isAdmin && <p>Admin</p>}
          </div>
        ))}
      </div>

    </>
  )
}

export default App
