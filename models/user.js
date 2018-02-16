var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String
});
// Adds in the methods and important functionality to user model
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", userSchema);
