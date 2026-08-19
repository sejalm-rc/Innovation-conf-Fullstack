const REQUIRED_VARS = ["MONGODB_URI", "JWT_SECRET", "CLIENT_URL"];

function validateEnv() {
  const missing = REQUIRED_VARS.filter((key) => !process.env[key] || process.env[key].trim() === "");

  if (missing.length > 0) {
    console.error(
      `\n[FATAL] Missing required environment variables: ${missing.join(", ")}\n` +
        "Copy server/.env.example to server/.env and fill in the values before starting the server.\n"
    );
    process.exit(1);
  }

  if (process.env.JWT_SECRET === "replace_with_a_long_secure_secret") {
    console.warn(
      "\n[WARNING] You are using the placeholder JWT_SECRET from .env.example. " +
        "Change this before deploying to production.\n"
    );
  }
}

module.exports = validateEnv;
