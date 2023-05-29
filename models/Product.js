const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  active: { type: Boolean, required: false },
  creator: { type: String, required: false },
  author: { type: String, required: false },
  prod_lang: { type: String, required: false },
  prod_price: { type: Number, required : false },
  prod_desc: { type: String, required: false },
  prod_id: { type: mongoose.Schema.Types.ObjectId, of: Number, required: false },
  prod_name: { type: String, required: false },
  photo: { type: String, required: false },
  type: { type: String, required: false },
});

//Create a model
const Product = mongoose.model('products', productSchema);

// Exports the model
module.exports = Product;
