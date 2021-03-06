const express = require("express");
const router = new express.Router();

const { formOrder } = require("../controllers/orderController");
const { getValidatedProducts } = require("../controllers/productController");

router.post("/order", function(req, res) {
    try {
        const products = req.body.products || [];
        const reqDate = req.body.date || new Date();
        console.log(`Handling request from ${reqDate}`);
        const requestData = {
            // Validate input data
            products: getValidatedProducts(products).validProducts,
            date: reqDate
        };
        const orderData = formOrder(requestData);
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
