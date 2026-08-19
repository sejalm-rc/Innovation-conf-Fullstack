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
const { notFound, errorHandler } = require("./middleware/errorHandler");
const { apiLimiter } = require("./middleware/rateLimiters");

const healthRoutes = require("./routes/healthRoutes");
const authRoutes = require("./routes/authRoutes");
const { publicRouter: conferencePublicRoutes, adminRouter: conferenceAdminRoutes } = require("./routes/conferenceRoutes");
const { publicRouter: evaluationPublicRoutes, adminRouter: evaluationAdminRoutes } = require("./routes/evaluationRoutes");
const { publicRouter: contactPublicRoutes, adminRouter: contactAdminRoutes } = require("./routes/contactRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Trust proxy (needed on Render/Railway/behind load balancers for secure cookies)
app.set("trust proxy", 1);

// --- Security & core middleware -------------------------------------------------
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(cookieParser());
app.use(mongoSanitize());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api", apiLimiter);

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- Routes ----------------------------------------------------------------------
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/conferences", conferencePublicRoutes);
app.use("/api/evaluations", evaluationPublicRoutes);
app.use("/api/contact-enquiries", contactPublicRoutes);

app.use("/api/admin/conferences", conferenceAdminRoutes);
app.use("/api/admin/evaluations", evaluationAdminRoutes);
app.use("/api/admin/contact-enquiries", contactAdminRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Innovation Conference API is running" });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[server] Innovation Conference API listening on port ${PORT} (${process.env.NODE_ENV || "development"})`);
  });
}

start();

module.exports = app;
