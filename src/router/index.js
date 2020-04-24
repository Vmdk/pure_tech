const express = require("express");
const router = new express.Router();

const { formOrder } = require("../controllers/orderController");
const { getValidatedProducts } = require("../controllers/productController");

router.post("/order", function(req, res) {
    try {
        const products = req.body.products || [];
        // Validate input data
        const { validProducts } = getValidatedProducts(products);
        const orderData = formOrder(validProducts);
        res.status(200);
        res.send(orderData);
    } catch (err) {
        // This is case for some unexpected errors. Should not occur.
        console.log(`Unexpected error happened while processing order: ${err}`);
        res.status(500);
        res.send("Wooops, something went wrong. Please, try again.");
    }
});

module.exports = router;
