const mongoose = require("mongoose");
const interactionSchema = new mongoose.Schema({
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
  type: {
    type: String,
    enum: ["call", "email", "meeting", "sms"]
  },
  notes: String,
  interactionDate: {
    type : Date,
    default : Date.now
  },
  duration: String
}, { timestamps: true });



const InteractionModel = mongoose.model("interactions", interactionSchema);
module.exports = InteractionModel;