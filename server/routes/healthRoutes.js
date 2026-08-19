const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/", (req, res) => {
  const dbStates = ["disconnected", "connected", "connecting", "disconnecting"];
  const dbState = dbStates[mongoose.connection.readyState] || "unknown";

  res.status(200).json({
    success: true,
    message: "Server is healthy",
    data: {
      server: "ok",
      database: dbState,
      timestamp: new Date().toISOString(),
    },
  });
});

module.exports = router;
