const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  customerName: {

    type: String,

    required: true

  },

  quantity: {

    type: Number,

    required: true,

    min: 1

  },

  totalPrice: {

    type: Number,

    required: true

  },

  // REFERENCE

  productId: {

    type: mongoose.Schema.Types.ObjectId,

    ref: "Product",

    required: true

  },

  // EMBEDDED DOCUMENT

  productDetails: {

    productName: String,

    category: String,

    vendorName: String,

    price: Number

  }

},

{
  timestamps: true
});

module.exports =
mongoose.model(
  "Order",
  orderSchema
);