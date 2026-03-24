const express = require("express");
const router = express.Router();
const Fee = require("../models/Fee");

// GET all fees
router.get("/", async (req, res) => {
  try {
    const fees = await Fee.find().sort({ createdAt: -1 });
    res.json(fees);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch fees" });
  }
});

// ADD fee
router.post("/", async (req, res) => {
  try {
    const fee = new Fee(req.body);
    await fee.save();
    res.json({ success: true, fee });
  } catch (err) {
    res.status(500).json({ error: "Failed to add fee" });
  }
});

// DELETE fee
router.delete("/:id", async (req, res) => {
  try {
    await Fee.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete fee" });
  }
});

module.exports = router;
