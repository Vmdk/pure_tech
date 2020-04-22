const { getProductPrice } = require("./productController");

const appleDiscount = list => {
    const appleProd = list.find(p => p.productId === "apple");
    if (appleProd) {
        const discount =
            getProductPrice(appleProd.productId) * appleProd.amount * 0.1;
        return {
            description: `Apples 10% off: -${discount}p`,
            amount: discount
        };
    }
};

const soupsBreadDiscount = list => {
    const soupProducts = list.filter(p => p.productId === "soup");
    const breadProduct = list.find(p => p.productId === "bread");
    if (soupProducts.length === 2 && breadProduct) {
        const discount = getProductPrice(breadProduct.productId) * 0.5;
        return {
            description: `Bread for soups 0% off : -${discount}p`,
            amount: discount
        };
    }
};

// In general case discount - function that returns `amount` and `description`
const existingDiscounts = [appleDiscount, soupsBreadDiscount];

const getDiscountsInfo = list => {
    const appliedDisc = existingDiscounts.map(d => d(list)); // Apply all existing discounts
    const validDiscounts = appliedDisc.filter(d => d); // If discount is not valid - it"s info is undefined, so we omit them

    const totalDiscountAmount = validDiscounts.reduce(
        (sum, d) => sum + d.amount,
        0
    );
    return {
        totalDiscountAmount,
        discountDescriptions: validDiscounts.map(d => d.description)
    };
};

module.exports = {
    getDiscountsInfo
};
