const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  regcode: 0,
  verified:Boolean,
  products: [],
  sales: { type: Array, default: [] },
  c_items: { type: Array, default: [] }
});

//Create a model
const Admin = mongoose.model("Adminslist", AdminSchema);

// Exports the model

module.exports = Admin;
