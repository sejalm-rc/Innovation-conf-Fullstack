const mongoose = require("mongoose");
const Conference = require("../models/Conference");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess, sendError } = require("../utils/apiResponse");
const {
  saveConferenceCover,
  removeConferenceCover,
} = require("../middleware/upload");

async function cleanupCover(url) {
  try {
    await removeConferenceCover(url);
  } catch (error) {
    console.warn("[uploads] Cover cleanup failed:", error.message);
  }
}

function buildImageUrl(req, filename) {
  if (!filename) return "";
  return `${req.protocol}://${req.get("host")}/uploads/conferences/${filename}`;
}

function parseJsonField(value, fallback) {
  if (value === undefined || value === null || value === "") return fallback;
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

// ---------------------------------------------------------------------------
// PUBLIC ENDPOINTS
// ---------------------------------------------------------------------------

const listPublicConferences = asyncHandler(async (req, res) => {
  const { status, featured, search, page = 1, limit = 12, sort = "-startDate" } = req.query;

  const query = { active: true };
  if (status === "upcoming" || status === "previous") query.status = status;
  if (featured === "true") query.featured = true;
  if (search) query.$text = { $search: search };

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.min(Math.max(parseInt(limit, 10) || 12, 1), 100);

  const [items, total] = await Promise.all([
    Conference.find(query)
      .sort(sort)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Conference.countDocuments(query),
  ]);

  return sendSuccess(res, {
    message: "Conferences fetched successfully",
    data: items,
    meta: { total, page: pageNum, limit: limitNum, pages: Math.ceil(total / limitNum) || 1 },
  });
});

const listUpcomingConferences = asyncHandler(async (req, res) => {
  const items = await Conference.find({ active: true, status: "upcoming" }).sort({ startDate: 1 });
  return sendSuccess(res, { message: "Upcoming conferences fetched successfully", data: items });
});

const listPreviousConferences = asyncHandler(async (req, res) => {
  const items = await Conference.find({ active: true, status: "previous" }).sort({ endDate: -1 });
  return sendSuccess(res, { message: "Previous conferences fetched successfully", data: items });
});

const getPublicConferenceByIdentifier = asyncHandler(async (req, res) => {
  const { identifier } = req.params;
  const query = mongoose.isValidObjectId(identifier)
    ? { $or: [{ _id: identifier }, { slug: identifier }] }
    : { slug: identifier };

  const conference = await Conference.findOne({ ...query, active: true });

  if (!conference) {
    return sendError(res, { statusCode: 404, message: "Conference not found" });
  }

  return sendSuccess(res, { message: "Conference fetched successfully", data: conference });
});

// ---------------------------------------------------------------------------
// ADMIN ENDPOINTS
// ---------------------------------------------------------------------------

const adminListConferences = asyncHandler(async (req, res) => {
  const { status, search, page = 1, limit = 20, sort = "-createdAt" } = req.query;

  const query = {};
  if (status === "upcoming" || status === "previous") query.status = status;
  if (search) {
    query.$or = [
      { title: new RegExp(search, "i") },
      { acronym: new RegExp(search, "i") },
      { city: new RegExp(search, "i") },
      { country: new RegExp(search, "i") },
    ];
  }

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);

  const [items, total] = await Promise.all([
    Conference.find(query)
      .sort(sort)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Conference.countDocuments(query),
  ]);

  return sendSuccess(res, {
    message: "Conferences fetched successfully",
    data: items,
    meta: { total, page: pageNum, limit: limitNum, pages: Math.ceil(total / limitNum) || 1 },
  });
});

const adminGetConference = asyncHandler(async (req, res) => {
  const conference = await Conference.findById(req.params.id);
  if (!conference) return sendError(res, { statusCode: 404, message: "Conference not found" });
  return sendSuccess(res, { message: "Conference fetched successfully", data: conference });
});

function buildPayload(req) {
  const body = req.body;

  const payload = {
    title: body.title,
    acronym: body.acronym,
    theme: body.theme,
    description: body.description,
    mode: body.mode,
    startDate: body.startDate,
    endDate: body.endDate,
    dateLabel: body.dateLabel,
    dateRange: body.dateRange,
    city: body.city,
    country: body.country,
    location: body.location,
    organizer: body.organizer,
    submissionInfo: body.submissionInfo,
    registrationInfo: body.registrationInfo,
    publicationInfo: body.publicationInfo,
    contactEmail: body.contactEmail,
    contactPhone: body.contactPhone,
    importantDates: parseJsonField(body.importantDates, []),
    scopusPublications: parseJsonField(body.scopusPublications, []),
    featured: body.featured === true || body.featured === "true",
    active: body.active === undefined ? true : body.active === true || body.active === "true",
  };

  if (body.status === "upcoming" || body.status === "previous") {
    payload.status = body.status;
    payload.statusOverride = true;
  } else if (body.statusOverride === "false" || body.statusOverride === false) {
    payload.statusOverride = false;
  }

  return payload;
}

const adminCreateConference = asyncHandler(async (req, res) => {
  const payload = buildPayload(req);
  let newCover = "";

  if (req.file) {
    newCover = await saveConferenceCover(req.file);
    payload.coverImage = newCover;
  }

  let conference;

  try {
    conference = await Conference.create(payload);
  } catch (error) {
    if (newCover) await cleanupCover(newCover);
    throw error;
  }

  return sendSuccess(res, {
    statusCode: 201,
    message: "Conference created successfully",
    data: conference,
  });
});

const adminUpdateConference = asyncHandler(async (req, res) => {
  const existing = await Conference.findById(req.params.id);

  if (!existing) {
    return sendError(res, {
      statusCode: 404,
      message: "Conference not found",
    });
  }

  const payload = buildPayload(req);
  const oldCover = existing.coverImage;
  let newCover = "";

  if (req.file) {
    newCover = await saveConferenceCover(req.file);
    payload.coverImage = newCover;
  }

  Object.assign(existing, payload);

  try {
    await existing.save();
  } catch (error) {
    if (newCover) await cleanupCover(newCover);
    throw error;
  }

  // Delete the old image only after the database save succeeds.
  if (newCover && oldCover && newCover !== oldCover) {
    await cleanupCover(oldCover);
  }

  return sendSuccess(res, {
    message: "Conference updated successfully",
    data: existing,
  });
});

const adminDeleteConference = asyncHandler(async (req, res) => {
  const conference = await Conference.findById(req.params.id);

  if (!conference) {
    return sendError(res, {
      statusCode: 404,
      message: "Conference not found",
    });
  }

  const cover = conference.coverImage;

  await conference.deleteOne();

  if (cover) await cleanupCover(cover);

  return sendSuccess(res, {
    message: "Conference deleted successfully",
    data: { id: req.params.id },
  });
});

module.exports = {
  listPublicConferences,
  listUpcomingConferences,
  listPreviousConferences,
  getPublicConferenceByIdentifier,
  adminListConferences,
  adminGetConference,
  adminCreateConference,
  adminUpdateConference,
  adminDeleteConference,
  buildImageUrl,
};
