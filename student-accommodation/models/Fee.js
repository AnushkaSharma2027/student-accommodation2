const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  studentId:   { type: String, required: true },
  studentName: { type: String, required: true },
  room:        { type: String, default: "—" },
  amount:      { type: Number, required: true },
  month:       { type: String, required: true },
  mode:        { type: String, enum: ["Cash","UPI","Bank Transfer","Card"], default: "Cash" },
  notes:       { type: String, default: "" },
  status:      { type: String, default: "Paid" },
}, { timestamps: true });

module.exports = mongoose.model("Fee", feeSchema);
