const ConferenceEvaluation = require("../models/ConferenceEvaluation");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess, sendError } = require("../utils/apiResponse");
const { removeLocalFile } = require("../middleware/upload");

const createEvaluation = asyncHandler(async (req, res) => {
  const {
    title,
    acronym,
    organizer,
    country,
    dates,
    venueMode,
    website,
    email,
    contactPerson,
    phone,
    scope,
    publicationPlan,
  } = req.body;

  const payload = {
    title,
    acronym,
    organizer,
    country,
    dates,
    venueMode,
    website,
    email,
    contactPerson,
    phone,
    scope,
    publicationPlan,
  };

  if (req.file) {
    payload.proposalFile = {
      originalName: req.file.originalname,
      storedName: req.file.filename,
      url: `/uploads/evaluations/${req.file.filename}`,
      size: req.file.size,
    };
  }

  const evaluation = await ConferenceEvaluation.create(payload);

  return sendSuccess(res, {
    statusCode: 201,
    message: "Thank you! Your conference has been submitted for evaluation.",
    data: evaluation,
  });
});

const adminListEvaluations = asyncHandler(async (req, res) => {
  const { status, search, page = 1, limit = 20, sort = "-submittedAt" } = req.query;

  const query = {};
  if (status) query.status = status;
  if (search) {
    query.$or = [
      { title: new RegExp(search, "i") },
      { acronym: new RegExp(search, "i") },
      { organizer: new RegExp(search, "i") },
      { email: new RegExp(search, "i") },
    ];
  }

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);

  const [items, total] = await Promise.all([
    ConferenceEvaluation.find(query)
      .sort(sort)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    ConferenceEvaluation.countDocuments(query),
  ]);

  return sendSuccess(res, {
    message: "Evaluations fetched successfully",
    data: items,
    meta: { total, page: pageNum, limit: limitNum, pages: Math.ceil(total / limitNum) || 1 },
  });
});

const adminGetEvaluation = asyncHandler(async (req, res) => {
  const evaluation = await ConferenceEvaluation.findById(req.params.id);
  if (!evaluation) return sendError(res, { statusCode: 404, message: "Evaluation not found" });
  return sendSuccess(res, { message: "Evaluation fetched successfully", data: evaluation });
});

const adminUpdateEvaluationStatus = asyncHandler(async (req, res) => {
  const { status, adminNotes } = req.body;
  const allowed = ["pending", "under-review", "approved", "rejected"];

  if (!allowed.includes(status)) {
    return sendError(res, { statusCode: 400, message: "Invalid status value" });
  }

  const evaluation = await ConferenceEvaluation.findById(req.params.id);
  if (!evaluation) return sendError(res, { statusCode: 404, message: "Evaluation not found" });

  evaluation.status = status;
  if (adminNotes !== undefined) evaluation.adminNotes = adminNotes;
  await evaluation.save();

  return sendSuccess(res, { message: "Evaluation status updated", data: evaluation });
});

const adminUpdateEvaluation = asyncHandler(async (req, res) => {
  const evaluation = await ConferenceEvaluation.findById(req.params.id);
  if (!evaluation) return sendError(res, { statusCode: 404, message: "Evaluation not found" });

  const editableFields = [
    "title",
    "acronym",
    "organizer",
    "country",
    "dates",
    "venueMode",
    "website",
    "email",
    "contactPerson",
    "phone",
    "scope",
    "publicationPlan",
    "adminNotes",
    "status",
  ];

  editableFields.forEach((field) => {
    if (req.body[field] !== undefined) evaluation[field] = req.body[field];
  });

  await evaluation.save();
  return sendSuccess(res, { message: "Evaluation updated successfully", data: evaluation });
});

const adminDeleteEvaluation = asyncHandler(async (req, res) => {
  const evaluation = await ConferenceEvaluation.findById(req.params.id);
  if (!evaluation) return sendError(res, { statusCode: 404, message: "Evaluation not found" });

  if (evaluation.proposalFile?.url) removeLocalFile(evaluation.proposalFile.url);
  await evaluation.deleteOne();

  return sendSuccess(res, { message: "Evaluation deleted successfully", data: { id: req.params.id } });
});

module.exports = {
  createEvaluation,
  adminListEvaluations,
  adminGetEvaluation,
  adminUpdateEvaluationStatus,
  adminUpdateEvaluation,
  adminDeleteEvaluation,
};
