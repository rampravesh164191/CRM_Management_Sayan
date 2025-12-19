const mongoose = require("mongoose");
const followupSchema = new mongoose.Schema({
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
  reminderDate: {
    type : Date,
    default : Date.now
  },
  notes: String,
  status: {
    type: String,
    enum: ["pending", "done", "missed"],
    default: "pending"
  }
}, { timestamps: true });


const FollowupModel = mongoose.model("followups",followupSchema);
module.exports = FollowupModel;