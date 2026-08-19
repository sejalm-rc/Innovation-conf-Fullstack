const express = require("express");
const { body } = require("express-validator");
const {
  listPublicConferences,
  listUpcomingConferences,
  listPreviousConferences,
  getPublicConferenceByIdentifier,
  adminListConferences,
  adminGetConference,
  adminCreateConference,
  adminUpdateConference,
  adminDeleteConference,
} = require("../controllers/conferenceController");
const { requireAdmin } = require("../middleware/auth");
const validate = require("../middleware/validate");
const { uploadConferenceImage } = require("../middleware/upload");

const router = express.Router();

const conferenceValidators = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("acronym").trim().notEmpty().withMessage("Acronym is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("startDate").notEmpty().withMessage("Start date is required").isISO8601().withMessage("Start date must be a valid date"),
  body("endDate").notEmpty().withMessage("End date is required").isISO8601().withMessage("End date must be a valid date"),
  body("mode").optional().isIn(["In Person", "Virtual", "Hybrid"]).withMessage("Invalid mode"),
  body("contactEmail").optional({ checkFalsy: true }).isEmail().withMessage("Contact email must be valid"),
];

// ---------------- Public ----------------
router.get("/", listPublicConferences);
router.get("/upcoming", listUpcomingConferences);
router.get("/previous", listPreviousConferences);
router.get("/:identifier", getPublicConferenceByIdentifier);

// ---------------- Admin (mounted separately under /api/admin/conferences) ----------------
const adminRouter = express.Router();

adminRouter.get("/", requireAdmin, adminListConferences);
adminRouter.get("/:id", requireAdmin, adminGetConference);
adminRouter.post(
  "/",
  requireAdmin,
  uploadConferenceImage.single("coverImage"),
  conferenceValidators,
  validate,
  adminCreateConference
);
adminRouter.put(
  "/:id",
  requireAdmin,
  uploadConferenceImage.single("coverImage"),
  conferenceValidators,
  validate,
  adminUpdateConference
);
adminRouter.delete("/:id", requireAdmin, adminDeleteConference);

module.exports = { publicRouter: router, adminRouter };
