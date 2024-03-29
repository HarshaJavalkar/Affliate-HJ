const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {type: String},
  password: {type: String},
  email: {type: String},
  cart: { type: Array, default: [] },
  address: { type: Array, default: [] },
  orders: { type: Array, default: [] },
  cards: { type: Array, default: [] },
  successOrders: { type: Array, default: [] },
  wishlist: { type: Array, default: [] },
});

//Create a model
const User = mongoose.model("userslist", UserSchema);

// Exports the model

module.exports = User;
