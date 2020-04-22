const express = require("express");
const router = new express.Router();

const { getDiscountsInfo } = require("../controllers/discountController");
const { getProductPrice } = require("../controllers/productController");

// Home page route.
router.post("/subtotal", function(req, res) {
    const products = req.body.products || [];
    const subtotal = calculateSubtotal(products);
    const discountsInfo = getDiscountsInfo(products);

    const result = {
        subtotal,
        discounts: discountsInfo.discountDescriptions,
        total: subtotal - discountsInfo.totalDiscountAmount
    };
    res.send(result);
});

const calculateSubtotal = list => {
    return list.reduce((sum, p) => {
        sum += getProductPrice(p.productId) * p.amount;
        return sum;
    }, 0);
};

module.exports = router;
