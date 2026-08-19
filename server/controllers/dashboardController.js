const Conference = require("../models/Conference");
const ConferenceEvaluation = require("../models/ConferenceEvaluation");
const ContactEnquiry = require("../models/ContactEnquiry");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");

const getSummary = asyncHandler(async (req, res) => {
  const [totalConferences, upcomingConferences, previousConferences, pendingEvaluations, newEnquiries] =
    await Promise.all([
      Conference.countDocuments({}),
      Conference.countDocuments({ status: "upcoming" }),
      Conference.countDocuments({ status: "previous" }),
      ConferenceEvaluation.countDocuments({ status: "pending" }),
      ContactEnquiry.countDocuments({ status: "new" }),
    ]);

  return sendSuccess(res, {
    message: "Dashboard summary fetched successfully",
    data: {
      totalConferences,
      upcomingConferences,
      previousConferences,
      pendingEvaluations,
      newEnquiries,
    },
  });
});

module.exports = { getSummary };
