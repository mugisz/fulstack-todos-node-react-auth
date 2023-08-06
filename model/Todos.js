const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  owner: { type: Types.ObjectId, ref: "User" },
  text: { type: String },
  isCompleted: { type: Boolean },
  isImportant: { type: Boolean },
});
module.exports = model("Todo", schema);
