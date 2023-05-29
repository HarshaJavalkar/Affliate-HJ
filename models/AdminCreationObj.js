const mongoose = require("mongoose");

const AdminCreateSchema = new mongoose.Schema({
  username: { type: String},
  creation_id: { type: mongoose.Schema.Types.ObjectId, of: Number, required: false },
});
const AdminCreationObj = mongoose.model("Adminslist", AdminCreateSchema);

module.exports = AdminCreationObj;