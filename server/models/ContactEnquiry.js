const mongoose = require("mongoose");

const contactEnquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: { type: String, required: [true, "Email is required"], trim: true, lowercase: true },
    phone: { type: String, trim: true, default: "" },
    enquiryType: {
      type: String,
      required: [true, "Enquiry type is required"],
      trim: true,
    },
    subject: { type: String, required: [true, "Subject is required"], trim: true },
    message: { type: String, required: [true, "Message is required"], trim: true },

    status: {
      type: String,
      enum: ["new", "in-progress", "resolved"],
      default: "new",
    },
    adminNotes: { type: String, trim: true, default: "" },

    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactEnquiry", contactEnquirySchema);
