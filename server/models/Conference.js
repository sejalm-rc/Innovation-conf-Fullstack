const mongoose = require("mongoose");
const slugify = require("slugify");

const importantDateSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const scopusPublicationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true, default: "" },
    publisher: { type: String, required: true, trim: true },
    indexedIn: { type: String, trim: true, default: "Scopus" },
    issn: { type: String, trim: true, default: "" },
    publicationStatus: {
      type: String,
      trim: true,
      default: "Indexed",
    },
  },
  { _id: false }
);

const conferenceSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    acronym: { type: String, required: [true, "Acronym is required"], trim: true },
    slug: { type: String, unique: true, index: true, trim: true, lowercase: true },
    theme: { type: String, trim: true, default: "" },
    description: { type: String, required: [true, "Description is required"], trim: true },

    status: {
      type: String,
      enum: ["upcoming", "previous"],
      default: "upcoming",
    },
    statusOverride: { type: Boolean, default: false },

    mode: {
      type: String,
      enum: ["In Person", "Virtual", "Hybrid"],
      default: "In Person",
    },

    startDate: { type: Date, required: [true, "Start date is required"] },
    endDate: { type: Date, required: [true, "End date is required"] },
    dateLabel: { type: String, trim: true, default: "" },
    dateRange: { type: String, trim: true, default: "" },

    city: { type: String, trim: true, default: "" },
    country: { type: String, trim: true, default: "" },
    location: { type: String, trim: true, default: "" },
    organizer: {
      type: String,
      trim: true,
      default: "Innovation Conferences Organizing Committee",
    },

    coverImage: { type: String, default: "" },

    submissionInfo: { type: String, trim: true, default: "" },
    registrationInfo: { type: String, trim: true, default: "" },
    publicationInfo: { type: String, trim: true, default: "" },

    contactEmail: { type: String, trim: true, default: "" },
    contactPhone: { type: String, trim: true, default: "" },

    importantDates: { type: [importantDateSchema], default: [] },
    scopusPublications: { type: [scopusPublicationSchema], default: [] },

    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

conferenceSchema.index({ title: "text", acronym: "text", city: "text", country: "text" });

// Auto-generate a unique slug from acronym/title before validation
conferenceSchema.pre("validate", async function generateSlug(next) {
  if (this.slug && !this.isModified("title") && !this.isModified("acronym")) {
    return next();
  }

  const base = slugify(`${this.acronym || ""}-${this.title || ""}`, {
    lower: true,
    strict: true,
    trim: true,
  }).slice(0, 80) || slugify(this.title || "conference", { lower: true, strict: true });

  let candidate = base;
  let counter = 1;
  const Conference = this.constructor;

  // eslint-disable-next-line no-await-in-loop
  while (await Conference.exists({ slug: candidate, _id: { $ne: this._id } })) {
    counter += 1;
    candidate = `${base}-${counter}`;
  }

  this.slug = candidate;
  next();
});

// Auto-derive upcoming/previous status from endDate unless admin has overridden it
conferenceSchema.pre("save", function deriveStatus(next) {
  if (!this.statusOverride && this.endDate) {
    const now = new Date();
    this.status = new Date(this.endDate) >= now ? "upcoming" : "previous";
  }
  next();
});

module.exports = mongoose.model("Conference", conferenceSchema);
