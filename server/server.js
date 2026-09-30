require("dotenv").config();

const validateEnv = require("./config/env");
validateEnv();

const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");

const connectDB = require("./config/db");
const {
  notFound,
  errorHandler,
} = require("./middleware/errorHandler");
const { apiLimiter } = require("./middleware/rateLimiters");

const healthRoutes = require("./routes/healthRoutes");
const authRoutes = require("./routes/authRoutes");

const {
  publicRouter: conferencePublicRoutes,
  adminRouter: conferenceAdminRoutes,
} = require("./routes/conferenceRoutes");

const {
  publicRouter: evaluationPublicRoutes,
  adminRouter: evaluationAdminRoutes,
} = require("./routes/evaluationRoutes");

const {
  publicRouter: contactPublicRoutes,
  adminRouter: contactAdminRoutes,
} = require("./routes/contactRoutes");

const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Required when Express runs behind Render's proxy
app.set("trust proxy", 1);

// Security headers
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://innovation-conf-fullstack.vercel.app",
  ...(process.env.CLIENT_URL || "")
    .split(",")
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean),
];

console.log("[server] Allowed CORS origins:", allowedOrigins);

const corsOptions = {
  origin(origin, callback) {
    // Allow Postman, curl and server-to-server requests
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.replace(/\/$/, "");

    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }

    console.error(`[server] CORS blocked origin: ${origin}`);

    return callback(
      new Error(`CORS policy does not allow origin: ${origin}`)
    );
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],

  optionsSuccessStatus: 204,
};

// Keep only one CORS middleware
app.use(cors(corsOptions));

// Body and cookie middleware
app.use(express.json({ limit: "2mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "2mb",
  })
);

app.use(cookieParser());
app.use(mongoSanitize());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Rate limiting
app.use("/api", apiLimiter);

// Serve uploaded filesj
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Root test endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Innovation Conference API is running",
  });
});

// API routes
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/conferences", conferencePublicRoutes);
app.use("/api/evaluations", evaluationPublicRoutes);
app.use("/api/contact-enquiries", contactPublicRoutes);

app.use("/api/admin/conferences", conferenceAdminRoutes);
app.use("/api/admin/evaluations", evaluationAdminRoutes);
app.use(
  "/api/admin/contact-enquiries",
  contactAdminRoutes
);
app.use("/api/admin/dashboard", dashboardRoutes);

// Error middleware must remain last
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(
        `[server] Innovation Conference API listening on port ${PORT} (${process.env.NODE_ENV || "development"})`
      );
    });
  } catch (error) {
    console.error("[server] Failed to start:", error);
    process.exit(1);
  }
}

start();

module.exports = app;