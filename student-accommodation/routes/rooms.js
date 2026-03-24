const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

// GET all rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find().sort({ number: 1 });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
});

// ADD room
router.post("/", async (req, res) => {
  try {
    const existing = await Room.findOne({ number: req.body.number });
    if (existing) return res.status(400).json({ error: "Room number already exists" });
    const room = new Room(req.body);
    await room.save();
    res.json({ success: true, room });
  } catch (err) {
    res.status(500).json({ error: "Failed to add room" });
  }
});

// UPDATE room status
router.patch("/:id/status", async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ success: true, room });
  } catch (err) {
    res.status(500).json({ error: "Failed to update room status" });
  }
});

// DELETE room
router.delete("/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (room.status === "Occupied") return res.status(400).json({ error: "Cannot delete an occupied room" });
    await Room.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete room" });
  }
});

module.exports = router;
