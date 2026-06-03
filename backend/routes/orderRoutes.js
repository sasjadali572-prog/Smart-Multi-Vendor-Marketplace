const express = require("express");

const router = express.Router();

const Order = require("../models/Order");

const {
  placeOrder
} = require("../controllers/orderController");


// PLACE ORDER WITH TRANSACTION

router.post(
  "/place",
  placeOrder
);


// NORMAL ADD ORDER

router.post("/add", async (req, res) => {

  try {

    const order = new Order(req.body);

    await order.save();

    res.json({

      success: true,

      message:
        "Order Added Successfully"

    });

  }

  catch (error) {

    res.json({

      success: false,

      message: error.message

    });

  }

});


// GET ORDERS

router.get("/", async (req, res) => {

  try {

    const orders = await Order.find();

    res.json({

      success: true,

      orders

    });

  }

  catch (error) {

    res.json({

      success: false,

      message: error.message

    });

  }

});


module.exports = router;