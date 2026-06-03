const express = require("express");

const router = express.Router();

const {
    addProduct,
    getProducts,
    deleteProduct,
    updateProduct
} = require("../controllers/productController");


// ADD PRODUCT
router.post("/add", addProduct);

// DELETE PRODUCT
router.delete("/:id", deleteProduct);

// UPDATE PRODUCT
router.put("/:id", updateProduct);

// GET PRODUCTS
router.get("/", getProducts);


module.exports = router;