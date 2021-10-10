const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const relationSchema = Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    like: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

relationSchema.index({ requester: 1, receiver: 1 }, { unique: true });

relationSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  return obj;
};

const Relation = mongoose.model("Relation", relationSchema);
module.exports = Relation;
