const express = require("express");
const router = express.Router();
const Allocation = require("../models/Allocation");
const Room = require("../models/Room");

// GET all allocations
router.get("/", async (req, res) => {
  try {
    const allocations = await Allocation.find().sort({ createdAt: -1 });
    res.json(allocations);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch allocations" });
  }
});

// CREATE allocation
router.post("/", async (req, res) => {
  try {
    const existing = await Allocation.findOne({ studentId: req.body.studentId, status: "Active" });
    if (existing) return res.status(400).json({ error: "Student already has an active allocation" });
    const room = await Room.findOne({ number: req.body.room });
    if (!room) return res.status(400).json({ error: "Room not found" });
    if (room.status === "Occupied") return res.status(400).json({ error: "Room is already occupied" });
    const allocation = new Allocation(req.body);
    await allocation.save();
    await Room.findOneAndUpdate({ number: req.body.room }, { status: "Occupied" });
    res.json({ success: true, allocation });
  } catch (err) {
    res.status(500).json({ error: "Failed to create allocation" });
  }
});

// END allocation
router.patch("/:id/end", async (req, res) => {
  try {
    const allocation = await Allocation.findByIdAndUpdate(
      req.params.id,
      { status: "Ended" },
      { new: true }
    );
    await Room.findOneAndUpdate({ number: allocation.room }, { status: "Available" });
    res.json({ success: true, allocation });
  } catch (err) {
    res.status(500).json({ error: "Failed to end allocation" });
  }
});

module.exports = router;
