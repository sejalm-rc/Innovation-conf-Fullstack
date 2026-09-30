const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");

const USE_CLOUD_STORAGE =
  process.env.UPLOAD_STORAGE === "gcs";

const CONFERENCE_UPLOAD_DIR = path.join(
  __dirname,
  "..",
  "uploads",
  "conferences"
);

const EVALUATION_UPLOAD_DIR = path.join(
  __dirname,
  "..",
  "uploads",
  "evaluations"
);

// Evaluation documents still use local storage in this version.
const localDirectories = [EVALUATION_UPLOAD_DIR];

if (!USE_CLOUD_STORAGE) {
  localDirectories.push(CONFERENCE_UPLOAD_DIR);
}

localDirectories.forEach((dir) => {
  fs.mkdirSync(dir, { recursive: true });
});

const storageClient = new Storage();

function getCoverBucket() {
  const name = process.env.CONFERENCE_COVERS_BUCKET;

  if (!name) {
    throw new Error(
      "CONFERENCE_COVERS_BUCKET is required for cloud uploads."
    );
  }

  return storageClient.bucket(name);
}

function safeFilename(originalName) {
  const ext = path.extname(originalName).toLowerCase();
  const random = crypto.randomBytes(16).toString("hex");

  return `${Date.now()}-${random}${ext}`;
}

const IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
]);

const DOCUMENT_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const DOCUMENT_EXTENSIONS = new Set([
  ".pdf",
  ".doc",
  ".docx",
]);

function imageFileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();

  if (
    IMAGE_TYPES.has(file.mimetype) &&
    IMAGE_EXTENSIONS.has(ext)
  ) {
    return cb(null, true);
  }

  return cb(
    new Error(
      "Only JPG, JPEG, PNG or WEBP images are allowed for conference covers."
    )
  );
}

function documentFileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();

  if (
    DOCUMENT_TYPES.has(file.mimetype) &&
    DOCUMENT_EXTENSIONS.has(ext)
  ) {
    return cb(null, true);
  }

  return cb(
    new Error(
      "Only PDF, DOC or DOCX files are allowed for evaluation proposals."
    )
  );
}

const conferenceStorage = USE_CLOUD_STORAGE
  ? multer.memoryStorage()
  : multer.diskStorage({
      destination: (req, file, cb) =>
        cb(null, CONFERENCE_UPLOAD_DIR),
      filename: (req, file, cb) =>
        cb(null, safeFilename(file.originalname)),
    });

const evaluationStorage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, EVALUATION_UPLOAD_DIR),
  filename: (req, file, cb) =>
    cb(null, safeFilename(file.originalname)),
});

const maxImageSize =
  Number(process.env.MAX_IMAGE_SIZE_MB || 5) *
  1024 *
  1024;

const maxDocumentSize =
  Number(process.env.MAX_DOCUMENT_SIZE_MB || 20) *
  1024 *
  1024;

const uploadConferenceImage = multer({
  storage: conferenceStorage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: maxImageSize,
    files: 1,
  },
});

const uploadEvaluationDocument = multer({
  storage: evaluationStorage,
  fileFilter: documentFileFilter,
  limits: {
    fileSize: maxDocumentSize,
    files: 1,
  },
});

// Called by the conference controller after Multer.
async function saveConferenceCover(file) {
  if (!file) return "";

  if (!USE_CLOUD_STORAGE) {
    return `/uploads/conferences/${file.filename}`;
  }

  const bucket = getCoverBucket();
  const filename = safeFilename(file.originalname);
  const objectName = `conferences/${filename}`;

  await bucket.file(objectName).save(file.buffer, {
    resumable: false,
    metadata: {
      contentType: file.mimetype,
      cacheControl: "public, max-age=31536000, immutable",
    },
    preconditionOpts: {
      ifGenerationMatch: 0,
    },
  });

  return (
    `https://storage.googleapis.com/${bucket.name}/` +
    objectName
      .split("/")
      .map(encodeURIComponent)
      .join("/")
  );
}

// Retained for evaluation documents and legacy local covers.
async function removeLocalFile(relativeUrl) {
  if (
    typeof relativeUrl !== "string" ||
    !relativeUrl.startsWith("/uploads/")
  ) {
    return;
  }

  const uploadsRoot = path.resolve(__dirname, "..", "uploads");

  const absolutePath = path.resolve(
    __dirname,
    "..",
    relativeUrl.replace(/^\/+/, "")
  );

  // Prevent deletion outside the uploads directory.
  if (!absolutePath.startsWith(`${uploadsRoot}${path.sep}`)) {
    return;
  }

  try {
    await fs.promises.unlink(absolutePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
}

async function removeConferenceCover(url) {
  if (!url) return;

  if (url.startsWith("/uploads/")) {
    return removeLocalFile(url);
  }

  // Delete only objects from your configured cover bucket.
  const bucketName = process.env.CONFERENCE_COVERS_BUCKET;
  if (!bucketName) return;

  let parsed;

  try {
    parsed = new URL(url);
  } catch {
    return;
  }

  if (
    parsed.protocol !== "https:" ||
    parsed.hostname !== "storage.googleapis.com"
  ) {
    return;
  }

  const prefix = `/${bucketName}/`;

  if (!parsed.pathname.startsWith(prefix)) {
    return;
  }

  const objectName = decodeURIComponent(
    parsed.pathname.slice(prefix.length)
  );

  if (!/^conferences\/[a-zA-Z0-9._-]+$/.test(objectName)) {
    return;
  }

  await storageClient
    .bucket(bucketName)
    .file(objectName)
    .delete({ ignoreNotFound: true });
}

module.exports = {
  uploadConferenceImage,
  uploadEvaluationDocument,
  saveConferenceCover,
  removeConferenceCover,
  removeLocalFile,
  CONFERENCE_UPLOAD_DIR,
  EVALUATION_UPLOAD_DIR,
};