const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  username: {type: String},
  password: {type: String},
  email: {type: String},
  regcode:  {
    type: Number,
    default: 0
},
  verified:{type: Boolean},
  products: { type: Array, default: [] },
  sales: { type: Array, default: [] },
  c_items: { type: Array, default: [] }
});

//Create a model
const Admin = mongoose.model("Adminslist", AdminSchema);

// Exports the model

module.exports = Admin;
