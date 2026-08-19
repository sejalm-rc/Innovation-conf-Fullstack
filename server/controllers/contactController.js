const ContactEnquiry = require("../models/ContactEnquiry");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess, sendError } = require("../utils/apiResponse");

const createEnquiry = asyncHandler(async (req, res) => {
  const { name, email, phone, enquiryType, subject, message } = req.body;

  const enquiry = await ContactEnquiry.create({
    name,
    email,
    phone,
    enquiryType,
    subject,
    message,
  });

  return sendSuccess(res, {
    statusCode: 201,
    message: "Thank you for contacting us. We will reply within 1-2 working days.",
    data: enquiry,
  });
});

const adminListEnquiries = asyncHandler(async (req, res) => {
  const { status, search, page = 1, limit = 20, sort = "-submittedAt" } = req.query;

  const query = {};
  if (status) query.status = status;
  if (search) {
    query.$or = [
      { name: new RegExp(search, "i") },
      { email: new RegExp(search, "i") },
      { subject: new RegExp(search, "i") },
    ];
  }

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);

  const [items, total] = await Promise.all([
    ContactEnquiry.find(query)
      .sort(sort)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    ContactEnquiry.countDocuments(query),
  ]);

  return sendSuccess(res, {
    message: "Enquiries fetched successfully",
    data: items,
    meta: { total, page: pageNum, limit: limitNum, pages: Math.ceil(total / limitNum) || 1 },
  });
});

const adminGetEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await ContactEnquiry.findById(req.params.id);
  if (!enquiry) return sendError(res, { statusCode: 404, message: "Enquiry not found" });
  return sendSuccess(res, { message: "Enquiry fetched successfully", data: enquiry });
});

const adminUpdateEnquiryStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const allowed = ["new", "in-progress", "resolved"];

  if (!allowed.includes(status)) {
    return sendError(res, { statusCode: 400, message: "Invalid status value" });
  }

  const enquiry = await ContactEnquiry.findById(req.params.id);
  if (!enquiry) return sendError(res, { statusCode: 404, message: "Enquiry not found" });

  enquiry.status = status;
  await enquiry.save();

  return sendSuccess(res, { message: "Enquiry status updated", data: enquiry });
});

const adminUpdateEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await ContactEnquiry.findById(req.params.id);
  if (!enquiry) return sendError(res, { statusCode: 404, message: "Enquiry not found" });

  const editableFields = ["name", "email", "phone", "enquiryType", "subject", "message", "adminNotes", "status"];
  editableFields.forEach((field) => {
    if (req.body[field] !== undefined) enquiry[field] = req.body[field];
  });

  await enquiry.save();
  return sendSuccess(res, { message: "Enquiry updated successfully", data: enquiry });
});

const adminDeleteEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await ContactEnquiry.findById(req.params.id);
  if (!enquiry) return sendError(res, { statusCode: 404, message: "Enquiry not found" });

  await enquiry.deleteOne();
  return sendSuccess(res, { message: "Enquiry deleted successfully", data: { id: req.params.id } });
});

module.exports = {
  createEnquiry,
  adminListEnquiries,
  adminGetEnquiry,
  adminUpdateEnquiryStatus,
  adminUpdateEnquiry,
  adminDeleteEnquiry,
};
