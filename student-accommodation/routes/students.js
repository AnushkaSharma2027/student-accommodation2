const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// GET all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// ADD student
router.post("/", async (req, res) => {
  try {
    const existing = await Student.findOne({ studentId: req.body.studentId });
    if (existing) return res.status(400).json({ error: "Student ID already exists" });
    const student = new Student(req.body);
    await student.save();
    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ error: "Failed to add student" });
  }
});

// DELETE student
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete student" });
  }
});

module.exports = router;
