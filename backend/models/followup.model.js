const mongoose = require("mongoose");
const followupSchema = new mongoose.Schema({
    leadId,
    userId,
    reminderDate : Date,
    notes : String,
    status : {type : String, enum : ["pending", "done", "missed"]}
});

const FollowupModel = mongoose.model("followups",followupSchema);
module.exports = FollowupModel;