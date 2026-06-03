const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Routes
const productRoutes = require("./routes/productRoutes");


const orderRoutes = require("./routes/orderRoutes");

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected Successfully");
    console.log("Database Name:", mongoose.connection.name);
})
.catch((err) => {
    console.log(err);
});


// Default Route
app.get("/", (req, res) => {
    res.send("Smart Marketplace Backend Running");
});


// Server Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});