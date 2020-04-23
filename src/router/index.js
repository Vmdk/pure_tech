const express = require("express");
const router = new express.Router();

const { formOrder } = require("../controllers/orderController");
const { getValidatedProducts } = require("../controllers/productController");

router.post("/order", function(req, res) {
    const products = req.body.products || [];
    const { validProducts } = getValidatedProducts(products);
    const orderData = formOrder(validProducts);
    res.send(orderData);
});

module.exports = router;
