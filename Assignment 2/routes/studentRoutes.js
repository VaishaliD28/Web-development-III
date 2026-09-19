const express = require('express');
const router = express.Router();
const students = require('../data/students');

// 1. GET /students - Get all student records
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
});

// 2. GET /students/:id - Get a single student record by ID
router.get('/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);

  if (isNaN(studentId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid student ID provided'
    });
  }

  const student = students.find(s => s.id === studentId);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${studentId} not found`
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });
});

// 3. POST /students - Add a new student record
router.post('/', (req, res) => {
  const { name, age, grade, course, email } = req.body;

  // Validation: name and age are required
  if (!name || age === undefined || age === null) {
    return res.status(400).json({
      success: false,
      message: 'Please provide required fields: name and age'
    });
  }

  // Generate next unique ID
  const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;

  const newStudent = {
    id: newId,
    name: name.trim(),
    age: Number(age),
    grade: grade || 'N/A',
    course: course || 'N/A',
    email: email || ''
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: 'Student record created successfully',
    data: newStudent
  });
});

// 4. PUT /students/:id - Update an existing student record
router.put('/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);

  if (isNaN(studentId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid student ID provided'
    });
  }

  const studentIndex = students.findIndex(s => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${studentId} not found`
    });
  }

  const { name, age, grade, course, email } = req.body;

  // Validate if req.body has any data to update
  if (!name && age === undefined && !grade && !course && !email) {
    return res.status(400).json({
      success: false,
      message: 'Please provide at least one field to update'
    });
  }

  // Update existing student record keeping original ID
  const existingStudent = students[studentIndex];
  const updatedStudent = {
    ...existingStudent,
    ...(name && { name: name.trim() }),
    ...(age !== undefined && age !== null && { age: Number(age) }),
    ...(grade && { grade: grade.trim() }),
    ...(course && { course: course.trim() }),
    ...(email && { email: email.trim() })
  };

  students[studentIndex] = updatedStudent;

  res.status(200).json({
    success: true,
    message: 'Student record updated successfully',
    data: updatedStudent
  });
});

// 5. DELETE /students/:id - Delete a student record by ID
router.delete('/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);

  if (isNaN(studentId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid student ID provided'
    });
  }

  const studentIndex = students.findIndex(s => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${studentId} not found`
    });
  }

  const deletedStudent = students.splice(studentIndex, 1)[0];

  res.status(200).json({
    success: true,
    message: `Student with ID ${studentId} deleted successfully`,
    data: deletedStudent
  });
});

module.exports = router;
