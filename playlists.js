const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const tblSchema = new mongoose.Schema({
  Names: String,
  email: String,
  mobile: String,
  Dob: String,
  password: String,
  cpassword: String,
});

tblSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

module.exports = mongoose.model("playlists", tblSchema);
