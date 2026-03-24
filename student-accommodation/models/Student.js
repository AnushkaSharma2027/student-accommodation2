const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  email:     { type: String, required: true },
  phone:     { type: String, default: "" },
  program:   { type: String, required: true },
  year:      { type: String, default: "1st Year" },
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
