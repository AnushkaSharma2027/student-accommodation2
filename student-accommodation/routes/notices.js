const express = require("express");
const router = express.Router();
const Notice = require("../models/Notice");

// GET all notices
router.get("/", async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notices" });
  }
});

// ADD notice
router.post("/", async (req, res) => {
  try {
    const notice = new Notice(req.body);
    await notice.save();
    res.json({ success: true, notice });
  } catch (err) {
    res.status(500).json({ error: "Failed to add notice" });
  }
});

// DELETE notice
router.delete("/:id", async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete notice" });
  }
});

module.exports = router;
