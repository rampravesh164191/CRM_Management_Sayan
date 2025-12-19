const mongoose = require("mongoose");
const documentSchema = new mongoose.Schema({
  leadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "leads",
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  fileName: String,
  fileUrl: String,
  fileType: String,
  version: String
}, { timestamps: true });


const DocumentModel = mongoose.model("documents", documentSchema);
module.exports = DocumentModel;