const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    picture: { type: String, required: true },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["male", "female", "other"] },
    title: { type: String, enum: ["mr", "ms", "mrs", "miss", "dr", ""] },
    phone: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  return obj;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
