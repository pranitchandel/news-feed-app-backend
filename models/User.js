const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  language: {
    type: String,
  },
  maritalStatus: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  timeOfBirth: {
    type: String,
  },
});

module.exports = mongoose.model("user", UserSchema);
