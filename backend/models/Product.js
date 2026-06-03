const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  productName: {

    type: String,

    required: true,

    trim: true

  },

  price: {

    type: Number,

    required: true,

    min: 0

  },

  stock: {

    type: Number,

    required: true,

    min: 0

  },

  category: {

    type: String,

    required: true,

    trim: true

  },

  vendorName: {

    type: String,

    required: true,

    trim: true

  }

},

{
  timestamps: true
});

module.exports =
mongoose.model(
  "Product",
  productSchema
);