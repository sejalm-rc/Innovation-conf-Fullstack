const express = require("express");
const { body } = require("express-validator");
const {
  createEvaluation,
  adminListEvaluations,
  adminGetEvaluation,
  adminUpdateEvaluationStatus,
  adminUpdateEvaluation,
  adminDeleteEvaluation,
} = require("../controllers/evaluationController");
const { requireAdmin } = require("../middleware/auth");
const validate = require("../middleware/validate");
const { uploadEvaluationDocument } = require("../middleware/upload");
const { formLimiter } = require("../middleware/rateLimiters");

const router = express.Router();

const publicValidators = [
  body("title").trim().isLength({ min: 4 }).withMessage("Please enter a valid conference title."),
  body("organizer").trim().isLength({ min: 2 }).withMessage("Please enter the organizer or institution."),
  body("country").trim().notEmpty().withMessage("Please select a country."),
  body("dates").trim().notEmpty().withMessage("Please enter conference dates."),
  body("venueMode").isIn(["In Person", "Hybrid", "Virtual"]).withMessage("Please select a valid venue or mode."),
  body("website")
    .optional({ checkFalsy: true })
    .matches(/^https?:\/\/.+/i)
    .withMessage("Website must start with http:// or https://."),
  body("email").isEmail().withMessage("Please enter a valid contact email.").normalizeEmail(),
  body("contactPerson").trim().isLength({ min: 2 }).withMessage("Please enter the contact person's name."),
  body("phone")
    .customSanitizer((value) => (value || "").replace(/\D/g, ""))
    .isLength({ min: 7, max: 15 })
    .withMessage("Please enter a valid phone number."),
  body("scope").trim().isLength({ min: 30 }).withMessage("Please describe the scope in at least 30 characters."),
  body("publicationPlan").trim().notEmpty().withMessage("Please select a publication plan."),
];

router.post(
  "/",
  formLimiter,
  uploadEvaluationDocument.single("document"),
  publicValidators,
  validate,
  createEvaluation
);

const adminRouter = express.Router();
adminRouter.get("/", requireAdmin, adminListEvaluations);
adminRouter.get("/:id", requireAdmin, adminGetEvaluation);
adminRouter.patch("/:id/status", requireAdmin, adminUpdateEvaluationStatus);
adminRouter.patch("/:id", requireAdmin, adminUpdateEvaluation);
adminRouter.delete("/:id", requireAdmin, adminDeleteEvaluation);

module.exports = { publicRouter: router, adminRouter };
