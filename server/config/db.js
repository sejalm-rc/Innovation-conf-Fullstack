const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error(
      "\n[FATAL] MONGODB_URI is missing from your environment variables.\n" +
        "Create a .env file in /server (see .env.example) and set MONGODB_URI.\n"
    );
    process.exit(1);
  }

  mongoose.set("strictQuery", true);

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`[MongoDB] Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error("[MongoDB] Connection error:", error.message);
    console.error(
      "Check that MongoDB is running locally, or that MONGODB_URI points to a reachable Atlas cluster."
    );
    process.exit(1);
  }

  mongoose.connection.on("disconnected", () => {
    console.warn("[MongoDB] Disconnected.");
  });
}

module.exports = connectDB;
