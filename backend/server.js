const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
const MONGO_URI = 'mongodb+srv://ahad:ahad@cluster0.2yvid.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    createDummyEmployees(); // Uncomment to seed data once initially
  })
  .catch(err => console.log('MongoDB connection error:', err));

// Employee Schema and Model
const employeeSchema = new Schema({
  name: String,
  position: String,
  department: String,
  salary: Number
});
const Employee = mongoose.model('Employee', employeeSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
// Get all employees
app.get('/api/employees', (req, res) => {
  Employee.find()
    .then(employees => res.json(employees))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new employee
app.post('/api/employees', (req, res) => {
  const newEmployee = new Employee({
    name: req.body.name,
    position: req.body.position,
    department: req.body.department,
    salary: req.body.salary
  });

  newEmployee.save()
    .then(() => res.json('Employee added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Seed the database with dummy employees
function createDummyEmployees() {
  const dummyEmployees = [
    { name: "Alice Johnson", position: "Software Engineer", department: "Engineering", salary: 70000 },
    { name: "Bob Smith", position: "Project Manager", department: "Product", salary: 65000 },
    { name: "Carol Danvers", position: "UX Designer", department: "Design", salary: 60000 }
  ];

  Employee.insertMany(dummyEmployees)
    .then(() => console.log("Added dummy employees!"))
    .catch(err => console.log("Error seeding database:", err));
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
