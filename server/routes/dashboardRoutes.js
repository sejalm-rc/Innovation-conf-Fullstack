const express = require("express");
const { getSummary } = require("../controllers/dashboardController");
const { requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/summary", requireAdmin, getSummary);

module.exports = router;
