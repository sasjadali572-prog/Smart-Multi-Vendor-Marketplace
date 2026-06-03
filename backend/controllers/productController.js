const Product = require("../models/Product");


// ADD PRODUCT
const addProduct = async (req, res) => {
    try {

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: "Product Added Successfully",
            product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// GET ALL PRODUCTS
const getProducts = async (req, res) => {
    try {

        const products = await Product.find();

        res.status(200).json({
            success: true,
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

//delete product
const deleteProduct = async (req, res) => {

    try {

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {

    try {

        const updatedProduct =
            await Product.findByIdAndUpdate(

                req.params.id,

                req.body,

                { new: true }

            );

        res.status(200).json({
            success: true,
            updatedProduct
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    addProduct,
    getProducts,
    deleteProduct,
    updateProduct
};