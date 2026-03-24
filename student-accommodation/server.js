require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/students",    require("./routes/students"));
app.use("/api/rooms",       require("./routes/rooms"));
app.use("/api/allocations", require("./routes/allocations"));
app.use("/api/complaints",  require("./routes/complaints"));
app.use("/api/fees",        require("./routes/fees"));
app.use("/api/notices",     require("./routes/notices"));

// Serve frontend for any unknown route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 3000, () =>
      console.log(`🚀 Server running at http://localhost:${process.env.PORT || 3000}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
