// Seeds the database with the conferences that used to live in the static
// frontend, plus the default admin account.
//
// Safe to run more than once: conferences are matched/updated by acronym so
// re-running the script will not create duplicates, and the admin account is
// only created if one with the configured email does not already exist.
//
// Usage: npm run seed   (run from /server)

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Conference = require("../models/Conference");
const Admin = require("../models/Admin");
const conferencesSeedData = require("./conferencesSeedData");

async function seedConferences() {
  let created = 0;
  let updated = 0;

  for (const data of conferencesSeedData) {
    // eslint-disable-next-line no-await-in-loop
    const existing = await Conference.findOne({ acronym: data.acronym });

    if (existing) {
      Object.assign(existing, data);
      // eslint-disable-next-line no-await-in-loop
      await existing.save();
      updated += 1;
    } else {
      // eslint-disable-next-line no-await-in-loop
      await Conference.create(data);
      created += 1;
    }
  }

  console.log(`[seed] Conferences: ${created} created, ${updated} updated (${conferencesSeedData.length} total).`);
}

async function seedAdmin() {
  const email = (process.env.ADMIN_EMAIL || "admin@innovationconference.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "Admin@123";
  const name = process.env.ADMIN_NAME || "Site Administrator";

  const existing = await Admin.findOne({ email });

  if (existing) {
    console.log(`[seed] Admin account already exists for ${email} (left unchanged).`);
    return;
  }

  const passwordHash = await Admin.hashPassword(password);
  await Admin.create({ name, email, passwordHash });
  console.log(`[seed] Admin account created for ${email}.`);
}

async function run() {
  await connectDB();

  try {
    await seedConferences();
    await seedAdmin();
    console.log("[seed] Done.");
  } catch (error) {
    console.error("[seed] Failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

run();
