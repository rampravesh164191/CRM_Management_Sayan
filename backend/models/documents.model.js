const mongoose = require("mongoose");
const documentSchema = new mongoose.Schema({
    
});

const DocumentModel = mongoose.model("documents", documentSchema);
module.exports = DocumentModel;