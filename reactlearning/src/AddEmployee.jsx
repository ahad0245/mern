import React, { useState } from 'react';
import axios from 'axios';

function AddEmployee() {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    salary: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/employees', formData)
      .then(response => {
        alert('Employee added!');
        setFormData({ name: '', position: '', department: '', salary: '' });
      })
      .catch(error => console.error('Error adding employee:', error));
  };

  return (
    <div>
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Position" required />
        <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Department" required />
        <input type="number" name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" required />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}

export default AddEmployee;
