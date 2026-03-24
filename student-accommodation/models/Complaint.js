const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  studentId:   { type: String, required: true },
  room:        { type: String, default: "N/A" },
  subject:     { type: String, required: true },
  description: { type: String, required: true },
  priority:    { type: String, enum: ["Low","Medium","High"], default: "Low" },
  status:      { type: String, enum: ["Pending","In Progress","Resolved"], default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model("Complaint", complaintSchema);
