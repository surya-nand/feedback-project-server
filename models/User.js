const mongoose = require("mongoose");

const User = mongoose.model("User", {
    SignupName: String,
    SignupEmail: String,
    SignupMobile: String,
    SignupPassword: String,
  });
module.exports = User;