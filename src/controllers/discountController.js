const { getProductPrice } = require("./productController");
const { formatPrice } = require("../utils");

const appleDiscount = list => {
    const appleProd = list.find(p => p.productId === "apple");
    if (appleProd) {
        const discount =
            getProductPrice(appleProd.productId) * appleProd.amount * 0.1;
        return {
            description: `Apples 10% off: ${formatPrice(discount)}`,
            amount: discount
        };
    }
};

const soupsBreadDiscount = list => {
    const soupProduct = list.find(p => p.productId === "soup");
    const breadProduct = list.find(p => p.productId === "bread");
    if (soupProduct && soupProduct.amount >= 2 && breadProduct) {
        // Here we calculate the maximum possible amount of breads which can get discount
        const maxDiscAmount = Math.floor(soupProduct.amount / 2);
        // Check if we don't give more discount then total amount of bread bought
        const appliableAmount = Math.min(maxDiscAmount, breadProduct.amount);
        const discount =
            getProductPrice(breadProduct.productId) * 0.5 * appliableAmount;
        return {
            description: `Bread for soups 50% off : ${formatPrice(discount)}`,
            amount: discount
        };
    }
};

// In general case discount - function that returns `amount` and `description`
const existingDiscounts = [appleDiscount, soupsBreadDiscount];

const formDiscountDescriptions = validDiscounts => {
    if (validDiscounts.length) {
        return validDiscounts.map(d => d.description);
    }

    // Return array in ourder to have function of one return type
    return ["no valid discounts"];
};

const getDiscountsInfo = (list, discounts = existingDiscounts) => {
    try {
        const appliedDisc = discounts.map(d => d(list)); // Apply all existing discounts
        const validDiscounts = appliedDisc.filter(d => d); // If discount is not valid - it"s info is undefined, so we omit them

        const totalDiscountAmount = validDiscounts.reduce(
            (sum, d) => sum + d.amount,
            0
        );
        return {
            totalDiscountAmount,
            discountDescriptions: formDiscountDescriptions(validDiscounts)
        };
    } catch (err) {
        // Log error
        console.log(
            `Unexpected error happened during discount calculations: ${err}`
        );
        throw err;
    }
};

module.exports = {
    getDiscountsInfo
};
