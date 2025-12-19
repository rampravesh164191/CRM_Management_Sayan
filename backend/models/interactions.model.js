const mongoose = require("mongoose");
const interactionSchema = new mongoose.Schema({
    leadId : {type : mongoose.Schema.Types.ObjectId, ref :  "leads"},
    userId : {type : mongoose.Schema.Types.ObjectId, ref :  "users"},
    type : {type : String, enum : ["call", "email", "meeting", "sms"]},
    notes : String,
    interactionDate : Date,
    duration : String
});


const InteractionModel = mongoose.model("interactions", interactionSchema);
module.exports = InteractionModel;