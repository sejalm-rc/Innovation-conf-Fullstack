const jwt = require("jsonwebtoken");

function generateToken(admin) {
  return jwt.sign(
    { id: admin._id.toString(), email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
}

function cookieOptions() {
  const secure = String(process.env.COOKIE_SECURE).toLowerCase() === "true";
  return {
    httpOnly: true,
    secure,
    sameSite: secure ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    path: "/",
  };
}

module.exports = { generateToken, cookieOptions };
