const express = require("express");
const { body } = require("express-validator");
const {
  createEnquiry,
  adminListEnquiries,
  adminGetEnquiry,
  adminUpdateEnquiryStatus,
  adminUpdateEnquiry,
  adminDeleteEnquiry,
} = require("../controllers/contactController");
const { requireAdmin } = require("../middleware/auth");
const validate = require("../middleware/validate");
const { formLimiter } = require("../middleware/rateLimiters");

const router = express.Router();

const publicValidators = [
  body("name").trim().isLength({ min: 2 }).withMessage("Please enter your full name."),
  body("email").isEmail().withMessage("Please enter a valid email address.").normalizeEmail(),
  body("phone")
    .optional({ checkFalsy: true })
    .customSanitizer((value) => (value || "").replace(/\D/g, ""))
    .isLength({ min: 7, max: 15 })
    .withMessage("Please enter a valid phone number."),
  body("enquiryType").trim().notEmpty().withMessage("Please select an enquiry type."),
  body("subject").trim().isLength({ min: 3 }).withMessage("Please enter a subject."),
  body("message").trim().isLength({ min: 20 }).withMessage("Please enter at least 20 characters."),
];

router.post("/", formLimiter, publicValidators, validate, createEnquiry);

const adminRouter = express.Router();
adminRouter.get("/", requireAdmin, adminListEnquiries);
adminRouter.get("/:id", requireAdmin, adminGetEnquiry);
adminRouter.patch("/:id/status", requireAdmin, adminUpdateEnquiryStatus);
adminRouter.patch("/:id", requireAdmin, adminUpdateEnquiry);
adminRouter.delete("/:id", requireAdmin, adminDeleteEnquiry);

module.exports = { publicRouter: router, adminRouter };
