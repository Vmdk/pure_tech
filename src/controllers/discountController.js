const { getProductPrice } = require("./productController");
const { formatPrice, isCurrentWeek } = require("../utils");

const appleDiscount = (requestData, result) => {
    const { date, products } = requestData;
    const appleProd = products.find(p => p.productId === "apple");
    if (appleProd && isCurrentWeek(date)) {
        const discount =
            getProductPrice(appleProd.productId) * appleProd.amount * 0.1;
        result.push({
            description: `Apples 10% off: -${formatPrice(discount)}`,
            amount: discount
        });
    }

    return result;
};

const soupsBreadDiscount = ({ products }, result) => {
    const soupProduct = products.find(p => p.productId === "soup");
    const breadProduct = products.find(p => p.productId === "bread");
    if (soupProduct && soupProduct.amount >= 2 && breadProduct) {
        // Here we calculate the maximum possible amount of breads which can get discount
        const maxDiscAmount = Math.floor(soupProduct.amount / 2);
        // Check if we don't give more discount then total amount of bread bought
        const appliableAmount = Math.min(maxDiscAmount, breadProduct.amount);
        const discount =
            getProductPrice(breadProduct.productId) * 0.5 * appliableAmount;
        result.push({
            description: `Bread for soups 50% off : -${formatPrice(discount)}`,
            amount: discount
        });
    }

    return result;
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

const getDiscountsInfo = (requestData, discounts = existingDiscounts) => {
    try {
        // Discounts work as middlewares. All of them add their data to summary.
        const discountsResults = discounts.reduce(
            (sum, d) => d(requestData, sum),
            []
        );

        const totalDiscountAmount = discountsResults.reduce(
            (sum, d) => sum + d.amount,
            0
        );
        return {
            totalDiscountAmount,
            discountDescriptions: formDiscountDescriptions(discountsResults)
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
