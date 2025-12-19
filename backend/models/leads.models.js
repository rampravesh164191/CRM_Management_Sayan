const mongoose = require("mongoose");
const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company: String,
  industry: String,
  location: String,
  dealValue: Number,
  stage: String,
  leadScore: Number,
  source: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
}, { timestamps: true });


const LeadModel = mongoose.model("leads", leadSchema);
module.exports = LeadModel;