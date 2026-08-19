const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

function getTokenFromRequest(req) {
  const cookieName = process.env.COOKIE_NAME || "ic_token";

  if (req.cookies && req.cookies[cookieName]) {
    return req.cookies[cookieName];
  }

  const authHeader = req.headers.authorization || "";
  if (authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  return null;
}

async function requireAdmin(req, res, next) {
  try {
    const token = getTokenFromRequest(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in as admin.",
        errors: [],
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-passwordHash");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid session. Please log in again.",
        errors: [],
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Session expired or invalid. Please log in again.",
      errors: [],
    });
  }
}

module.exports = { requireAdmin, getTokenFromRequest };
