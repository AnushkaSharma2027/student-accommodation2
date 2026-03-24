const mongoose = require("mongoose");

const allocationSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  studentId:   { type: String, required: true },
  room:        { type: String, required: true },
  building:    { type: String, required: true },
  price:       { type: Number, default: 0 },
  checkin:     { type: String, required: true },
  duration:    { type: String, enum: ["Monthly","Semester","Yearly"], default: "Monthly" },
  status:      { type: String, enum: ["Active","Ended"], default: "Active" },
}, { timestamps: true });

module.exports = mongoose.model("Allocation", allocationSchema);
