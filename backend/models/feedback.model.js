const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema({
  leadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "leads",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  rating: { type: Number, min: 1, max: 5 },
  comments: String
}, { timestamps: true });



const FeedbackModel = mongoose.model("feedbacks", feedbackSchema);
module.exports = FeedbackModel;