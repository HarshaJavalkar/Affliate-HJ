const mongoose = require("mongoose");

const alliateSchema = new mongoose.Schema({
  active: Boolean,
  creator: String,
  prod_price: Number,
  prod_desc: String,
  prod_id: Number,
  prod_name: String,
  photo: String,
  type: String,
  affliateLink:String,
  overallRating: Number
});

//Create a model
const Affliate = mongoose.model("affliateList", alliateSchema);

console.log("Model created")
// Exports the model
module.exports = Affliate;

