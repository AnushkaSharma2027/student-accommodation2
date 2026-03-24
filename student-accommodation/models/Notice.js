const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  category: { type: String, enum: ["General","Maintenance","Event","Fee","Urgent"], default: "General" },
  content:  { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Notice", noticeSchema);
