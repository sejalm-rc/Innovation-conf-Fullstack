const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");

const CONFERENCE_UPLOAD_DIR = path.join(__dirname, "..", "uploads", "conferences");
const EVALUATION_UPLOAD_DIR = path.join(__dirname, "..", "uploads", "evaluations");

[CONFERENCE_UPLOAD_DIR, EVALUATION_UPLOAD_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Never trust the original filename - build a collision-safe random name,
// keeping only the (validated) extension.
function safeFilename(originalName) {
  const ext = path.extname(originalName).toLowerCase();
  const random = crypto.randomBytes(16).toString("hex");
  return `${Date.now()}-${random}${ext}`;
}

const IMAGE_TYPES = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp"]);
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const DOCUMENT_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const DOCUMENT_EXTENSIONS = new Set([".pdf", ".doc", ".docx"]);

const conferenceStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, CONFERENCE_UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, safeFilename(file.originalname)),
});

const evaluationStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, EVALUATION_UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, safeFilename(file.originalname)),
});

function imageFileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (IMAGE_TYPES.has(file.mimetype) && IMAGE_EXTENSIONS.has(ext)) {
    return cb(null, true);
  }
  return cb(new Error("Only JPG, JPEG, PNG or WEBP images are allowed for conference covers."));
}

function documentFileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (DOCUMENT_TYPES.has(file.mimetype) && DOCUMENT_EXTENSIONS.has(ext)) {
    return cb(null, true);
  }
  return cb(new Error("Only PDF, DOC or DOCX files are allowed for evaluation proposals."));
}

const maxImageSize = Number(process.env.MAX_IMAGE_SIZE_MB || 5) * 1024 * 1024;
const maxDocumentSize = Number(process.env.MAX_DOCUMENT_SIZE_MB || 20) * 1024 * 1024;

const uploadConferenceImage = multer({
  storage: conferenceStorage,
  fileFilter: imageFileFilter,
  limits: { fileSize: maxImageSize },
});

const uploadEvaluationDocument = multer({
  storage: evaluationStorage,
  fileFilter: documentFileFilter,
  limits: { fileSize: maxDocumentSize },
});

function removeLocalFile(relativeUrl) {
  if (!relativeUrl || typeof relativeUrl !== "string") return;
  if (!relativeUrl.startsWith("/uploads/")) return;

  const absolutePath = path.join(__dirname, "..", relativeUrl);
  fs.unlink(absolutePath, (err) => {
    if (err && err.code !== "ENOENT") {
      console.warn(`[uploads] Could not remove file ${absolutePath}:`, err.message);
    }
  });
}

module.exports = {
  uploadConferenceImage,
  uploadEvaluationDocument,
  removeLocalFile,
  CONFERENCE_UPLOAD_DIR,
  EVALUATION_UPLOAD_DIR,
};
