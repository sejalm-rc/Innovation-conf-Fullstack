const express = require("express");
const { body } = require("express-validator");
const { login, me, logout } = require("../controllers/authController");
const { requireAdmin } = require("../middleware/auth");
const validate = require("../middleware/validate");
const { loginLimiter } = require("../middleware/rateLimiters");

const router = express.Router();

router.post(
  "/login",
  loginLimiter,
  [
    body("email").isEmail().withMessage("A valid email is required").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  login
);

router.get("/me", requireAdmin, me);
router.post("/logout", logout);

module.exports = router;
