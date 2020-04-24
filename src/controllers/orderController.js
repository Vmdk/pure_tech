const { getDiscountsInfo } = require("../controllers/discountController");
const { getProductPrice } = require("../controllers/productController");
const { formatPrice } = require("../utils");

const calculateSubtotal = list => {
    return list.reduce((sum, p) => {
        sum += getProductPrice(p.productId) * p.amount;
        return sum;
    }, 0);
};

const formOrder = products => {
    try {
        const subtotalAmount = calculateSubtotal(products);
        const discountsInfo = getDiscountsInfo(products);

        return {
            subtotal: formatPrice(subtotalAmount),
            discounts: discountsInfo.discountDescriptions,
            total: formatPrice(
                subtotalAmount - discountsInfo.totalDiscountAmount
            )
        };
    } catch (err) {
        // Log error
        console.log(`Unexpected error happened while forming an order: ${err}`);
        throw err;
    }
};

module.exports = {
    formOrder
};
