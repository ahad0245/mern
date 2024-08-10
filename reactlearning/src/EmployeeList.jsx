import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  return (
    <div>
      <h1>Employees List</h1>
      <ul>
        {employees.map(emp => (
          <li key={emp._id}>{emp.name} - {emp.position} - {emp.department} - ${emp.salary}</li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;
