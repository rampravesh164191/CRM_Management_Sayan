const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["sales_rep", "manager", "admin"],
    required : true
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });


const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;




