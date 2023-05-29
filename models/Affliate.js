const mongoose = require("mongoose");

const alliateSchema = new mongoose.Schema({
  active: {type: Boolean},
  creator: {type: String},
  prod_price: {type: Number},
  prod_desc: {type: String},
  prod_id: { type: mongoose.Schema.Types.ObjectId, of: Number, required: false },
  prod_name: {type: String},
  photo: {type: String},
  type: {type: String},
  affliateLink:{type: String},
  overallRating: {type: Number}
});

//Create a model
const Affliate = mongoose.model("affliateList", alliateSchema);

console.log("Model created")
// Exports the model
module.exports = Affliate;

