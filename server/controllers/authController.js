const Admin = require("../models/Admin");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess, sendError } = require("../utils/apiResponse");
const { generateToken, cookieOptions } = require("../utils/generateToken");

const COOKIE_NAME = process.env.COOKIE_NAME || "ic_token";

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendError(res, {
      statusCode: 400,
      message: "Email and password are required",
      errors: [],
    });
  }

  const admin = await Admin.findOne({ email: email.trim().toLowerCase() });

  if (!admin) {
    return sendError(res, { statusCode: 401, message: "Invalid email or password" });
  }

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    return sendError(res, { statusCode: 401, message: "Invalid email or password" });
  }

  const token = generateToken(admin);
  res.cookie(COOKIE_NAME, token, cookieOptions());

  return sendSuccess(res, {
    message: "Login successful",
    data: {
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email },
    },
  });
});

const me = asyncHandler(async (req, res) => {
  return sendSuccess(res, {
    message: "Authenticated",
    data: {
      admin: { id: req.admin._id, name: req.admin.name, email: req.admin.email },
    },
  });
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie(COOKIE_NAME, { ...cookieOptions(), maxAge: undefined });
  return sendSuccess(res, { message: "Logged out successfully" });
});

module.exports = { login, me, logout };
