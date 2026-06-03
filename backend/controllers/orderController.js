const mongoose = require("mongoose");

const Order = require("../models/Order");
const Product = require("../models/Product");


// PLACE ORDER WITH TRANSACTION

const placeOrder = async (req, res) => {

  const session = await mongoose.startSession();

  session.startTransaction();

  try {

    const {

      productId,
      quantity,
      customerName

    } = req.body;

    // FIND PRODUCT

    const product = await Product.findById(productId)
      .session(session);

    // CHECK PRODUCT EXISTS

    if (!product) {

      throw new Error("Product not found");

    }

    // CHECK STOCK

    if (product.stock < quantity) {

      throw new Error("Insufficient stock");

    }

    // CALCULATE TOTAL PRICE

    const totalPrice =
      product.price * quantity;

    // CREATE ORDER

    const order = await Order.create([{

  customerName,

  quantity,

  totalPrice,

  // REFERENCE

  productId: product._id,

  // EMBEDDED DOCUMENT

  productDetails: {

    productName:
      product.productName,

    category:
      product.category,

    vendorName:
      product.vendorName,

    price:
      product.price

  }

}], { session });

    // REDUCE STOCK

    product.stock =
      product.stock - quantity;

    await product.save({ session });

    // COMMIT TRANSACTION

    await session.commitTransaction();

    session.endSession();

    res.status(201).json({

      success: true,

      message:
        "Order placed successfully",

      order

    });

  }

  catch (error) {

    // ROLLBACK

    await session.abortTransaction();

    session.endSession();

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

module.exports = {

  placeOrder

};