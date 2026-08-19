const mongoose = require("mongoose");

const conferenceEvaluationSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Conference title is required"], trim: true },
    acronym: { type: String, trim: true, default: "" },
    organizer: { type: String, required: [true, "Organizer is required"], trim: true },
    country: { type: String, required: [true, "Country is required"], trim: true },
    dates: { type: String, required: [true, "Conference dates are required"], trim: true },
    venueMode: {
      type: String,
      required: [true, "Venue / mode is required"],
      enum: ["In Person", "Hybrid", "Virtual"],
    },
    website: { type: String, trim: true, default: "" },
    email: { type: String, required: [true, "Contact email is required"], trim: true, lowercase: true },
    contactPerson: { type: String, required: [true, "Contact person is required"], trim: true },
    phone: { type: String, required: [true, "Phone number is required"], trim: true },
    scope: { type: String, required: [true, "Scope is required"], trim: true },
    publicationPlan: { type: String, required: [true, "Publication plan is required"], trim: true },

    proposalFile: {
      originalName: { type: String, default: "" },
      storedName: { type: String, default: "" },
      url: { type: String, default: "" },
      size: { type: Number, default: 0 },
    },

    status: {
      type: String,
      enum: ["pending", "under-review", "approved", "rejected"],
      default: "pending",
    },
    adminNotes: { type: String, trim: true, default: "" },

    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ConferenceEvaluation", conferenceEvaluationSchema);
